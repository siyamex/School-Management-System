const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Book', bookSchema);