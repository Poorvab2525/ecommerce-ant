import { Drawer, List, InputNumber, Typography, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';

const CartDrawer = ({ open, onClose }) => {
  // Accessing cart items from Redux store
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculating the total price of items in the cart
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Dispatches an action to remove an item from the cart by its id
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id)); 
  };

  return (
    // Ant Design Drawer component for the cart sidebar
    <Drawer title="Your Cart" placement="right" onClose={onClose} open={open}>
      
      {/* List of cart items */}
      <List
        dataSource={cart}
        renderItem={(item) => (
          <List.Item
            actions={[
              // Input to change quantity of an item
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(val) => dispatch(updateQuantity({ id: item.id, quantity: val }))}
              />,
              // Button to remove item from cart
              <Button type="link" danger onClick={() => handleRemoveItem(item.id)}>
                 Remove
              </Button>,
            ]}
          >
            {/* Displaying item title and pricing info */}
            <List.Item.Meta title={item.title} description={`$${item.price} × ${item.quantity}`} />
          </List.Item>
        )}
      />

      {/* Displaying total cart amount */}
      <Typography.Title level={4}>Total: ${total}</Typography.Title>
    </Drawer>
  );
};

export default CartDrawer;
