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
import Footer from './components/Footer';

import './App.css';

function AppContent() {
const location = useLocation();
const isLoggedIn = localStorage.getItem('user');

const showNavbar = isLoggedIn && location.pathname !== '/login';

return (
<div className="content">
{showNavbar && <Navbar />}
<Routes>
<Route
path="/"
element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
/>
<Route path="/product/:id" element={<ProductPage />} />
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
<Footer />
</Router>
</div>
);
}

export default App;