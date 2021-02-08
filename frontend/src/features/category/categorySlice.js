import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../../utils/config";

const initialState = {
  entities: [],
  message: null,
};

/**
 * ACTIONS
 */
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  (token) => {
    return fetch(`${BACKEND.API_ADDRESS}/category`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
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

/**
 * Main Slice
 */
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCategories.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        state.entities = action.payload.categories;
      } else {
        state.message = action.payload.message;
      }
    },
  },
});

export default categorySlice.reducer;
