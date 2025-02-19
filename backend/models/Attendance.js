const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Present', 'Absent', 'Late']
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);