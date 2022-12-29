/* eslint-disable camelcase */
const { Pool } = require('pg');

const pool = new Pool({
  database: 'mydb',
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
