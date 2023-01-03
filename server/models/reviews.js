const axios = require('axios');
const database = require('../postgres');

exports.get = (data) => (
  database.readReviews(data)
    .then(async (response) => {
      // TODO implement count and page
      const modifiedResponse = {
        product: response.rows[0].product_id,
        page: data.page,
        count: data.count,
        results: [],
      };
      for (let i = 0; i < response.rows.length; i += 1) {
        const newObj = { // todo: add photos
          review_id: response.rows[i].id,
          rating: response.rows[i].rating,
          summary: response.rows[i].summary,
          recommend: response.rows[i].recommend,
          response: response.rows[i].response,
          body: response.rows[i].body,
          date: response.rows[i].date,
          reviewer_name: response.rows[i].reviewer_name,
          helpfulness: response.rows[i].helpfulness,
          // photos: [], //Todo get photos working
          // eslint-disable-next-line no-await-in-loop
          photos: await (database.readPhotos(response.rows[i].id)),
        };
        // console.log('response', response.rows);

        modifiedResponse.results.push(newObj);
      }
      return Promise.resolve(modifiedResponse);
    }).catch((err) => console.log('error in model: ', err.message))
);

exports.put = (params) => (
  (database.modifyEntry(params.review_id)
    .then(() => Promise.resolve())
    .catch((err) => {
      console.log('error modifying entry', err.message);
    }))
);

exports.post = (reviewData, photoData, metaData) => (
  database.postReview(Object.values(reviewData))
    .then((data) => {
      console.log('return data: ', data.rows);
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
