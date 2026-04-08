import { describe, it, expect, beforeEach, vi } from "vitest";

// --- Mocks (hoisted) ---

vi.mock("@/lib/prisma", () => ({
  prisma: {
    setting: {
      findMany: vi.fn(),
      upsert: vi.fn(),
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

// --- Imports ---

import { GET, PUT } from "@/app/api/settings/route";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

const mockFindMany = prisma.setting.findMany as ReturnType<typeof vi.fn>;
const mockUpsert = prisma.setting.upsert as ReturnType<typeof vi.fn>;
const mockRequireAdmin = requireAdmin as ReturnType<typeof vi.fn>;

describe("GET /api/settings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockRequireAdmin.mockResolvedValue(null);

    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns settings with defaults merged", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindMany.mockResolvedValue([
      { key: "site_name", value: "Custom Name", updatedAt: "2026-01-01" },
      { key: "contact_email", value: "custom@test.com", updatedAt: "2026-01-01" },
    ]);

    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    // Overridden values
    expect(body.settings.site_name).toBe("Custom Name");
    expect(body.settings.contact_email).toBe("custom@test.com");
    // Default values for unset keys
    expect(body.settings.site_description).toBeDefined();
    expect(body.settings.meta_default_title).toBeDefined();
    // Should have defaults object too
    expect(body.defaults).toBeDefined();
  });

  it("returns all defaults when no settings in DB", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindMany.mockResolvedValue([]);

    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.settings.site_name).toBe("Visual Studio Concept");
    expect(body.settings.contact_email).toBe("contact@visualstudio.ro");
    expect(body.settings.social_facebook).toBe("");
  });
});

describe("PUT /api/settings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockRequireAdmin.mockResolvedValue(null);

    const req = new Request("http://localhost:3000/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: { site_name: "Test" } }),
    }) as any;

    const res = await PUT(req);
    expect(res.status).toBe(401);
  });

  it("upserts multiple settings", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockUpsert.mockResolvedValue({ key: "x", value: "y" });

    const req = new Request("http://localhost:3000/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        settings: {
          site_name: "New Name",
          contact_email: "new@test.com",
        },
      }),
    }) as any;

    const res = await PUT(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);

    // Should have been called twice (once per setting)
    expect(mockUpsert).toHaveBeenCalledTimes(2);
  });

  it("returns 400 when settings is missing", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });

    const req = new Request("http://localhost:3000/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }) as any;

    const res = await PUT(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when settings is not an object", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });

    const req = new Request("http://localhost:3000/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: "invalid" }),
    }) as any;

    const res = await PUT(req);
    expect(res.status).toBe(400);
  });
});
