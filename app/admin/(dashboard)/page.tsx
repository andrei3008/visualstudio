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
        const messages: Message[] = Array.isArray(data) ? data : data.messages ?? [];
        const unread = messages.filter((m) => !m.isRead).length;
        setStats({ total: messages.length, unread, read: messages.length - unread });
        setRecent(messages.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
      <div className="stats-grid">
        <div className="stat-card stat-card-total">
          <div className="stat-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Total mesaje</div>
            <div className="stat-card-value">{stats.total}</div>
          </div>
        </div>
        <div className="stat-card stat-card-new">
          <div className="stat-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Mesaje noi</div>
            <div className="stat-card-value">{stats.unread}</div>
          </div>
        </div>
        <div className="stat-card stat-card-read">
          <div className="stat-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Mesaje citite</div>
            <div className="stat-card-value">{stats.read}</div>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h2>Mesaje recente</h2>
        <Link href="/admin/mesaje" className="btn btn-primary btn-sm">
          Vezi toate
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="admin-table-wrap">
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".4">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <p>Nu sunt mesaje încă.</p>
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
                  <td><div className="cell-name">{msg.name}</div></td>
                  <td className="cell-email">{msg.email}</td>
                  <td className="hide-mobile">{msg.projectType ?? "—"}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
