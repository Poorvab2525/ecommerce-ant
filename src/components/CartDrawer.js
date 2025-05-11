import { Drawer, List, InputNumber, Typography, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';

const CartDrawer = ({ open, onClose }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id)); // Remove item from cart
  };


  return (
    <Drawer title="Your Cart" placement="right" onClose={onClose} open={open}>
      <List
        dataSource={cart}
        renderItem={(item) => (
          <List.Item
            actions={[
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(val) => dispatch(updateQuantity({ id: item.id, quantity: val }))}
              />,
              <Button type="link" danger onClick={() => handleRemoveItem(item.id)}>
                 Remove
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.title} description={`$${item.price} × ${item.quantity}`} />
          </List.Item>
        )}
      />
      <Typography.Title level={4}>Total: ${total}</Typography.Title>
    </Drawer>
  );
};

export default CartDrawer;
