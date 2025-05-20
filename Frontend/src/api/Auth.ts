import axios from "./axiosInstance";

export type RegisterFormData = {
  name: string;
  username: string;
  password: string;
};

export type LoginFormData = {
  username: string;
  password: string;
};

export const loginRequest = async (data: LoginFormData) => {
  const response = await axios.post(`/auth/login`, data);
  return response.data;
};

export const registerRequest = async (data: RegisterFormData) => {
  const response = await axios.post(`/auth/register`, data);
  return response.data;
};
