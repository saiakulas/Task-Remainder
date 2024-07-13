import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Form, Input, Button, Space, message } from 'antd';
import { DeleteOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons';

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
      const response = await axios.post('http://localhost:3001/send-sms', {
        body: `Reminder: Time for task "${task.taskName}". Description: ${task.description}`,
        to: '', // Replace with the recipient's phone number
      });
      message.success('SMS sent successfully!');
    } catch (error) {
      console.error('Error sending SMS:', error);
      message.error('Failed to send SMS. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Title level={2} className="text-center mb-4">Task Manager</Title>

      <div className="mb-8">
        <Title level={3}>Add Task</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddTask}
          initialValues={{ duration: '1', time: '10:00 AM' }}
        >
          <Form.Item
            label="Task Name"
            name="taskName"
            rules={[{ required: true, message: 'Please enter task name' }]}
          >
            <Input placeholder="Enter Task Name" />
          </Form.Item>
          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: 'Please enter time' }]}
          >
            <Input placeholder="Enter Time" />
          </Form.Item>
          <Form.Item
            label="Duration (hours)"
            name="duration"
            rules={[{ required: true, message: 'Please enter duration' }]}
          >
            <Input placeholder="Enter Duration" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <Title level={3}>Task List</Title>
        <Space direction="vertical" size="large">
          {tasks.map(task => (
            <div key={task._id} className="border p-4 rounded-md shadow-md">
              <p className="font-semibold">{task.taskName}</p>
              <p>{task.time}, {task.duration} hours</p>
              <p>{task.description}</p>
              <Space>
                <Button type="primary" icon={<EditOutlined />} onClick={() => handleUpdateTask(task._id, task)} loading={loading}>
                  Update
                </Button>
                <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteTask(task._id)} loading={loading}>
                  Delete
                </Button>
                <Button type="default" icon={<MessageOutlined />} onClick={() => sendSMS(task)} loading={loading}>
                  Send SMS
                </Button>
              </Space>
            </div>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default TaskManager;
