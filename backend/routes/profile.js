const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get student profile by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update student profile by ID
router.patch('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (req.body.name != null) {
      student.name = req.body.name;
    }
    if (req.body.age != null) {
      student.age = req.body.age;
    }
    if (req.body.contactInfo != null) {
      student.contactInfo = req.body.contactInfo;
    }
    if (req.body.academicRecords != null) {
      student.academicRecords = req.body.academicRecords;
    }

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;