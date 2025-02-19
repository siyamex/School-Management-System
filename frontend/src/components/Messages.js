import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Messages({ match }) {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/recipient/${match.params.recipient}`);
      setMessages(response.data);
    } catch (error) {
      console.error('There was an error fetching the messages!', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      await axios.post('/api/messages', {
        sender,
        recipient,
        subject,
        body
      });
      fetchMessages();
      setSender('');
      setRecipient('');
      setSubject('');
      setBody('');
    } catch (error) {
      console.error('There was an error sending the message!', error);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Sender"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Message"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="button" onClick={handleSendMessage}>
          Send
        </button>
      </form>
      <ul>
        {messages.map(message => (
          <li key={message._id}>
            From: {message.sender} - Subject: {message.subject}
            <p>{message.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;