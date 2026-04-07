import { describe, it, expect, beforeEach, vi } from "vitest";

// --- Mocks (hoisted) ---

vi.mock("@/lib/prisma", () => ({
  prisma: {
    category: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
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

import { GET, POST } from "@/app/api/categories/route";
import { GET as GETById, PUT, DELETE } from "@/app/api/categories/[id]/route";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const mockFindMany = prisma.category.findMany as ReturnType<typeof vi.fn>;
const mockFindUnique = prisma.category.findUnique as ReturnType<typeof vi.fn>;
const mockCreate = prisma.category.create as ReturnType<typeof vi.fn>;
const mockUpdate = prisma.category.update as ReturnType<typeof vi.fn>;
const mockDelete = prisma.category.delete as ReturnType<typeof vi.fn>;
const mockAuth = auth as ReturnType<typeof vi.fn>;

// Helper to build a NextRequest
function makeRequest(body?: unknown) {
  const init: RequestInit = body
    ? { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }
    : {};
  return new Request("http://localhost/api/categories", init) as import("next/server").NextRequest;
}

function makeIdRequest(id: string, method: string = "GET", body?: unknown) {
  const init: RequestInit = { method };
  if (body) {
    init.body = JSON.stringify(body);
    (init as Record<string, unknown>).headers = { "Content-Type": "application/json" };
  }
  return new Request(`http://localhost/api/categories/${id}`, init) as import("next/server").NextRequest;
}

const adminSession = {
  user: { id: "u1", name: "Admin", email: "admin@test.com", role: "ADMIN" },
};

const userSession = {
  user: { id: "u2", name: "User", email: "user@test.com", role: "USER" },
};

describe("GET /api/categories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns categories list with post count", async () => {
    mockFindMany.mockResolvedValue([
      { id: "c1", name: "Tech", slug: "tech", description: null, color: "#9f8be7", createdAt: "2026-01-01", updatedAt: "2026-01-01", _count: { posts: 3 } },
      { id: "c2", name: "Design", slug: "design", description: "Design topics", color: "#ff0000", createdAt: "2026-01-02", updatedAt: "2026-01-02", _count: { posts: 1 } },
    ]);

    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(2);
    expect(body[0]).toEqual(
      expect.objectContaining({ name: "Tech", postCount: 3 })
    );
    expect(body[1]).toEqual(
      expect.objectContaining({ name: "Design", postCount: 1 })
    );
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { name: "asc" },
        include: { _count: { select: { posts: true } } },
      })
    );
  });
});

describe("POST /api/categories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 if not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const res = await POST(makeRequest({ name: "Test", slug: "test" }));
    expect(res.status).toBe(401);
  });

  it("returns 401 if not ADMIN role", async () => {
    mockAuth.mockResolvedValue(userSession);

    const res = await POST(makeRequest({ name: "Test", slug: "test" }));
    expect(res.status).toBe(401);
  });

  it("creates category successfully", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockCreate.mockResolvedValue({
      id: "c1",
      name: "Tech",
      slug: "tech",
      description: null,
      color: "#9f8be7",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
    });

    const res = await POST(makeRequest({ name: "Tech", slug: "tech" }));
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.name).toBe("Tech");
    expect(body.slug).toBe("tech");
  });

  it("returns 400 for invalid data", async () => {
    mockAuth.mockResolvedValue(adminSession);

    const res = await POST(makeRequest({ name: "", slug: "INVALID SLUG!" }));
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Invalid data");
    expect(body.details).toBeDefined();
  });

  it("returns 409 for duplicate slug", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const error = new Error("Unique constraint failed");
    (error as unknown as { code: string }).code = "P2002";
    mockCreate.mockRejectedValue(error);

    const res = await POST(makeRequest({ name: "Tech", slug: "tech" }));
    expect(res.status).toBe(409);

    const body = await res.json();
    expect(body.error).toContain("already exists");
  });
});

describe("GET /api/categories/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns category by id", async () => {
    mockFindUnique.mockResolvedValue({
      id: "c1",
      name: "Tech",
      slug: "tech",
      description: null,
      color: "#9f8be7",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
      _count: { posts: 5 },
    });

    const res = await GETById(makeIdRequest("c1"), { params: Promise.resolve({ id: "c1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.name).toBe("Tech");
    expect(body.postCount).toBe(5);
  });

  it("returns 404 when category not found", async () => {
    mockFindUnique.mockResolvedValue(null);

    const res = await GETById(makeIdRequest("nonexistent"), { params: Promise.resolve({ id: "nonexistent" }) });
    expect(res.status).toBe(404);
  });
});

describe("PUT /api/categories/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 if not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const res = await PUT(makeIdRequest("c1", "PUT", { name: "Updated" }), { params: Promise.resolve({ id: "c1" }) });
    expect(res.status).toBe(401);
  });

  it("returns 401 if not ADMIN role", async () => {
    mockAuth.mockResolvedValue(userSession);

    const res = await PUT(makeIdRequest("c1", "PUT", { name: "Updated" }), { params: Promise.resolve({ id: "c1" }) });
    expect(res.status).toBe(401);
  });

  it("updates category successfully", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockUpdate.mockResolvedValue({
      id: "c1",
      name: "Updated Tech",
      slug: "tech",
      description: null,
      color: "#9f8be7",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
    });

    const res = await PUT(makeIdRequest("c1", "PUT", { name: "Updated Tech" }), { params: Promise.resolve({ id: "c1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.name).toBe("Updated Tech");
  });

  it("returns 404 when category not found", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const error = new Error("Record not found");
    (error as unknown as { code: string }).code = "P2025";
    mockUpdate.mockRejectedValue(error);

    const res = await PUT(makeIdRequest("nonexistent", "PUT", { name: "X" }), { params: Promise.resolve({ id: "nonexistent" }) });
    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/categories/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 if not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const res = await DELETE(makeIdRequest("c1", "DELETE"), { params: Promise.resolve({ id: "c1" }) });
    expect(res.status).toBe(401);
  });

  it("returns 401 if not ADMIN role", async () => {
    mockAuth.mockResolvedValue(userSession);

    const res = await DELETE(makeIdRequest("c1", "DELETE"), { params: Promise.resolve({ id: "c1" }) });
    expect(res.status).toBe(401);
  });

  it("deletes category successfully", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockDelete.mockResolvedValue({ id: "c1" });

    const res = await DELETE(makeIdRequest("c1", "DELETE"), { params: Promise.resolve({ id: "c1" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("returns 404 when category not found", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const error = new Error("Record not found");
    (error as unknown as { code: string }).code = "P2025";
    mockDelete.mockRejectedValue(error);

    const res = await DELETE(makeIdRequest("nonexistent", "DELETE"), { params: Promise.resolve({ id: "nonexistent" }) });
    expect(res.status).toBe(404);
  });
});
