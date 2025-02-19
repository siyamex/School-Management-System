import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExamSchedules({ match }) {
  const [examSchedules, setExamSchedules] = useState([]);

  useEffect(() => {
    fetchExamSchedules();
  }, []);

  const fetchExamSchedules = async () => {
    try {
      const response = await axios.get(`/api/examSchedules/class/${match.params.id}`);
      setExamSchedules(response.data);
    } catch (error) {
      console.error('There was an error fetching the exam schedules!', error);
    }
  };

  return (
    <div>
      <h2>Exam Schedules</h2>
      <ul>
        {examSchedules.map(schedule => (
          <li key={schedule._id}>
            {schedule.subject} - {new Date(schedule.date).toLocaleDateString()} - {schedule.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExamSchedules;