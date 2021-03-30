import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice";
import userReducer from "../slices/userSlice";
import categorySlice from "../slices/categorySlice";
import cartReducer from "../slices/cartSlice";
import orderReducer from "../slices/orderSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categorySlice,
    order: orderReducer,
    product: productReducer,
    user: userReducer,
  },
});

export default store;
