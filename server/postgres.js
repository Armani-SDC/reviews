/* eslint-disable camelcase */
const { Pool } = require('pg');

const pool = new Pool({
  // user: 'ubuntu',
  // host: 'ec2-54-209-73-91.compute-1.amazonaws.com',
  // database: 'reviewsdb',
  // password: 'password',
  // port: 5432,
  database: 'reviewsdb',
});

// query per product
// can pass in rowMode?: 'array' to get an array ack
exports.readMeta = (product_id) => (
  pool.query(`SELECT meta.review_id, reviews.rating, reviews.recommend, meta.value, characteristics.id, characteristics.name
  FROM reviews
    JOIN meta
      ON meta.review_id = reviews.id
    JOIN characteristics
      ON meta.characteristics_id = characteristics.id
  AND reviews.product_id = $1`, [product_id])
  /*
  This is the old query:
  pool.query('SELECT * FROM meta INNER JOIN characteristics ON meta.characteristics_id = characteristics.id AND review_id=$1', [review_id])
      .then((response) => response.rows)
      .catch((err) => {
        console.log('error in meta query', err.message);
      })
  */
);

exports.readReviews = (queryParams) => {
  const params = [queryParams.page, queryParams.count, queryParams.product_id];
  // console.log(params);

  // pool.query('select reviews.*, photos.url FROM reviews left join photos on photos.review_id = reviews.id where product_id = 4 AND reviews.id in (select reviews.id from reviews where product_id = 4 order by date desc limit 5 offset 0)')
  // pool.query(`SELECT meta.review_id, reviews.rating, reviews.recommend, meta.value, characteristics.id, characteristics.name
  //   FROM reviews
  //     JOIN meta
  //       ON meta.review_id = reviews.id
  //     JOIN characteristics
  //       ON meta.characteristics_id = characteristics.id
  //   AND reviews.product_id = 4`)
  //   .then((data) => console.log('data: ', data.rows))
  //   .catch((err) => console.log('error in query: ', err.message, 'details: ', err.detail));
  if (queryParams.sort === 'helpful') {
    return (pool.query`SELECT reviews.*, photos.url
    FROM reviews
    LEFT JOIN photos
    ON photos.review_id = reviews.id
    WHERE product_id = $3
    AND reviews.id IN
    (SELECT reviews.id FROM reviews
    WHERE product_id = $3
    ORDER BY helpfulness DESC
    LIMIT $2 OFFSET $1)`, params);
  }
  if (queryParams.sort === 'meta') {
    return (pool.query('SELECT * FROM reviews WHERE product_id=$1', [queryParams.product_id]));
  }
  /* This is the old method minus photos
  return (pool.query(`SELECT * FROM reviews
  WHERE product_id=$3
  ORDER BY date DESC
  LIMIT $2 OFFSET $1`, params));
  */
  return (pool.query(`SELECT reviews.*, photos.url
  FROM reviews
  LEFT JOIN photos
  ON photos.review_id = reviews.id
  WHERE product_id = $3
  AND reviews.id IN
  (SELECT reviews.id FROM reviews
  WHERE product_id = $3
  ORDER BY date DESC
  LIMIT $2 OFFSET $1)`, params));
};

/*
Deprecated
exports.readPhotos = (review_id) => (
  pool.query('SELECT * FROM photos WHERE review_id=$1', [review_id])
    .then((response) => {
      // console.log(response.rows);
      const retArr = [];
      for (let i = 0; i < response.rows.length; i += 1) {
        const retObj = {
          id: i,
          url: response.rows[i].url,
        };
        retArr.push(retObj);
      }
      return retArr;
    })
    .catch((err) => {
      console.log('error in photos query', err.message);
    })
);
*/

exports.modifyEntry = (params) => {
  // object id, type of entry
  const query = [params.review_id];
  if (params.type !== 'report') {
    return (pool.query('UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id=$1', query));
  }
  return (pool.query('UPDATE reviews SET reported = true WHERE id=$1', query));
};

exports.postReview = (reviewData) => (
  pool.query('INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (DEFAULT,$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id', reviewData)
);

exports.postPhotos = (photoData) => (
  pool.query('INSERT INTO photos (review_id, url) VALUES ($1, $2)', photoData)
);

exports.postChar = (metaData) => (
  pool.query('INSERT INTO meta (review_id, characteristics_id, value) VALUES ($1, $2, $3)', metaData)
);
