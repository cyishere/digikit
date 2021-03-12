import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import userReducer from "./slices/userSlice";
import categorySlice from "./features/category/categorySlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

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
