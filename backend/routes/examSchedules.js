const express = require('express');
const router = express.Router();
const ExamSchedule = require('../models/ExamSchedule');

// Get all exam schedules
router.get('/', async (req, res) => {
  try {
    const examSchedules = await ExamSchedule.find();
    res.json(examSchedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get exam schedules by class ID
router.get('/class/:id', async (req, res) => {
  try {
    const examSchedules = await ExamSchedule.find({ class_id: req.params.id });
    if (!examSchedules) {
      return res.status(404).json({ message: 'Exam schedules not found' });
    }
    res.json(examSchedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an exam schedule by ID
router.get('/:id', getExamSchedule, (req, res) => {
  res.json(res.examSchedule);
});

// Create a new exam schedule
router.post('/', async (req, res) => {
  const examSchedule = new ExamSchedule({
    subject: req.body.subject,
    date: req.body.date,
    location: req.body.location,
    class_id: req.body.class_id
  });

  try {
    const newExamSchedule = await examSchedule.save();
    res.status(201).json(newExamSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an exam schedule
router.patch('/:id', getExamSchedule, async (req, res) => {
  if (req.body.subject != null) {
    res.examSchedule.subject = req.body.subject;
  }
  if (req.body.date != null) {
    res.examSchedule.date = req.body.date;
  }
  if (req.body.location != null) {
    res.examSchedule.location = req.body.location;
  }
  if (req.body.class_id != null) {
    res.examSchedule.class_id = req.body.class_id;
  }

  try {
    const updatedExamSchedule = await res.examSchedule.save();
    res.json(updatedExamSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an exam schedule
router.delete('/:id', getExamSchedule, async (req, res) => {
  try {
    await res.examSchedule.remove();
    res.json({ message: 'Deleted Exam Schedule' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get an exam schedule by ID
async function getExamSchedule(req, res, next) {
  let examSchedule;
  try {
    examSchedule = await ExamSchedule.findById(req.params.id);
    if (examSchedule == null) {
      return res.status(404).json({ message: 'Cannot find exam schedule' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.examSchedule = examSchedule;
  next();
}

module.exports = router;