import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle", // idle, loading, success, failed
  entities: [],
  error: null,
};

const baseUrl = "http://localhost:3001/api/car";

// communicate with API
export const getAllCars = createAsyncThunk("car/getAllCars", async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// the slice
const carSlice = createSlice({
  name: "car",
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

export default carSlice.reducer;

// selectors
export const selectAllCars = (state) => state.car.entities;

export const selectOneCar = (state, carId) =>
  state.car.entities.find((car) => car.id === carId);
