import { Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";

// Explicitly have route paths so we can reference it in the navigation code
export const ROUTE_PATHS = {
  default: "*",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
};

export const routes = [
  { path: ROUTE_PATHS.default, element: <LoginPage /> },
  { path: ROUTE_PATHS.login, element: <LoginPage /> },
  { path: ROUTE_PATHS.register, element: <RegisterPage /> },
  { path: ROUTE_PATHS.dashboard, element: <Dashboard /> },
  { path: "*", element: <Navigate to="/" /> },
];
