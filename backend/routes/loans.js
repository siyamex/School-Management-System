const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const Book = require('../models/Book');

// Get all loans
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find().populate('book_id').populate('student_id');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get loans by student ID
router.get('/student/:id', async (req, res) => {
  try {
    const loans = await Loan.find({ student_id: req.params.id }).populate('book_id');
    if (!loans) {
      return res.status(404).json({ message: 'Loans not found' });
    }
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a loan by ID
router.get('/:id', getLoan, (req, res) => {
  res.json(res.loan);
});

// Create a new loan
router.post('/', async (req, res) => {
  const loan = new Loan({
    student_id: req.body.student_id,
    book_id: req.body.book_id,
    loanDate: req.body.loanDate,
    returnDate: req.body.returnDate,
    status: 'Loaned'
  });

  try {
    const newLoan = await loan.save();
    const book = await Book.findById(req.body.book_id);
    book.available = false;
    await book.save();
    res.status(201).json(newLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a loan
router.patch('/:id', getLoan, async (req, res) => {
  if (req.body.student_id != null) {
    res.loan.student_id = req.body.student_id;
  }
  if (req.body.book_id != null) {
    res.loan.book_id = req.body.book_id;
  }
  if (req.body.loanDate != null) {
    res.loan.loanDate = req.body.loanDate;
  }
  if (req.body.returnDate != null) {
    res.loan.returnDate = req.body.returnDate;
  }
  if (req.body.status != null) {
    const book = await Book.findById(res.loan.book_id);
    if (req.body.status === 'Returned') {
      book.available = true;
    } else if (req.body.status === 'Loaned') {
      book.available = false;
    }
    await book.save();
    res.loan.status = req.body.status;
  }

  try {
    const updatedLoan = await res.loan.save();
    res.json(updatedLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a loan
router.delete('/:id', getLoan, async (req, res) => {
  try {
    const book = await Book.findById(res.loan.book_id);
    book.available = true;
    await book.save();
    await res.loan.remove();
    res.json({ message: 'Deleted Loan' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a loan by ID
async function getLoan(req, res, next) {
  let loan;
  try {
    loan = await Loan.findById(req.params.id).populate('book_id').populate('student_id');
    if (loan == null) {
      return res.status(404).json({ message: 'Cannot find loan' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.loan = loan;
  next();
}

module.exports = router;