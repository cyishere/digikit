import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle", // idle, loading, success, failed
  entities: [],
  error: null,
};

const baseUrl = "http://localhost:3001/api/cars";

// communicate with API
export const getAllCars = createAsyncThunk("cars/getAllCars", async () => {
  const response = await axios.get(baseUrl);
  return response.data;
});

// the slice
const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCars.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllCars.fulfilled]: (state, action) => {
      state.status = "success";
      state.entities = state.entities.concat(action.payload);
    },
    [getAllCars.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default carsSlice.reducer;

// selectors
export const selectAllCars = (state) => state.cars.entities;
