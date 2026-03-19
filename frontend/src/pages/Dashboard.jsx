import React, { useEffect, useState } from "react";
import { fetchDashboardStats } from "../api/api.jsx";
import StatCard from "../components/StatsCard.jsx";
import BookingTable from "../components/BookingTable.jsx";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchDashboardStats();
        setStats(res.data);
      } catch (error) {
        console.error(error);
        setErr("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading && !stats) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="card h-24 animate-pulse bg-slate-900/40"
            ></div>
          ))}
        </div>
        <div className="card h-64 animate-pulse bg-slate-900/40"></div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="card p-6 text-sm text-rose-300 bg-rose-500/10">
        {err}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          High-level overview of today's workload and recent activity.
        </p>
      </div>

      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total bookings" value={stats?.totalBookings ?? 0} />
        <StatCard label="Pending" value={stats?.pending ?? 0} />
        <StatCard label="Approved" value={stats?.approved ?? 0} />
        <StatCard label="Completed" value={stats?.completed ?? 0} />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">
              Recent bookings
            </h2>
            <span className="text-xs text-slate-500">
              Last {stats?.recentBookings?.length || 0} records
            </span>
          </div>
          <BookingTable
            bookings={stats?.recentBookings || []}
            onChangeStatus={() => {}}
            loading={false}
          />
        </div>

        <div className="card h-fit p-5">
          <h2 className="text-sm font-semibold text-slate-200">
            Service categories
          </h2>
          <p className="mt-2 text-3xl font-semibold text-slate-50">
            {stats?.categoriesCount ?? 0}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Active service categories currently available for customers while
            booking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

