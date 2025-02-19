const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

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

module.exports = router;