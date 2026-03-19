import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { admin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-xl font-bold text-white">
            VS
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100">
              Vehicle Service Booking
            </p>
            <p className="text-xs text-slate-400">
              Service center admin console
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {admin && (
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-400">Signed in as</span>
              <span className="text-sm font-medium text-slate-100">
                {admin.name}
              </span>
            </div>
          )}
          {admin && (
            <button onClick={logout} className="btn-outline text-xs">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

