import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceRecords({ match }) {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get(`/api/attendance/student/${match.params.id}`);
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error('There was an error fetching the attendance records!', error);
    }
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      <ul>
        {attendanceRecords.map(record => (
          <li key={record._id}>
            {new Date(record.date).toLocaleDateString()} - {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceRecords;