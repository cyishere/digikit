import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prev: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addPrevLocation: (state, action) => {
      state.prev = action.payload;
    },
  },
});

export const { addPrevLocation } = locationSlice.actions;

export default locationSlice.reducer;
