import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [total, unread, recent] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const readCount = total - unread;

  return (
    <>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-label">Total mesaje</div>
          <div className="stat-card-value">{total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Mesaje noi</div>
          <div className="stat-card-value new">{unread}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Mesaje citite</div>
          <div className="stat-card-value read">{readCount}</div>
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
