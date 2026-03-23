import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { authService } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  district?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("seva_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      if (response.status === "success" && response.user) {
        setUser(response.user);
        localStorage.setItem("seva_user", JSON.stringify(response.user));
        toast.success(`Welcome back, ${response.user.name}!`);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error.message || "Failed to login. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.signup({ name, email, password });
      
      if (response.status === "success" && response.user) {
        setUser(response.user);
        localStorage.setItem("seva_user", JSON.stringify(response.user));
        toast.success(`Account created! Welcome, ${name}`);
      } else {
        throw new Error("Invalid response from server during registration");
      }
    } catch (error: any) {
       console.error("Signup failed:", error);
       toast.error(error.message || "Failed to create account. Email might already exist.");
       throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("seva_user");
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
