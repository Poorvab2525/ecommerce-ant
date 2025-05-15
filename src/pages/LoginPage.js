import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
  const [error, setError] = useState(null); // State to store error message
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Hardcoded credentials for demonstration purposes
  const validEmail = 'admin@gmail.com';
  const validPassword = 'admin';  // Change as needed for testing

  // Handler for form submission
  const onFinish = (values) => {
    setError(null); // Clear previous errors

    // Validate credentials
    if (values.email === validEmail && values.password === validPassword) {
      // Save user info to localStorage to simulate authentication
      localStorage.setItem('user', JSON.stringify({ email: values.email }));

      // Redirect to home page after successful login
      navigate('/');
    } else {
      // Set error message if credentials are invalid
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto' }}>
      <Card>
        {/* Page Title */}
        <Title level={3}>Login</Title>

        {/* Show error alert if login fails */}
        {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

        {/* Ant Design Form component with validation */}
        <Form layout="vertical" onFinish={onFinish}>
          {/* Email input with validation rules */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Password input with validation */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Submit button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
