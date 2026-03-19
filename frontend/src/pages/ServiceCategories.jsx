import React, { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../api/api.jsx";
import CategoryTable from "../components/CategoryTable.jsx";

const ServiceCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadCategories = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetchCategories();
      setCategories(res.data || []);
    } catch (error) {
      console.error(error);
      setErr("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setForm({ name: "", description: "", isActive: true });
    setEditing(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMutating(true);
    setErr("");
    setSuccessMsg("");
    try {
      if (editing) {
        const res = await updateCategory(editing._id, form);
        setCategories((prev) =>
          prev.map((c) => (c._id === res.data._id ? res.data : c))
        );
        setSuccessMsg("Category updated.");
      } else {
        const res = await createCategory(form);
        setCategories((prev) => [res.data, ...prev]);
        setSuccessMsg("Category created.");
      }
      resetForm();
    } catch (error) {
      console.error(error);
      setErr("Failed to save category.");
    } finally {
      setMutating(false);
    }
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setForm({
      name: cat.name || "",
      description: cat.description || "",
      isActive: cat.isActive ?? true,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    setMutating(true);
    setErr("");
    setSuccessMsg("");
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      setSuccessMsg("Category deleted.");
    } catch (error) {
      console.error(error);
      setErr("Failed to delete category.");
    } finally {
      setMutating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">
          Service categories
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Configure the services customers can select during booking.
        </p>
      </div>

      <div className="card p-5">
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="label">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="label">Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <input
              id="isActive"
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="isActive" className="text-xs text-slate-300">
              Active
            </label>
          </div>
          <div className="flex items-center justify-end gap-2 md:col-span-2">
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="btn-outline text-xs"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="btn-primary text-xs"
              disabled={mutating}
            >
              {mutating
                ? "Saving..."
                : editing
                ? "Update category"
                : "Add category"}
            </button>
          </div>
        </form>
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

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading || mutating}
        editingId={editing?._id}
      />
    </div>
  );
};

export default ServiceCategories;

