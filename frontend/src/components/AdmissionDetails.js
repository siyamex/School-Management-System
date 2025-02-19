import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdmissionDetails({ match }) {
  const [admissionDetails, setAdmissionDetails] = useState({ status: '', history: [] });

  useEffect(() => {
    fetchAdmissionDetails();
  }, []);

  const fetchAdmissionDetails = async () => {
    try {
      const response = await axios.get(`/api/admission/${match.params.id}`);
      setAdmissionDetails(response.data);
    } catch (error) {
      console.error('There was an error fetching the admission details!', error);
    }
  };

  return (
    <div>
      <h2>Admission Details</h2>
      <p>Status: {admissionDetails.status}</p>
      <h3>History</h3>
      <ul>
        {admissionDetails.history.map((record, index) => (
          <li key={index}>
            {new Date(record.date).toLocaleDateString()} - {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdmissionDetails;