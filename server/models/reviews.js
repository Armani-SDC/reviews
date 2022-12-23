const axios = require('axios');

exports.get = (callback) => {
  // Here I would call my product api
  callback(null, 'this is a test');
};
