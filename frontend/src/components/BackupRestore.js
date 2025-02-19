import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BackupRestore() {
  const [backups, setBackups] = useState([]);
  const [selectedBackup, setSelectedBackup] = useState('');

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const response = await axios.get('/api/backups');
      setBackups(response.data);
    } catch (error) {
      console.error('There was an error fetching the backups!', error);
    }
  };

  const handleBackup = async () => {
    try {
      await axios.post('/api/backupRestore/backup');
      fetchBackups();
      alert('Backup successful!');
    } catch (error) {
      console.error('There was an error during backup!', error);
    }
  };

  const handleRestore = async () => {
    try {
      await axios.post('/api/backupRestore/restore', { backupFile: selectedBackup });
      alert('Restore successful!');
    } catch (error) {
      console.error('There was an error during restore!', error);
    }
  };

  return (
    <div>
      <h2>Data Backup and Restore</h2>
      <button onClick={handleBackup}>Backup Now</button>
      <h3>Restore from Backup</h3>
      <select value={selectedBackup} onChange={(e) => setSelectedBackup(e.target.value)}>
        <option value="">Select a backup file</option>
        {backups.map((backup) => (
          <option key={backup} value={backup}>{backup}</option>
        ))}
      </select>
      <button onClick={handleRestore} disabled={!selectedBackup}>Restore</button>
    </div>
  );
}

export default BackupRestore;