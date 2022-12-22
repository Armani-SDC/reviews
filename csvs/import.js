const csv = require('csv-parser');
const fs = require('fs');
const fns = require('date-fns');
const Pool = require('pg-pool');

const db = new Pool({
  host: '127.0.0.1',
  database: 'mydb'
});
const text = 'INSERT INTO reviews VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';

function handler(importData, cb) {
  db.query(text, importData, (err, response) => {
    if(err) {
      console.log('error writing', err);
    } else {
      console.log('success writing');
      cb();
    }
  });
}

async function importQuery () {
  db.connect()
  .then(() => {
    console.log('connected');
  })
  .catch((err) => console.log('error at connection', err));

  await fs.createReadStream('test.csv')
    .pipe(csv())
    .on('data', (data) => {
    data.date = fns.fromUnixTime((data.date / 1000));
    if(data.helpfulness === '') {
      data.helpfulness = null;
    }
    let importData = Object.values(data);
    // console.log(importData);
    handler(importData, () => {db.end()})
  })
  .on('end', () => {//called when the readStream connection closes
    console.log('end');
  });
}

importQuery();






