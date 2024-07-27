import React from 'react';
import { Link } from 'react-router-dom';
import TaskManager from './TaskManager'; // Make sure the filename matches
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100 p-0">
      <Row className="flex-grow-1 justify-content-center align-items-center">
        <Col xs={12} className="text-center p-4">
          <h1 className="display-4" style={{ color: '#1890ff', fontWeight: 'bold' }}>
            Digital Task Reminder
          </h1>
          <Button
            onClick={scrollToTop}
            variant="danger"
            className="mt-3"
            style={{ borderRadius: '4px' }}
          >
            <Link to='/login' style={{ color: 'white', textDecoration: 'none' }}>Logout</Link>
          </Button>
          <div className="mt-4">
            <Card className="p-4 shadow-sm">
              <Card.Title className="text-center">Task Manager</Card.Title>
              <Card.Body>
                <TaskManager />
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
