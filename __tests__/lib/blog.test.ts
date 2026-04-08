import { describe, it, expect, beforeEach, vi } from "vitest";

// --- Mocks (hoisted) ---

vi.mock("@/lib/prisma", () => ({
  prisma: {
    post: {
      findMany: vi.fn(),
    },
  },
}));

// --- Imports ---

import { getLatestPosts } from "@/lib/blog";
import { prisma } from "@/lib/prisma";

const mockFindMany = prisma.post.findMany as ReturnType<typeof vi.fn>;

const samplePosts = [
  {
    id: "post3",
    title: "Third Post",
    slug: "third-post",
    excerpt: "Third excerpt",
    content: "Content 3",
    featuredImage: "https://images.unsplash.com/photo-3",
    metaTitle: null,
    metaDescription: null,
    status: "PUBLISHED",
    authorName: "Visual Studio",
    publishedAt: new Date("2025-03-01"),
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-01"),
    categories: [{ category: { id: "cat1", name: "Dezvoltare", slug: "dezvoltare" } }],
  },
  {
    id: "post2",
    title: "Second Post",
    slug: "second-post",
    excerpt: "Second excerpt",
    content: "Content 2",
    featuredImage: null,
    metaTitle: null,
    metaDescription: null,
    status: "PUBLISHED",
    authorName: "Visual Studio",
    publishedAt: new Date("2025-02-01"),
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-01"),
    categories: [{ category: { id: "cat2", name: "AI", slug: "ai" } }],
  },
  {
    id: "post1",
    title: "First Post",
    slug: "first-post",
    excerpt: "First excerpt",
    content: "Content 1",
    featuredImage: null,
    metaTitle: null,
    metaDescription: null,
    status: "PUBLISHED",
    authorName: "Visual Studio",
    publishedAt: new Date("2025-01-01"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
    categories: [],
  },
];

describe("getLatestPosts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns latest 3 published posts ordered by publishedAt desc", async () => {
    mockFindMany.mockResolvedValue(samplePosts);

    const result = await getLatestPosts(3);

    expect(result).toHaveLength(3);
    expect(result[0].id).toBe("post3");
    expect(result[1].id).toBe("post2");
    expect(result[2].id).toBe("post1");

    // Categories should be flattened
    expect(result[0].categories).toEqual([
      { id: "cat1", name: "Dezvoltare", slug: "dezvoltare" },
    ]);
    expect(result[1].categories).toEqual([
      { id: "cat2", name: "AI", slug: "ai" },
    ]);

    // Should query with correct params
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 3,
        include: { categories: { include: { category: true } } },
      })
    );
  });

  it("returns fewer posts when less than limit exist", async () => {
    mockFindMany.mockResolvedValue([samplePosts[0]]);

    const result = await getLatestPosts(3);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("post3");
  });

  it("returns empty array when no posts exist", async () => {
    mockFindMany.mockResolvedValue([]);

    const result = await getLatestPosts(3);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it("returns empty array on database error (graceful fallback)", async () => {
    mockFindMany.mockRejectedValue(new Error("DB connection failed"));

    const result = await getLatestPosts(3);

    expect(result).toEqual([]);
  });

  it("respects custom limit", async () => {
    mockFindMany.mockResolvedValue(samplePosts.slice(0, 2));

    const result = await getLatestPosts(2);

    expect(result).toHaveLength(2);
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 2 })
    );
  });

  it("only returns PUBLISHED posts (not DRAFT)", async () => {
    mockFindMany.mockResolvedValue(samplePosts);

    await getLatestPosts(3);

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { status: "PUBLISHED" },
      })
    );
  });
});
