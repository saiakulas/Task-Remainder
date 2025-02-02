import React from 'react';
import { Link } from 'react-router-dom';
import TaskManager from './TaskManager'; // Make sure the filename matches
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskManager from './TaskManager';
import { Card, Button } from 'antd';


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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ padding: '40px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '80%', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1890ff', fontWeight: 'bold', marginTop: '1.5rem' }}>Login Success Page</h1>
        <Button
          onClick={scrollToTop}
          style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 20px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '1rem', marginTop: '1rem', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
        >
          <Link to='/login' style={{ color: 'white', textDecoration: 'none' }}>Logout</Link>
        </Button>
        <div style={{ marginTop: '2rem', width: '100%' }}>
          <Card title="Task Manager" className="task-manager-card">
            <TaskManager />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
