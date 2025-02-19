import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeacherProfile({ match }) {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [academicRecords, setAcademicRecords] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/teacherProfile/${match.params.id}`);
      setProfile(response.data);
      setName(response.data.name);
      setAge(response.data.age);
      setEmail(response.data.contactInfo.email);
      setPhone(response.data.contactInfo.phone);
      setAcademicRecords(response.data.academicRecords);
    } catch (error) {
      console.error('There was an error fetching the profile!', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.patch(`/api/teacherProfile/${match.params.id}`, {
        name,
        age,
        contactInfo: { email, phone },
        academicRecords
      });
      fetchProfile();
    } catch (error) {
      console.error('There was an error updating the profile!', error);
    }
  };

  return (
    <div>
      <h2>Student Profile</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Academic Records"
          value={academicRecords.join('\n')}
          onChange={(e) => setAcademicRecords(e.target.value.split('\n'))}
        />
        <button type="button" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default TeacherProfile;