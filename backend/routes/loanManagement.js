const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const Book = require('../models/Book');
const Student = require('../models/Student');

// Get loans by student ID
router.get('/student/:id', async (req, res) => {
  try {
    const loans = await Loan.find({ student_id: req.params.id }).populate('book_id');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new loan
router.post('/', async (req, res) => {
  const loan = new Loan({
    book_id: req.body.book_id,
    student_id: req.body.student_id
  });

  try {
    const newLoan = await loan.save();
    res.status(201).json(newLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a loan (return a book)
router.patch('/:id', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    if (req.body.return_date != null) {
      loan.return_date = req.body.return_date;
    }

    const updatedLoan = await loan.save();
    res.json(updatedLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;