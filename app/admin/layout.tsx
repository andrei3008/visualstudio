"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { SidebarToggle } from "./sidebar-toggle";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Admin";

  return (
    <div className="admin-layout">
      <SidebarToggle />

      {/* Sidebar */}
      <aside className="admin-sidebar" id="admin-sidebar">
        <div className="admin-sidebar-brand">
          <h2>Visual Studio</h2>
          <small>Admin Panel</small>
        </div>

        <nav>
          <SidebarLink href="/admin" icon="📊" label="Dashboard" />
          <SidebarLink href="/admin/mesaje" icon="✉️" label="Mesaje" />
          <SidebarLink href="#" icon="👥" label="Utilizatori" disabled />
          <SidebarLink href="#" icon="⚙️" label="Setări" disabled />
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-logout">
          <form action="/api/auth/signout" method="POST">
            <button type="submit">
              <span className="sidebar-icon">🚪</span>
              Deconectare
            </button>
          </form>
        </div>
      </aside>

      {/* Main area */}
      <div className="admin-main">
        <header className="admin-topbar">
          <h1>Administrare</h1>
          <span className="admin-topbar-user">👤 {userName}</span>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  disabled,
}: {
  href: string;
  icon: string;
  label: string;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <span style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 20px", color: "#666680", fontSize: 14, opacity: 0.45 }}>
        <span className="sidebar-icon">{icon}</span>
        {label}
        <span style={{ marginLeft: "auto", fontSize: 11 }}>(curând)</span>
      </span>
    );
  }
  return (
    <Link href={href}>
      <span className="sidebar-icon">{icon}</span>
      {label}
    </Link>
  );
}
