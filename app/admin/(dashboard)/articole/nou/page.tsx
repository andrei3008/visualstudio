"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="rte-loading">
      <div className="loading-spinner" />
      <p>Se încarcă editorul...</p>
    </div>
  ),
});

interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CreatePostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugLocked, setSlugLocked] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [authorName, setAuthorName] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [sidebarTab, setSidebarTab] = useState<"post" | "seo">("post");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!slugLocked) {
      setSlug(slugify(val));
    }
  }

  function toggleCategory(catId: string) {
    setCategoryIds((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  }

  async function handleSubmit(publishStatus?: "DRAFT" | "PUBLISHED") {
    setError("");
    setSaving(true);

    try {
      const body: Record<string, unknown> = {
        title,
        slug,
        excerpt,
        content,
        featuredImage: featuredImage || null,
        status: publishStatus || status,
        authorName: authorName || null,
        categoryIds,
      };
      if (metaTitle) body.metaTitle = metaTitle;
      if (metaDescription) body.metaDescription = metaDescription;

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Eroare la salvare");
        return;
      }

      router.push("/admin/articole");
    } catch {
      setError("Eroare de conexiune");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="post-editor">
      {/* ── Top bar ── */}
      <div className="post-editor-topbar">
        <div className="post-editor-topbar-left">
          <Link href="/admin/articole" className="post-editor-back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Articole
          </Link>
          <span className="badge badge-new">Articol nou</span>
        </div>
        <div className="post-editor-topbar-right">
          {error && <span className="post-editor-error">{error}</span>}
          <button
            type="button"
            className="btn"
            disabled={saving}
            onClick={() => handleSubmit("DRAFT")}
          >
            {saving ? "Se salvează..." : "Salvează draft"}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={saving}
            onClick={() => handleSubmit("PUBLISHED")}
          >
            Publică
          </button>
        </div>
      </div>

      {/* ── Main layout: editor + sidebar ── */}
      <div className="post-editor-body">
        {/* Left: Title + Editor */}
        <div className="post-editor-main">
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Titlul articolului..."
            className="post-editor-title-input"
          />

          <div className="post-editor-slug-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            <span className="post-editor-slug-prefix">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugLocked(true);
              }}
              className="post-editor-slug-input"
            />
            {slugLocked && (
              <button
                type="button"
                className="post-editor-slug-unlock"
                title="Auto-generare din titlu"
                onClick={() => {
                  setSlugLocked(false);
                  setSlug(slugify(title));
                }}
              >
                ↺
              </button>
            )}
          </div>

          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Scrie un scurt rezumat al articolului..."
            className="post-editor-excerpt"
            rows={2}
          />

          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Scrie conținutul articolului aici..."
          />

          <div className="post-editor-footer">
            <span>
              {content.trim() ? content.trim().split(/\s+/).length : 0} cuvinte
            </span>
            <span>
              · {content.length} caractere
            </span>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="post-editor-sidebar">
          <div className="post-editor-sidebar-tabs">
            <button
              type="button"
              className={`post-editor-sidebar-tab${sidebarTab === "post" ? " active" : ""}`}
              onClick={() => setSidebarTab("post")}
            >
              Articol
            </button>
            <button
              type="button"
              className={`post-editor-sidebar-tab${sidebarTab === "seo" ? " active" : ""}`}
              onClick={() => setSidebarTab("seo")}
            >
              SEO
            </button>
          </div>

          {sidebarTab === "post" && (
            <div className="post-editor-sidebar-content">
              <div className="sidebar-field">
                <label className="sidebar-label">Imagine principală</label>
                {featuredImage ? (
                  <div className="sidebar-image-preview">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredImage}
                      alt="Preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <button
                      type="button"
                      className="sidebar-image-remove"
                      onClick={() => setFeaturedImage("")}
                    >
                      ✕ Elimină
                    </button>
                  </div>
                ) : (
                  <div className="sidebar-image-empty">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <p>Nicio imagine selectată</p>
                  </div>
                )}
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="/img/blog/... sau URL extern"
                  className="sidebar-input"
                />
              </div>

              <div className="sidebar-field">
                <label className="sidebar-label">Categorii</label>
                <div className="sidebar-categories">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className={`sidebar-category-chip${categoryIds.includes(cat.id) ? " selected" : ""}`}
                      style={{
                        "--chip-color": cat.color || "#9f8be7",
                      } as React.CSSProperties}
                    >
                      <input
                        type="checkbox"
                        checked={categoryIds.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="sidebar-field">
                <label className="sidebar-label">Autor</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Numele autorului"
                  className="sidebar-input"
                />
              </div>

              <div className="sidebar-field">
                <label className="sidebar-label">Status</label>
                <div className="sidebar-status-toggle">
                  <button
                    type="button"
                    className={`sidebar-status-btn${status === "DRAFT" ? " active" : ""}`}
                    onClick={() => setStatus("DRAFT")}
                  >
                    Draft
                  </button>
                  <button
                    type="button"
                    className={`sidebar-status-btn${status === "PUBLISHED" ? " active" : ""}`}
                    onClick={() => setStatus("PUBLISHED")}
                  >
                    Publicat
                  </button>
                </div>
              </div>
            </div>
          )}

          {sidebarTab === "seo" && (
            <div className="post-editor-sidebar-content">
              <div className="sidebar-field">
                <label className="sidebar-label">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Titlu SEO (lasă gol pentru titlul articolului)"
                  className="sidebar-input"
                />
                <span className="sidebar-hint">
                  {metaTitle.length}/60 caractere recomandate
                </span>
              </div>

              <div className="sidebar-field">
                <label className="sidebar-label">Meta Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Descriere scurtă pentru motoarele de căutare..."
                  className="sidebar-textarea"
                  rows={4}
                />
                <span className="sidebar-hint">
                  {metaDescription.length}/160 caractere recomandate
                </span>
              </div>

              <div className="sidebar-field">
                <label className="sidebar-label">Preview Google</label>
                <div className="sidebar-google-preview">
                  <div className="google-preview-url">
                    visualstudio.ro/blog/{slug || "..."}
                  </div>
                  <div className="google-preview-title">
                    {metaTitle || title || "Titlul articolului"}
                  </div>
                  <div className="google-preview-desc">
                    {metaDescription ||
                      excerpt ||
                      "Descrierea va apărea aici..."}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
