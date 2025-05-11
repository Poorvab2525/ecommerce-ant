import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.find(p => p.id === item.id);

      // If item exists, increment its quantity, otherwise add it to the cart
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      // Filter out the item by its id
      return state.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(p => p.id === id);

      if (item) {
        item.quantity = quantity; // Update quantity
      }
    },
    clearCart: () => {
      return []; // Clears all items in the cart
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
