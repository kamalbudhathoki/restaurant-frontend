"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types";
import { getUser, setAuthData, clearAuthData } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
}

// Create context with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, check if a user is already saved in localStorage
  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setAuthData(userData); // save to localStorage
    setUser(userData);     // save to React state
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin: user?.role === "admin",
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — makes it easy to use auth in any component
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}