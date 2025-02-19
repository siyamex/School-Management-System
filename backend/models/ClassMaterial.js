const mongoose = require('mongoose');

const classMaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class'
  }
});

module.exports = mongoose.model('ClassMaterial', classMaterialSchema);