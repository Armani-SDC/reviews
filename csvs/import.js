// const csv = require('csv-parser');
// const fs = require('fs');
// const fns = require('date-fns');
// const Pool = require('pg-pool');

// const db = new Pool({
//   host: '127.0.0.1',
//   database: 'mydb'
// });
// const text = 'INSERT INTO reviews VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';

// function handler(importData, cb) {
//   db.query(text, importData, (err, response) => {
//     if(err) {
//       console.log('error writing', err);
//     } else {
//       console.log('success writing');
//       cb();
//     }
//   });
// }

// async function importQuery () {
//   db.connect()
//   .then(() => {
//     console.log('connected');
//   })
//   .catch((err) => console.log('error at connection', err));

//   await fs.createReadStream('test.csv')
//     .pipe(csv())
//     .on('data', (data) => {
//     data.date = fns.fromUnixTime((data.date / 1000));
//     if(data.helpfulness === '') {
//       data.helpfulness = null;
//     }
//     let importData = Object.values(data);
//     // console.log(importData);
//     handler(importData, () => {db.end()})
//   })
//   .on('end', () => {//called when the readStream connection closes
//     console.log('end');
//   });
// }

// importQuery();
const csv = require('csv-parse');
const fs = require('fs');
const fns = require('date-fns');
const Pool = require('pg-pool');
const postgres = require('postgres');

// const processFile = () => {
//   console.log('in process file');
//   const records = [];
//   fs.createReadStream('test.csv')
//   .pipe(csv())
//   .on('data', (data) => {
//     console.log('in data');
//     data.date = fns.fromUnixTime((data.date / 1000));
//     if(data.helpfulness === '') {
//       data.helpfulness = null;
//     }
//     let importData = Object.values(data);
//     records.push(importData);
//   })
//   .on('end', () => {
//     console.log(records);
//     return records;
//   });
// } 

const sql = postgres({
  host: '127.0.0.1',
  database: 'mydb'
});

const processFile = async () => {
  const records = [];
  const parser = fs.createReadStream('reviews.csv')
    .pipe(csv.parse());
  for await (const record of parser) {
    // record[0] = JSON.parse(record[0]);
    console.log('id: ', record[0]);
    record[3] = fns.fromUnixTime((record[3] / 1000));
    if(record[-1] === '') {
        record[-1] = null;
    }
    records.push(record);
  }
  records.shift();
  return records;
}

async function importQuery () {
  const records = await processFile();
  records.forEach(async (record) => {
    console.log('id: ', record[0]);
    await sql `INSERT INTO reviews VALUES (${record[0]}, ${record[1]}, ${record[2]}, ${record[3]}, ${record[4]}, ${record[5]}, ${record[6]}, ${record[7]}, ${record[8]}, ${record[9]}, ${record[10]}, ${record[11]})`;
});
  // db.connect()
  // .then(() => {
  //   console.log('connected');
  // })
  // .catch((err) => console.log('error at connection', err))
  // .then(() => {
  //   return processFile();
  // })
  // .then((records) => {
  //   records.forEach((record) => {
  //     db.query(text, record, (err, response) => {
  //       if(err) {
  //         console.log('error writing', err);
  //       } else {
  //         console.log('success writing');
  //       }
  //     });
  //   })
  // })
  // .then(() => {
  //   db.end();
  //   console.log('end of promise chain');
  // });
  return 0;
}

importQuery();






