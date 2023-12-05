import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    userId: null,
    username: null,
  },
  reducers: {
    setAccessTokenState(state, action) {
      state.accessToken = action.payload;
    },
    setUserIdState(state, action) {
      state.userId = action.payload;
    },
    setUsernameState(state, action) {
      state.username = action.payload;
    },
    clearAuthState(state) {
      state.accessToken = null;
      state.userId = null;
      state.username = null;
      localStorage.clear();
    },
  },
});

export const {
  setAccessTokenState,
  clearAuthState,
  setUserIdState,
  setUsernameState,
} = authSlice.actions;
export default authSlice.reducer;
