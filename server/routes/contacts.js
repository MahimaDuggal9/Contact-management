const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('Received data:', req.body); 
    const newContact = new Contact(req.body);
    await newContact.save();
    console.log('Contact saved:', newContact); 
    res.status(201).json(newContact);
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

module.exports = router;
