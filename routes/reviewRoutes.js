const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const protect = require('../middlewares/authMiddleware');

// 1. Create a new review (requires authentication)
router.post('/', protect, reviewController.createReview);

// 2. Get all  for a product
router.get('/product/:productId', reviewController.getReviewsForProduct);

// 3. Get a specific review by ID
router.get('/:reviewId', reviewController.getReviewById);

// 4. Update a review (requires authentication)
router.put('/:reviewId', protect, reviewController.updateReview);

// 5. Delete a review (requires authentication)
router.delete('/:reviewId', protect, reviewController.deleteReview);

// 6. Flag a review as inappropriate (requires authentication)
router.post('/flag/:reviewId', protect, reviewController.flagReview);

module.exports = router;
