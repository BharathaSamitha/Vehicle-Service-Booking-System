import React, { useEffect, useState } from "react";
import { fetchBookings, updateBookingStatus } from "../api/api.jsx";
import BookingTable from "../components/BookingTable.jsx";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadBookings = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetchBookings();
      setBookings(res.data || []);
    } catch (error) {
      console.error(error);
      setErr("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleChangeStatus = async (id, status) => {
    setMutating(true);
    setSuccessMsg("");
    setErr("");
    try {
      const res = await updateBookingStatus(id, status);
      const updated = res.data;
      setBookings((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
      setSuccessMsg(`Booking marked as ${status}.`);
    } catch (error) {
      console.error(error);
      setErr("Failed to update booking status.");
    } finally {
      setMutating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">
          Manage bookings
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Review incoming service requests and update their status.
        </p>
      </div>

      {successMsg && (
        <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
          {successMsg}
        </p>
      )}
      {err && (
        <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
          {err}
        </p>
      )}

      <BookingTable
        bookings={bookings}
        onChangeStatus={handleChangeStatus}
        loading={loading || mutating}
      />
    </div>
  );
};

export default ManageBookings;

