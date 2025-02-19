import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OnlineClasses({ match }) {
  const [onlineClasses, setOnlineClasses] = useState([]);

  useEffect(() => {
    fetchOnlineClasses();
  }, []);

  const fetchOnlineClasses = async () => {
    try {
      const response = await axios.get(`/api/onlineClasses/class/${match.params.id}`);
      setOnlineClasses(response.data);
    } catch (error) {
      console.error('There was an error fetching the online classes!', error);
    }
  };

  return (
    <div>
      <h2>Online Classes</h2>
      <ul>
        {onlineClasses.map(onlineClass => (
          <li key={onlineClass._id}>
            {onlineClass.subject} - {new Date(onlineClass.date).toLocaleDateString()} - {onlineClass.time} - Platform: {onlineClass.platform}
            <br />
            <a href={onlineClass.link} target="_blank" rel="noopener noreferrer">Join Class</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineClasses;