const mongoose = require('mongoose');

const onlineClassSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true,
    enum: ['Google Meet', 'Zoom', 'BigBlueButton']
  },
  link: {
    type: String,
    required: true
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class'
  }
});

module.exports = mongoose.model('OnlineClass', onlineClassSchema);