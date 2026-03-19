import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("vsbs_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginAdmin = (payload) => api.post("/auth/login", payload);
export const registerUser = (payload) => api.post("/auth/register", payload);
export const loginUser = (payload) => api.post("/auth/user/login", payload);

// Customer booking
export const createBooking = (payload) => api.post("/bookings", payload);

// Admin bookings
export const fetchBookings = () => api.get("/bookings");
export const updateBookingStatus = (id, status) =>
  api.patch(`/bookings/${id}/status`, { status });

// Categories
export const fetchCategories = () => api.get("/categories");
export const createCategory = (payload) => api.post("/categories", payload);
export const updateCategory = (id, payload) =>
  api.put(`/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Dashboard
export const fetchDashboardStats = () => api.get("/dashboard/stats");

export default api;

