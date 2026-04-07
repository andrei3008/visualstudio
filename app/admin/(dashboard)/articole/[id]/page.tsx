"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

interface PostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  status: "DRAFT" | "PUBLISHED";
  authorName: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  categories: Category[];
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [authorName, setAuthorName] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showSeo, setShowSeo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loadingPost, setLoadingPost] = useState(true);

  // Fetch post data
  useEffect(() => {
    if (!id) return;
    async function loadPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          setError("Articolul nu a fost găsit");
          setLoadingPost(false);
          return;
        }
        const post: PostData = await res.json();
        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt || "");
        setContent(post.content || "");
        setFeaturedImage(post.featuredImage || "");
        setStatus(post.status);
        setAuthorName(post.authorName || "");
        setMetaTitle(post.metaTitle || "");
        setMetaDescription(post.metaDescription || "");
        setCategoryIds(post.categories?.map((c) => c.id) ?? []);
        if (post.metaTitle || post.metaDescription) {
          setShowSeo(true);
        }
      } catch {
        setError("Eroare la încărcarea articolului");
      } finally {
        setLoadingPost(false);
      }
    }
    loadPost();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!slugManual) {
      setSlug(slugify(val));
    }
  }

  function toggleCategory(catId: string) {
    setCategoryIds((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const body: Record<string, unknown> = {
        title,
        slug,
        excerpt,
        content,
        featuredImage: featuredImage || null,
        status,
        authorName: authorName || null,
        categoryIds,
      };
      if (metaTitle) body.metaTitle = metaTitle;
      if (metaDescription) body.metaDescription = metaDescription;

      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Eroare la actualizare");
        return;
      }

      router.push("/admin/articole");
    } catch {
      setError("Eroare de conexiune");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "var(--radius-sm, 1rem)",
    border: "1px solid var(--border, rgba(22,22,22,0.12))",
    fontSize: 14,
    outline: "none",
    fontFamily: "var(--font, inherit)",
    background: "var(--surface, #fff)",
    color: "var(--text, #161616)",
    boxSizing: "border-box",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: "var(--text-medium, #303030)",
    marginBottom: 6,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  };

  if (loadingPost) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <p>Se încarcă...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-table-header" style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Editează articol</h2>
        <Link href="/admin/articole" className="btn">
          ← Înapoi
        </Link>
      </div>

      {error && (
        <div
          style={{
            background: "rgba(239,68,68,0.06)",
            color: "var(--danger, #ef4444)",
            padding: "12px 16px",
            borderRadius: "var(--radius-sm, 1rem)",
            fontSize: 13,
            fontWeight: 500,
            border: "1px solid rgba(239,68,68,0.15)",
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            maxWidth: 900,
          }}
        >
          {/* Left column — main fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Title */}
            <div>
              <label style={labelStyle}>Titlu</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                style={inputStyle}
                placeholder="Titlul articolului"
              />
            </div>

            {/* Slug */}
            <div>
              <label style={labelStyle}>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManual(true);
                }}
                required
                style={inputStyle}
                placeholder="slug-ul-articolului"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label style={labelStyle}>Rezumat</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="Scurt rezumat al articolului..."
              />
            </div>

            {/* Content */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <label style={{ ...labelStyle, marginBottom: 0 }}>
                  Conținut (Markdown)
                </label>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? "Editare" : "Preview"}
                </button>
              </div>
              {showPreview ? (
                <pre
                  style={{
                    ...inputStyle,
                    minHeight: 300,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontFamily: "monospace",
                    fontSize: 13,
                    lineHeight: 1.7,
                    background: "var(--surface-alt, #faf7f6)",
                    overflow: "auto",
                  }}
                >
                  {content || "(gol)"}
                </pre>
              ) : (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={16}
                  style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: 13, lineHeight: 1.7 }}
                  placeholder="Scrie conținutul în Markdown..."
                />
              )}
            </div>
          </div>

          {/* Right column — sidebar fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Status */}
            <div>
              <label style={labelStyle}>Status</label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "DRAFT" | "PUBLISHED")
                }
                style={inputStyle}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Publicat</option>
              </select>
            </div>

            {/* Author */}
            <div>
              <label style={labelStyle}>Autor</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                style={inputStyle}
                placeholder="Numele autorului"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label style={labelStyle}>Imagine principală (URL)</label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                style={inputStyle}
                placeholder="https://..."
              />
              {featuredImage && (
                <div
                  style={{
                    marginTop: 10,
                    borderRadius: "var(--radius-sm, 1rem)",
                    overflow: "hidden",
                    border: "1px solid var(--border, rgba(22,22,22,0.12))",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredImage}
                    alt="Preview"
                    style={{
                      display: "block",
                      width: "100%",
                      maxHeight: 180,
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Categories */}
            <div>
              <label style={labelStyle}>Categorii</label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  padding: "12px 14px",
                  border: "1px solid var(--border, rgba(22,22,22,0.12))",
                  borderRadius: "var(--radius-sm, 1rem)",
                  background: "var(--surface, #fff)",
                  minHeight: 44,
                }}
              >
                {categories.length === 0 ? (
                  <span style={{ fontSize: 13, color: "var(--text-light)" }}>
                    Nu sunt categorii.
                  </span>
                ) : (
                  categories.map((cat) => (
                    <label
                      key={cat.id}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 500,
                        padding: "4px 10px",
                        borderRadius: "2rem",
                        background: categoryIds.includes(cat.id)
                          ? `${cat.color || "#9f8be7"}22`
                          : "transparent",
                        border: categoryIds.includes(cat.id)
                          ? `1px solid ${cat.color || "#9f8be7"}44`
                          : "1px solid transparent",
                        transition: "all 0.2s",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={categoryIds.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        style={{ accentColor: cat.color || "#9f8be7" }}
                      />
                      {cat.name}
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* SEO Section */}
            <div>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setShowSeo(!showSeo)}
                style={{ marginBottom: showSeo ? 12 : 0 }}
              >
                {showSeo ? "▾" : "▸"} SEO
              </button>
              {showSeo && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    padding: "16px",
                    border: "1px solid var(--border, rgba(22,22,22,0.12))",
                    borderRadius: "var(--radius-sm, 1rem)",
                    background: "var(--surface-alt, #faf7f6)",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Meta Title</label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      style={inputStyle}
                      placeholder="Titlu SEO"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Meta Description</label>
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }}
                      placeholder="Descriere SEO..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
              style={{ marginTop: 8, alignSelf: "flex-start" }}
            >
              {saving ? "Se actualizează..." : "Actualizează"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
