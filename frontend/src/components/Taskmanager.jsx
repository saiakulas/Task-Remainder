import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, message, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Title } = Typography;

const TaskManager = () => {
  const [form] = Form.useForm();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/tasks/add', values);
      const newTask = response.data;
      setTasks([...tasks, newTask]);
      form.resetFields();
      message.success('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      message.error('Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!taskId) {
      console.error('Task ID is undefined.');
      return;
    }
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3001/tasks/${taskId}`);
      fetchTasks();
      message.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      message.error('Failed to delete task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskId, values) => {
    if (!taskId) {
      console.error('Task ID is undefined.');
      return;
    }
    try {
      setLoading(true);
      await axios.post(`http://localhost:3001/tasks/update/${taskId}`, values);
      fetchTasks();
      message.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      message.error('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendSMS = async (task) => {
    try {
      await axios.post('http://localhost:3001/send-sms', {
        body: `Reminder: Time for task "${task.taskName}". Description: ${task.description}`,
        to: '+917995979829', // Replace with the recipient's phone number
      });
      message.success('SMS sent successfully!');
    } catch (error) {
      console.error('Error sending SMS:', error);
      message.error('Failed to send SMS. Please try again.');
    }
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#f4f4f2' }}>
      <Row className="mb-4">
        <Col className="text-center">
          <Title level={2} style={{ color: '#911825' }}>Task Manager</Title>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12} className="mx-auto">
          <Title level={3} style={{ color: '#ffffff' }}>Add Task</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddTask}
            initialValues={{ duration: '1', time: '10:00 AM' }}
            style={{ maxWidth: '75%', margin: 'auto' }}
          >
            <Form.Item
              label="Task Name"
              name="taskName"
              rules={[{ required: true, message: 'Please enter task name' }]}
            >
              <Input placeholder="Enter Task Name" style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item
              label="Time"
              name="time"
              rules={[{ required: true, message: 'Please enter time' }]}
            >
              <Input placeholder="Enter Time" style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item
              label="Duration (hours)"
              name="duration"
              rules={[{ required: true, message: 'Please enter duration' }]}
            >
              <Input placeholder="Enter Duration" style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <Input.TextArea rows={3} placeholder="Enter Description" style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                block 
                style={{ 
                  backgroundColor: '#f7c25a', 
                  borderColor: '#f7c25a', 
                  width:'150px',
                  color: '#0f111d' 
                }}
              >
                Add Task
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row className="flex-grow-1">
        <Col>
          <Title level={3} style={{ color: '#ffffff' }}>Task List</Title>
          <Row xs={1} md={2} lg={3} className="g-4">
            {tasks.map(task => (
              <Col key={task._id}>
                <Card style={{ backgroundColor: '#911825', color: '#f4f4f2' }}>
                  <Card.Body>
                    <Card.Title>{task.taskName}</Card.Title>
                    <Card.Text>
                      <strong>Time:</strong> {task.time}<br />
                      <strong>Duration:</strong> {task.duration} hours<br />
                      <strong>Description:</strong> {task.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                          console.log('Updating task with ID:', task._id);
                          handleUpdateTask(task._id, task);
                        }}
                        loading={loading}
                        style={{ backgroundColor: '#f4f4f2', borderColor: '#f4f4f2', color: '#911825' }}
                      >
                        Update
                      </Button>
                      <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          console.log('Deleting task with ID:', task._id);
                          handleDeleteTask(task._id);
                        }}
                        loading={loading}
                        style={{ backgroundColor: '#911825', borderColor: '#911825', color: '#ffffff' }}
                      >
                        Delete
                      </Button>
                      <Button
                        type="default"
                        icon={<MessageOutlined />}
                        onClick={() => {
                          console.log('Sending SMS for task with ID:', task._id);
                          sendSMS(task);
                        }}
                        loading={loading}
                        style={{ backgroundColor: '#ffffff', borderColor: '#ffffff', color: '#911825' }}
                      >
                        Send SMS
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskManager;
