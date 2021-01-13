import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./features/car/carSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    car: carReducer,
    user: userReducer,
  },
});

export default store;
