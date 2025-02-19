const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
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
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
    enum: ['Document', 'Assignment'],
    default: 'Document'
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }
});

module.exports = mongoose.model('Document', documentSchema);