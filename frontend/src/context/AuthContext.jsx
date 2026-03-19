import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/api.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("vsbs_token");
    const storedUser = localStorage.getItem("vsbs_admin");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedUser));
    }
    setAuthLoading(false);
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const res = await loginAdmin({ email, password });
      const { token: t, user } = res.data;
      setToken(t);
      setAdmin(user);
      localStorage.setItem("vsbs_token", t);
      localStorage.setItem("vsbs_admin", JSON.stringify(user));
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setAuthError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("vsbs_token");
    localStorage.removeItem("vsbs_admin");
    navigate("/admin/login");
  };

  return (
    <AuthContext.Provider
      value={{ admin, token, authLoading, authError, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

