import { describe, it, expect, beforeEach, vi } from "vitest";

// --- Mocks (hoisted) ---

vi.mock("@/lib/prisma", () => ({
  prisma: {
    post: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    postCategory: {
      deleteMany: vi.fn(),
      createMany: vi.fn(),
    },
  },
}));

vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
  handlers: {},
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// --- Imports ---

import { GET as GETList, POST } from "@/app/api/posts/route";
import { GET as GETById, PUT, DELETE } from "@/app/api/posts/[id]/route";
import { GET as GETBySlug } from "@/app/api/posts/slug/[slug]/route";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const mockFindMany = prisma.post.findMany as ReturnType<typeof vi.fn>;
const mockFindUnique = prisma.post.findUnique as ReturnType<typeof vi.fn>;
const mockCreate = prisma.post.create as ReturnType<typeof vi.fn>;
const mockUpdate = prisma.post.update as ReturnType<typeof vi.fn>;
const mockDelete = prisma.post.delete as ReturnType<typeof vi.fn>;
const mockCount = prisma.post.count as ReturnType<typeof vi.fn>;
const mockDeleteMany = prisma.postCategory.deleteMany as ReturnType<typeof vi.fn>;
const mockCreateMany = prisma.postCategory.createMany as ReturnType<typeof vi.fn>;
const mockAuth = auth as ReturnType<typeof vi.fn>;

function makeRequest(url: string, options?: RequestInit) {
  return new NextRequest(url, options);
}

import { NextRequest, NextResponse } from "next/server";

const samplePost = {
  id: "post1",
  title: "Test Post",
  slug: "test-post",
  excerpt: "A test",
  content: "Content here",
  featuredImage: null,
  metaTitle: null,
  metaDescription: null,
  status: "PUBLISHED",
  authorName: "Visual Studio",
  publishedAt: new Date("2025-01-01"),
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-01-01"),
  categories: [{ category: { id: "cat1", name: "News", slug: "news" } }],
};

describe("GET /api/posts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns paginated posts", async () => {
    mockAuth.mockResolvedValue({ user: { role: "ADMIN" } });
    mockFindMany.mockResolvedValue([samplePost]);
    mockCount.mockResolvedValue(1);

    const req = makeRequest("http://localhost/api/posts?page=1&limit=10");
    const res = await GETList(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.posts).toHaveLength(1);
    expect(body.pagination).toEqual({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
    // categories should be flattened
    expect(body.posts[0].categories).toEqual([{ id: "cat1", name: "News", slug: "news" }]);
  });

  it("filters by status for admin", async () => {
    mockAuth.mockResolvedValue({ user: { role: "ADMIN" } });
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(0);

    const req = makeRequest("http://localhost/api/posts?status=DRAFT");
    await GETList(req);

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: "DRAFT" }),
      })
    );
  });

  it("public users only see PUBLISHED posts", async () => {
    mockAuth.mockResolvedValue(null);
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(0);

    const req = makeRequest("http://localhost/api/posts");
    await GETList(req);

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: "PUBLISHED" }),
      })
    );
  });

  it("searches in title and excerpt", async () => {
    mockAuth.mockResolvedValue(null);
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(0);

    const req = makeRequest("http://localhost/api/posts?search=hello");
    await GETList(req);

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: "PUBLISHED",
          OR: [
            { title: { contains: "hello" } },
            { excerpt: { contains: "hello" } },
          ],
        }),
      })
    );
  });
});

describe("POST /api/posts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 if not admin", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("http://localhost/api/posts", {
      method: "POST",
      body: JSON.stringify({ title: "Test", slug: "test", content: "content" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("creates a post with categories", async () => {
    mockAuth.mockResolvedValue({ user: { role: "ADMIN" } });
    const createdPost = {
      ...samplePost,
      categories: [
        { category: { id: "cat1", name: "News", slug: "news" } },
      ],
    };
    mockCreate.mockResolvedValue(createdPost);

    const req = makeRequest("http://localhost/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "Test Post",
        slug: "test-post",
        content: "Content here",
        status: "PUBLISHED",
        categoryIds: ["cat1"],
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.title).toBe("Test Post");
    expect(body.categories).toEqual([{ id: "cat1", name: "News", slug: "news" }]);

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          publishedAt: expect.any(Date),
          categories: {
            create: [{ categoryId: "cat1" }],
          },
        }),
      })
    );
  });

  it("returns 409 for duplicate slug", async () => {
    mockAuth.mockResolvedValue({ user: { role: "ADMIN" } });
    const error = new Error("Unique constraint failed");
    (error as unknown as { code: string }).code = "P2002";
    mockCreate.mockRejectedValue(error);

    const req = makeRequest("http://localhost/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "Test",
        slug: "duplicate-slug",
        content: "content",
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(409);
  });
});

