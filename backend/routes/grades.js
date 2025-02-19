const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');

// Get all grades
router.get('/', async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get grades by student ID
router.get('/student/:id', async (req, res) => {
  try {
    const grades = await Grade.find({ student_id: req.params.id });
    if (!grades) {
      return res.status(404).json({ message: 'Grades not found' });
    }
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a grade by ID
router.get('/:id', getGrade, (req, res) => {
  res.json(res.grade);
});

// Create a new grade
router.post('/', async (req, res) => {
  const grade = new Grade({
    student_id: req.body.student_id,
    subject: req.body.subject,
    grade: req.body.grade,
    examDate: req.body.examDate
  });

  try {
    const newGrade = await grade.save();
    res.status(201).json(newGrade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a grade
router.patch('/:id', getGrade, async (req, res) => {
  if (req.body.student_id != null) {
    res.grade.student_id = req.body.student_id;
  }
  if (req.body.subject != null) {
    res.grade.subject = req.body.subject;
  }
  if (req.body.grade != null) {
    res.grade.grade = req.body.grade;
  }
  if (req.body.examDate != null) {
    res.grade.examDate = req.body.examDate;
  }

  try {
    const updatedGrade = await res.grade.save();
    res.json(updatedGrade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a grade
router.delete('/:id', getGrade, async (req, res) => {
  try {
    await res.grade.remove();
    res.json({ message: 'Deleted Grade' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a grade by ID
async function getGrade(req, res, next) {
  let grade;
  try {
    grade = await Grade.findById(req.params.id);
    if (grade == null) {
      return res.status(404).json({ message: 'Cannot find grade' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.grade = grade;
  next();
}

module.exports = router;