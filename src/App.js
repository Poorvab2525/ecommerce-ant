import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';

function App() {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('user');

  return (
    <Router>
      <Routes>
        {/* If the user is logged in, redirect to home page */}
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={<ProductPage />} />
        {/* If not logged in, show the login page */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
