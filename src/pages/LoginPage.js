import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hardcoded login credentials for simplicity
  const validEmail = 'admin@gmail.com';
  const validPassword = 'admin';  // You can replace with any password

  const onFinish = (values) => {
    setError(null);
    
    // Check if email and password match the hardcoded ones
    if (values.email === validEmail && values.password === validPassword) {
      // Simulate a successful login by storing user info in localStorage
      localStorage.setItem('user', JSON.stringify({ email: values.email }));
      
      // Redirect to the home page after successful login
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto' }}>
      <Card>
        <Title level={3}>Login</Title>
        {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
        <Form layout="vertical" onFinish={onFinish}>
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

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' }
            ]}
          >
            <Input.Password />
          </Form.Item>

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
