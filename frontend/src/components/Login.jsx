import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert } from 'antd';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const { Title } = Typography;

const Login = () => {
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:3001/login', values);
            if (response.data === 'Success') {
                alert('Login successful!');
                navigate('/home');
            } else {
                setErrorMessage('Incorrect password! Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Login failed! Please try again.');
        }
    };

    return (

        <div 
            className="d-flex justify-content-center align-items-center min-vh-100" 
            style={{ backgroundColor: '#f4f4f2' }}
        >
            <div 
                className="p-4 rounded shadow-lg" 
                style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '400px' }}
            >
                <Title 
                    level={2} 
                    className="mb-4 text-center" 
                    style={{ color: '#911825' }}
                >
                    Login
                </Title>
                {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
                <Form 
                    form={form} 
                    onFinish={handleSubmit} 
                    layout="vertical"
                >

        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600">
            <div className="bg-white p-6 rounded shadow-lg w-80">
                <Title level={2} className="mb-4 text-primary font-bold">
                    Login
                </Title>
                {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email address!' },
                            { type: 'email', message: 'Please enter a valid email address!' },
                        ]}
                    >

                        <Input 
                            placeholder="Enter Email" 
                            style={{ borderColor: '#911825' }} 
                        />

                        <Input placeholder="Enter Email" />

                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >

                        <Input.Password 
                            placeholder="Enter Password" 
                            style={{ borderColor: '#911825' }} 
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            style={{ 
                                backgroundColor: '#911825', 
                                borderColor: '#911825', 
                                height: '40px',
                                width: '100%'
                            }} 
                        >

                        <Input.Password placeholder="Enter Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full" block>

                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <p 
                    className="mt-3 text-center" 
                    style={{ color: '#911825' }}
                >
                    Don't have an account? <Link to="/register" style={{ color: '#007bff' }}>Register</Link>

                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
