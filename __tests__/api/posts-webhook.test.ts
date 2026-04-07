import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";

// --- Mocks (hoisted) ---

vi.mock("@/lib/prisma", () => ({
  prisma: {
    post: {
      create: vi.fn(),
    },
    category: {
      findMany: vi.fn(),
    },
  },
}));

// --- Imports ---

import { POST } from "@/app/api/posts/webhook/route";
import { prisma } from "@/lib/prisma";

const mockCreate = prisma.post.create as ReturnType<typeof vi.fn>;
const mockCategoryFindMany = prisma.category.findMany as ReturnType<typeof vi.fn>;

function makeRequest(url: string, options?: RequestInit) {
  return new NextRequest(url, options);
}

const sampleCreatedPost = {
  id: "post1",
  title: "AI Blog Post",
  slug: "ai-blog-post",
  excerpt: "An AI-generated post",
  content: "Full content here",
  featuredImage: null,
  metaTitle: null,
  metaDescription: null,
  status: "DRAFT",
  authorName: "Paperclip AI",
  publishedAt: null,
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-01-01"),
  categories: [],
};

describe("POST /api/posts/webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.PAPERCLIP_API_KEY = "test-key";
  });

  it("returns 401 without API key", async () => {
    const req = makeRequest("http://localhost/api/posts/webhook", {
      method: "POST",
      body: JSON.stringify({ title: "Test", slug: "test", content: "content" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 401 with wrong API key", async () => {
    const req = makeRequest("http://localhost/api/posts/webhook", {
      method: "POST",
      headers: { Authorization: "Bearer wrong-key" },
      body: JSON.stringify({ title: "Test", slug: "test", content: "content" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 400 for invalid body", async () => {
    const req = makeRequest("http://localhost/api/posts/webhook", {
      method: "POST",
      headers: {
        Authorization: "Bearer test-key",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "", slug: "INVALID SLUG", content: "" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Validation failed");
    expect(body.details).toBeDefined();
  });

  it("creates draft post successfully (publish=false)", async () => {
    mockCreate.mockResolvedValue(sampleCreatedPost);

    const req = makeRequest("http://localhost/api/posts/webhook", {
      method: "POST",
      headers: { Authorization: "Bearer test-key" },
      body: JSON.stringify({
        title: "AI Blog Post",
        slug: "ai-blog-post",
        content: "Full content here",
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.title).toBe("AI Blog Post");
    expect(body.slug).toBe("ai-blog-post");

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "DRAFT",
          publishedAt: null,
        }),
      })
    );
  });

  it("creates published post when publish=true", async () => {
    const publishedPost = {
      ...sampleCreatedPost,
      status: "PUBLISHED",
      publishedAt: new Date("2025-01-01"),
    };
    mockCreate.mockResolvedValue(publishedPost);

    const req = makeRequest("http://localhost/api/posts/webhook", {
      method: "POST",
      headers: { Authorization: "Bearer test-key" },
      body: JSON.stringify({
        title: "AI Blog Post",
        slug: "ai-blog-post",
        content: "Full content here",
        publish: true,
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "PUBLISHED",
          publishedAt: expect.any(Date),
        }),
      })
    );
  });

  it("resolves categories by slug", async () => {
    mockCategoryFindMany.mockResolvedValue([
      { id: "cat1" },
      { id: "cat2" },
    ]);
    const postWithCategories = {
      ...sampleCreatedPost,
      categories: [
        { category: { id: "cat1", name: "Tech", slug: "tech" } },
        { category: { id: "cat2", name: "AI", slug: "ai" } },
      ],
    };
    mockCreate.mockResolvedValue(postWithCategories);

    const req = makeRequest("http://localhost/api/posts/webhook", {
      method: "POST",
      headers: { Authorization: "Bearer test-key" },
      body: JSON.stringify({
        title: "AI Blog Post",
        slug: "ai-blog-post",
        content: "Full content here",
        categorySlugs: ["tech", "ai"],
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);

    expect(mockCategoryFindMany).toHaveBeenCalledWith({
      where: { slug: { in: ["tech", "ai"] } },
      select: { id: true },
    });

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          categories: {
            create: [{ categoryId: "cat1" }, { categoryId: "cat2" }],
          },
        }),
      })
    );

    const body = await res.json();
    expect(body.categories).toEqual([
      { id: "cat1", name: "Tech", slug: "tech" },
      { id: "cat2", name: "AI", slug: "ai" },
    ]);
  });

  it("returns 409 for duplicate slug", async () => {
    const error = new Error("Unique constraint failed");
    (error as unknown as { code: string }).code = "P2002";
    mockCreate.mockRejectedValue(error);

    const req = makeRequest("http://localhost/api/posts/webhook", {
      method: "POST",
      headers: { Authorization: "Bearer test-key" },
      body: JSON.stringify({
        title: "Duplicate",
        slug: "duplicate-slug",
        content: "content",
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(409);

    const body = await res.json();
    expect(body.error).toBe("A post with this slug already exists");
  });
});
