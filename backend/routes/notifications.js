const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications by user ID
router.get('/user/:id', async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.params.id });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark notification as read
router.patch('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;