import React from "react";

const statusColors = {
  pending: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  approved: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  rejected: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  completed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
};

const BookingTable = ({ bookings, onChangeStatus, loading }) => {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/80 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                Vehicle #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                Service Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-slate-900/60">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-100">
                    {b.customerName}
                  </p>
                  <p className="text-xs text-slate-400">{b.customerEmail}</p>
                </td>
                <td className="px-4 py-3 text-slate-200">
                  {b.vehicleNumber || "-"}
                </td>
                <td className="px-4 py-3 text-slate-200">
                  {b.serviceType || b.serviceCategory?.name || "Not specified"}
                </td>
                <td className="px-4 py-3 text-slate-200">
                  {b.date
                    ? new Date(b.date).toLocaleDateString()
                    : b.preferredDate
                    ? new Date(b.preferredDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-3 text-slate-200">
                  {b.time || "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                      statusColors[b.status] || statusColors.pending
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      disabled={loading}
                      onClick={() => onChangeStatus(b._id, "approved")}
                      className="btn-outline text-xs"
                    >
                      Approve
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => onChangeStatus(b._id, "rejected")}
                      className="btn-outline text-xs"
                    >
                      Reject
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => onChangeStatus(b._id, "completed")}
                      className="btn-outline text-xs"
                    >
                      Complete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {bookings.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-sm text-slate-400"
                >
                  No bookings found.
                </td>
              </tr>
            )}

            {loading && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-sm text-slate-400"
                >
                  Loading bookings...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;

