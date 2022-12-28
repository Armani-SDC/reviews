/* eslint-disable camelcase */
const { Pool } = require('pg');

const pool = new Pool({
  database: 'mydb',
});

// query per product
// can pass in rowMode?: 'array' to get an array ack
exports.readMeta = (review_id) => (// modify to look at reviews first
  pool.query('SELECT * FROM meta INNER JOIN characteristics ON meta.characteristics_id = characteristics.id AND review_id=$1', [review_id])
    .then((response) => response.rows)
    .catch((err) => {
      console.log('error in meta query', err.message);
    })
);

exports.readReviews = (queryParams) => (
  pool.query('SELECT * FROM reviews WHERE product_id=$1', [queryParams])
  // { page: '1', count: '1', sort: 'newest', product_id: '1' }
  // ['1', '1', newest, '1']
);

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
