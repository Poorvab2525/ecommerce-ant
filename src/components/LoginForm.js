import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error, user, loading } = useSelector(state => state.user); // Fixed user info

  const onFinish = (values) => {
    // Passing both email and password for login
    dispatch(loginUser({ email: values.email, password: values.password }));
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      {user && <Alert message={`Welcome, ${user.name}!`} type="success" showIcon />}
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 10 }} />}
      
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
