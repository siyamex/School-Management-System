const express = require('express');
const router = express.Router();
const OnlineExam = require('../models/OnlineExam');

// Get all online exams
router.get('/', async (req, res) => {
  try {
    const onlineExams = await OnlineExam.find();
    res.json(onlineExams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get online exams by class ID
router.get('/class/:id', async (req, res) => {
  try {
    const onlineExams = await OnlineExam.find({ class_id: req.params.id });
    if (!onlineExams) {
      return res.status(404).json({ message: 'Online exams not found' });
    }
    res.json(onlineExams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an online exam by ID
router.get('/:id', getOnlineExam, (req, res) => {
  res.json(res.onlineExam);
});

// Create a new online exam
router.post('/', async (req, res) => {
  const onlineExam = new OnlineExam({
    subject: req.body.subject,
    date: req.body.date,
    duration: req.body.duration,
    class_id: req.body.class_id,
    questions: req.body.questions
  });

  try {
    const newOnlineExam = await onlineExam.save();
    res.status(201).json(newOnlineExam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an online exam
router.patch('/:id', getOnlineExam, async (req, res) => {
  if (req.body.subject != null) {
    res.onlineExam.subject = req.body.subject;
  }
  if (req.body.date != null) {
    res.onlineExam.date = req.body.date;
  }
  if (req.body.duration != null) {
    res.onlineExam.duration = req.body.duration;
  }
  if (req.body.class_id != null) {
    res.onlineExam.class_id = req.body.class_id;
  }
  if (req.body.questions != null) {
    res.onlineExam.questions = req.body.questions;
  }

  try {
    const updatedOnlineExam = await res.onlineExam.save();
    res.json(updatedOnlineExam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an online exam
router.delete('/:id', getOnlineExam, async (req, res) => {
  try {
    await res.onlineExam.remove();
    res.json({ message: 'Deleted Online Exam' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get an online exam by ID
async function getOnlineExam(req, res, next) {
  let onlineExam;
  try {
    onlineExam = await OnlineExam.findById(req.params.id);
    if (onlineExam == null) {
      return res.status(404).json({ message: 'Cannot find online exam' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.onlineExam = onlineExam;
  next();
}

module.exports = router;