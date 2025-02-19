import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceManagement({ match }) {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  useEffect(() => {
    fetchStudentsAndAttendance();
  }, []);

  const fetchStudentsAndAttendance = async () => {
    try {
      const studentsResponse = await axios.get(`/api/students/class/${match.params.id}`);
      setStudents(studentsResponse.data);

      const attendanceResponse = await axios.get(`/api/attendanceManagement/class/${match.params.id}`);
      const attendanceData = attendanceResponse.data.reduce((acc, record) => {
        acc[record.student_id] = record.status;
        return acc;
      }, {});
      setAttendanceRecords(attendanceData);
    } catch (error) {
      console.error('There was an error fetching the students and attendance records!', error);
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords({ ...attendanceRecords, [studentId]: status });
  };

  const handleSaveAttendance = async () => {
    try {
      await Promise.all(
        students.map(student => {
          const status = attendanceRecords[student._id] || 'Absent';
          return axios.post('/api/attendanceManagement', { student_id: student._id, date: new Date().toISOString(), status });
        })
      );
      alert('Attendance saved successfully!');
    } catch (error) {
      console.error('There was an error saving the attendance records!', error);
    }
  };

  return (
    <div>
      <h2>Attendance Management</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name}
            <select value={attendanceRecords[student._id] || 'Absent'} onChange={(e) => handleAttendanceChange(student._id, e.target.value)}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
          </li>
        ))}
      </ul>
      <button onClick={handleSaveAttendance}>Save Attendance</button>
    </div>
  );
}

export default AttendanceManagement;