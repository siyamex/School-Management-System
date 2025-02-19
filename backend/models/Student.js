const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  contactInfo: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  academicRecords: {
    type: Array,
    default: []
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class'
  },
  admissionDetails: {
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Approved', 'Rejected']
    },
    history: [
      {
        date: { type: Date, required: true },
        status: { type: String, required: true }
      }
    ]
  },
  parentInfo: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Student', studentSchema);