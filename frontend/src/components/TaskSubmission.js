import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskSubmission({ match }) {
  const [tasks, setTasks] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/tasks/student/${match.params.id}`);
      setTasks(response.data);
    } catch (error) {
      console.error('There was an error fetching the tasks!', error);
    }
  };

  const handleFeedback = async (taskId) => {
    try {
      await axios.patch(`/api/tasks/${taskId}`, { feedback });
      fetchTasks();
      setFeedback('');
    } catch (error) {
      console.error('There was an error submitting the feedback!', error);
    }
  };

  return (
    <div>
      <h2>Task Submission</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} - {task.description} - Due: {new Date(task.dueDate).toLocaleDateString()} - Status: {task.status}
            {task.status === 'Completed' && (
              <>
                <textarea
                  placeholder="Feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <button onClick={() => handleFeedback(task._id)}>Submit Feedback</button>
              </>
            )}
            {task.feedback && <p>Feedback: {task.feedback}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskSubmission;