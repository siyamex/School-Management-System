import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>School Management System</h1>
      <nav>
        <ul>
          <li><Link to="/students">Students</Link></li>
          <li><Link to="/teachers">Teachers</Link></li>
          <li><Link to="/classes">Classes</Link></li>
          <li><Link to="/schedules">Schedules</Link></li>
          <li><Link to="/grades">Grades</Link></li>
          <li><Link to="/attendance">Attendance</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;