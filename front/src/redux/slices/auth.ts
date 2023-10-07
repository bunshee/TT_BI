import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { email: "", name: "", role: "" },
    token: "",
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = authSlice.getInitialState().user;
      state.token = authSlice.getInitialState().token;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
