import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { AppState } from "./store";

interface AuthData {
  nonExistUser: boolean;
  shortPassword: boolean;
  name: string;
  password: string;
}

const initialState: AuthData = {
  nonExistUser: true,
  shortPassword: false,
  name: "testuser",
  password: "testpassword123",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNonExistUser(state: AuthData, action) {
      state.nonExistUser = action.payload;
    },
    setShortPassword(state: AuthData, action) {
      state.shortPassword = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setNonExistUser, setShortPassword } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
