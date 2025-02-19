const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all student admissions
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get admission details by student ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student.admissionDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update admission status by student ID
router.patch('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (req.body.status != null) {
      student.admissionDetails.status = req.body.status;
      student.admissionDetails.history.push({ date: new Date(), status: req.body.status });
    }

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;