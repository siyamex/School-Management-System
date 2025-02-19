const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Teacher'
  }
});

module.exports = mongoose.model('Class', classSchema);