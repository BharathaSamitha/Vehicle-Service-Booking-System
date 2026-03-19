import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BookingForm from "./pages/BookingForm.jsx";
import Login from "./pages/Login.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserRegister from "./pages/UserRegister.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ManageBookings from "./pages/ManageBookings.jsx";
import ServiceCategories from "./pages/ServiceCategories.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { admin, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="card px-6 py-4 text-sm text-slate-300">
          Checking session...
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <Navigate to="/admin/login" replace state={{ from: location }} />
    );
  }

  return children;
};

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 pb-6 pt-4 gap-4">
        <Sidebar />
        <main className="flex-1 space-y-4">{children}</main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Public booking form */}
      <Route path="/" element={<BookingForm />} />

      {/* Customer auth */}
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />

      {/* Admin auth */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin protected routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ManageBookings />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ServiceCategories />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

