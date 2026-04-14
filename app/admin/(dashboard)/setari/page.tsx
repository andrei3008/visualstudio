"use client";

import { useEffect, useState, useCallback } from "react";

interface SettingsMap {
  [key: string]: string;
}

interface SystemInfo {
  db: { sizeFormatted: string; path: string };
  cache: { sizeFormatted: string; files: number };
  build: { sizeFormatted: string };
  runtime: {
    uptime: string;
    memoryRss: string;
    memoryHeap: string;
    nodeVersion: string;
  };
}

const SETTINGS_SECTIONS = [
  {
    id: "general",
    title: "General",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    fields: [
      { key: "site_name", label: "Nume site", type: "text", placeholder: "Visual Studio Concept" },
      { key: "site_description", label: "Descriere site", type: "textarea", placeholder: "O scurtă descriere a site-ului" },
      { key: "contact_email", label: "Email contact", type: "email", placeholder: "contact@visualstudio.ro" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+40 7XX XXX XXX" },
      { key: "address", label: "Adresă", type: "text", placeholder: "Strada, Oraș, Țara" },
    ],
  },
  {
    id: "seo",
    title: "SEO",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    fields: [
      { key: "meta_default_title", label: "Titlu default", type: "text", placeholder: "Titlu SEO implicit" },
      { key: "meta_default_description", label: "Descriere default", type: "textarea", placeholder: "Descriere SEO implicită" },
      { key: "google_analytics_id", label: "Google Analytics ID", type: "text", placeholder: "G-XXXXXXXXXX" },
    ],
  },
  {
    id: "social",
    title: "Social Media",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    fields: [
      { key: "social_facebook", label: "Facebook", type: "url", placeholder: "https://facebook.com/..." },
      { key: "social_instagram", label: "Instagram", type: "url", placeholder: "https://instagram.com/..." },
      { key: "social_linkedin", label: "LinkedIn", type: "url", placeholder: "https://linkedin.com/..." },
      { key: "social_tiktok", label: "TikTok", type: "url", placeholder: "https://tiktok.com/..." },
    ],
  },
  {
    id: "maintenance",
    title: "Mentenanță",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    fields: [],
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("general");
  const [dirty, setDirty] = useState(false);

  // Maintenance state
  const [sysInfo, setSysInfo] = useState<SystemInfo | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionResult, setActionResult] = useState<{ action: string; message: string; success: boolean } | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings || {});
      }
    } catch {
      setError("Eroare la încărcarea setărilor");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Fetch system info when maintenance tab is active
  useEffect(() => {
    if (activeSection === "maintenance") {
      fetchSystemInfo();
    }
  }, [activeSection]);

  const fetchSystemInfo = async () => {
    try {
      const res = await fetch("/api/admin/maintenance");
      if (res.ok) {
        const data = await res.json();
        setSysInfo(data);
      }
    } catch {
      // ignore
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Eroare la salvare");
        return;
      }

      setSaved(true);
      setDirty(false);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Eroare de conexiune");
    } finally {
      setSaving(false);
    }
  };

  const handleMaintenanceAction = async (action: string) => {
    setActionLoading(action);
    setActionResult(null);

    try {
      const res = await fetch("/api/admin/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();

      setActionResult({
        action,
        message: data.message || (data.success ? "Operație executată cu succes" : data.error || "Eroare"),
        success: data.success ?? res.ok,
      });

      // Refresh system info after action
      await fetchSystemInfo();
    } catch {
      setActionResult({
        action,
        message: "Eroare de conexiune la server",
        success: false,
      });
    } finally {
      setActionLoading(null);
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
        <div className="settings-tabs">
          {SETTINGS_SECTIONS.map((section) => (
            <button
              key={section.id}
              className={`settings-tab${activeSection === section.id ? " active" : ""}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.icon}
              <span>{section.title}</span>
            </button>
          ))}
        </div>
        {activeSection !== "maintenance" && (
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSave}
            disabled={saving || !dirty}
          >
            {saving ? (
              "Se salvează..."
            ) : saved ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Salvat!
              </>
            ) : (
              "Salvează setările"
            )}
          </button>
        )}
      </div>

      {error && <div className="form-error mb-4">{error}</div>}

      {actionResult && (
        <div className={`maintenance-result ${actionResult.success ? "success" : "error"}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {actionResult.success ? (
              <polyline points="20 6 9 17 4 12" />
            ) : (
              <>
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </>
            )}
          </svg>
          {actionResult.message}
        </div>
      )}

      {activeSection === "maintenance" ? (
        <div className="settings-section">
          <h3 className="settings-section-title">Mentenanță sistem</h3>

          {/* System Info */}
          {sysInfo && (
            <div className="maintenance-info-grid">
              <div className="maintenance-info-card">
                <div className="maintenance-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <div className="maintenance-info-text">
                  <span className="maintenance-info-label">Bază de date</span>
                  <span className="maintenance-info-value">{sysInfo.db.sizeFormatted}</span>
                </div>
              </div>
              <div className="maintenance-info-card">
                <div className="maintenance-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="maintenance-info-text">
                  <span className="maintenance-info-label">Cache Next.js</span>
                  <span className="maintenance-info-value">{sysInfo.cache.sizeFormatted} ({sysInfo.cache.files} fișiere)</span>
                </div>
              </div>
              <div className="maintenance-info-card">
                <div className="maintenance-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div className="maintenance-info-text">
                  <span className="maintenance-info-label">Memorie (RSS)</span>
                  <span className="maintenance-info-value">{sysInfo.runtime.memoryRss}</span>
                </div>
              </div>
              <div className="maintenance-info-card">
                <div className="maintenance-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="maintenance-info-text">
                  <span className="maintenance-info-label">Uptime</span>
                  <span className="maintenance-info-value">{sysInfo.runtime.uptime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="maintenance-actions">
            <div className="maintenance-action-card">
              <div className="maintenance-action-info">
                <h4>Șterge cache Next.js</h4>
                <p>Elimină fișierele de cache generate de Next.js. Paginile vor fi regenerate la prima vizită.</p>
              </div>
              <button
                className="btn btn-maintenance"
                onClick={() => handleMaintenanceAction("clear-next-cache")}
                disabled={actionLoading !== null}
              >
                {actionLoading === "clear-next-cache" ? (
                  <><span className="btn-spinner" /> Se șterge...</>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Șterge cache
                  </>
                )}
              </button>
            </div>

            <div className="maintenance-action-card">
              <div className="maintenance-action-info">
                <h4>Optimizare bază de date</h4>
                <p>Execută VACUUM pe SQLite pentru a elibera spațiu și a optimiza performanța.</p>
              </div>
              <button
                className="btn btn-maintenance"
                onClick={() => handleMaintenanceAction("optimize-db")}
                disabled={actionLoading !== null}
              >
                {actionLoading === "optimize-db" ? (
                  <><span className="btn-spinner" /> Se optimizează...</>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                    Optimizează
                  </>
                )}
              </button>
            </div>

            <div className="maintenance-action-card">
              <div className="maintenance-action-info">
                <h4>Revalidare pagini</h4>
                <p>Forțează regenerarea paginilor principale (homepage, blog, landing pages).</p>
              </div>
              <button
                className="btn btn-maintenance"
                onClick={() => handleMaintenanceAction("revalidate-pages")}
                disabled={actionLoading !== null}
              >
                {actionLoading === "revalidate-pages" ? (
                  <><span className="btn-spinner" /> Se revalidează...</>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    Revalidează
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Cloudflare note */}
          <div className="maintenance-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>
              Pentru modificări urgente pe producție, purge-uiește și cache-ul Cloudflare din dashboard (Caching &rarr; Purge Everything).
            </span>
          </div>
        </div>
      ) : (
        SETTINGS_SECTIONS.filter((s) => s.id === activeSection).map((section) => (
          <div key={section.id} className="settings-section">
            <h3 className="settings-section-title">{section.title}</h3>
            <div className="settings-grid">
              {section.fields.map((field) => (
                <div key={field.key} className="form-group">
                  <label htmlFor={field.key}>{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.key}
                      value={settings[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                    />
                  ) : (
                    <input
                      id={field.key}
                      type={field.type}
                      value={settings[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
