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
      username: localStorage.getItem("username"),
    },
  },
});

store.subscribe(() => {
  const { accessToken, userId, username } = store.getState().auth;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("userId", userId);
  localStorage.setItem("username", username);
});

export default store;
