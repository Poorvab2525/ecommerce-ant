import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();

  // Extracting authentication state from Redux
  const { error, user, loading } = useSelector(state => state.user);

  // Called when form is successfully submitted
  const onFinish = (values) => {
    // Dispatch loginUser thunk with email and password
    dispatch(loginUser({ email: values.email, password: values.password }));
  };

  return (
    // Ant Design vertical form layout
    <Form onFinish={onFinish} layout="vertical">

      {/* Show success alert if user is logged in */}
      {user && <Alert message={`Welcome, ${user.name}!`} type="success" showIcon />}

      {/* Show error alert if login failed */}
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 10 }} />}
      
      {/* Email input field with validation */}
      <Form.Item 
        name="email" 
        label="Email" 
        rules={[{ required: true, message: 'Please enter your email' }]}
      >
        <Input />
      </Form.Item>

      {/* Password input field with validation */}
      <Form.Item 
        name="password" 
        label="Password" 
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password />
      </Form.Item>

      {/* Submit button with loading state */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
