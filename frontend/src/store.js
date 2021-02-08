import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import userReducer from "./features/user/userSlice";
import categorySlice from "./features/category/categorySlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    category: categorySlice,
  },
});

export default store;
