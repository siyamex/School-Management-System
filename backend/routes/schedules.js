const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get schedules by student ID
router.get('/student/:id', async (req, res) => {
  try {
    const schedules = await Schedule.find({ student_id: req.params.id });
    if (!schedules) {
      return res.status(404).json({ message: 'Schedules not found' });
    }
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a schedule by ID
router.get('/:id', getSchedule, (req, res) => {
  res.json(res.schedule);
});

// Create a new schedule
router.post('/', async (req, res) => {
  const schedule = new Schedule({
    class_id: req.body.class_id,
    day: req.body.day,
    time: req.body.time,
    student_id: req.body.student_id
  });

  try {
    const newSchedule = await schedule.save();
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a schedule
router.patch('/:id', getSchedule, async (req, res) => {
  if (req.body.class_id != null) {
    res.schedule.class_id = req.body.class_id;
  }
  if (req.body.day != null) {
    res.schedule.day = req.body.day;
  }
  if (req.body.time != null) {
    res.schedule.time = req.body.time;
  }
  if (req.body.student_id != null) {
    res.schedule.student_id = req.body.student_id;
  }

  try {
    const updatedSchedule = await res.schedule.save();
    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a schedule
router.delete('/:id', getSchedule, async (req, res) => {
  try {
    await res.schedule.remove();
    res.json({ message: 'Deleted Schedule' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a schedule by ID
async function getSchedule(req, res, next) {
  let schedule;
  try {
    schedule = await Schedule.findById(req.params.id);
    if (schedule == null) {
      return res.status(404).json({ message: 'Cannot find schedule' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.schedule = schedule;
  next();
}

module.exports = router;