describe("GET /api/posts/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a post by id", async () => {
    mockAuth.mockResolvedValue(null);
    mockFindUnique.mockResolvedValue(samplePost);

    const req = makeRequest("http://localhost/api/posts/post1");
    const res = await GETById(req, { params: Promise.resolve({ id: "post1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.id).toBe("post1");
  });

  it("returns 404 for non-existent post", async () => {
    mockAuth.mockResolvedValue(null);
    mockFindUnique.mockResolvedValue(null);

    const req = makeRequest("http://localhost/api/posts/nonexistent");
    const res = await GETById(req, { params: Promise.resolve({ id: "nonexistent" }) });
    expect(res.status).toBe(404);
  });

  it("returns 404 for draft post when not admin", async () => {
    mockAuth.mockResolvedValue(null);
    mockFindUnique.mockResolvedValue({ ...samplePost, status: "DRAFT" });

    const req = makeRequest("http://localhost/api/posts/post1");
    const res = await GETById(req, { params: Promise.resolve({ id: "post1" }) });
    expect(res.status).toBe(404);
  });
});

describe("PUT /api/posts/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates a post", async () => {
    mockAuth.mockResolvedValue({ user: { role: "ADMIN" } });
    const existing = { ...samplePost, status: "DRAFT" };
    mockFindUnique.mockResolvedValue(existing);
    mockDeleteMany.mockResolvedValue({ count: 0 });
    mockUpdate.mockResolvedValue({
      ...samplePost,
      title: "Updated Post",
      status: "PUBLISHED",
      publishedAt: new Date(),
    });

    const req = makeRequest("http://localhost/api/posts/post1", {
      method: "PUT",
      body: JSON.stringify({ title: "Updated Post", status: "PUBLISHED" }),
    });
    const res = await PUT(req, { params: Promise.resolve({ id: "post1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.title).toBe("Updated Post");
  });

  it("returns 401 if not admin", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("http://localhost/api/posts/post1", {
      method: "PUT",
      body: JSON.stringify({ title: "Updated" }),
    });
    const res = await PUT(req, { params: Promise.resolve({ id: "post1" }) });
    expect(res.status).toBe(401);
  });
});

describe("DELETE /api/posts/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes a post", async () => {
    mockAuth.mockResolvedValue({ user: { role: "ADMIN" } });
    mockFindUnique.mockResolvedValue(samplePost);
    mockDelete.mockResolvedValue(samplePost);

    const req = makeRequest("http://localhost/api/posts/post1", { method: "DELETE" });
    const res = await DELETE(req, { params: Promise.resolve({ id: "post1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.message).toBe("Post deleted");
  });

  it("returns 401 if not admin", async () => {
    mockAuth.mockResolvedValue(null);

    const req = makeRequest("http://localhost/api/posts/post1", { method: "DELETE" });
    const res = await DELETE(req, { params: Promise.resolve({ id: "post1" }) });
    expect(res.status).toBe(401);
  });
});

describe("GET /api/posts/slug/[slug]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns published post by slug", async () => {
    mockFindUnique.mockResolvedValue(samplePost);

    const req = makeRequest("http://localhost/api/posts/slug/test-post");
    const res = await GETBySlug(req, { params: Promise.resolve({ slug: "test-post" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.slug).toBe("test-post");
    expect(body.categories).toEqual([{ id: "cat1", name: "News", slug: "news" }]);
  });

  it("returns 404 for draft post", async () => {
    mockFindUnique.mockResolvedValue({ ...samplePost, status: "DRAFT" });

    const req = makeRequest("http://localhost/api/posts/slug/draft-post");
    const res = await GETBySlug(req, { params: Promise.resolve({ slug: "draft-post" }) });
    expect(res.status).toBe(404);
  });

  it("returns 404 for non-existent slug", async () => {
    mockFindUnique.mockResolvedValue(null);

    const req = makeRequest("http://localhost/api/posts/slug/nonexistent");
    const res = await GETBySlug(req, { params: Promise.resolve({ slug: "nonexistent" }) });
    expect(res.status).toBe(404);
  });
});
