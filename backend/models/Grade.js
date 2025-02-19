const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  },
  subject: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  examDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Grade', gradeSchema);