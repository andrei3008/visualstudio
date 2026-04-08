"use client";

import { useEffect, useState, useCallback } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrator",
  EDITOR: "Editor",
  VIEWER: "Vizualizator",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRole, setFormRole] = useState("VIEWER");

  const fetchUsers = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      const res = await fetch(`/api/users?${params}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openAddModal = () => {
    setEditingUser(null);
    setFormName("");
    setFormEmail("");
    setFormPassword("");
    setFormRole("VIEWER");
    setFormError("");
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormPassword("");
    setFormRole(user.role);
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    try {
      if (editingUser) {
        // Update
        const body: Record<string, string> = {
          name: formName,
          email: formEmail,
          role: formRole,
        };
        if (formPassword) body.password = formPassword;

        const res = await fetch(`/api/users/${editingUser.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const data = await res.json();
          setFormError(data.error || "Eroare la actualizare");
          return;
        }
      } else {
        // Create
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName,
            email: formEmail,
            password: formPassword,
            role: formRole,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          setFormError(data.error || "Eroare la creare");
          return;
        }
      }

      closeModal();
      fetchUsers();
    } catch {
      setFormError("Eroare de conexiune");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Eroare la ștergere");
      }
    } catch {
      alert("Eroare de conexiune");
    } finally {
      setConfirmDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <p>Se încarcă...</p>
      </div>
    );
  }

  return (
    <>
      <div className="section-header">
        <div className="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Caută utilizatori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-sm" onClick={openAddModal}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Adaugă utilizator
        </button>
      </div>

      {users.length === 0 ? (
        <div className="admin-table-wrap">
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".4">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p>Nu sunt utilizatori.</p>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nume</th>
                <th>Email</th>
                <th>Rol</th>
                <th className="hide-mobile">Data creare</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="cell-name">
                      <div className="user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="cell-email">{user.email}</td>
                  <td>
                    <span className={`badge badge-role-${user.role.toLowerCase()}`}>
                      {ROLE_LABELS[user.role] || user.role}
                    </span>
                  </td>
                  <td className="hide-mobile">
                    {new Date(user.createdAt).toLocaleDateString("ro-RO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-icon"
                        title="Editează"
                        onClick={() => openEditModal(user)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        </svg>
                      </button>
                      <button
                        className="btn btn-icon btn-icon-danger"
                        title="Șterge"
                        onClick={() => setConfirmDelete(user.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingUser ? "Editează utilizator" : "Adaugă utilizator"}</h3>
              <button className="btn btn-icon" onClick={closeModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="user-name">Nume *</label>
                <input
                  id="user-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  placeholder="Nume complet"
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-email">Email *</label>
                <input
                  id="user-email"
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                  placeholder="email@exemplu.ro"
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-password">
                  {editingUser ? "Parolă nouă (lăsăți gol pentru a păstra)" : "Parolă *"}
                </label>
                <input
                  id="user-password"
                  type="password"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  required={!editingUser}
                  minLength={8}
                  placeholder="Minim 8 caractere"
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-role">Rol</label>
                <select
                  id="user-role"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                >
                  <option value="ADMIN">Administrator</option>
                  <option value="EDITOR">Editor</option>
                  <option value="VIEWER">Vizualizator</option>
                </select>
              </div>

              {formError && <div className="form-error">{formError}</div>}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formLoading}
                >
                  {formLoading
                    ? "Se salvează..."
                    : editingUser
                    ? "Salvează modificările"
                    : "Creează utilizator"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirmă ștergerea</h3>
            </div>
            <p>Ești sigur că vrei să ștergi acest utilizator? Acțiunea este ireversibilă.</p>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setConfirmDelete(null)}
              >
                Anulează
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(confirmDelete)}
              >
                Șterge
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
