const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/RatingsAndReviews', { useNewUrlParser: true });

const photoSchema = new mongoose.Schema({
  id: Number,
  url: String,
});

const resultSchema = new mongoose.Schema({
  review_id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: [photoSchema],
});

const reviewSchema = new mongoose.Schema({
  product: Number,
  results: [resultSchema],
});

exports.Reviews = mongoose.model('Reviews', reviewSchema);
