import { describe, it, expect, beforeEach, vi } from "vitest";

// --- Mocks (hoisted) ---

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
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

import { GET, POST } from "@/app/api/users/route";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import bcrypt from "bcryptjs";

const mockFindMany = prisma.user.findMany as ReturnType<typeof vi.fn>;
const mockFindUnique = prisma.user.findUnique as ReturnType<typeof vi.fn>;
const mockCreate = prisma.user.create as ReturnType<typeof vi.fn>;
const mockRequireAdmin = requireAdmin as ReturnType<typeof vi.fn>;
const mockHash = bcrypt.hash as ReturnType<typeof vi.fn>;

function makeGetRequest(url: string) {
  const parsed = new URL(url);
  return {
    nextUrl: {
      searchParams: parsed.searchParams,
      pathname: parsed.pathname,
    },
  } as any;
}

describe("GET /api/users", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockRequireAdmin.mockResolvedValue(null);

    const res = await GET(makeGetRequest("http://localhost:3000/api/users"));
    expect(res.status).toBe(401);
  });

  it("returns users when authenticated as admin", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindMany.mockResolvedValue([
      { id: "1", email: "admin@test.com", name: "Admin", role: "ADMIN", createdAt: "2026-01-01" },
      { id: "2", email: "editor@test.com", name: "Editor", role: "EDITOR", createdAt: "2026-02-01" },
    ]);

    const res = await GET(makeGetRequest("http://localhost:3000/api/users"));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(2);
    expect(body[0].email).toBe("admin@test.com");
  });

  it("filters by search term", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindMany.mockResolvedValue([]);

    await GET(makeGetRequest("http://localhost:3000/api/users?search=admin"));

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: expect.arrayContaining([
            { name: { contains: "admin" } },
            { email: { contains: "admin" } },
          ]),
        }),
      })
    );
  });

  it("filters by role", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindMany.mockResolvedValue([]);

    await GET(makeGetRequest("http://localhost:3000/api/users?role=EDITOR"));

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ role: "EDITOR" }),
      })
    );
  });

  it("excludes password from response", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindMany.mockResolvedValue([]);

    await GET(makeGetRequest("http://localhost:3000/api/users"));

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        select: expect.objectContaining({
          id: true,
          email: true,
          name: true,
          role: true,
        }),
      })
    );
    // select should NOT contain password
    const selectArg = mockFindMany.mock.calls[0][0].select;
    expect(selectArg.password).toBeUndefined();
  });
});

describe("POST /api/users", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockRequireAdmin.mockResolvedValue(null);

    const req = new Request("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@test.com", name: "Test", password: "12345678" }),
    }) as any;

    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("creates a user successfully", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindUnique.mockResolvedValue(null); // no existing user
    mockHash.mockResolvedValue("hashed_12345678");
    mockCreate.mockResolvedValue({
      id: "new-id",
      email: "test@test.com",
      name: "Test User",
      role: "VIEWER",
      createdAt: "2026-04-08",
      updatedAt: "2026-04-08",
    });

    const req = new Request("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@test.com", name: "Test User", password: "12345678" }),
    }) as any;

    const res = await POST(req);
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.email).toBe("test@test.com");
    expect(body.role).toBe("VIEWER");
  });

  it("returns 400 when email is missing", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });

    const req = new Request("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test", password: "12345678" }),
    }) as any;

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when password is too short", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });

    const req = new Request("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@test.com", name: "Test", password: "123" }),
    }) as any;

    const res = await POST(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toContain("8 caractere");
  });

  it("returns 409 when email already exists", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindUnique.mockResolvedValue({ id: "existing", email: "test@test.com" });

    const req = new Request("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@test.com", name: "Test", password: "12345678" }),
    }) as any;

    const res = await POST(req);
    expect(res.status).toBe(409);
  });

  it("returns 400 for invalid role", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindUnique.mockResolvedValue(null);

    const req = new Request("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@test.com", name: "Test", password: "12345678", role: "SUPERUSER" }),
    }) as any;

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("hashes password before saving", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindUnique.mockResolvedValue(null);
    mockHash.mockResolvedValue("bcrypt_hashed");
    mockCreate.mockResolvedValue({ id: "x" });

    const req = new Request("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@test.com", name: "Test", password: "mypassword" }),
    }) as any;

    await POST(req);

    expect(mockHash).toHaveBeenCalledWith("mypassword", 12);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ password: "bcrypt_hashed" }),
      })
    );
  });
});
