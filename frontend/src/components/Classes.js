import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Classes() {
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [editingClass, setEditingClass] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('There was an error fetching the classes!', error);
    }
  };

  const handleCreateClass = async () => {
    try {
      await axios.post('/api/classes', { name, teacher_id: teacherId });
      fetchClasses();
      setName('');
      setTeacherId('');
    } catch (error) {
      console.error('There was an error creating the class!', error);
    }
  };

  const handleUpdateClass = async () => {
    try {
      await axios.patch(`/api/classes/${editingClass._id}`, { name, teacher_id: teacherId });
      fetchClasses();
      setName('');
      setTeacherId('');
      setEditingClass(null);
    } catch (error) {
      console.error('There was an error updating the class!', error);
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      await axios.delete(`/api/classes/${id}`);
      fetchClasses();
    } catch (error) {
      console.error('There was an error deleting the class!', error);
    }
  };

  const startEditing = (classItem) => {
    setName(classItem.name);
    setTeacherId(classItem.teacher_id);
    setEditingClass(classItem);
  };

  return (
    <div>
      <h2>Classes</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teacher ID"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        />
        <button type="button" onClick={editingClass ? handleUpdateClass : handleCreateClass}>
          {editingClass ? 'Update' : 'Create'}
        </button>
      </form>
      <ul>
        {classes.map(classItem => (
          <li key={classItem._id}>
            {classItem.name} - {classItem.teacher_id}
            <button onClick={() => startEditing(classItem)}>Edit</button>
            <button onClick={() => handleDeleteClass(classItem._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Classes;