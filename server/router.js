const router = require('express').Router();
const controllers = require('./controllers');

// Example route
// router.get('/product/:product_id, contoller.product.get);

// Should return "Hello you found me"
// When making a get request to Http://localhost:3000/sayhi

router.get('/meta', controllers.meta.get);

router.get('/reviews', controllers.reviews.get);
router.post('/reviews', controllers.reviews.post);
router.put('/reviews/:review_id/:type', controllers.reviews.put);

module.exports = router;
