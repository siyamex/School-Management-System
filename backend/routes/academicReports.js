const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const Student = require('../models/Student');

// Get academic performance reports by class ID
router.get('/class/:id', async (req, res) => {
  try {
    const students = await Student.find({ class_id: req.params.id });
    if (!students) {
      return res.status(404).json({ message: 'Students not found' });
    }
    const studentIds = students.map(student => student._id);
    const grades = await Grade.find({ student_id: { $in: studentIds } });

    const reports = students.map(student => {
      const studentGrades = grades.filter(grade => grade.student_id.equals(student._id));
      const averageGrade = studentGrades.reduce((acc, grade) => acc + grade.grade, 0) / studentGrades.length;
      return {
        student: student.name,
        averageGrade: averageGrade || 0,
        grades: studentGrades
      };
    });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;