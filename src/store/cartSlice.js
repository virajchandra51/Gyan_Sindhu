import { createSlice, current } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find((i) => i.school_code === action.payload.school_code && i.class_code === action.payload.class_code);
      console.log(current(state).cartItems);
      if (item) {
        console.log("found");
        item.quantity += action.payload.selectedQuantity;
        item.totalPrice = (parseFloat(item.quantity)*parseFloat(item.oneQuantityPrice)).toFixed(2);
      } else {
        state.cartItems.push({ ...action.payload, quantity: action.payload.selectedQuantity });
      }
      console.log(current(state));
      console.log(action.payload);
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((p) => {
        if (p.id === action.payload.id) {
          if (action.payload.key === "quantity") {
            p.attributes.price = p.oneQuantityPrice * action.payload.val;
          }
          return { ...p, [action.payload.key]: action.payload.val };
        }
        return p;
      });
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (p) => p.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
