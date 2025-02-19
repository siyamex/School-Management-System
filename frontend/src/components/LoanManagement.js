import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoanManagement({ match }) {
  const [loans, setLoans] = useState([]);
  const [book_id, setBookId] = useState('');
  const [student_id, setStudentId] = useState(match.params.id);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get(`/api/loanManagement/student/${match.params.id}`);
      setLoans(response.data);
    } catch (error) {
      console.error('There was an error fetching the loans!', error);
    }
  };

  const handleLoanBook = async () => {
    try {
      await axios.post('/api/loanManagement', { book_id, student_id });
      fetchLoans();
      setBookId('');
    } catch (error) {
      console.error('There was an error loaning the book!', error);
    }
  };

  const handleReturnBook = async (loanId) => {
    try {
      await axios.patch(`/api/loanManagement/${loanId}`, { return_date: new Date().toISOString() });
      fetchLoans();
    } catch (error) {
      console.error('There was an error returning the book!', error);
    }
  };

  return (
    <div>
      <h2>Loan Management</h2>
      <ul>
        {loans.map(loan => (
          <li key={loan._id}>
            {loan.book_id.title} - Loaned on: {new Date(loan.loan_date).toLocaleDateString()}
            {loan.return_date ? (
              <span> - Returned on: {new Date(loan.return_date).toLocaleDateString()}</span>
            ) : (
              <button onClick={() => handleReturnBook(loan._id)}>Return Book</button>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h3>Loan a Book</h3>
        <input
          type="text"
          placeholder="Book ID"
          value={book_id}
          onChange={(e) => setBookId(e.target.value)}
        />
        <button onClick={handleLoanBook}>Loan Book</button>
      </div>
    </div>
  );
}

export default LoanManagement;