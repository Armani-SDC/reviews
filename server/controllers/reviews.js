const models = require('../models');

exports.get = (req, res) => {
  // do things with req here
  models.reviews.get((err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(501);
    } else {
      res.status(201).send(data);
    }
  });
};
