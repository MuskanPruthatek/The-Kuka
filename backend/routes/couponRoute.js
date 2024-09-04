const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

// Create a new coupon
router.post('/', async (req, res) => {
  const { code, expiryDate, discountAmount } = req.body;

  try {
    const coupon = new Coupon({ code, expiryDate, discountAmount });
    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a coupon by code
router.get('/:code', async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (!coupon) return res.status(404).json({ error: 'Coupon not found' });

    res.json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a coupon (e.g., mark as invalid, change expiry)
router.put('/:code', async (req, res) => {
  try {
    const coupon = await Coupon.findOneAndUpdate({ code: req.params.code }, req.body, { new: true });
    if (!coupon) return res.status(404).json({ error: 'Coupon not found' });

    res.json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a coupon
router.delete('/:code', async (req, res) => {
  try {
    const coupon = await Coupon.findOneAndDelete({ code: req.params.code });
    if (!coupon) return res.status(404).json({ error: 'Coupon not found' });

    res.json({ message: 'Coupon deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;