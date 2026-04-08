import { describe, it, expect, beforeEach, vi } from "vitest";

// --- Mocks (hoisted) ---

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

vi.mock("@/lib/auth-guard", () => ({
  requireAdmin: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
  handlers: {},
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn().mockResolvedValue("hashed_password"),
    compare: vi.fn().mockResolvedValue(true),
  },
}));

// --- Imports ---

import { GET, PATCH, DELETE } from "@/app/api/users/[id]/route";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import bcrypt from "bcryptjs";

const mockFindUnique = prisma.user.findUnique as ReturnType<typeof vi.fn>;
const mockUpdate = prisma.user.update as ReturnType<typeof vi.fn>;
const mockDelete = prisma.user.delete as ReturnType<typeof vi.fn>;
const mockRequireAdmin = requireAdmin as ReturnType<typeof vi.fn>;
const mockHash = bcrypt.hash as ReturnType<typeof vi.fn>;

describe("GET /api/users/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockRequireAdmin.mockResolvedValue(null);

    const req = {} as any;
    const res = await GET(req, { params: Promise.resolve({ id: "123" }) });
    expect(res.status).toBe(401);
  });

  it("returns user by id", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindUnique.mockResolvedValue({
      id: "123",
      email: "test@test.com",
      name: "Test",
      role: "EDITOR",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
    });

    const res = await GET({} as any, { params: Promise.resolve({ id: "123" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.email).toBe("test@test.com");
    expect(body.role).toBe("EDITOR");
  });

  it("returns 404 when user not found", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindUnique.mockResolvedValue(null);

    const res = await GET({} as any, { params: Promise.resolve({ id: "nonexistent" }) });
    expect(res.status).toBe(404);
  });
});

describe("PATCH /api/users/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockRequireAdmin.mockResolvedValue(null);

    const req = new Request("http://localhost:3000/api/users/123", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "New Name" }),
    }) as any;

    const res = await PATCH(req, { params: Promise.resolve({ id: "123" }) });
    expect(res.status).toBe(401);
  });

  it("updates user name and email", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "admin-1", role: "ADMIN" } });
    mockFindUnique.mockResolvedValue(null); // no email conflict
    mockUpdate.mockResolvedValue({
      id: "123",
      email: "new@test.com",
      name: "New Name",
      role: "EDITOR",
      createdAt: "2026-01-01",
      updatedAt: "2026-04-08",
    });

    const req = new Request("http://localhost:3000/api/users/123", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "New Name", email: "new@test.com" }),
    }) as any;

    const res = await PATCH(req, { params: Promise.resolve({ id: "123" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.name).toBe("New Name");
  });

  it("updates password with hashing", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "admin-1", role: "ADMIN" } });
    mockHash.mockResolvedValue("new_hashed");
    mockUpdate.mockResolvedValue({ id: "123", name: "Test" });

    const req = new Request("http://localhost:3000/api/users/123", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "newpassword" }),
    }) as any;

    const res = await PATCH(req, { params: Promise.resolve({ id: "123" }) });
    expect(res.status).toBe(200);

    expect(mockHash).toHaveBeenCalledWith("newpassword", 12);
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ password: "new_hashed" }),
      })
    );
  });

  it("rejects password shorter than 8 chars", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "admin-1", role: "ADMIN" } });

    const req = new Request("http://localhost:3000/api/users/123", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "short" }),
    }) as any;

    const res = await PATCH(req, { params: Promise.resolve({ id: "123" }) });
    expect(res.status).toBe(400);
  });

  it("prevents changing own role", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "admin-1", role: "ADMIN" } });

    const req = new Request("http://localhost:3000/api/users/admin-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "VIEWER" }),
    }) as any;

    const res = await PATCH(req, { params: Promise.resolve({ id: "admin-1" }) });
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toContain("propriul rol");
  });

  it("returns 409 on email conflict", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "admin-1", role: "ADMIN" } });
    mockFindUnique.mockResolvedValue({ id: "other-user", email: "taken@test.com" });

    const req = new Request("http://localhost:3000/api/users/123", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "taken@test.com" }),
    }) as any;

    const res = await PATCH(req, { params: Promise.resolve({ id: "123" }) });
    expect(res.status).toBe(409);
  });

  it("returns 400 when no changes specified", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "admin-1", role: "ADMIN" } });

    const req = new Request("http://localhost:3000/api/users/123", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }) as any;

    const res = await PATCH(req, { params: Promise.resolve({ id: "123" }) });
    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/users/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockRequireAdmin.mockResolvedValue(null);

    const res = await DELETE({} as any, { params: Promise.resolve({ id: "123" }) });
    expect(res.status).toBe(401);
  });

  it("deletes a user successfully", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "admin-1", role: "ADMIN" } });
    mockDelete.mockResolvedValue({ id: "123" });

    const res = await DELETE({} as any, { params: Promise.resolve({ id: "123" }) });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("prevents deleting own account", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "admin-1", role: "ADMIN" } });

    const res = await DELETE({} as any, { params: Promise.resolve({ id: "admin-1" }) });
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toContain("propriul cont");
  });

  it("returns 404 when user not found", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "admin-1", role: "ADMIN" } });
    mockDelete.mockRejectedValue(new Error("Not found"));

    const res = await DELETE({} as any, { params: Promise.resolve({ id: "nonexistent" }) });
    expect(res.status).toBe(404);
  });
});
