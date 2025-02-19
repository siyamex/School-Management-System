import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OnlineExams({ match }) {
  const [onlineExams, setOnlineExams] = useState([]);

  useEffect(() => {
    fetchOnlineExams();
  }, []);

  const fetchOnlineExams = async () => {
    try {
      const response = await axios.get(`/api/onlineExams/class/${match.params.id}`);
      setOnlineExams(response.data);
    } catch (error) {
      console.error('There was an error fetching the online exams!', error);
    }
  };

  return (
    <div>
      <h2>Online Exams</h2>
      <ul>
        {onlineExams.map(exam => (
          <li key={exam._id}>
            {exam.subject} - {new Date(exam.date).toLocaleDateString()} - {exam.duration} minutes
            <ul>
              {exam.questions.map((question, index) => (
                <li key={index}>
                  {question.question}
                  <ul>
                    {question.options.map((option, i) => (
                      <li key={i}>{option}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineExams;