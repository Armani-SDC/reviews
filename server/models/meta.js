const axios = require('axios');
const database = require('../postgres');

exports.get = (product_id) => (database.readMeta(product_id)); // implicit return
