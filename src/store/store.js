import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { globalSlice } from "./globalSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  global: globalSlice.reducer,
  cart: cartSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);

// export default configureStore({
//   reducer: {
//     global: globalSlice.reducer,
//     cart: cartSlice.reducer,
//   },
// });
