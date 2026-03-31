"use client";

import { useState } from "react";

export function SidebarToggle() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    const sidebar = document.getElementById("admin-sidebar");
    if (sidebar) {
      if (next) {
        sidebar.classList.add("open");
      } else {
        sidebar.classList.remove("open");
      }
    }
  };

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={toggle}
        aria-label="Meniu"
      >
        ☰
      </button>
      {open && (
        <div
          className="sidebar-overlay active"
          onClick={toggle}
        />
      )}
    </>
  );
}
