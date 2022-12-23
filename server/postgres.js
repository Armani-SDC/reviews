const { Pool } = require('pg');

const pool = new Pool({
  database: 'mydb',
});

// query per product
// can pass in rowMode?: 'array' to get an array ack
exports.readMeta = (product_id) => (// modify to look at reviews first
  pool.query('Select * from meta where review_id=$1', [product_id])
);

exports.readReview = (product_id) => (
  pool.query('Select * from reviews where product_id=$1', [product_id])
);
