const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// Get timetables by class ID
router.get('/class/:id', async (req, res) => {
  try {
    const timetables = await Schedule.find({ class_id: req.params.id });
    res.json(timetables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update a timetable
router.post('/', async (req, res) => {
  try {
    const { class_id, day, time, subject } = req.body;
    let timetable = await Schedule.findOne({ class_id, day, time });

    if (timetable) {
      timetable.subject = subject;
    } else {
      timetable = new Schedule({ class_id, day, time, subject });
    }

    const savedTimetable = await timetable.save();
    res.status(201).json(savedTimetable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;