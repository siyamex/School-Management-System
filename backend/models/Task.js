const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  },
  feedback: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Task', taskSchema);