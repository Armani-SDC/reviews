const axios = require('axios');
const database = require('../postgres');

exports.get = (data) => (
  database.readReviews(data)
    .then((response) => {
      if (response.rowCount === 0) { // if there is no reviews
        return Promise.resolve({});
      }
      // this will return duplicates where url they have multiple urls
      // console.log('data2: ', response);
      const modifiedResponse = {
        product: response.rows[0].product_id,
        page: data.page,
        count: data.count,
        results: [],
      };
      let curUrl = [];
      // this for loop scans for duplicates and adds the urls for the photos to an array
      // then it adds all objects to the response
      // console.log('response: ', response.rows);
      for (let i = 0; i < response.rowCount; i += 1) {
        if (response.rows[i + 1] !== undefined && response.rows[i].id === response.rows[i + 1].id) {
          curUrl.push(response.rows[i].url);
        } else {
          if (response.rows[i].url !== null) {
            curUrl.push(response.rows[i].url);
          }
          const newObj = {
            review_id: response.rows[i].id,
            rating: response.rows[i].rating,
            summary: response.rows[i].summary,
            recommend: response.rows[i].recommend,
            response: response.rows[i].response,
            body: response.rows[i].body,
            date: response.rows[i].date,
            reviewer_name: response.rows[i].reviewer_name,
            helpfulness: response.rows[i].helpfulness,
            // eslint-disable-next-line no-await-in-loop
            // photos: await (database.readPhotos(response.rows[i].id)),
            photos: curUrl,
          };
          // console.log('response', response.rows);
          modifiedResponse.results.push(newObj);
          curUrl = [];
        }
      }
      return Promise.resolve(modifiedResponse);
    }).catch((err) => {
      console.log('error in model: ', err.message);
      console.log('DETAIL: ', err.detail);
    })
);

exports.put = (params) => (
  (database.modifyEntry(params.review_id)
    .then(() => Promise.resolve())
    .catch((err) => {
      console.log('error modifying entry', err.message);
      console.log('DETAIL', err.detail);
    }))
);

exports.post = (reviewData, photoData, metaData) => (
  // insert data into photos
  // insert data into meta
  database.postReview(Object.values(reviewData))
    .then(async (data) => {
      const promises = [];
      for (let i = 0; i < photoData.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        promises.push(database.postPhotos([data.rows[0].id, photoData[i]]));
        // await database.postPhotos([data.rows[0].id, photoData[i]]);
      }
      const metaDataNames = Object.keys(metaData);
      for (let i = 0; i < metaDataNames.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        // await database.postChar([data.rows[0].id,
        // metaData[metaDataNames[i]].id,
        // metaData[metaDataNames[i]].value])
        promises.push(database.postChar([data.rows[0].id,
          metaData[metaDataNames[i]].id,
          metaData[metaDataNames[i]].value]));
      }
      Promise.all(promises);
      // get characteristics data where product id
      // modify metaData using characteristics_id
    })
    .catch((err) => {
      console.log('error writing to db: ', err.message);
      console.log('DETAIL: ', err.detail);
      // console.log()
    })
);

/* format of db
[
    {
        "id": 1,
        "product_id": 1,
        "rating": 5,
        "date": "2020-07-29T07:00:00.000Z",
        "summary": "This product was great!",
        "body": "I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.",
        "recommend": false,
        "reported": false,
        "reviewer_name": "funtime",
        "reviewer_email": "first.last@gmail.com",
        "response": "null",
        "helpfulness": 8
    },
  ]
*/
