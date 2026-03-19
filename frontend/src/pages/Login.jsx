import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login, authError } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSubmitting(true);
    try {
      await login(form.email, form.password);
    } catch {
      setLocalError("Failed to login. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md space-y-6 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-2xl font-bold text-white">
            VS
          </div>
          <h1 className="text-2xl font-semibold text-slate-50">Admin sign in</h1>
          <p className="mt-1 text-sm text-slate-400">
            Access the Vehicle Service Booking dashboard.
          </p>
        </div>

        <div className="card p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input"
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="input"
                autoComplete="current-password"
                required
              />
            </div>

            {(authError || localError) && (
              <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                {authError || localError}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500">
          Default admin (from backend seeding):<br />
          <span className="font-mono">admin@example.com / admin123</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

