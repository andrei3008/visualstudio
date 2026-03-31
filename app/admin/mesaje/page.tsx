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
      setMessages(data.messages);
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

      {/* Filters + Search */}
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
        <input
          type="text"
          className="search-input"
          placeholder="Caută după nume sau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        {loading ? (
          <div className="empty-state">
            <p>Se încarcă...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <p>Nu sunt mesaje.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nume</th>
                <th>Email</th>
                <th className="hide-mobile">Tip Proiect</th>
                <th className="hide-mobile">Buget</th>
                <th className="hide-mobile">Dată</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <Fragment key={msg.id}>
                  <tr
                    key={msg.id}
                    className={msg.isRead ? "" : "unread"}
                    onClick={() =>
                      setExpandedId(expandedId === msg.id ? null : msg.id)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td className="hide-mobile">{msg.projectType ?? "—"}</td>
                    <td className="hide-mobile">{msg.budget ?? "—"}</td>
                    <td className="hide-mobile">
                      {new Date(msg.createdAt).toLocaleDateString("ro-RO")}
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
                          {msg.company && (
                            <p>
                              <strong>Companie:</strong> {msg.company}
                            </p>
                          )}
                          {msg.phone && (
                            <p>
                              <strong>Telefon:</strong> {msg.phone}
                            </p>
                          )}
                          {msg.source && (
                            <p>
                              <strong>Sursă:</strong> {msg.source}
                            </p>
                          )}
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
                              🗑 Șterge
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
