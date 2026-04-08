"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { SidebarToggle } from "./sidebar-toggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="admin-layout">
      <SidebarToggle />

      <aside className="admin-sidebar" id="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="brand-icon">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="url(#sidebar-grad)" />
              <path d="M12 28V12l8 8-8 8z" fill="#fff" opacity=".9" />
              <path d="M20 28V12l8 8-8 8z" fill="#fff" opacity=".6" />
              <defs>
                <linearGradient id="sidebar-grad" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#9f8be7" />
                  <stop offset="1" stopColor="#7c6bc4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="brand-text">
            <h2>Visual Studio</h2>
            <small>Admin Panel</small>
          </div>
        </div>

        <nav>
          <SidebarLink
            href="/admin"
            icon={<DashboardIcon />}
            label="Dashboard"
            active={pathname === "/admin"}
          />
          <SidebarLink
            href="/admin/mesaje"
            icon={<MessagesIcon />}
            label="Mesaje"
            active={pathname === "/admin/mesaje"}
          />
          <SidebarLink
            href="/admin/articole"
            icon={<BlogIcon />}
            label="Articole"
            active={pathname === "/admin/articole" || pathname.startsWith("/admin/articole/")}
          />
          <SidebarLink
            href="/admin/categorii"
            icon={<CategoriesIcon />}
            label="Categorii"
            active={pathname === "/admin/categorii"}
          />
          <SidebarLink
            href="/admin/utilizatori"
            icon={<UsersIcon />}
            label="Utilizatori"
            active={pathname === "/admin/utilizatori"}
          />
          <SidebarLink
            href="/admin/setari"
            icon={<SettingsIcon />}
            label="Setări"
            active={pathname === "/admin/setari"}
          />
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-logout">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogoutIcon />
            Deconectare
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <h1>
            {pathname === "/admin" ? "Dashboard" : pathname === "/admin/mesaje" ? "Mesaje" : pathname === "/admin/categorii" ? "Categorii" : pathname === "/admin/utilizatori" ? "Utilizatori" : pathname === "/admin/setari" ? "Setări" : pathname.startsWith("/admin/articole") ? "Articole" : "Administrare"}
          </h1>
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
  active,
  disabled,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <span className={`sidebar-link disabled`}>
        {icon}
        {label}
        <span className="sidebar-soon">curând</span>
      </span>
    );
  }
  return (
    <Link href={href!} className={`sidebar-link${active ? " active" : ""}`}>
      {icon}
      {label}
    </Link>
  );
}

/* SVG Icons */
function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function MessagesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function CategoriesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
