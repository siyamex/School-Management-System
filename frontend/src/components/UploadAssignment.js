import React, { useState } from 'react';
import axios from 'axios';

function UploadAssignment({ match }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleUpload = async () => {
    try {
      await axios.post('/api/documents', {
        title,
        description,
        fileUrl,
        type: 'Assignment',
        student_id: match.params.id
      });
      setTitle('');
      setDescription('');
      setFileUrl('');
    } catch (error) {
      console.error('There was an error uploading the assignment!', error);
    }
  };

  return (
    <div>
      <h2>Upload Assignment</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="File URL"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadAssignment;