const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class'
  },
  day: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);