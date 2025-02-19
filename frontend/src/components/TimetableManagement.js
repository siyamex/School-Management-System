import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TimetableManagement({ match }) {
  const [timetables, setTimetables] = useState([]);
  const [newTimetable, setNewTimetable] = useState({ class_id: match.params.id, day: '', time: '', subject: '' });

  useEffect(() => {
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    try {
      const response = await axios.get(`/api/timetableManagement/class/${match.params.id}`);
      setTimetables(response.data);
    } catch (error) {
      console.error('There was an error fetching the timetables!', error);
    }
  };

  const handleTimetableChange = (e) => {
    const { name, value } = e.target;
    setNewTimetable({ ...newTimetable, [name]: value });
  };

  const handleAddOrUpdateTimetable = async () => {
    try {
      await axios.post('/api/timetableManagement', newTimetable);
      fetchTimetables();
      setNewTimetable({ class_id: match.params.id, day: '', time: '', subject: '' });
    } catch (error) {
      console.error('There was an error adding or updating the timetable!', error);
    }
  };

  return (
    <div>
      <h2>Timetable Management</h2>
      <ul>
        {timetables.map(timetable => (
          <li key={timetable._id}>
            {timetable.day} - {timetable.time} - {timetable.subject}
          </li>
        ))}
      </ul>
      <div>
        <h3>Add or Update Timetable</h3>
        <input
          type="text"
          name="day"
          placeholder="Day"
          value={newTimetable.day}
          onChange={handleTimetableChange}
        />
        <input
          type="time"
          name="time"
          value={newTimetable.time}
          onChange={handleTimetableChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newTimetable.subject}
          onChange={handleTimetableChange}
        />
        <button onClick={handleAddOrUpdateTimetable}>Save Timetable</button>
      </div>
    </div>
  );
}

export default TimetableManagement;