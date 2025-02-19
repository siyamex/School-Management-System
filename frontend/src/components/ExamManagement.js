import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExamManagement({ match }) {
  const [examSchedules, setExamSchedules] = useState([]);
  const [newExam, setNewExam] = useState({ subject: '', date: '', location: '', class_id: match.params.id });

  useEffect(() => {
    fetchExamSchedules();
  }, []);

  const fetchExamSchedules = async () => {
    try {
      const response = await axios.get(`/api/examManagement/class/${match.params.id}`);
      setExamSchedules(response.data);
    } catch (error) {
      console.error('There was an error fetching the exam schedules!', error);
    }
  };

  const handleExamChange = (e) => {
    const { name, value } = e.target;
    setNewExam({ ...newExam, [name]: value });
  };

  const handleAddOrUpdateExam = async () => {
    try {
      await axios.post('/api/examManagement', newExam);
      fetchExamSchedules();
      setNewExam({ subject: '', date: '', location: '', class_id: match.params.id });
    } catch (error) {
      console.error('There was an error adding or updating the exam schedule!', error);
    }
  };

  return (
    <div>
      <h2>Exam Management</h2>
      <ul>
        {examSchedules.map(exam => (
          <li key={exam._id}>
            {exam.subject} - {new Date(exam.date).toLocaleDateString()} - {exam.location}
          </li>
        ))}
      </ul>
      <div>
        <h3>Add or Update Exam Schedule</h3>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newExam.subject}
          onChange={handleExamChange}
        />
        <input
          type="date"
          name="date"
          value={newExam.date}
          onChange={handleExamChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newExam.location}
          onChange={handleExamChange}
        />
        <button onClick={handleAddOrUpdateExam}>Save Exam Schedule</button>
      </div>
    </div>
  );
}

export default ExamManagement;