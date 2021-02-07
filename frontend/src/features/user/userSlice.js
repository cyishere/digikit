import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  entities: [],
  message: "",
  errors: {},
  loginUser: null,
};
const apiUrl = "http://localhost:3001/api";

// communicate with api
/**
 * @feature REGISTER
 */
export const addNewUser = createAsyncThunk("user/addNewUser", (userInfo) => {
  return fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log("error in reducer:", error);
      return error;
    });
});

/**
 * @feature LOGIN
 */
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (userInfo) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, userInfo);
      return response.data;
    } catch (error) {
      console.error("error in login action: ", error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLocalUserToState: (state, action) => {
      state.loginUser = action.payload;
    },
    logoutUser: (state, action) => {
      state.loginUser = null;
    },
  },
  extraReducers: {
    [addNewUser.fulfilled]: (state, action) => {
      if (!action.payload.type === "error") {
        state.message = action.payload.message;
      } else {
        state.entities = state.entities.concat(action.payload);
      }
    },
    [userLogin.fulfilled]: (state, action) => {
      if (action.payload.hasOwnProperty("errors")) {
        state.errors = action.payload.errors;
      } else {
        state.loginUser = action.payload;
      }
    },
    [userLogin.rejected]: (state, action) => {
      state.errors = { msg: action.payload };
    },
  },
});

export const { setLocalUserToState, logoutUser } = userSlice.actions;

export default userSlice.reducer;
