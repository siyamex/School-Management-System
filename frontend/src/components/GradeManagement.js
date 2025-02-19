import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GradeManagement({ match }) {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [newGrade, setNewGrade] = useState({ student_id: '', subject: '', grade: '', examDate: '' });

  useEffect(() => {
    fetchStudentsAndGrades();
  }, []);

  const fetchStudentsAndGrades = async () => {
    try {
      const studentsResponse = await axios.get(`/api/students/class/${match.params.id}`);
      setStudents(studentsResponse.data);

      const gradesResponse = await axios.get(`/api/gradeManagement/class/${match.params.id}`);
      const gradesData = gradesResponse.data.reduce((acc, record) => {
        acc[record.student_id] = acc[record.student_id] || [];
        acc[record.student_id].push(record);
        return acc;
      }, {});
      setGrades(gradesData);
    } catch (error) {
      console.error('There was an error fetching the students and grades!', error);
    }
  };

  const handleGradeChange = (e) => {
    const { name, value } = e.target;
    setNewGrade({ ...newGrade, [name]: value });
  };

  const handleAddOrUpdateGrade = async () => {
    try {
      await axios.post('/api/gradeManagement', newGrade);
      fetchStudentsAndGrades();
      setNewGrade({ student_id: '', subject: '', grade: '', examDate: '' });
    } catch (error) {
      console.error('There was an error adding or updating the grade!', error);
    }
  };

  return (
    <div>
      <h2>Grade Management</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name}
            <ul>
              {(grades[student._id] || []).map(grade => (
                <li key={grade._id}>
                  {grade.subject} - {grade.grade} - {new Date(grade.examDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add or Update Grade</h3>
        <select name="student_id" value={newGrade.student_id} onChange={handleGradeChange}>
          <option value="">Select Student</option>
          {students.map(student => (
            <option key={student._id} value={student._id}>{student.name}</option>
          ))}
        </select>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newGrade.subject}
          onChange={handleGradeChange}
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={newGrade.grade}
          onChange={handleGradeChange}
        />
        <input
          type="date"
          name="examDate"
          value={newGrade.examDate}
          onChange={handleGradeChange}
        />
        <button onClick={handleAddOrUpdateGrade}>Save Grade</button>
      </div>
    </div>
  );
}

export default GradeManagement;