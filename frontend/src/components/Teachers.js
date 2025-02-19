import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('There was an error fetching the teachers!', error);
    }
  };

  const handleAddTeacher = async () => {
    try {
      await axios.post('/api/teachers', { name, email });
      fetchTeachers();
      setName('');
      setEmail('');
    } catch (error) {
      console.error('There was an error adding the teacher!', error);
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Teachers</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => (
            <tr key={teacher._id}>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3 className="my-4">Add Teacher</h3>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleAddTeacher} block>
          Add Teacher
        </Button>
      </Form>
    </Container>
  );
}

export default Teachers;