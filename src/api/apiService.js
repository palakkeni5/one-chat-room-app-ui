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

export const registerUser = async (fullName, username, password) => {
  const requestBody = {
    fullName,
    username,
    password,
  };
  const response = await client.post("/auth/signup", requestBody);
  if (response.status === 200) {
    return { success: true, message: response.data.msg };
  } else {
    throw new Error(response.data.msg);
  }
};

export const loginUser = async (username, password) => {
  const requestBody = {
    username: username,
    password: password,
  };
  const response = await client.post("/auth/login", requestBody);
  if (response.status === 200) {
    return {
      success: true,
      message: response.data.msg,
      data: response.data,
    };
  } else {
    throw new Error(response.data.msg);
  }
};

export const getChatHistory = async (accessToken) => {
  const authenticatedClient = axios.create({
    baseURL: BASE_URL,
    validateStatus: (_) => {
      return true;
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: accessToken,
    },
  });
  const response = await authenticatedClient.get("/chats");
  if (response.status === 200) {
    console.log(response);
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error("Network error");
  }
};
