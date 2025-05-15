// src/components/Navbar.js
import React, { useState } from 'react';
import { Layout, Menu, Button, Badge, Drawer } from 'antd';
import { ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CartDrawer from './CartDrawer';


const { Header } = Layout;

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: <NavLink to="/">Home</NavLink>, key: 'home' },
    { label: <NavLink to="/about">About</NavLink>, key: 'about' },
   
  ];

  return (
    <>
      <Header className="navbar-header" style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingInline: 20 }}>
        <div className="logo" style={{ fontWeight: 'bold', fontSize: 20 }}>
          <NavLink to="/" style={{ color: '#1890ff' }}>E-commerce</NavLink>
        </div>

        <div className="desktop-menu" style={{ flex: 1, marginLeft: 50 }}>
          <Menu mode="horizontal" items={navItems} />
        </div>

        <div className="navbar-actions" style={{ display: 'flex', gap: 10 }}>
          <NavLink to="/login">
            <Button type="text">Logout</Button>
          </NavLink>
          <Button
            type="primary"
            icon={
              <Badge count={cart.length} size="small">
                <ShoppingCartOutlined />
              </Badge>
            }
            onClick={() => setDrawerOpen(true)}
          >
            Cart
          </Button>
          <Button className="menu-toggle" type="text" icon={<MenuOutlined />} onClick={() => setMenuOpen(true)} />
        </div>
      </Header>

      {/* Drawer for Cart */}
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Drawer for small-screen menu */}
      <Drawer
        title="Menu"
        placement="right"
        closable
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
      >
        <Menu
          mode="vertical"
          items={[
            ...navItems,
            { label: <NavLink to="/login">Login</NavLink>, key: 'login' },
            { label: <NavLink to="/register">Register</NavLink>, key: 'register' },
          ]}
        />
      </Drawer>
    </>
  );
};

export default Navbar;
