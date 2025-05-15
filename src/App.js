import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
// import Footer from './components/Footer'; // Uncomment if needed

import './App.css';

function AppContent() {
  // Get current URL location
  const location = useLocation();

  // Check if user is logged in by looking for user info in localStorage
  const isLoggedIn = localStorage.getItem('user');

  // Show Navbar only if user is logged in and NOT on the login page
  const showNavbar = isLoggedIn && location.pathname !== '/login';

  return (
    <div className="content">
      {/* Conditionally render Navbar */}
      {showNavbar && <Navbar />}

      <Routes>
        {/* Protect the home page route - redirect to login if not logged in */}
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* Product details page is accessible without login */}
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Login page accessible for all */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div className="app-layout">
      <Router>
        <AppContent />
        {/* Add <Footer /> here if you want a footer */}
      </Router>
    </div>
  );
}

export default App;
