import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('/api/auditLogs');
      setLogs(response.data);
    } catch (error) {
      console.error('There was an error fetching the audit logs!', error);
    }
  };

  return (
    <div>
      <h2>Audit Logs</h2>
      <ul>
        {logs.map(log => (
          <li key={log._id}>
            User: {log.user.username} - Action: {log.action} - Time: {new Date(log.timestamp).toLocaleString()}
            <pre>{log.details}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuditLogs;