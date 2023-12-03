import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    userId: null,
  },
  reducers: {
    setAccessTokenState(state, action) {
      state.accessToken = action.payload;
    },
    setUserIdState(state, action) {
      state.userId = action.payload;
    },
    clearAuthState(state) {
      state.accessToken = null;
      state.userId = null;
      localStorage.clear();
    },
  },
});

export const { setAccessTokenState, clearAuthState, setUserIdState } =
  authSlice.actions;
export default authSlice.reducer;
