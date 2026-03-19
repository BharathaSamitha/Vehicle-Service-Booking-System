import React from "react";
import { NavLink } from "react-router-dom";
import {
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

const navItemClass =
  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition";

const Sidebar = () => {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-800 bg-slate-950/80 pt-6 md:block">
      <nav className="space-y-1 px-3">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${navItemClass} ${
              isActive
                ? "bg-primary-600/10 text-primary-300"
                : "text-slate-300 hover:bg-slate-800/70"
            }`
          }
        >
          <Squares2X2Icon className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `${navItemClass} ${
              isActive
                ? "bg-primary-600/10 text-primary-300"
                : "text-slate-300 hover:bg-slate-800/70"
            }`
          }
        >
          <ClipboardDocumentListIcon className="h-5 w-5" />
          <span>Bookings</span>
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `${navItemClass} ${
              isActive
                ? "bg-primary-600/10 text-primary-300"
                : "text-slate-300 hover:bg-slate-800/70"
            }`
          }
        >
          <SquaresPlusIcon className="h-5 w-5" />
          <span>Categories</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

