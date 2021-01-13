import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./features/cars/carSlice";
import userReducer from "./features/users/userSlice";

const store = configureStore({
  reducer: {
    car: carReducer,
    user: userReducer,
  },
});

export default store;
