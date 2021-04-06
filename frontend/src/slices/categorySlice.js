import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../utils/config";
import fetchStates from "../utils/fetchStates";

const initialState = {
  status: fetchStates.idle,
  entities: [],
  message: null,
};

/**
 * ACTIONS
 */
// Get All
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  () => {
    return fetch(`${BACKEND.API_ADDRESS}/category`)
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.log("error in reducer:", error);
        return error;
      });
  }
);

// Get One
export const getOneCategory = createAsyncThunk(
  "category/getOneCategory",
  (categoryId) => {
    return fetch(`${BACKEND.API_ADDRESS}/category/${categoryId}`)
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.log("error in reducer:", error);
        return error.message;
      });
  }
);

// Add One
export const addNewCategory = createAsyncThunk(
  "category/addNewCategory",
  ({ cateInfo, token }) => {
    return fetch(`${BACKEND.API_ADDRESS}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(cateInfo),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.log("error in reducer:", error);
        return error.message;
      });
  }
);

// Update One
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  ({ cateInfo, token }) => {
    return fetch(`${BACKEND.API_ADDRESS}/category/${cateInfo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(cateInfo),
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
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  ({ categoryId, token }) => {
    return fetch(`${BACKEND.API_ADDRESS}/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
 * Main Slice
 */
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateWithProductRemoved: (state, action) => {
      const { productId, categoryId } = action.payload;

      state.entities.forEach((entity) => {
        if (entity.id === categoryId) {
          entity.products = entity.products.filter(
            (product) => product !== productId
          );
        }
      });
    },
    updateWithProductAdded: (state, action) => {
      const { productId, categoryId } = action.payload;
      state.entities.forEach((entity) => {
        if (entity.id === categoryId) {
          entity.products = entity.products.concat(productId);
        }
      });
    },
  },
  extraReducers: {
    [getAllCategories.pending]: (state, action) => {
      state.status = fetchStates.fetching;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      if (action.payload.type !== fetchStates.error) {
        state.entities = action.payload.categories;
        state.status = fetchStates.success;
      } else {
        state.message = action.payload.message;
        state.status = fetchStates.error;
      }
    },
    [getAllCategories.rejected]: (state, action) => {
      state.status = fetchStates.error;
      state.message = action.payload;
    },
    // Add One
    [addNewCategory.fulfilled]: (state, action) => {
      if (action.payload.type === fetchStates.error) {
        state.message = action.payload.message;
      } else {
        state.entities = state.entities.concat(action.payload.category);
        state.message = action.payload.message;
      }
    },
    [addNewCategory.rejected]: (state, action) => {
      state.message = action.payload;
    },
    // Update One Category
    [updateCategory.fulfilled]: (state, action) => {
      if (action.payload.type === fetchStates.error) {
        state.message = action.payload.message;
      } else {
        const { category, message } = action.payload;
        state.entities.forEach((entity) => {
          if (entity.id === category.id) {
            entity.title = category.title;
          }
        });
        state.message = message;
      }
    },
    [updateCategory.rejected]: (state, action) => {
      state.message = action.payload;
    },
    // Delete
    [deleteCategory.fulfilled]: (state, action) => {
      if (action.payload.type === fetchStates.error) {
        state.message = action.payload.message;
      } else {
        const { categoryId } = action.payload;
        state.entities = state.entities.filter(
          (entity) => entity.id !== categoryId
        );
      }
    },
    [deleteCategory.rejected]: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  updateWithProductRemoved,
  updateWithProductAdded,
} = categorySlice.actions;

export default categorySlice.reducer;

/**
 * ===== Reusable Selector Functions =====
 */
export const selectAllCategories = (state) => state.category.entities;

export const selectCategoryById = (state, categoryId) =>
  state.category.entities.find((category) => category.id === categoryId);
