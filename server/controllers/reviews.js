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
  res.send(req.body);
};

exports.put = (req, res) => {
  models.reviews.put(req.params)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(501);
    });
};
