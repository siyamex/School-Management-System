const express = require('express');
const router = express.Router();
const ClassMaterial = require('../models/ClassMaterial');

// Get all class materials
router.get('/', async (req, res) => {
  try {
    const classMaterials = await ClassMaterial.find();
    res.json(classMaterials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get class materials by class ID
router.get('/class/:id', async (req, res) => {
  try {
    const classMaterials = await ClassMaterial.find({ class_id: req.params.id });
    if (!classMaterials) {
      return res.status(404).json({ message: 'Class materials not found' });
    }
    res.json(classMaterials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a class material by ID
router.get('/:id', getClassMaterial, (req, res) => {
  res.json(res.classMaterial);
});

// Create a new class material
router.post('/', async (req, res) => {
  const classMaterial = new ClassMaterial({
    title: req.body.title,
    description: req.body.description,
    fileUrl: req.body.fileUrl,
    class_id: req.body.class_id
  });

  try {
    const newClassMaterial = await classMaterial.save();
    res.status(201).json(newClassMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a class material
router.patch('/:id', getClassMaterial, async (req, res) => {
  if (req.body.title != null) {
    res.classMaterial.title = req.body.title;
  }
  if (req.body.description != null) {
    res.classMaterial.description = req.body.description;
  }
  if (req.body.fileUrl != null) {
    res.classMaterial.fileUrl = req.body.fileUrl;
  }
  if (req.body.class_id != null) {
    res.classMaterial.class_id = req.body.class_id;
  }

  try {
    const updatedClassMaterial = await res.classMaterial.save();
    res.json(updatedClassMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a class material
router.delete('/:id', getClassMaterial, async (req, res) => {
  try {
    await res.classMaterial.remove();
    res.json({ message: 'Deleted Class Material' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a class material by ID
async function getClassMaterial(req, res, next) {
  let classMaterial;
  try {
    classMaterial = await ClassMaterial.findById(req.params.id);
    if (classMaterial == null) {
      return res.status(404).json({ message: 'Cannot find class material' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.classMaterial = classMaterial;
  next();
}

module.exports = router;