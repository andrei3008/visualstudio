import { describe, it, expect, beforeEach, vi } from "vitest";

// --- Mocks (hoisted) ---

vi.mock("@/lib/prisma", () => ({
  prisma: {
    contactMessage: {
      findMany: vi.fn(),
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

import { GET } from "@/app/api/contact-messages/route";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

const mockFindMany = prisma.contactMessage.findMany as ReturnType<typeof vi.fn>;
const mockRequireAdmin = requireAdmin as ReturnType<typeof vi.fn>;

// Create a mock NextRequest with nextUrl
function makeGetRequest(url: string) {
  const parsed = new URL(url);
  return {
    nextUrl: {
      searchParams: parsed.searchParams,
      pathname: parsed.pathname,
    },
  } as any;
}

describe("GET /api/contact-messages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockRequireAdmin.mockResolvedValue(null);

    const res = await GET(makeGetRequest("http://localhost:3000/api/contact-messages"));
    expect(res.status).toBe(401);
  });

  it("returns messages when authenticated as admin", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindMany.mockResolvedValue([
      { id: "1", name: "Ion", email: "ion@test.com", isRead: false, message: "Salut" },
      { id: "2", name: "Maria", email: "maria@test.com", isRead: true, message: "Buna" },
    ]);

    const res = await GET(makeGetRequest("http://localhost:3000/api/contact-messages"));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(2);
    expect(body[0].name).toBe("Ion");
  });

  it("filters by isRead=false", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindMany.mockResolvedValue([]);

    await GET(makeGetRequest("http://localhost:3000/api/contact-messages?isRead=false"));

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ isRead: false }),
      })
    );
  });

  it("searches by name/email/company/message", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindMany.mockResolvedValue([]);

    await GET(makeGetRequest("http://localhost:3000/api/contact-messages?search=ion"));

    const call = mockFindMany.mock.calls[0][0];
    expect(call.where.OR).toBeDefined();
    expect(call.where.OR).toHaveLength(4);
  });

  it("orders by createdAt desc", async () => {
    mockRequireAdmin.mockResolvedValue({ user: { id: "1", role: "ADMIN" } });
    mockFindMany.mockResolvedValue([]);

    await GET(makeGetRequest("http://localhost:3000/api/contact-messages"));

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { createdAt: "desc" } })
    );
  });
});
