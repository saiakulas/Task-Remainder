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
   
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <Title level={2} className="text-gray-800 mb-4">Welcome to My App</Title>
        <Paragraph className="text-lg text-gray-700 mb-4">Click below to register:</Paragraph>
        <Link to="/register">
          <Button type="primary" className="rounded-lg">
            Register
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <Title level={3} className="text-gray-800 mb-4">Task Reminder</Title>
          <Paragraph className="text-lg text-gray-700 mb-4">Your important task reminder goes here.</Paragraph>
        </div>
      </div>
    </div>
  );
}

export default Index;
