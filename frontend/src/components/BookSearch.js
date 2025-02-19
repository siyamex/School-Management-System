import React, { useState } from 'react';
import axios from 'axios';

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/bookSearch?query=${query}`);
      setBooks(response.data);
    } catch (error) {
      console.error('There was an error searching for books!', error);
    }
  };

  return (
    <div>
      <h2>Book Search</h2>
      <input
        type="text"
        placeholder="Search by title, author, or genre"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} by {book.author} - Genre: {book.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;