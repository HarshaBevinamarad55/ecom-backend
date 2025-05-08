const Review = require('../models/reviewModel');  // Import Review Model
const Product = require('../models/Product');  // Import Product Model (if needed for some checks)
const User = require('../models/User'); // Import User Model (for authorization)

// CREATE: Add a new review
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, reviewText } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create a new review
    const newReview = new Review({
      productId,
      userId: req.user.id, // Assuming user is authenticated and user info is in req.user
      rating,
      reviewText,
    });

    // Save the review to the database
    await newReview.save();

    // Optionally, you can also update the product’s average rating here
    // (if you want to track overall ratings on the product directly)

    res.status(201).json({
      message: 'Review created successfully',
      review: newReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// READ: Get all reviews for a product
exports.getReviewsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch reviews for the product
    const reviews = await Review.find({ productId }).populate('userId', 'name email'); // Populate user details

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// READ: Get a specific review by ID
exports.getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Fetch the specific review
    const review = await Review.findById(reviewId).populate('userId', 'name email');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE: Update an existing review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, reviewText } = req.body;

    // Check if the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Only allow users to edit their own reviews
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update your own reviews' });
    }

    // Update the review
    review.rating = rating || review.rating;
    review.reviewText = reviewText || review.reviewText;
    review.updatedAt = Date.now(); // Update the timestamp

    // Save the updated review
    await review.save();

    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE: Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Check if the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Only allow users to delete their own reviews
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own reviews' });
    }

    // Delete the review
    await review.remove();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// FLAG: Flag a review as inappropriate
exports.flagReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Find the review
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Flag the review
    review.isFlagged = true;
    await review.save();

    res.status(200).json({ message: 'Review flagged successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
