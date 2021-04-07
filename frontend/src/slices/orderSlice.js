import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../utils/config";
import fetchStates from "../utils/fetchStates";

const initialState = {
  entities: [],
  message: null,
  status: "idle",
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

// Update Status
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  ({ orderInfo, token }) => {
    return fetch(`${BACKEND.API_ADDRESS}/order/${orderInfo.id}`, {
      method: "PUT",
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
    // Create One
    [createOrder.fulfilled]: (state, action) => {
      if (action.payload.type !== fetchStates.error) {
        state.entities = state.entities.concat(action.payload.orders);
      } else {
        state.message = action.payload.message;
      }
    },
    [createOrder.rejected]: (state, action) => {
      state.message = action.payload;
    },
    // Get Orders
    [getOrders.fulfilled]: (state, action) => {
      if (action.payload.type !== fetchStates.error) {
        state.entities = action.payload.orders;
      } else {
        state.message = action.payload.message;
      }
    },
    [getOrders.rejected]: (state, action) => {
      state.message = action.payload;
    },
    // Update Status
    [updateOrderStatus.fulfilled]: (state, action) => {
      if (action.payload.type === fetchStates.error) {
        state.message = action.payload.message;
      } else {
        const { orderId, newStatus, message } = action.payload;

        state.entities.forEach((order) => {
          if (order.id === orderId) {
            order.status = newStatus;
          }
        });

        state.message = message;
      }
    },
    [updateOrderStatus.rejected]: (state, action) => {
      state.message = action.payload;
    },
    // Delete One
    [deleteOrder.fulfilled]: (state, action) => {
      if (action.payload.type !== fetchStates.error) {
        const { id } = action.payload;

        state.entities = state.entities.filter((order) => order.id !== id);
      } else {
        state.message = action.payload.message;
      }
    },
    [deleteOrder.rejected]: (state, action) => {
      state.message = action.payload;
    },
  },
});

export default orderSlice.reducer;

/**
 * ===== Reusable Selector Functions =====
 */
export const selectAllOrders = (state) => state.order.entities;

export const selectOrdersByUser = (state, userId) =>
  state.order.entities.filter((order) => order.customer === userId);

export const selectOrderById = (state, orderId) =>
  state.order.entities.find((order) => order.id === orderId);
