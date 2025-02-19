import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdmissionManagement() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const response = await axios.get('/api/admissionManagement');
      setStudents(response.data);
    } catch (error) {
      console.error('There was an error fetching the admissions!', error);
    }
  };

  const handleUpdateStatus = async (studentId, status) => {
    try {
      await axios.patch(`/api/admissionManagement/${studentId}`, { status });
      fetchAdmissions();
    } catch (error) {
      console.error('There was an error updating the admission status!', error);
    }
  };

  return (
    <div>
      <h2>Admission Management</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name} - {student.admissionDetails.status}
            <button onClick={() => handleUpdateStatus(student._id, 'Approved')}>Approve</button>
            <button onClick={() => handleUpdateStatus(student._id, 'Rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdmissionManagement;