import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
// Create context for authentication
export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});

// Provider component that manages authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle user login by decoding the JWT token
  const handleLogin = (token) => {
    try {
      const decodedUser = jwtDecode(token); // Correct function usage
      localStorage.setItem("userId", decodedUser.sub);
      localStorage.setItem("userRole", decodedUser.roles);
      localStorage.setItem("token", token);
      setUser(decodedUser);
    } catch (error) {
      console.error("Error decoding token", error);
    }
  };

  // Function to handle user logout by clearing stored data
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
