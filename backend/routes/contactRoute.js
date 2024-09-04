// routes/contact.js
const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
require('dotenv').config();
const router = express.Router();

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to handle contact form submission
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Save the contact form data to MongoDB
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

  // Email options for the site admin
const adminMailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'PRUTHATEK: New Contact Form Submission',
    text: `New contact form submission on PRUTHATEK's website.\n\nDetails:\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n`,
  };

   // Email options for the client confirmation
const clientMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'PRUTHATEK: Contact Form Submission Received',
    text: `Hi ${name},\n\nThank you for reaching out to PRUTHATEK! We have received your message and will get back to you shortly.\n\nYour message:\n${message}\n\nBest regards,\nThe PRUTHATEK Team\n\nPRUTHATEK | Web & App Development Services\nEmail: ${process.env.EMAIL_USER}`,
  };
  
    // Send email to the site admin
    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to send email' });
      }

      // Send confirmation email to the client
      transporter.sendMail(clientMailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: 'Failed to send confirmation email' });
        }

        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully and data stored in MongoDB' });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to store data in MongoDB' });
  }
});

module.exports = router;
