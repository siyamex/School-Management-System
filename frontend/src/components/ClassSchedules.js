import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClassSchedules({ match }) {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();

    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      if (event.data === 'Schedule updated') {
        fetchSchedules();
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`/api/schedules/student/${match.params.id}`);
      setSchedules(response.data);
    } catch (error) {
      console.error('There was an error fetching the schedules!', error);
    }
  };

  return (
    <div>
      <h2>Class Schedules</h2>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule._id}>
            {schedule.day} - {schedule.time} - Class ID: {schedule.class_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassSchedules;