import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";

interface AuthData {
  shortPassword: boolean;
}

const initialState: AuthData = {
  shortPassword: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShortPassword(state: AuthData, action) {
      state.shortPassword = action.payload;
    },
  },
});

export const { setShortPassword } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
