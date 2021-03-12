import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../utils/config";

const initialState = {
  entities: [],
  message: null,
};

/**
 * @feature Actions
 */

// Create
export const createOrder = createAsyncThunk(
  "order/createOrder",
  ({ products, value, token }) => {
    return fetch(`${BACKEND.API_ADDRESS}/order`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ products, value }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.log("error in reducer:", error);
        return error;
      });
  }
);

/**
 * @feature Main Slice
 */
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [createOrder.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        state.entities = state.entities.concat(action.payload.orders);
      } else {
        state.message = action.payload.message;
      }
    },
    [createOrder.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
  },
});

export default orderSlice.reducer;
