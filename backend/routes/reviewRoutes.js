const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const multer = require('multer');
const router = express.Router();
const path= require('path');
const fs= require('fs');

const reviewUploadsDir = path.join(__dirname, '../uploads/reviews');
if (!fs.existsSync(reviewUploadsDir)) {
  fs.mkdirSync(reviewUploadsDir, { recursive: true });
}


// Multer setup for review image uploads
const reviewStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/reviews/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadReviewImages = multer({ storage: reviewStorage });

// POST route to add a review to a product
router.post('/:productId/review', uploadReviewImages.array('images', 4), async (req, res) => {
  try {
    const { productId } = req.params;
    const { stars, reviewDescription } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const images = req.files.map(file => file.path);

    const review = new Review({
      product: productId,
      stars,
      reviewDescription,
      images
    });

    await review.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET route to retrieve all reviews for a product
router.get('/:productId/reviews', async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId }).populate('product', 'productName');

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
