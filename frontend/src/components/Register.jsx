import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Register = () => {
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:3001/register', values);
            if (response.data === "Already registered") {
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            } else {
                alert("Registered successfully! Please Login to proceed.");
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('Registration failed! Please try again.');
        }
    };

    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f2' }}>
            <div style={{ width: 400, backgroundColor: '#ffffff', padding: 24, borderRadius: 8, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 16, color: '#911825' }}>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom, #00c6ff, #0072ff)' }}>
            <div style={{ width: 400, background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 16, color: '#1890ff' }}>
                    Register
                </Title>
                {errorMessage && <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: 16 }} />}
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input placeholder="Enter Name" style={{ borderColor: '#911825' }} />
                        <Input placeholder="Enter Name" />
                    </Form.Item>
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email address!' },
                            { type: 'email', message: 'Please enter a valid email address!' },
                        ]}
                    >
                        <Input placeholder="Enter Email" style={{ borderColor: '#911825' }} />
                        <Input placeholder="Enter Email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password placeholder="Enter Password" style={{ borderColor: '#911825' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full" style={{ backgroundColor: '#911825', borderColor: '#911825' }}>
                        <Input.Password placeholder="Enter Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <p style={{ textAlign: 'center', marginTop: 8, color: '#911825' }}>
                    Already have an account? <Link to='/login' style={{ color: '#911825' }}>Login</Link>
                <p style={{ textAlign: 'center', marginTop: 8, color: '#888' }}>
                    Already have an account? <Link to='/login' style={{ color: '#1890ff' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
