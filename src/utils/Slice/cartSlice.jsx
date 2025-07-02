import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.card.info.id === item.card.info.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const idToRemove = action.payload;
      const itemIndex = state.items.findIndex(
        (i) => i.card.info.id === idToRemove
      );
      if (itemIndex > -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    // RTK - either Mutate the exixsting state or return a new state
    clearCart: (state) => {
      state.items = [];
    //   console.log(current(state)) 
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
