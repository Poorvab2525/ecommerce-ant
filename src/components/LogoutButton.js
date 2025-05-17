// src/components/LogoutButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout as userLogout } from '../redux/userSlice';
import { logout as cartLogout } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch logout actions to clear user and cart slices
    dispatch(userLogout());
    dispatch(cartLogout());

    // Clear any persisted storage if needed
    localStorage.removeItem('user');
    localStorage.removeItem('persist:root'); // clear redux-persist cache

    // Redirect to login page after logout
    navigate('/login');
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
