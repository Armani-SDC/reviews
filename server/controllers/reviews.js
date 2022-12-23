const models = require('../models');

exports.get = (req, res) => {
  // do things with req here
  if (!req.query.product_id) {
    res.sendStatus(404);
  } else {
    models.reviews.get(req.query.product_id)
      .then((data) => {
        res.status(201).send(data.rows);
      })
      .catch(() => {
        res.sendStatus(501);
      });
  }
};
