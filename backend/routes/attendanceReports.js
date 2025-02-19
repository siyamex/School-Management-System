const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Get attendance reports by class ID
router.get('/class/:id', async (req, res) => {
  try {
    const students = await Student.find({ class_id: req.params.id });
    if (!students) {
      return res.status(404).json({ message: 'Students not found' });
    }
    const studentIds = students.map(student => student._id);
    const attendanceRecords = await Attendance.find({ student_id: { $in: studentIds } });

    const reports = students.map(student => {
      const studentAttendance = attendanceRecords.filter(record => record.student_id.equals(student._id));
      const presentDays = studentAttendance.filter(record => record.status === 'Present').length;
      const totalDays = studentAttendance.length;
      const attendanceRate = totalDays ? (presentDays / totalDays) * 100 : 0;
      return {
        student: student.name,
        attendanceRate: attendanceRate.toFixed(2),
        attendanceRecords: studentAttendance
      };
    });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;