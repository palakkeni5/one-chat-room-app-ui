import authenticatedClient, { client } from "./client";

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
