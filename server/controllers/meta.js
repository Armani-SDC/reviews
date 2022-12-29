const models = require('../models');

exports.get = (req, res) => {
  console.log(req.query);
  if (!req.query.product_id) {
    res.sendStatus(404);
  } else {
    models.meta.get(req.query.product_id)
      .then((data) => {
        // consol e.log('data', data);
        res.status(201).send(data);
      })
      .catch(() => {
        res.sendStatus(501);
      });
  }
};
