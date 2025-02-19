const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get messages by recipient
router.get('/recipient/:recipient', async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.params.recipient });
    if (!messages) {
      return res.status(404).json({ message: 'Messages not found' });
    }
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a message by ID
router.get('/:id', getMessage, (req, res) => {
  res.json(res.message);
});

// Create a new message
router.post('/', async (req, res) => {
  const message = new Message({
    sender: req.body.sender,
    recipient: req.body.recipient,
    subject: req.body.subject,
    body: req.body.body
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a message
router.patch('/:id', getMessage, async (req, res) => {
  if (req.body.sender != null) {
    res.message.sender = req.body.sender;
  }
  if (req.body.recipient != null) {
    res.message.recipient = req.body.recipient;
  }
  if (req.body.subject != null) {
    res.message.subject = req.body.subject;
  }
  if (req.body.body != null) {
    res.message.body = req.body.body;
  }

  try {
    const updatedMessage = await res.message.save();
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a message
router.delete('/:id', getMessage, async (req, res) => {
  try {
    await res.message.remove();
    res.json({ message: 'Deleted Message' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a message by ID
async function getMessage(req, res, next) {
  let message;
  try {
    message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: 'Cannot find message' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.message = message;
  next();
}

module.exports = router;