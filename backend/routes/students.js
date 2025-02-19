const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a student by ID
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student);
});

// Create a new student
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    class_id: req.body.class_id
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a student
router.patch('/:id', getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.age != null) {
    res.student.age = req.body.age;
  }
  if (req.body.class_id != null) {
    res.student.class_id = req.body.class_id;
  }

  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student
router.delete('/:id', getStudent, async (req, res) => {
  try {
    await res.student.remove();
    res.json({ message: 'Deleted Student' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a student by ID
async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Cannot find student' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.student = student;
  next();
}

module.exports = router;