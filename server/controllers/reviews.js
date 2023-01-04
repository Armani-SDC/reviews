const models = require('../models');

exports.get = (req, res) => {
  // do things with req here
  if (!req.query.product_id) {
    res.sendStatus(404);
  } else {
    req.query.page = req.query.page ? Number(req.query.page) : '1';
    req.query.count = req.query.count ? Number(req.query.count) : '5';
    req.query.sort = req.query.sort ? req.query.sort : 'newest';
    models.reviews.get(req.query)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch(() => {
        res.sendStatus(501);
      });
  }
};

exports.post = (req, res) => {
  const reviewData = {
    product_id: req.body.product_id,
    rating: req.body.rating,
    date: (new Date().toISOString()),
    summary: req.body.summary,
    body: req.body.body,
    recommend: false,
    reported: false,
    name: req.body.name,
    email: req.body.email,
    response: null,
    helpfulness: 0,
  };
  const photoData = req.body.photos;
  const metaData = { ...req.body.characteristics };

  models.reviews.post(reviewData, photoData, metaData)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(501);
    });
  /*
  name => reviewer_name
  email => reviewer_email
  */
};
/*
product_id	integer	Required ID of the product to post the review for
rating	int	Integer (1-5) indicating the review rating
summary	text	Summary text of the review
body	text	Continued or full text of the review
recommend	bool	Value indicating if the reviewer recommends the product
name	text	Username for question asker
email	text	Email address for question asker
photos	[text]	Array of text urls that link to images to be shown
characteristics	object	Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}
*/

exports.put = (req, res) => {
  models.reviews.put(req.params)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(501);
    });
};
