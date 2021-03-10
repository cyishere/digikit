import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../../utils/config";

const initialState = {
  entities: [],
  currentProduct: {},
  message: null,
};

/**
 * ACTIONS
 */
export const getAllProducts = createAsyncThunk("product/getAllProducts", () => {
  return fetch(`${BACKEND.API_ADDRESS}/product`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      console.log("error in reducer:", error);
      return error.message;
    });
});

// Get One
export const getProductById = createAsyncThunk(
  "product/getProductById",
  (productId) => {
    return fetch(`${BACKEND.API_ADDRESS}/product/${productId}`)
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.log("error in reducer:", error);
        return error.message;
      });
  }
);

// Add One
export const addNewProduct = createAsyncThunk(
  "product/addNewProduct",
  ({ productInfo, token }) => {
    return fetch(`${BACKEND.API_ADDRESS}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(productInfo),
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.log("error in reducer:", error);
        return error.message;
      });
  }
);

/**
 * Main Slice
 */
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllProducts.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        state.entities = action.payload.products;
      } else {
        state.message = action.payload.message;
      }
    },
    [getAllProducts.rejected]: (state, action) => {
      state.message = action.payload;
    },
    [getProductById.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        state.currentProduct = action.payload.product;
      } else {
        state.message = action.payload.message;
      }
    },
    [getProductById.rejected]: (state, action) => {
      state.message = action.payload;
    },
    [addNewProduct.fulfilled]: (state, action) => {
      if (action.payload.type === "error") {
        state.message = action.payload.message;
      } else {
        state.entities = state.entities.concat(action.payload.product);
        state.message = action.payload.message;
      }
    },
  },
});

export default productSlice.reducer;
