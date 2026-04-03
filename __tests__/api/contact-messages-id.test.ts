import { describe, it, expect, beforeEach, vi } from "vitest";

// --- Mocks (hoisted) ---

vi.mock("@/lib/prisma", () => ({
  prisma: {
    contactMessage: {
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

// --- Imports ---

import { PATCH, DELETE } from "@/app/api/contact-messages/[id]/route";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

const mockUpdate = prisma.contactMessage.update as ReturnType<typeof vi.fn>;
const mockDelete = prisma.contactMessage.delete as ReturnType<typeof vi.fn>;
const mockRequireAdmin = requireAdmin as ReturnType<typeof vi.fn>;

function makePatch(id: string, body: Record<string, unknown>) {
  return new Request(`http://localhost:3000/api/contact-messages/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as any;
}

function makeDelete(id: string) {
  return new Request(`http://localhost:3000/api/contact-messages/${id}`, {
    method: "DELETE",
  }) as any;
}

describe("PATCH /api/contact-messages/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockRequireAdmin.mockResolvedValue(null);

    const res = await PATCH(makePatch("1", { isRead: true }), {
      params: Promise.resolve({ id: "1" }),
    });
    expect(res.status).toBe(401);
  });

  it("marks a message as read", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockUpdate.mockResolvedValue({ id: "1", name: "Ion", isRead: true });

    const res = await PATCH(makePatch("1", { isRead: true }), {
      params: Promise.resolve({ id: "1" }),
    });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.isRead).toBe(true);
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "1" },
      data: { isRead: true },
    });
  });

  it("returns 404 when message not found", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockUpdate.mockRejectedValue(new Error("Not found"));

    const res = await PATCH(makePatch("bad-id", { isRead: true }), {
      params: Promise.resolve({ id: "bad-id" }),
    });
    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/contact-messages/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockRequireAdmin.mockResolvedValue(null);

    const res = await DELETE(makeDelete("1"), {
      params: Promise.resolve({ id: "1" }),
    });
    expect(res.status).toBe(401);
  });

  it("deletes a message successfully", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockDelete.mockResolvedValue({ id: "1" });

    const res = await DELETE(makeDelete("1"), {
      params: Promise.resolve({ id: "1" }),
    });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(mockDelete).toHaveBeenCalledWith({ where: { id: "1" } });
  });

  it("returns 404 when message not found", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockDelete.mockRejectedValue(new Error("Not found"));

    const res = await DELETE(makeDelete("bad-id"), {
      params: Promise.resolve({ id: "bad-id" }),
    });
    expect(res.status).toBe(404);
  });
});
