import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Documents() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('/api/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('There was an error fetching the documents!', error);
    }
  };

  return (
    <div>
      <h2>Documents</h2>
      <ul>
        {documents.map(document => (
          <li key={document._id}>
            {document.title} - {document.description}
            <br />
            <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Documents;