import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Title, Paragraph } = Typography;

const Index = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-gradient">
      <div className="bg-white p-5 rounded shadow text-center">
        <Title level={2} className="text-dark mb-4">Task Remainder</Title>
        <Paragraph className="text-muted mb-4">always get alerted through sms</Paragraph>
        
        {/* Container for buttons */}
        <div className="d-flex justify-content-center">
          <Link to="/register" className="mx-2">
            <Button type="primary" className="rounded" style={{ backgroundColor: '#911825', borderColor: '#911825' }}>
              Register
            </Button>
          </Link>
          <Link to="/login" className="mx-2">
            <Button type="primary" className="rounded" style={{ backgroundColor: '#911825', borderColor: '#911825' }}>
              Login
            </Button>
          </Link>
        </div>
      </div>
   
    </div>
  );
}

export default Index;
