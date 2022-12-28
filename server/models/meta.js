/* eslint-disable camelcase */
const axios = require('axios');
const database = require('../postgres');

exports.get = (product_id) => (
  database.readReviews(product_id)
    .then(async (response) => {
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
          modifiedResponse.recommended['1'] += 1;
        } else {
          modifiedResponse.recommended['0'] += 1;
        }
        if (modifiedResponse.ratings[response.rows[i].rating] === undefined) {
          modifiedResponse.ratings[response.rows[i].rating] = 1;
        } else {
          modifiedResponse.ratings[response.rows[i].rating] += 1;
        }
        // eslint-disable-next-line no-await-in-loop
        let characteristics = await database.readMeta(response.rows[i].id);
        for (let j = 0; j < characteristics.length; j += 1) {
          modifiedResponse.characteristics[characteristics[i].name] = {};
          modifiedResponse.characteristics[characteristics[i].name].id = characteristics[i].characteristics_id;
          modifiedResponse.characteristics[characteristics[i].name].value = characteristics[i].value;
        }
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
