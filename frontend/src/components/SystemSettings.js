import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SystemSettings() {
  const [settings, setSettings] = useState({
    schoolName: '',
    address: '',
    contactEmail: '',
    contactPhone: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/systemSettings');
      setSettings(response.data || {});
    } catch (error) {
      console.error('There was an error fetching the system settings!', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSaveSettings = async () => {
    try {
      await axios.patch('/api/systemSettings', settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('There was an error saving the system settings!', error);
    }
  };

  return (
    <div>
      <h2>System Settings</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="schoolName"
          placeholder="School Name"
          value={settings.schoolName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={settings.address}
          onChange={handleChange}
        />
        <input
          type="email"
          name="contactEmail"
          placeholder="Contact Email"
          value={settings.contactEmail}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contactPhone"
          placeholder="Contact Phone"
          value={settings.contactPhone}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSaveSettings}>
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default SystemSettings;