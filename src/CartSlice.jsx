import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // payload is expected to be a product object
      const product = action.payload;
      // try to find an existing item by name (or you can use an id if available)
      const existing = state.items.find((it) => it.name === product.name);
      if (existing) {
        // if already in cart, increment quantity
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        // add new item with quantity = 1
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      // payload expected to be product name or an identifier
      const name = action.payload;
      state.items = state.items.filter((it) => it.name !== name);
    },
    updateQuantity: (state, action) => {
      // payload expected to be { name, quantity }
      const { name, quantity } = action.payload;
      const item = state.items.find((it) => it.name === name);
      if (item) {
        if (quantity > 0) item.quantity = quantity;
        else {
          // remove if quantity set to 0 or less
          state.items = state.items.filter((it) => it.name !== name);
        }
      }
    },
  },
});


export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
