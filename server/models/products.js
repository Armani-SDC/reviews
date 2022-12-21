const axios = require('axios');

module.exports = {

  get: () => {
    // Here I would call my product api
  },

  sayHi: function(cb) {
    cb(null, 'Hello you found me!');
  }
};