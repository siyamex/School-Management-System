import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClassMaterials({ match }) {
  const [classMaterials, setClassMaterials] = useState([]);

  useEffect(() => {
    fetchClassMaterials();
  }, []);

  const fetchClassMaterials = async () => {
    try {
      const response = await axios.get(`/api/classMaterials/class/${match.params.id}`);
      setClassMaterials(response.data);
    } catch (error) {
      console.error('There was an error fetching the class materials!', error);
    }
  };

  return (
    <div>
      <h2>Class Materials</h2>
      <ul>
        {classMaterials.map(material => (
          <li key={material._id}>
            {material.title} - {material.description}
            <br />
            <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassMaterials;