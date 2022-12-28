/* eslint-disable camelcase */
const { Pool } = require('pg');

const pool = new Pool({
  database: 'mydb',
});

// query per product
// can pass in rowMode?: 'array' to get an array ack
exports.readMeta = (product_id) => (// modify to look at reviews first
  pool.query('Select * from meta where review_id=$1', [product_id])
);

exports.readReviews = (product_id) => (
  pool.query('SELECT * FROM reviews WHERE product_id=$1', [product_id])
  // Promise.all([
  //   pool.query('SELECT * FROM reviews WHERE product_id=$1', [product_id]),
  //   pool.query('SELECT * FROM photos INNER JOIN reviews ON photos.review_id = reviews.id')// THIS WOULD RETURN A LOT OF QUERIES
  // ]);
);

exports.getPhotos = (review_id) => (
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
