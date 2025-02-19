const express = require('express');
const router = express.Router();
const SystemSettings = require('../models/SystemSettings');

// Get system settings
router.get('/', async (req, res) => {
  try {
    const settings = await SystemSettings.findOne();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update system settings
router.patch('/', async (req, res) => {
  try {
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = new SystemSettings(req.body);
    } else {
      if (req.body.schoolName != null) {
        settings.schoolName = req.body.schoolName;
      }
      if (req.body.address != null) {
        settings.address = req.body.address;
      }
      if (req.body.contactEmail != null) {
        settings.contactEmail = req.body.contactEmail;
      }
      if (req.body.contactPhone != null) {
        settings.contactPhone = req.body.contactPhone;
      }
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;