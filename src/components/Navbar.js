// src/components/Navbar.js
import React, { useState } from 'react';
import { Badge, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#f0f2f5' }}>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={
          <Badge count={cart.length} offset={[0, 0]}>
            <ShoppingCartOutlined />
          </Badge>
        }
      >
        Cart
      </Button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Navbar;
