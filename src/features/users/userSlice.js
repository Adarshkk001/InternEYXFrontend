import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  authToken: "",
};
export const userLogin = createAsyncThunk(
  "userasync/UserLogin",
  async (User) => {
    return await axios
      .post("https://interneyx.onrender.com/users/login", {
        email: User.email.email,
        password: User.password.password,
      })
      .then((response) => {
        return response.data;
      });
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.name = "";
      state.email = "";
      state.authToken = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.authToken = action.payload.authToken;
    });
    builder.addCase(userLogin.rejected, (state, payload) => {
      state.name = "";
      state.email = "";
      state.authToken = "";
    });
  },
});

export default userSlice.reducer;
export const { userLogout } = userSlice.actions;
