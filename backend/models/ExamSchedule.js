const mongoose = require('mongoose');

const examScheduleSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class'
  }
});

module.exports = mongoose.model('ExamSchedule', examScheduleSchema);