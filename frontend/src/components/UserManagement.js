import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/userManagement');
      setUsers(response.data);
    } catch (error) {
      console.error('There was an error fetching the users!', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('/api/userManagement', { username, password, role });
      fetchUsers();
      setUsername('');
      setPassword('');
      setRole('student');
    } catch (error) {
      console.error('There was an error adding the user!', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/userManagement/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('There was an error deleting the user!', error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.role}
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add User</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
}

export default UserManagement;