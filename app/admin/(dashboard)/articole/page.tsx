"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  authorName: string | null;
  featuredImage: string | null;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
}

type Filter = "all" | "PUBLISHED" | "DRAFT";

export default function AdminArticolePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== "all") params.set("status", filter);
    if (search) params.set("search", search);
    params.set("page", String(page));
    params.set("limit", "20");

    try {
      const res = await fetch(`/api/posts?${params}`);
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.posts ?? [];
        setPosts(items);
        setTotalPages(data.totalPages ?? data.pagination?.totalPages ?? 1);
        setTotalPosts(data.total ?? data.pagination?.total ?? items.length);
        setPublishedCount(data.publishedCount ?? data.stats?.published ?? 0);
        setDraftCount(data.draftCount ?? data.stats?.draft ?? 0);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [filter, search, page]);

  // Fetch all counts on mount (unfiltered)
  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await fetch("/api/posts?limit=1");
        if (res.ok) {
          const data = await res.json();
          setTotalPosts(data.total ?? data.pagination?.total ?? 0);
          setPublishedCount(data.publishedCount ?? data.stats?.published ?? 0);
          setDraftCount(data.draftCount ?? data.stats?.draft ?? 0);
        }
      } catch {
        /* ignore */
      }
    }
    fetchCounts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Reset page when filter/search changes
  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  async function handleDelete(id: string) {
    if (!confirm("Sigur doriți să ștergeți acest articol?")) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPosts();
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card stat-card-total">
          <div className="stat-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Total articole</div>
            <div className="stat-card-value">{totalPosts}</div>
          </div>
        </div>
        <div className="stat-card stat-card-read">
          <div className="stat-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Publicate</div>
            <div className="stat-card-value">{publishedCount}</div>
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
            <div className="stat-card-label">Draft</div>
            <div className="stat-card-value">{draftCount}</div>
          </div>
        </div>
      </div>

      {/* Header with filters & search */}
      <div className="admin-table-header" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div className="btn-group">
            <button
              className={`btn btn-sm ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Toate
            </button>
            <button
              className={`btn btn-sm ${filter === "PUBLISHED" ? "active" : ""}`}
              onClick={() => setFilter("PUBLISHED")}
            >
              Publicate
            </button>
            <button
              className={`btn btn-sm ${filter === "DRAFT" ? "active" : ""}`}
              onClick={() => setFilter("DRAFT")}
            >
              Draft
            </button>
          </div>
          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Caută după titlu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Link href="/admin/articole/nou" className="btn btn-primary">
          + Adaugă articol
        </Link>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Se încarcă...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".4">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <p>Nu sunt articole.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Titlu</th>
                <th>Status</th>
                <th className="hide-mobile">Categorii</th>
                <th className="hide-mobile">Autor</th>
                <th className="hide-mobile">Dată</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className="cell-name">{post.title}</div>
                  </td>
                  <td>
                    {post.status === "PUBLISHED" ? (
                      <span className="badge badge-read">Publicat</span>
                    ) : (
                      <span className="badge badge-new">Draft</span>
                    )}
                  </td>
                  <td className="hide-mobile">
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {post.categories && post.categories.length > 0
                        ? post.categories.map((cat) => (
                            <span
                              key={cat.id}
                              style={{
                                display: "inline-block",
                                padding: "2px 10px",
                                borderRadius: "2rem",
                                fontSize: 11,
                                fontWeight: 600,
                                background: cat.color
                                  ? `${cat.color}22`
                                  : "rgba(159,139,231,0.1)",
                                color: cat.color || "var(--primary)",
                              }}
                            >
                              {cat.name}
                            </span>
                          ))
                        : "—"}
                    </div>
                  </td>
                  <td className="hide-mobile">{post.authorName || "—"}</td>
                  <td className="hide-mobile">
                    {new Date(post.createdAt).toLocaleDateString("ro-RO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Link
                        href={`/admin/articole/${post.id}`}
                        className="btn btn-sm"
                      >
                        Editează
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(post.id)}
                      >
                        Șterge
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            marginTop: 24,
          }}
        >
          <button
            className="btn btn-sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Anterior
          </button>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Pagina {page} / {totalPages}
          </span>
          <button
            className="btn btn-sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Următor →
          </button>
        </div>
      )}
    </>
  );
}
