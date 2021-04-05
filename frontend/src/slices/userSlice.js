import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../utils/config";

const initialState = {
  entities: [],
  message: null,
  errors: {},
  loginUser: {
    userId: null,
    token: null,
    authAdmin: false,
  },
  info: {},
};

// communicate with api
/**
 * @feature REGISTER
 */
export const addNewUser = createAsyncThunk("user/addNewUser", (userInfo) => {
  return fetch(`${BACKEND.API_ADDRESS}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      console.log("error in reducer:", error);
      return error;
    });
});

/**
 * @feature LOGIN
 */
export const userLogin = createAsyncThunk("user/userLogin", (userInfo) => {
  return fetch(`${BACKEND.API_ADDRESS}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      console.log("error in reducer:", error);
      return error;
    });
});

// Get User Info
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  ({ userId, token }) => {
    return fetch(`${BACKEND.API_ADDRESS}/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.log("error in reducer:", error);
        return error;
      });
  }
);

// Update User Info
export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  ({ userId, token, userInfo }) => {
    return fetch(`${BACKEND.API_ADDRESS}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.log("error in reducer:", error);
        return error;
      });
  }
);

/**
 * @feature The Default Slice
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // TODO what's this for??
    setLocalUserToState: (state, action) => {
      state.loginUser = action.payload;
    },
    logoutUser: (state, action) => {
      state.loginUser = {
        userId: null,
        token: null,
      };
      state.info = {};
      localStorage.removeItem("digiUser");
    },
  },
  extraReducers: {
    // Register
    [addNewUser.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        state.entities = state.entities.concat(action.payload.user);
      } else {
        state.message = action.payload.message;
      }
    },
    [addNewUser.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
    // Login
    [userLogin.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        state.loginUser = action.payload;
      } else {
        state.message = action.payload.message;
      }
    },
    [userLogin.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
    // Get user info
    [getUserInfo.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        state.info = action.payload.user;

        if (state.loginUser.userId === null) {
          state.loginUser = JSON.parse(localStorage.getItem("digiUser"));
        }
      } else {
        state.message = action.payload.message;
      }
    },
    [getUserInfo.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        state.info = action.payload.user;
      }
      state.message = action.payload.message;
    },
    [updateUserInfo.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
  },
});

export const { setLocalUserToState, logoutUser } = userSlice.actions;

export default userSlice.reducer;
