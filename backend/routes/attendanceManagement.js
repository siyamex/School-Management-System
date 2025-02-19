const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Get attendance records by class ID
router.get('/class/:id', async (req, res) => {
  try {
    const students = await Student.find({ class_id: req.params.id });
    if (!students) {
      return res.status(404).json({ message: 'Students not found' });
    }
    const attendanceRecords = await Attendance.find({ student_id: { $in: students.map(student => student._id) } });
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update attendance record
router.post('/', async (req, res) => {
  try {
    const { student_id, date, status } = req.body;
    let attendance = await Attendance.findOne({ student_id, date });

    if (attendance) {
      attendance.status = status;
    } else {
      attendance = new Attendance({ student_id, date, status });
    }

    const savedAttendance = await attendance.save();
    res.status(201).json(savedAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;