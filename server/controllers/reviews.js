const models = require('../models');

exports.get = (req, res) => {
  // do things with req here
  if (!req.query.product_id) {
    res.sendStatus(404);
  } else {
    req.query.page = req.query.page ? req.query.page : '1';
    req.query.count = req.query.count ? req.query.count : '5';
    req.query.sort = req.query.sort ? req.query.sort : 'newest';
    models.reviews.get(req.query.product_id)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch(() => {
        res.sendStatus(501);
      });
  }
};
