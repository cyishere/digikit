import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  entities: [],
  errors: {},
};
const apiUrl = "http://localhost:3001/api/user";

// communicate with api
export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (userInfo) => {
    try {
      const response = await axios.post(apiUrl, userInfo);
      return response.data;
    } catch (error) {
      console.log("error in register reducer: ", error.message);
      return error.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [addNewUser.fulfilled]: (state, action) => {
      if (action.payload.hasOwnProperty("errors")) {
        state.errors = action.payload.errors;
      } else {
        state.entities = state.entities.concat(action.payload);
      }
    },
    [addNewUser.rejected]: (state, action) => {
      state.errors = { msg: action.payload };
    },
  },
});

export default userSlice.reducer;
