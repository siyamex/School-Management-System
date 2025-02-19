const express = require('express');
const router = express.Router();
const AuditLog = require('../models/AuditLog');

// Get all audit logs
router.get('/', async (req, res) => {
  try {
    const logs = await AuditLog.find().populate('user', 'username');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;