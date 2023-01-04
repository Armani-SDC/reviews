/* eslint-disable camelcase */
const { Pool } = require('pg');

const pool = new Pool({
  database: 'reviewsdb',
});

// query per product
// can pass in rowMode?: 'array' to get an array ack
exports.readMeta = (review_id) => (
  pool.query('SELECT * FROM meta INNER JOIN characteristics ON meta.characteristics_id = characteristics.id AND review_id=$1', [review_id])
    .then((response) => response.rows)
    .catch((err) => {
      console.log('error in meta query', err.message);
    })
);

exports.readReviews = (queryParams) => {
  const params = [queryParams.page, queryParams.count, queryParams.product_id];
  // console.log(params);
  if (queryParams.sort === 'helpful') {
    return (pool.query(`SELECT * FROM reviews
    WHERE product_id=$3
    ORDER BY helpfulness DESC
    LIMIT $2 OFFSET $1`, params));
  }
  if (queryParams.sort === 'meta') {
    return (pool.query('SELECT * FROM reviews WHERE product_id=$1', [queryParams.product_id]));
  }
  return (pool.query(`SELECT * FROM reviews
  WHERE product_id=$3
  ORDER BY date DESC
  LIMIT $2 OFFSET $1`, params));
  // { page: '1', count: '1', sort: 'newest', product_id: '1' }
  // ['1', '1', newest, '1']
};

exports.readPhotos = (review_id) => (
  pool.query('SELECT * FROM photos WHERE review_id=$1', [review_id])
    .then((response) => {
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

exports.modifyEntry = (params) => {
  // object id, type of entry
  const query = [params.review_id];
  if (params.type !== 'report') {
    return (pool.query('UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id=$1', [query]));
  }
  return (pool.query('UPDATE reviews SET reported = true WHERE id=$1', [query]));
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
