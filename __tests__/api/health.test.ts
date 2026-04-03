import { describe, it, expect, beforeEach, vi } from "vitest";

// --- Mocks (hoisted) ---

vi.mock("@/lib/prisma", () => ({
  prisma: {
    $queryRaw: vi.fn(),
  },
}));

vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
  handlers: {},
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// --- Imports ---

import { GET } from "@/app/api/health/route";
import { prisma } from "@/lib/prisma";

const mockQueryRaw = prisma.$queryRaw as ReturnType<typeof vi.fn>;

describe("GET /api/health", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 with status ok when database is connected", async () => {
    mockQueryRaw.mockResolvedValue([{ result: 1 }]);

    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.status).toBe("ok");
    expect(body.database).toBe("connected");
    expect(body.timestamp).toBeDefined();
    expect(body.uptime).toBeDefined();
  });

  it("returns 503 when database is down", async () => {
    mockQueryRaw.mockRejectedValue(new Error("Connection refused"));

    const res = await GET();
    expect(res.status).toBe(503);

    const body = await res.json();
    expect(body.status).toBe("degraded");
    expect(body.database).toBe("disconnected");
  });

  it("includes version info", async () => {
    mockQueryRaw.mockResolvedValue([{ result: 1 }]);

    const res = await GET();
    const body = await res.json();
    expect(body.version).toBeDefined();
  });
});
