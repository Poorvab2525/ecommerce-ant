import React from 'react';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();  // Hook to programmatically navigate routes
  const dispatch = useDispatch();  // Hook to dispatch Redux actions

  // Access user authentication state from the Redux store
  const { loading, error, user } = useSelector(state => state.user);

  // Function called when form is submitted successfully
  const onFinish = (values) => {
    // Dispatch loginUser async thunk with form values (username and password)
    dispatch(loginUser(values))
      .unwrap()  // unwrap returns a promise that rejects on failure
      .then(() => {
        // On successful login, navigate to home page
        navigate('/');
      })
      .catch(() => {
        // Login errors handled by Redux state (no action needed here)
      });
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto' }}>
      <Card>
        {/* Page Title */}
        <Title level={3}>Login</Title>

        {/* Show error alert if login failed */}
        {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

        {/* Show welcome message if user logged in */}
        {user && <Alert type="success" message={`Welcome, ${user.name || user.username || 'User'}!`} showIcon style={{ marginBottom: 16 }} />}

        {/* Login form */}
        <Form layout="vertical" onFinish={onFinish}>
          {/* Username input field with validation */}
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please enter your username' }
            ]}
          >
            <Input />
          </Form.Item>

          {/* Password input field with validation */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Submit button: disables and shows loading spinner during login */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
