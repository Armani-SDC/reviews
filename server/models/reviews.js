const axios = require('axios');
const database = require('../postgres');

exports.get = (data) => (database.readReview(data));
