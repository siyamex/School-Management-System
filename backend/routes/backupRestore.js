const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const backupDir = path.join(__dirname, '../backups');

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Backup the database
router.post('/backup', async (req, res) => {
  const backupFile = path.join(backupDir, `backup-${Date.now()}.gz`);

  exec(`mongodump --archive=${backupFile} --gzip`, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during backup', error: err.message });
    }
    res.status(200).json({ message: 'Backup successful', backupFile });
  });
});

// Restore the database
router.post('/restore', async (req, res) => {
  const { backupFile } = req.body;

  if (!backupFile || !fs.existsSync(path.join(backupDir, backupFile))) {
    return res.status(400).json({ message: 'Invalid backup file' });
  }

  exec(`mongorestore --archive=${path.join(backupDir, backupFile)} --gzip --drop`, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during restore', error: err.message });
    }
    res.status(200).json({ message: 'Restore successful' });
  });
});

module.exports = router;