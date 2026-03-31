"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Message {
  id: string;
  name: string;
  email: string;
  projectType: string | null;
  createdAt: string;
  isRead: boolean;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });
  const [recent, setRecent] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact-messages")
      .then((r) => r.json())
      .then((data) => {
        const messages: Message[] = data.messages ?? [];
        const unread = messages.filter((m) => !m.isRead).length;
        setStats({ total: messages.length, unread, read: messages.length - unread });
        setRecent(messages.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="empty-state"><p>Se încarcă...</p></div>;
  }

  return (
    <>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-label">Total mesaje</div>
          <div className="stat-card-value">{stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Mesaje noi</div>
          <div className="stat-card-value new">{stats.unread}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Mesaje citite</div>
          <div className="stat-card-value read">{stats.read}</div>
        </div>
      </div>

      {/* Recent messages */}
      <div className="section-header">
        <h2>Mesaje recente</h2>
        <Link href="/admin/mesaje" className="btn btn-primary btn-sm">
          Vezi toate →
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="admin-table-wrap">
          <div className="empty-state">
            <p>Nu sunt mesaje.</p>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nume</th>
                <th>Email</th>
                <th className="hide-mobile">Tip proiect</th>
                <th className="hide-mobile">Dată</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((msg) => (
                <tr key={msg.id} className={msg.isRead ? "" : "unread"}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td className="hide-mobile">{msg.projectType ?? "—"}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
