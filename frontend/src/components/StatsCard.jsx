import React from "react";

const StatCard = ({ label, value, trend }) => {
  return (
    <div className="card flex h-full flex-col justify-between gap-2 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="text-2xl font-semibold text-slate-50">{value}</p>
      {trend && (
        <p className="text-xs text-emerald-400">
          {trend} <span className="text-slate-500">vs last period</span>
        </p>
      )}
    </div>
  );
};

export default StatCard;

