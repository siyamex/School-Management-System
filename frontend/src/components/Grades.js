import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Grades() {
  const [grades, setGrades] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [editingGrade, setEditingGrade] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await axios.get('/api/grades');
      setGrades(response.data);
    } catch (error) {
      console.error('There was an error fetching the grades!', error);
    }
  };

  const handleCreateGrade = async () => {
    try {
      await axios.post('/api/grades', { student_id: studentId, subject, grade });
      fetchGrades();
      setStudentId('');
      setSubject('');
      setGrade('');
    } catch (error) {
      console.error('There was an error creating the grade!', error);
    }
  };

  const handleUpdateGrade = async () => {
    try {
      await axios.patch(`/api/grades/${editingGrade._id}`, { student_id: studentId, subject, grade });
      fetchGrades();
      setStudentId('');
      setSubject('');
      setGrade('');
      setEditingGrade(null);
    } catch (error) {
      console.error('There was an error updating the grade!', error);
    }
  };

  const handleDeleteGrade = async (id) => {
    try {
      await axios.delete(`/api/grades/${id}`);
      fetchGrades();
    } catch (error) {
      console.error('There was an error deleting the grade!', error);
    }
  };

  const startEditing = (grade) => {
    setStudentId(grade.student_id);
    setSubject(grade.subject);
    setGrade(grade.grade);
    setEditingGrade(grade);
  };

  return (
    <div>
      <h2>Grades</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button type="button" onClick={editingGrade ? handleUpdateGrade : handleCreateGrade}>
          {editingGrade ? 'Update' : 'Create'}
        </button>
      </form>
      <ul>
        {grades.map(grade => (
          <li key={grade._id}>
            {grade.student_id} - {grade.subject} - {grade.grade}
            <button onClick={() => startEditing(grade)}>Edit</button>
            <button onClick={() => handleDeleteGrade(grade._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Grades;