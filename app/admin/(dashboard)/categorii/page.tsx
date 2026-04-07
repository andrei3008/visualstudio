"use client";

import { useState, useEffect, useCallback } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  _count?: { posts: number };
}

const emptyForm = { name: "", slug: "", description: "", color: "#7c6bc4" };

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  function handleNameChange(name: string) {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: editingId ? prev.slug : slugify(name),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = editingId
        ? `/api/categories/${editingId}`
        : "/api/categories";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Eroare la salvare");
        return;
      }

      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
      await fetchCategories();
    } catch {
      setError("Eroare de conexiune");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setShowForm(true);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      color: cat.color || "#7c6bc4",
    });
    setError("");
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  }

  async function handleDelete(id: string) {
    if (!confirm("Sigur vrei să ștergi această categorie?")) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchCategories();
      }
    } catch {
      /* ignore */
    }
  }

  if (loading) {
    return <p>Se încarcă...</p>;
  }

  return (
    <div>
      <div className="admin-table-header">
        <h2 style={{ margin: 0 }}>Categorii</h2>
        {!showForm && (
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingId(null);
              setFormData(emptyForm);
              setError("");
              setShowForm(true);
            }}
          >
            + Adaugă categorie
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "var(--card-bg, #1e1e2e)",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "600px",
          }}
        >
          <h3 style={{ margin: 0 }}>
            {editingId ? "Editează categorie" : "Categorie nouă"}
          </h3>

          {error && (
            <div style={{ color: "#ef4444", fontSize: "0.9rem" }}>
              {error}
            </div>
          )}

          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Nume
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid var(--border, #333)",
                background: "var(--input-bg, #16162a)",
                color: "inherit",
              }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Slug
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              required
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid var(--border, #333)",
                background: "var(--input-bg, #16162a)",
                color: "inherit",
              }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Descriere
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid var(--border, #333)",
                background: "var(--input-bg, #16162a)",
                color: "inherit",
                resize: "vertical",
              }}
            />
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Culoare
            <input
              type="color"
              value={formData.color}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, color: e.target.value }))
              }
              style={{ width: 40, height: 32, border: "none", cursor: "pointer" }}
            />
          </label>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Se salvează..." : editingId ? "Salvează" : "Creează"}
            </button>
            <button className="btn" type="button" onClick={cancelForm}>
              Anulează
            </button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Slug</th>
              <th>Descriere</th>
              <th>Culoare</th>
              <th>Articole</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "2rem" }}>
                  Nu există categorii.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <strong>{cat.name}</strong>
                  </td>
                  <td>
                    <code>{cat.slug}</code>
                  </td>
                  <td>{cat.description || "—"}</td>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: cat.color || "#7c6bc4",
                        verticalAlign: "middle",
                      }}
                    />
                  </td>
                  <td>
                    <span className="badge">
                      {cat._count?.posts ?? 0}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => startEdit(cat)}
                      style={{ marginRight: "0.4rem" }}
                    >
                      Editează
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(cat.id)}
                    >
                      Șterge
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
