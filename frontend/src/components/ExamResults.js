import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExamResults({ match }) {
  const [examResults, setExamResults] = useState([]);

  useEffect(() => {
    fetchExamResults();
  }, []);

  const fetchExamResults = async () => {
    try {
      const response = await axios.get(`/api/grades/student/${match.params.id}`);
      setExamResults(response.data);
    } catch (error) {
      console.error('There was an error fetching the exam results!', error);
    }
  };

  return (
    <div>
      <h2>Exam Results</h2>
      <ul>
        {examResults.map(result => (
          <li key={result._id}>
            {result.subject} - {result.grade} - {new Date(result.examDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExamResults;