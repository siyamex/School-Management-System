const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const Student = require('../models/Student');

// Get grades by class ID
router.get('/class/:id', async (req, res) => {
  try {
    const students = await Student.find({ class_id: req.params.id });
    if (!students) {
      return res.status(404).json({ message: 'Students not found' });
    }
    const grades = await Grade.find({ student_id: { $in: students.map(student => student._id) } });
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update a grade
router.post('/', async (req, res) => {
  try {
    const { student_id, subject, grade, examDate } = req.body;
    let gradeRecord = await Grade.findOne({ student_id, subject, examDate });

    if (gradeRecord) {
      gradeRecord.grade = grade;
    } else {
      gradeRecord = new Grade({ student_id, subject, grade, examDate });
    }

    const savedGrade = await gradeRecord.save();
    res.status(201).json(savedGrade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;