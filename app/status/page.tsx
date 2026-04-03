"use client";

import { useEffect, useState } from "react";
import { Metadata } from "next";

export default function StatusPage() {
  const [health, setHealth] = useState<{
    status: string;
    timestamp: string;
    uptime: number;
    version: string;
    database: string;
    responseTime: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetch("/api/health")
        .then((r) => r.json())
        .then(setHealth);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  function formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (days > 0) return `${days}z ${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  }

  function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const secs = Math.floor(diff / 1000);
    if (secs < 5) return "acum";
    if (secs < 60) return `acum ${secs}s`;
    return `acum ${Math.floor(secs / 60)}m`;
  }

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "80px auto",
        padding: "0 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: "0 0 8px",
            color: "#111",
          }}
        >
          Visual Studio Concept
        </h1>
        <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
          Statusul serviciilor
        </p>
      </div>

      {/* Overall status */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 24,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {loading ? (
          <div
            style={{
              width: 20,
              height: 20,
              border: "3px solid #e5e7eb",
              borderTopColor: "#3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        ) : (
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: health?.status === "ok" ? "#22c55e" : "#ef4444",
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 16, color: "#111" }}>
            {loading
              ? "Se verifică..."
              : health?.status === "ok"
                ? "Toate sistemele funcționale"
                : " Probleme detectate"}
          </div>
          <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>
            {health
              ? `Ultima verificare: ${timeAgo(health.timestamp)}`
              : "Conectare..."}
          </div>
        </div>
      </div>

      {/* Service details */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {[
          {
            name: "Website",
            ok: health?.status === "ok",
            detail: health
              ? `Timp răspuns: ${health.responseTime}`
              : undefined,
          },
          {
            name: "Baza de date",
            ok: health?.database === "connected",
            detail: health?.database === "connected" ? "Conectată" : "Deconectată",
          },
        ].map((service, i) => (
          <div
            key={service.name}
            style={{
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              borderBottom: i === 0 ? "1px solid #f3f4f6" : "none",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: service.ok ? "#22c55e" : loading ? "#d1d5db" : "#ef4444",
                flexShrink: 0,
              }}
            />
            <span style={{ fontWeight: 500, color: "#111", flex: 1 }}>
              {service.name}
            </span>
            <span style={{ color: "#888", fontSize: 13 }}>
              {service.detail ?? "--"}
            </span>
          </div>
        ))}
      </div>

      {/* Info */}
      {health && (
        <div
          style={{
            marginTop: 16,
            padding: "12px 24px",
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            display: "flex",
            justifyContent: "space-between",
            color: "#888",
            fontSize: 13,
          }}
        >
          <span>Uptime: {formatUptime(health.uptime)}</span>
          <span>v{health.version}</span>
        </div>
      )}

      {/* Footer */}
      <p
        style={{
          textAlign: "center",
          color: "#aaa",
          fontSize: 12,
          marginTop: 40,
        }}
      >
        Actualizare automată la fiecare 30 de secunde
      </p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
