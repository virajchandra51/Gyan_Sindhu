import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find((i) => i.school_code === action.payload.school_code && i.class_code === action.payload.class_code);
      // console.log(current(state).cartItems);
      if (item) {
        // console.log("found");
        item.quantity += action.payload.selectedQuantity;
        item.totalPrice = (parseFloat(item.quantity)*parseFloat(item.oneQuantityPrice)).toFixed(2);
      } else {
        state.cartItems.push({ ...action.payload, quantity: action.payload.selectedQuantity });
      }
      // console.log(current(state));
      // console.log(action.payload);
    },
    updateCart: (state, action) => {
      // console.log(action.payload);
      const item = state.cartItems.find((i) => i.school_code === action.payload.school_code && i.class_code === action.payload.class_code);
      // console.log(item);
      if(item)
      {
        // console.log("found");
        item.quantity = action.payload.quantity;
        item.totalPrice = (parseFloat(item.quantity)*parseFloat(item.oneQuantityPrice)).toFixed(2);
      }
      // state.cartItems = state.cartItems.map((p) => {
      //   if (p.school_code !== action.payload.school_code && p.class_code !== action.payload.class_code) {
      //       p.totalPrice = p.oneQuantityPrice * action.payload.quantity;
      //       p.quantity = action.payload.quantity;
      //     return { ...p, [action.payload.key]: action.payload.quantity };
      //   }
      //   return p;
      // });
    },
    removeFromCart: (state, action) => {
      // console.log(action.payload)
      state.cartItems = state.cartItems.filter(
        (p) => p.school_code !== action.payload.school_code && p.class_code !== action.payload.class_code
      );
    },

    emptyCart: (state, action) => {
      state.cartItems = [];
    }

  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
