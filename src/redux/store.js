import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      accessToken: localStorage.getItem("accessToken"),
      userId: localStorage.getItem("userId"),
    },
  },
});

store.subscribe(() => {
  const { accessToken, userId } = store.getState().auth;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("userId", userId);
});

export default store;
