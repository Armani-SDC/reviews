const { Pool } = require('pg');

const pool = new Pool({
  database: 'mydb',
});

exports.readMeta = () => {
  pool.query('Select * from meta where id=1').
    then
}
