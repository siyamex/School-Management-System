const mongoose = require('mongoose');

const onlineExamSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true // duration in minutes
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class'
  },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      answer: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('OnlineExam', onlineExamSchema);