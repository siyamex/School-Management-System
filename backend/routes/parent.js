const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Grade = require('../models/Grade');
const Attendance = require('../models/Attendance');

// Get academic progress by student ID
router.get('/progress/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const grades = await Grade.find({ student_id: req.params.id });
    const attendance = await Attendance.find({ student_id: req.params.id });
    res.json({ student, grades, attendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;