import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [editingAttendance, setEditingAttendance] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('/api/attendance');
      setAttendance(response.data);
    } catch (error) {
      console.error('There was an error fetching the attendance records!', error);
    }
  };

  const handleCreateAttendance = async () => {
    try {
      await axios.post('/api/attendance', { student_id: studentId, date, status });
      fetchAttendance();
      setStudentId('');
      setDate('');
      setStatus('');
    } catch (error) {
      console.error('There was an error creating the attendance record!', error);
    }
  };

  const handleUpdateAttendance = async () => {
    try {
      await axios.patch(`/api/attendance/${editingAttendance._id}`, { student_id: studentId, date, status });
      fetchAttendance();
      setStudentId('');
      setDate('');
      setStatus('');
      setEditingAttendance(null);
    } catch (error) {
      console.error('There was an error updating the attendance record!', error);
    }
  };

  const handleDeleteAttendance = async (id) => {
    try {
      await axios.delete(`/api/attendance/${id}`);
      fetchAttendance();
    } catch (error) {
      console.error('There was an error deleting the attendance record!', error);
    }
  };

  const startEditing = (record) => {
    setStudentId(record.student_id);
    setDate(record.date);
    setStatus(record.status);
    setEditingAttendance(record);
  };

  return (
    <div>
      <h2>Attendance</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
        <button type="button" onClick={editingAttendance ? handleUpdateAttendance : handleCreateAttendance}>
          {editingAttendance ? 'Update' : 'Create'}
        </button>
      </form>
      <ul>
        {attendance.map(record => (
          <li key={record._id}>
            {record.student_id} - {record.date} - {record.status}
            <button onClick={() => startEditing(record)}>Edit</button>
            <button onClick={() => handleDeleteAttendance(record._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Attendance;