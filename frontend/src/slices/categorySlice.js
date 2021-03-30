import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../utils/config";
import fetchStates from "../utils/fetchStates";

const initialState = {
  status: "idle",
  entities: [],
  message: null,
};

/**
 * ACTIONS
 */
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
        return error;
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

/**
 * Main Slice
 */
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCategories.pending]: (state, action) => {
      state.status = fetchStates.fetching;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        state.entities = action.payload.categories;
        state.status = fetchStates.success;
      } else {
        state.message = action.payload.message;
        state.status = fetchStates.error;
      }
    },
    [getAllCategories.rejected]: (state, action) => {
      state.status = fetchStates.error;
      state.message = action.payload.message;
    },
    [addNewCategory.fulfilled]: (state, action) => {
      if (action.payload.type === "error") {
        state.message = action.payload.message;
      } else {
        state.entities = state.entities.concat(action.payload.category);
        state.message = action.payload.message;
      }
    },
  },
});

export default categorySlice.reducer;
