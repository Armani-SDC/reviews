const models = require('../models');

module.exports = {
  get: function (req, res) {
    models.products.get((err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(501);
      } else {
        res.sendStatus(201).send(data);
      }
    });
  },
  sayHi: function (req, res) {
    models.products.sayHi((err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(501);
      } else {
        res.status(201).send(data);
      }
    });
  }
};