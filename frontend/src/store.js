import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import userReducer from "./features/user/userSlice";
import categorySlice from "./features/category/categorySlice";
import cartReducer from "./features/checkout/cartSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    category: categorySlice,
    cart: cartReducer,
  },
});

export default store;
