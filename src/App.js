import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import { Badge, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartDrawer from './components/CartDrawer'; // Adjust path if needed
import { useSelector } from 'react-redux';
import { useState } from 'react';

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

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  console.log("Navbar rendered, cart: ", cart);  // Debugging statement

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} icon={
        <Badge count={cart.length} offset={[0, 0]}>
          <ShoppingCartOutlined />
        </Badge>
      }>
        Cart
      </Button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default App;
