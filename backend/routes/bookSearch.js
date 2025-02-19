const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Search for books by title, author, or genre
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.find({ 
      $or: [
        { title: new RegExp(query, 'i') },
        { author: new RegExp(query, 'i') },
        { genre: new RegExp(query, 'i') }
      ]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;