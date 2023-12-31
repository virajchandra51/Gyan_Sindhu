import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { globalSlice } from "./globalSlice";

export default configureStore({
  reducer: {
    global: globalSlice.reducer,
    cart: cartSlice.reducer,
  },
});
