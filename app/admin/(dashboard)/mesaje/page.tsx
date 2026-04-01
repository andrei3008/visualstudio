"use client";

import { useState, useEffect, useCallback, Fragment } from "react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  projectType: string | null;
  budget: string | null;
  message: string;
  source: string | null;
  isRead: boolean;
  createdAt: string;
}

type Filter = "all" | "new" | "read";

export default function AdminMesajePage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter === "new") params.set("isRead", "false");
    if (filter === "read") params.set("isRead", "true");
    if (search) params.set("search", search);

    const res = await fetch(`/api/contact-messages?${params}`);
    if (res.ok) {
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : data.messages ?? []);
    }
    setLoading(false);
  }, [filter, search]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const toggleRead = async (id: string, currentRead: boolean) => {
    await fetch(`/api/contact-messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: !currentRead }),
    });
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Sigur doriți să ștergeți acest mesaj?")) return;
    await fetch(`/api/contact-messages/${id}`, { method: "DELETE" });
    if (expandedId === id) setExpandedId(null);
    fetchMessages();
  };

  return (
    <>
      <div className="section-header">
        <h2>Mesaje</h2>
      </div>

      <div className="admin-table-header" style={{ marginBottom: 20 }}>
        <div className="btn-group">
          <button
            className={`btn btn-sm ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Toate
          </button>
          <button
            className={`btn btn-sm ${filter === "new" ? "active" : ""}`}
            onClick={() => setFilter("new")}
          >
            Noi
          </button>
          <button
            className={`btn btn-sm ${filter === "read" ? "active" : ""}`}
            onClick={() => setFilter("read")}
          >
            Citite
          </button>
        </div>
        <div className="search-wrap">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Caută după nume sau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Se încarcă...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".4">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <p>Nu sunt mesaje.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nume</th>
                <th>Email</th>
                <th className="hide-mobile">Tip proiect</th>
                <th className="hide-mobile">Buget</th>
                <th className="hide-mobile">Dată</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <Fragment key={msg.id}>
                  <tr
                    className={msg.isRead ? "" : "unread"}
                    onClick={() =>
                      setExpandedId(expandedId === msg.id ? null : msg.id)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <td><div className="cell-name">{msg.name}</div></td>
                    <td className="cell-email">{msg.email}</td>
                    <td className="hide-mobile">{msg.projectType ?? "—"}</td>
                    <td className="hide-mobile">{msg.budget ?? "—"}</td>
                    <td className="hide-mobile">
                      {new Date(msg.createdAt).toLocaleDateString("ro-RO", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                    <td>
                      {msg.isRead ? (
                        <span className="badge badge-read">Citit</span>
                      ) : (
                        <span className="badge badge-new">Nou</span>
                      )}
                    </td>
                  </tr>
                  {expandedId === msg.id && (
                    <tr>
                      <td colSpan={6} style={{ padding: 0 }}>
                        <div className="msg-detail">
                          <div className="msg-detail-grid">
                            {msg.company && (
                              <div className="msg-detail-field">
                                <span className="msg-detail-label">Companie</span>
                                <span>{msg.company}</span>
                              </div>
                            )}
                            {msg.phone && (
                              <div className="msg-detail-field">
                                <span className="msg-detail-label">Telefon</span>
                                <span>{msg.phone}</span>
                              </div>
                            )}
                            {msg.source && (
                              <div className="msg-detail-field">
                                <span className="msg-detail-label">Sursă</span>
                                <span>{msg.source}</span>
                              </div>
                            )}
                          </div>
                          <div className="msg-body">{msg.message}</div>
                          <div className="msg-actions">
                            <button
                              className="btn btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleRead(msg.id, msg.isRead);
                              }}
                            >
                              {msg.isRead ? "Marchează ca nou" : "Marchează ca citit"}
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMessage(msg.id);
                              }}
                            >
                              Șterge
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
