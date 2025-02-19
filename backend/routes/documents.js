const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get documents by type
router.get('/type/:type', async (req, res) => {
  try {
    const documents = await Document.find({ type: req.params.type });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a document by ID
router.get('/:id', getDocument, (req, res) => {
  res.json(res.document);
});

// Create a new document
router.post('/', async (req, res) => {
  const document = new Document({
    title: req.body.title,
    description: req.body.description,
    fileUrl: req.body.fileUrl,
    type: req.body.type,
    student_id: req.body.student_id
  });

  try {
    const newDocument = await document.save();
    res.status(201).json(newDocument);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a document
router.patch('/:id', getDocument, async (req, res) => {
  if (req.body.title != null) {
    res.document.title = req.body.title;
  }
  if (req.body.description != null) {
    res.document.description = req.body.description;
  }
  if (req.body.fileUrl != null) {
    res.document.fileUrl = req.body.fileUrl;
  }
  if (req.body.type != null) {
    res.document.type = req.body.type;
  }
  if (req.body.student_id != null) {
    res.document.student_id = req.body.student_id;
  }

  try {
    const updatedDocument = await res.document.save();
    res.json(updatedDocument);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a document
router.delete('/:id', getDocument, async (req, res) => {
  try {
    await res.document.remove();
    res.json({ message: 'Deleted Document' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a document by ID
async function getDocument(req, res, next) {
  let document;
  try {
    document = await Document.findById(req.params.id);
    if (document == null) {
      return res.status(404).json({ message: 'Cannot find document' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.document = document;
  next();
}

module.exports = router;