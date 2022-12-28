const axios = require('axios');
const database = require('../postgres');

exports.get = (data) => (
  database.readReviews(data)
    .then(async (response) => {
      // TODO implement count and page
      const modifiedResponse = {
        product: response.rows[0].product_id,
        page: 0,
        count: response.rows.length,
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


/* What I get back
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
/* What I want
{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    {
*/