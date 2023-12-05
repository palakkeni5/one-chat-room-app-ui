import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  validateStatus: (_) => {
    return true;
  },
});

export const authenticatedClient = axios.create({
  baseURL: BASE_URL,
  validateStatus: (_) => {
    return true;
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: localStorage.getItem("accessToken"),
  },
});

export default authenticatedClient;
