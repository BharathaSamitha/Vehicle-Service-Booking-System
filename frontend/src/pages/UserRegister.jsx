import React, { useState } from "react";
import { registerUser } from "../api/api.jsx";

const UserRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const res = await registerUser(form);
      localStorage.setItem("vsbs_user_token", res.data.token);
      localStorage.setItem("vsbs_user", JSON.stringify(res.data.user));
      setSuccessMsg("Account created successfully. You can now book a service.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md space-y-6 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-2xl font-bold text-white">
            VS
          </div>
          <h1 className="text-2xl font-semibold text-slate-50">
            Create customer account
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Register to manage your bookings in the future.
          </p>
        </div>

        <div className="card p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input"
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
                required
              />
            </div>

            {successMsg && (
              <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
                {successMsg}
              </p>
            )}
            {errorMsg && (
              <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                {errorMsg}
              </p>
            )}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>

        <div className="text-center text-xs text-slate-500">
          <a className="text-primary-300 hover:text-primary-200" href="/user/login">
            Already have an account? Sign in →
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;

