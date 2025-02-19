import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskTracking({ match }) {
  const [tasks, setTasks] = useState([]);

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

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.patch(`/api/tasks/${taskId}`, { status: 'Completed' });
      fetchTasks();
    } catch (error) {
      console.error('There was an error completing the task!', error);
    }
  };

  return (
    <div>
      <h2>Task Tracking</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} - {task.description} - Due: {new Date(task.dueDate).toLocaleDateString()} - Status: {task.status}
            {task.status === 'Pending' && (
              <button onClick={() => handleCompleteTask(task._id)}>Mark as Completed</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskTracking;