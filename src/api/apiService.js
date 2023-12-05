import { client, authenticatedClient } from "./client";

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

export const getChatHistory = async () => {
  const response = await authenticatedClient.get("/chats");
  if (response.status === 200) {
    console.log(response);
    if (response.data.code === 0) {
      throw new Error("Network error");
    }
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error("Network error");
  }
};
