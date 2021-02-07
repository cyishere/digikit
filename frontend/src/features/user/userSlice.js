import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
export const userLogin = createAsyncThunk("user/userLogin", (userInfo) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => {
      console.log("response in reducer:", response);
      return response.json();
    })
    .then((json) => {
      console.log("json in reducer:", json);
      return json;
    })
    .catch((error) => {
      console.log("error in reducer:", error);
      return error;
    });
});

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
      if (action.payload.type !== "error") {
        state.entities = state.entities.concat(action.payload);
      }
    },
    [userLogin.fulfilled]: (state, action) => {
      if (action.payload.type !== "error") {
        console.log("HEY!");
        state.loginUser = action.payload;
      }
    },
  },
});

export const { setLocalUserToState, logoutUser } = userSlice.actions;

export default userSlice.reducer;