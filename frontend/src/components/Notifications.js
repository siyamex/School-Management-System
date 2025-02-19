import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notifications({ match }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`/api/notifications/user/${match.params.id}`);
      setNotifications(response.data);
    } catch (error) {
      console.error('There was an error fetching the notifications!', error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.patch(`/api/notifications/${notificationId}`);
      fetchNotifications();
    } catch (error) {
      console.error('There was an error marking the notification as read!', error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id}>
            {notification.message} - {new Date(notification.date).toLocaleDateString()}
            {!notification.read && (
              <button onClick={() => handleMarkAsRead(notification._id)}>Mark as Read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;