const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a review
const reviewSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',  // Reference to the product being reviewed
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the user who submitted the review
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5']
  },
  reviewText: {
    type: String,
    required: [true, 'Review text is required'],
    trim: true,
    minlength: [10, 'Review must be at least 10 characters long']  // Minimum length for meaningful review
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  helpfulVotes: {
    type: Number,
    default: 0,  // Tracks how many users found the review helpful
  },
  isFlagged: {
    type: Boolean,
    default: false  // Flag for inappropriate content
  }
});

// Pre-save hook to update the `updatedAt` field before saving
reviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
