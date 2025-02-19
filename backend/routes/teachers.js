const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a teacher by ID
router.get('/:id', getTeacher, (req, res) => {
  res.json(res.teacher);
});

// Create a new teacher
router.post('/', async (req, res) => {
  const teacher = new Teacher({
    name: req.body.name,
    subject: req.body.subject,
    class_id: req.body.class_id
  });

  try {
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a teacher
router.patch('/:id', getTeacher, async (req, res) => {
  if (req.body.name != null) {
    res.teacher.name = req.body.name;
  }
  if (req.body.subject != null) {
    res.teacher.subject = req.body.subject;
  }
  if (req.body.class_id != null) {
    res.teacher.class_id = req.body.class_id;
  }

  try {
    const updatedTeacher = await res.teacher.save();
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a teacher
router.delete('/:id', getTeacher, async (req, res) => {
  try {
    await res.teacher.remove();
    res.json({ message: 'Deleted Teacher' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a teacher by ID
async function getTeacher(req, res, next) {
  let teacher;
  try {
    teacher = await Teacher.findById(req.params.id);
    if (teacher == null) {
      return res.status(404).json({ message: 'Cannot find teacher' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.teacher = teacher;
  next();
}

module.exports = router;