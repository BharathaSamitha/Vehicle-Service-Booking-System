import React from "react";

const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
  loading,
  editingId,
}) => {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/80 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                Active
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-slate-900/60">
                <td className="px-4 py-3 text-slate-100">{cat.name}</td>
                <td className="px-4 py-3 text-slate-300">
                  {cat.description || "-"}
                </td>
                <td className="px-4 py-3 text-slate-200">
                  {cat.isActive ? "Yes" : "No"}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    disabled={loading}
                    onClick={() => onEdit(cat)}
                    className="btn-outline text-xs"
                  >
                    Edit
                  </button>
                  <button
                    disabled={loading && editingId === cat._id}
                    onClick={() => onDelete(cat._id)}
                    className="btn-outline text-xs text-rose-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-sm text-slate-400"
                >
                  No categories yet. Create your first one above.
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-sm text-slate-400"
                >
                  Loading categories...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;

