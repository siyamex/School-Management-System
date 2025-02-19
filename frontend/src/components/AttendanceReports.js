import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceReports({ match }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`/api/attendanceReports/class/${match.params.id}`);
      setReports(response.data);
    } catch (error) {
      console.error('There was an error fetching the attendance reports!', error);
    }
  };

  return (
    <div>
      <h2>Attendance Reports</h2>
      <ul>
        {reports.map(report => (
          <li key={report.student}>
            <h3>{report.student}</h3>
            <p>Attendance Rate: {report.attendanceRate}%</p>
            <ul>
              {report.attendanceRecords.map(record => (
                <li key={record._id}>
                  {new Date(record.date).toLocaleDateString()}: {record.status}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceReports;