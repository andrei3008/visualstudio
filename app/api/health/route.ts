import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const start = Date.now();
  let dbStatus = "connected";

  try {
    await prisma.$queryRaw`SELECT 1 as result`;
  } catch {
    dbStatus = "disconnected";
  }

  const responseTime = Date.now() - start;
  const isHealthy = dbStatus === "connected";

  return NextResponse.json(
    {
      status: isHealthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || "1.0.0",
      database: dbStatus,
      responseTime: `${responseTime}ms`,
    },
    { status: isHealthy ? 200 : 503 }
  );
}
