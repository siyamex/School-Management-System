const express = require('express');
const router = express.Router();
const OnlineClass = require('../models/OnlineClass');

// Get all online classes
router.get('/', async (req, res) => {
  try {
    const onlineClasses = await OnlineClass.find();
    res.json(onlineClasses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get online classes by class ID
router.get('/class/:id', async (req, res) => {
  try {
    const onlineClasses = await OnlineClass.find({ class_id: req.params.id });
    if (!onlineClasses) {
      return res.status(404).json({ message: 'Online classes not found' });
    }
    res.json(onlineClasses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an online class by ID
router.get('/:id', getOnlineClass, (req, res) => {
  res.json(res.onlineClass);
});

// Create a new online class
router.post('/', async (req, res) => {
  const onlineClass = new OnlineClass({
    subject: req.body.subject,
    date: req.body.date,
    time: req.body.time,
    platform: req.body.platform,
    link: req.body.link,
    class_id: req.body.class_id
  });

  try {
    const newOnlineClass = await onlineClass.save();
    res.status(201).json(newOnlineClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an online class
router.patch('/:id', getOnlineClass, async (req, res) => {
  if (req.body.subject != null) {
    res.onlineClass.subject = req.body.subject;
  }
  if (req.body.date != null) {
    res.onlineClass.date = req.body.date;
  }
  if (req.body.time != null) {
    res.onlineClass.time = req.body.time;
  }
  if (req.body.platform != null) {
    res.onlineClass.platform = req.body.platform;
  }
  if (req.body.link != null) {
    res.onlineClass.link = req.body.link;
  }
  if (req.body.class_id != null) {
    res.onlineClass.class_id = req.body.class_id;
  }

  try {
    const updatedOnlineClass = await res.onlineClass.save();
    res.json(updatedOnlineClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an online class
router.delete('/:id', getOnlineClass, async (req, res) => {
  try {
    await res.onlineClass.remove();
    res.json({ message: 'Deleted Online Class' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get an online class by ID
async function getOnlineClass(req, res, next) {
  let onlineClass;
  try {
    onlineClass = await OnlineClass.findById(req.params.id);
    if (onlineClass == null) {
      return res.status(404).json({ message: 'Cannot find online class' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.onlineClass = onlineClass;
  next();
}

module.exports = router;