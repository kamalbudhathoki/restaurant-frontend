import { User } from "@/types";

// Helper functions to read/write auth data in localStorage

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setAuthData = (user: User): void => {
  localStorage.setItem("token", user.token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuthData = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};