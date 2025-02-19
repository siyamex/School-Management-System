const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  loan_date: {
    type: Date,
    default: Date.now
  },
  return_date: {
    type: Date
  }
});

module.exports = mongoose.model('Loan', loanSchema);