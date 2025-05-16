import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();  // Hook to dispatch Redux actions

  // Select user-related state from the Redux store
  const { error, user, loading, isAuthenticated } = useSelector(state => state.user);

  // Called when form is submitted successfully
  const onFinish = (values) => {
    // Dispatch the loginUser async thunk with form values
    dispatch(loginUser(values));
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      
      {/* Show success alert if the user is authenticated */}
      {isAuthenticated && (
        <Alert
          message={`Welcome, ${user.username}!`}
          type="success"
          showIcon
          style={{ marginBottom: 10 }}
        />
      )}

      {/* Show error alert if login failed */}
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 10 }}
        />
      )}

      {/* Username input field with required validation */}
      <Form.Item 
        name="username" 
        label="Username" 
        rules={[{ required: true, message: 'Please enter your username' }]}
      >
        <Input />
      </Form.Item>

      {/* Password input field with required validation */}
      <Form.Item 
        name="password" 
        label="Password" 
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password />
      </Form.Item>

      {/* Submit button with loading spinner during login */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
