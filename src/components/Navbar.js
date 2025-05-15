import React, { useState } from 'react';
import { Layout, Menu, Button, Badge, Drawer } from 'antd';
import { ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CartDrawer from './CartDrawer';

const { Header } = Layout;

const Navbar = () => {
  // Access cart state from Redux to show cart item count
  const cart = useSelector((state) => state.cart);

  // State for toggling cart drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // State for toggling mobile menu drawer
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation menu items
  const navItems = [
    { label: <NavLink to="/">Home</NavLink>, key: 'home' },
  ];

  return (
    <>
      {/* Sticky Header using Ant Design Layout.Header */}
      <Header
        className="navbar-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 20,
        }}
      >
        {/* Brand / Logo */}
        <div className="logo" style={{ fontWeight: 'bold', fontSize: 20 }}>
          <NavLink to="/" style={{ color: '#1890ff' }}>
            E-commerce
          </NavLink>
        </div>

        {/* Desktop navigation menu */}
        <div className="desktop-menu" style={{ flex: 1, marginLeft: 50 }}>
          <Menu items={navItems} />
        </div>

        {/* Action buttons: Logout, Cart, and Mobile Menu */}
        <div className="navbar-actions" style={{ display: 'flex', gap: 10 }}>
          {/* Logout button navigates to login page */}
          <NavLink to="/login">
            <Button type="text">Logout</Button>
          </NavLink>

          {/* Cart button with badge showing cart count */}
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

          {/* Hamburger menu icon for mobile view */}
          <Button
            className="menu-toggle"
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </Header>

      {/* Drawer for viewing cart items */}
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Drawer for mobile navigation menu */}
      <Drawer
        title="Menu"
        placement="right"
        closable
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
      >
        <Menu
          items={[
            ...navItems,
            { label: <NavLink to="/login">Login</NavLink>, key: 'login' },
          ]}
        />
      </Drawer>
    </>
  );
};

export default Navbar;
