import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProgressTracking({ match }) {
  const [progress, setProgress] = useState({ student: {}, grades: [], attendance: [] });

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await axios.get(`/api/parent/progress/${match.params.id}`);
      setProgress(response.data);
    } catch (error) {
      console.error('There was an error fetching the progress!', error);
    }
  };

  return (
    <div>
      <h2>Progress Tracking</h2>
      <h3>Student Information</h3>
      <p>Name: {progress.student.name}</p>
      <p>Age: {progress.student.age}</p>
      <p>Class ID: {progress.student.class_id}</p>
      <h3>Grades</h3>
      <ul>
        {progress.grades.map(grade => (
          <li key={grade._id}>{grade.subject}: {grade.grade}</li>
        ))}
      </ul>
      <h3>Attendance</h3>
      <ul>
        {progress.attendance.map(record => (
          <li key={record._id}>{new Date(record.date).toLocaleDateString()}: {record.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProgressTracking;