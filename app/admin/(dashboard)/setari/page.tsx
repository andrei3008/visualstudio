"use client";

import { useEffect, useState, useCallback } from "react";

interface SettingsMap {
  [key: string]: string;
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
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("general");
  const [dirty, setDirty] = useState(false);

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
      </div>

      {error && <div className="form-error mb-4">{error}</div>}

      {SETTINGS_SECTIONS.filter((s) => s.id === activeSection).map((section) => (
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
      ))}
    </>
  );
}
