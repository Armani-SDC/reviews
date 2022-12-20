const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/RatingsAndReviews', { useNewUrlParser: true });

const reviewSchema = mongoose.schema({
  product: Number,
  results: [{
    review_id: Number,
    rating: Number,
    summary: String,
    recommend: Boolean,
    response: String,
    body: String,
    date: Date,
    reviewer_name: String,
    helpfulness: Number,
    photos: [{
      id: Number,
      url: String,
    }],
  }],
});

exports.Reviews = mongoose.model('Reviews', reviewSchema);
