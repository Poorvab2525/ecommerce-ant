import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

function App() {
  const isLoggedIn = localStorage.getItem('user');

  console.log("App rendered, logged in status: ", isLoggedIn);  // Debugging statement

  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
</Routes>

    </Router>
  );
}

export default App;
