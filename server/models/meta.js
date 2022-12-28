/* eslint-disable camelcase */
const axios = require('axios');
const database = require('../postgres');

exports.get = (product_id) => (
  database.readReviews(product_id)
    .then((response) => {
      console.log(response.rows);
      const modifiedResponse = {
        product_id,
        ratings: {},
        recommended: {
          0: 0,
          1: 0,
        },
        characteristics: {},
      };
      for (let i = 0; i < response.rows.length; i += 1) {
        if (response.rows[i].recommend) {
          // modifiedResponse.recommend['1'] += 1;
        } else {
          // modifiedResponse.recommend['0'] += 1;
        }
        // if (modifiedResponse.ratings[response.rows[i].rating] === undefined) {
        //   modifiedResponse.ratings[response.rows[i].rating] = 1;
        // } else {
        //   modifiedResponse.ratings[response.rows[i].rating] += 1;
        // }
      }
      return Promise.resolve(modifiedResponse);
    })
    .catch((err) => {
      console.log('error in metaReading', err.message);
    })
); // implicit return

// i : product ID
// o : Object with ratings info
// Object form:
// {
//   "product_id": "2",
//   "ratings": {
//     2: 1,
//     3: 1,
//     4: 2,
//     // ...
//   },
//   "recommended": {
//     0: 5
//     // ...
//   },
//   "characteristics": {
//     "Size": {
//       "id": 14,
//       "value": "4.0000"
//     },
//     "Width": {
//       "id": 15,
//       "value": "3.5000"
//     },
//     "Comfort": {
//       "id": 16,
//       "value": "4.0000"
//     },
//     // ...
// }
