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
  ({ orderInfo, token }) => {
    return fetch(`${BACKEND.API_ADDRESS}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(orderInfo),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.log("error in reducer:", error);
        return error.message;
      });
  }
);

// Get Orders
export const getOrders = createAsyncThunk("order/getOrders", (token) => {
  return fetch(`${BACKEND.API_ADDRESS}/order`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.log("error in reducer:", error);
      return error.message;
    });
});

// Delete One
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  ({ orderId, token }) => {
    return fetch(`${BACKEND.API_ADDRESS}/order/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.log("error in reducer:", error);
        return error.message;
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
    [getOrders.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        state.entities = action.payload.orders;
      } else {
        state.message = action.payload.message;
      }
    },
    [getOrders.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
    [deleteOrder.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        const { id } = action.payload;

        state.entities = state.entities.filter((order) => order.id !== id);
      } else {
        state.message = action.payload.message;
      }
    },
    [deleteOrder.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
  },
});

export default orderSlice.reducer;

/**
 * ===== Reusable Selector Functions =====
 */
export const selectAllOrders = (state) => state.order.entities;
export const selectOrderById = (state, orderId) =>
  state.order.entities.find((order) => order.id === orderId);
