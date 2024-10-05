const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs');

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

// POST route to add a review to a product by product name
router.post('/:productName/review', uploadReviewImages.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 },
  { name: 'img4', maxCount: 1 },
]), async (req, res) => {
  try {
    const { productName } = req.params; 
    const { stars, reviewDescription } = req.body;

    const product = await Product.findOne({ productName });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Extract the individual image files from req.files
    const images = [
      req.files.img1 ? req.files.img1[0].path : null,
      req.files.img2 ? req.files.img2[0].path : null,
      req.files.img3 ? req.files.img3[0].path : null,
      req.files.img4 ? req.files.img4[0].path : null,
    ].filter(Boolean); // Filter out any null entries

    const review = new Review({
      product: product._id,
      stars,
      reviewDescription,
      images,
    });

    await review.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET route to retrieve all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().populate('product', 'productName');

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET route to retrieve specific reviews for a product by product name
router.get('/:productName/reviews', async (req, res) => {
  try {
    const { productName } = req.params; 

    const product = await Product.findOne({ productName }); 

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const reviews = await Review.find({ product: product._id }).populate('product', 'productName'); 

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



module.exports = router;
