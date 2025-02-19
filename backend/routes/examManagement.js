const express = require('express');
const router = express.Router();
const ExamSchedule = require('../models/ExamSchedule');
const sendAlert = require('../utils/sendAlert');
const Student = require('../models/Student');

// Get exam schedules by class ID
router.get('/class/:id', async (req, res) => {
  try {
    const examSchedules = await ExamSchedule.find({ class_id: req.params.id });
    res.json(examSchedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update an exam schedule
router.post('/', async (req, res) => {
  try {
    const { subject, date, location, class_id } = req.body;
    let examSchedule = await ExamSchedule.findOne({ subject, date, class_id });

    if (examSchedule) {
      examSchedule.location = location;
    } else {
      examSchedule = new ExamSchedule({ subject, date, location, class_id });
    }

    const savedExamSchedule = await examSchedule.save();

    // Send alerts to students in the class
    const students = await Student.find({ class_id });
    students.forEach(student => {
      sendAlert(student._id, `New exam scheduled for ${subject} on ${new Date(date).toLocaleDateString()} at ${location}.`);
    });

    res.status(201).json(savedExamSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;