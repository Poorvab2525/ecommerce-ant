import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

function AppContent() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('user');

  // Determine whether to show the Navbar
  const showNavbar = isLoggedIn && location.pathname !== '/login';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
