import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AcademicReports({ match }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`/api/academicReports/class/${match.params.id}`);
      setReports(response.data);
    } catch (error) {
      console.error('There was an error fetching the academic reports!', error);
    }
  };

  return (
    <div>
      <h2>Academic Performance Reports</h2>
      <ul>
        {reports.map(report => (
          <li key={report.student}>
            <h3>{report.student}</h3>
            <p>Average Grade: {report.averageGrade.toFixed(2)}</p>
            <ul>
              {report.grades.map(grade => (
                <li key={grade._id}>{grade.subject}: {grade.grade}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AcademicReports;