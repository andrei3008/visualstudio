import { describe, it, expect, beforeEach, vi } from "vitest";

// --- Mocks (hoisted) ---

vi.mock("@/lib/prisma", () => ({
  prisma: {
    contactMessage: {
      create: vi.fn(),
    },
  },
}));

vi.mock("@/lib/rate-limit", () => {
  const mockFn = vi.fn().mockReturnValue({
    allowed: true,
    remaining: 4,
    resetAt: Date.now() + 3600000,
  });
  return { rateLimit: mockFn };
});

vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
  handlers: {},
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// --- Imports ---

import { POST } from "@/app/api/contact/route";
import { prisma } from "@/lib/prisma";

const mockCreate = prisma.contactMessage.create as ReturnType<typeof vi.fn>;

function postContact(data: Record<string, string>) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "127.0.0.1",
    },
    body: JSON.stringify(data),
  }) as any;
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when name is missing", async () => {
    const res = await POST(postContact({ email: "test@test.com", message: "hello" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it("returns 400 when email is missing", async () => {
    const res = await POST(postContact({ name: "Test", message: "hello" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when message is missing", async () => {
    const res = await POST(postContact({ name: "Test", email: "test@test.com" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(postContact({ name: "Test", email: "not-email", message: "hello" }));
    expect(res.status).toBe(400);
  });

  it("creates a message and returns 201", async () => {
    mockCreate.mockResolvedValue({
      id: "clx123", name: "Andrei", email: "andrei@test.com", message: "Vreau un site",
    });

    const res = await POST(postContact({
      name: "Andrei", email: "andrei@test.com", message: "Vreau un site",
      company: "Test SRL", phone: "0721234567", projectType: "website", budget: "1000-3000",
    }));

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.name).toBe("Andrei");

    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        name: "Andrei", email: "andrei@test.com", message: "Vreau un site",
        company: "Test SRL", phone: "0721234567", projectType: "website", budget: "1000-3000",
      },
    });
  });

  it("handles optional fields as null", async () => {
    mockCreate.mockResolvedValue({ id: "1" });

    const res = await POST(postContact({ name: "Test", email: "test@test.com", message: "Mesaj" }));
    expect(res.status).toBe(201);

    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        name: "Test", email: "test@test.com", message: "Mesaj",
        company: null, phone: null, projectType: null, budget: null,
      },
    });
  });

  it("returns 500 when database fails", async () => {
    mockCreate.mockRejectedValue(new Error("DB error"));

    const res = await POST(postContact({ name: "Test", email: "test@test.com", message: "Mesaj" }));
    expect(res.status).toBe(500);
  });
});
