const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get attendance records by student ID
router.get('/student/:id', async (req, res) => {
  try {
    const attendance = await Attendance.find({ student_id: req.params.id });
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance records not found' });
    }
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an attendance record by ID
router.get('/:id', getAttendance, (req, res) => {
  res.json(res.attendance);
});

// Create a new attendance record
router.post('/', async (req, res) => {
  const attendance = new Attendance({
    student_id: req.body.student_id,
    date: req.body.date,
    status: req.body.status
  });

  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an attendance record
router.patch('/:id', getAttendance, async (req, res) => {
  if (req.body.student_id != null) {
    res.attendance.student_id = req.body.student_id;
  }
  if (req.body.date != null) {
    res.attendance.date = req.body.date;
  }
  if (req.body.status != null) {
    res.attendance.status = req.body.status;
  }

  try {
    const updatedAttendance = await res.attendance.save();
    res.json(updatedAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an attendance record
router.delete('/:id', getAttendance, async (req, res) => {
  try {
    await res.attendance.remove();
    res.json({ message: 'Deleted Attendance Record' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get an attendance record by ID
async function getAttendance(req, res, next) {
  let attendance;
  try {
    attendance = await Attendance.findById(req.params.id);
    if (attendance == null) {
      return res.status(404).json({ message: 'Cannot find attendance record' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.attendance = attendance;
  next();
}

module.exports = router;