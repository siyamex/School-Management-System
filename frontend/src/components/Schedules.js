import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [classId, setClassId] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [editingSchedule, setEditingSchedule] = useState(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('/api/schedules');
      setSchedules(response.data);
    } catch (error) {
      console.error('There was an error fetching the schedules!', error);
    }
  };

  const handleCreateSchedule = async () => {
    try {
      await axios.post('/api/schedules', { class_id: classId, day, time });
      fetchSchedules();
      setClassId('');
      setDay('');
      setTime('');
    } catch (error) {
      console.error('There was an error creating the schedule!', error);
    }
  };

  const handleUpdateSchedule = async () => {
    try {
      await axios.patch(`/api/schedules/${editingSchedule._id}`, { class_id: classId, day, time });
      fetchSchedules();
      setClassId('');
      setDay('');
      setTime('');
      setEditingSchedule(null);
    } catch (error) {
      console.error('There was an error updating the schedule!', error);
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await axios.delete(`/api/schedules/${id}`);
      fetchSchedules();
    } catch (error) {
      console.error('There was an error deleting the schedule!', error);
    }
  };

  const startEditing = (schedule) => {
    setClassId(schedule.class_id);
    setDay(schedule.day);
    setTime(schedule.time);
    setEditingSchedule(schedule);
  };

  return (
    <div>
      <h2>Schedules</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <input
          type="text"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="button" onClick={editingSchedule ? handleUpdateSchedule : handleCreateSchedule}>
          {editingSchedule ? 'Update' : 'Create'}
        </button>
      </form>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule._id}>
            {schedule.class_id} - {schedule.day} - {schedule.time}
            <button onClick={() => startEditing(schedule)}>Edit</button>
            <button onClick={() => handleDeleteSchedule(schedule._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedules;