import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./features/car/carSlice";
import userReducer from "./features/user/userSlice";
import categorySlice from "./features/category/categorySlice";

const store = configureStore({
  reducer: {
    car: carReducer,
    user: userReducer,
    category: categorySlice,
  },
});

export default store;
