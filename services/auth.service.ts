import api from "@/lib/axios";
import { User } from "@/types";

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await api.post<User>("/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: "admin" | "staff"
): Promise<User> => {
  const response = await api.post<User>("/auth/register", {
    name,
    email,
    password,
    role,
  });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};