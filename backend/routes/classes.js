const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a class by ID
router.get('/:id', getClass, (req, res) => {
  res.json(res.class);
});

// Create a new class
router.post('/', async (req, res) => {
  const newClass = new Class({
    name: req.body.name,
    teacher_id: req.body.teacher_id
  });

  try {
    const createdClass = await newClass.save();
    res.status(201).json(createdClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a class
router.patch('/:id', getClass, async (req, res) => {
  if (req.body.name != null) {
    res.class.name = req.body.name;
  }
  if (req.body.teacher_id != null) {
    res.class.teacher_id = req.body.teacher_id;
  }

  try {
    const updatedClass = await res.class.save();
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a class
router.delete('/:id', getClass, async (req, res) => {
  try {
    await res.class.remove();
    res.json({ message: 'Deleted Class' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a class by ID
async function getClass(req, res, next) {
  let classObj;
  try {
    classObj = await Class.findById(req.params.id);
    if (classObj == null) {
      return res.status(404).json({ message: 'Cannot find class' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.class = classObj;
  next();
}

module.exports = router;