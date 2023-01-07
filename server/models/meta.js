/* eslint-disable camelcase */
const axios = require('axios');
const database = require('../postgres');

exports.get = (product_id) => (
  database.readMeta(product_id)
    .then((response) => {
      // console.log(response);
      const modifiedResponse = {
        product_id,
        ratings: {},
        recommended: {
          0: 0,
          1: 0,
        },
        characteristics: {},
      };
      let individualReviews = 0;
      let curReview = -1;
      for (let i = 0; i < response.rowCount; i += 1) {
        if (curReview !== response.rows[i].review_id) {
          individualReviews += 1;
          curReview = response.rows[i].review_id;
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
        }
        // add up all the values for a characteristic and then divide by total of reviews
        const curName = response.rows[i].name;
        if (modifiedResponse.characteristics[curName] === undefined) {
          modifiedResponse.characteristics[curName] = {};
          modifiedResponse.characteristics[curName].id = response.rows[i].id;
          modifiedResponse.characteristics[curName].value = response.rows[i].value;
        } else {
          modifiedResponse.characteristics[curName].value += response.rows[i].value;
        }
      }
      // console.log('mod response after loop: ', modifiedResponse);
      const charKeys = Object.keys(modifiedResponse.characteristics);
      for (let i = 0; i < charKeys.length; i += 1) {
        modifiedResponse.characteristics[charKeys[i]].value /= individualReviews;
      }
      return Promise.resolve(modifiedResponse);
    })
    .catch((err) => {
      console.log('error in metaReading: ', err);
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
