const mongoose = require('mongoose');

// review schema
const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewDescription: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }]
}, 
{ timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
