import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../utils/config";
import fetchStates from "../utils/fetchStates";

const initialState = {
  status: "idle",
  entities: [],
  currentProduct: {},
  message: null,
  filterCategory: null,
  filterBrand: null,
};

/**
 * ACTIONS
 */
// Get All
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

// Update One
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  ({ productInfo, token }) => {
    return fetch(`${BACKEND.API_ADDRESS}/product/${productInfo.id}`, {
      method: "PUT",
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

// Delete One
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  ({ productId, token }) => {
    return fetch(`${BACKEND.API_ADDRESS}/product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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
    [getAllProducts.pending]: (state, action) => {
      state.status = fetchStates.fetching;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        state.entities = action.payload.products;
        state.status = fetchStates.success;
      } else {
        state.message = action.payload.message;
        state.status = fetchStates.error;
      }
    },
    [getAllProducts.rejected]: (state, action) => {
      state.message = action.payload;
      state.status = fetchStates.error;
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
    // Add One
    [addNewProduct.fulfilled]: (state, action) => {
      if (action.payload.type === "error") {
        state.message = action.payload.message;
      } else {
        state.entities = state.entities.concat(action.payload.product);
        state.message = action.payload.message;
      }
    },
    [addNewProduct.rejected]: (state, action) => {
      state.message = action.payload;
    },
    // Update One
    [updateProduct.fulfilled]: (state, action) => {
      if (action.payload.type === "error") {
        state.message = action.payload.message;
      } else {
        const { product, message } = action.payload;

        state.entities.forEach((entity) => {
          if (entity.id === product.id) {
            entity.title = product.title;
            entity.price = product.price;
            entity.brand = product.brand;
            entity.category = product.category;
            entity.description = product.description;
            entity.countInStock = product.countInStock;
            entity.images = product.images;
          }
        });

        state.message = message;
      }
    },
    [updateProduct.rejected]: (state, action) => {
      state.message = action.payload;
    },
    // Delete One
    [deleteProduct.fulfilled]: (state, action) => {
      if (action.payload.type === fetchStates.error) {
        state.message = action.payload.message;
      } else {
        const { productId, message } = action.payload;
        state.entities = state.entities.filter(
          (entity) => entity.id !== productId
        );

        state.message = message;
      }
    },
    [deleteProduct.rejected]: (state, action) => {
      state.message = action.payload;
    },
  },
});

export default productSlice.reducer;

/**
 * ===== Reusable Selector Functions =====
 */
export const selectAllProducts = (state) => state.product.entities;

export const selectProductById = (state, productId) =>
  state.product.entities.find((product) => product.id === productId);

export const selectProductsByCategory = (state, categoryId) =>
  state.product.entities.filter((product) => product.category === categoryId);

export const selectProductsByBrand = (state, brand) =>
  state.product.entities.filter((product) => product.brand === brand);
