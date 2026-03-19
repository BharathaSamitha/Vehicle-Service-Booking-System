import React, { useEffect, useState } from "react";
import { createBooking, fetchCategories } from "../api/api.jsx";

const BookingForm = () => {
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    vehicleNumber: "",
    serviceType: "",
    date: "",
    time: "",
  });
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        setCategories(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await createBooking(form);
      setSuccessMsg("Your booking has been submitted. We'll contact you soon.");
      setForm({
        customerName: "",
        customerEmail: "",
        vehicleNumber: "",
        serviceType: "",
        date: "",
        time: "",
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.message ||
          "Something went wrong while submitting your booking."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-start">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-semibold text-slate-50">
            Book your vehicle service
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Choose your preferred date and service type. Our team will confirm
            your slot shortly.
          </p>

          <div className="mt-6 card p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Customer name</label>
                <input
                  type="text"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={form.customerEmail}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Vehicle number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={form.vehicleNumber}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g. MH 01 AB 1234"
                  required
                />
              </div>

              <div>
                <label className="label">Service type</label>
                <select
                  name="serviceType"
                  value={form.serviceType}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select service type</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="label">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
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

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit booking"}
              </button>
            </form>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-50">
              Why book with us?
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>• Certified technicians &amp; genuine parts</li>
              <li>• Transparent pricing &amp; real-time updates</li>
              <li>• Comfortable lounge &amp; same-day delivery options</li>
            </ul>
          </div>

          <div className="mt-4 card p-6">
            <h3 className="text-sm font-semibold text-slate-200">
              Already an admin?
            </h3>
            <p className="mt-2 text-xs text-slate-400">
              Use the admin console to manage bookings, categories and monitor
              daily performance.
            </p>
            <a
              href="/admin/login"
              className="mt-4 inline-flex text-sm font-medium text-primary-300 hover:text-primary-200"
            >
              Go to admin login →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

