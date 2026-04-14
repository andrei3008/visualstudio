import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { action } = body as { action: string };

  try {
    switch (action) {
      case "clear-next-cache":
        return await handleClearNextCache();
      case "optimize-db":
        return await handleOptimizeDb();
      case "revalidate-pages":
        return await handleRevalidatePages();
      case "system-info":
        return await handleSystemInfo();
      default:
        return NextResponse.json(
          { error: "Acțiune necunoscută" },
          { status: 400 }
        );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare necunoscută";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return await handleSystemInfo();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare necunoscută";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function handleClearNextCache() {
  const cacheDir = path.join(process.cwd(), ".next", "cache");
  let deletedFiles = 0;
  let freedBytes = 0;

  if (fs.existsSync(cacheDir)) {
    const result = deleteDirectoryRecursive(cacheDir);
    deletedFiles = result.files;
    freedBytes = result.bytes;
  }

  return NextResponse.json({
    success: true,
    message: `Cache șters: ${deletedFiles} fișiere, ${formatBytes(freedBytes)} eliberați`,
    deletedFiles,
    freedBytes,
  });
}

async function handleOptimizeDb() {
  // Get DB size before
  const dbPath = await getDbPath();
  const sizeBefore = fs.existsSync(dbPath) ? fs.statSync(dbPath).size : 0;

  // Run SQLite VACUUM to reclaim space and optimize
  await prisma.$executeRawUnsafe("PRAGMA wal_checkpoint(TRUNCATE)");
  await prisma.$executeRawUnsafe("VACUUM");

  // Get DB size after
  const sizeAfter = fs.existsSync(dbPath) ? fs.statSync(dbPath).size : 0;
  const freed = sizeBefore - sizeAfter;

  // Get table counts
  const tables = ["User", "Post", "Category", "Setting", "ContactMessage"];
  const counts: Record<string, number> = {};
  for (const table of tables) {
    try {
      const result = await prisma.$queryRawUnsafe(
        `SELECT COUNT(*) as count FROM "${table}"`
      );
      counts[table] = (result as Array<{ count: number }>)[0]?.count ?? 0;
    } catch {
      counts[table] = -1;
    }
  }

  return NextResponse.json({
    success: true,
    message: `BD optimizată. Dimensiune: ${formatBytes(sizeBefore)} → ${formatBytes(sizeAfter)} (${freed > 0 ? formatBytes(freed) + " eliberați" : "fără schimbare"})`,
    sizeBefore,
    sizeAfter,
    freed,
    counts,
  });
}

async function handleRevalidatePages() {
  const pages = [
    "/",
    "/blog",
    "/site-uri-prezentare-magazine-online",
    "/automatizari-firme",
    "/software-custom-firme",
    "/servicii",
    "/contact",
    "/despre-noi",
  ];

  let revalidated = 0;
  const errors: string[] = [];

  for (const page of pages) {
    try {
      revalidatePath(page, "layout");
      revalidated++;
    } catch {
      errors.push(page);
    }
  }

  // Also revalidate the sitemap
  try {
    revalidatePath("/sitemap.xml");
    revalidated++;
  } catch {
    errors.push("/sitemap.xml");
  }

  return NextResponse.json({
    success: true,
    message: `${revalidated} pagini revalidate${errors.length > 0 ? ` (${errors.length} erori)` : ""}`,
    revalidated,
    errors,
    pages,
  });
}

async function handleSystemInfo() {
  const dbPath = await getDbPath();
  const dbSize = fs.existsSync(dbPath) ? fs.statSync(dbPath).size : 0;

  // Cache size
  const cacheDir = path.join(process.cwd(), ".next", "cache");
  let cacheSize = 0;
  let cacheFiles = 0;
  if (fs.existsSync(cacheDir)) {
    const result = getDirectorySize(cacheDir);
    cacheSize = result.bytes;
    cacheFiles = result.files;
  }

  // Disk usage (approximate for project)
  let projectSize = 0;
  try {
    const distDir = path.join(process.cwd(), ".next");
    if (fs.existsSync(distDir)) {
      projectSize = getDirectorySize(distDir).bytes;
    }
  } catch {
    // ignore
  }

  // Uptime
  const uptime = process.uptime();

  // Memory
  const mem = process.memoryUsage();

  return NextResponse.json({
    success: true,
    db: {
      size: dbSize,
      sizeFormatted: formatBytes(dbSize),
      path: dbPath,
    },
    cache: {
      size: cacheSize,
      sizeFormatted: formatBytes(cacheSize),
      files: cacheFiles,
    },
    build: {
      size: projectSize,
      sizeFormatted: formatBytes(projectSize),
    },
    runtime: {
      uptime: formatUptime(uptime),
      uptimeSeconds: Math.round(uptime),
      memoryRss: formatBytes(mem.rss),
      memoryHeap: formatBytes(mem.heapUsed),
      nodeVersion: process.version,
    },
  });
}

// Helper to find the SQLite database file path
async function getDbPath(): Promise<string> {
  const dbUrl = process.env.DATABASE_URL || "file:./dev.db";
  const relativePath = dbUrl.replace("file:", "").replace(/^\/\//, "");
  return path.resolve(process.cwd(), relativePath);
}

// Recursively delete a directory and count files/bytes
function deleteDirectoryRecursive(dirPath: string): {
  files: number;
  bytes: number;
} {
  let files = 0;
  let bytes = 0;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const result = deleteDirectoryRecursive(fullPath);
      files += result.files;
      bytes += result.bytes;
      fs.rmdirSync(fullPath);
    } else {
      const stat = fs.statSync(fullPath);
      bytes += stat.size;
      files++;
      fs.unlinkSync(fullPath);
    }
  }
  return { files, bytes };
}

// Get total size and file count of a directory
function getDirectorySize(dirPath: string): { files: number; bytes: number } {
  let files = 0;
  let bytes = 0;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const result = getDirectorySize(fullPath);
      files += result.files;
      bytes += result.bytes;
    } else {
      try {
        const stat = fs.statSync(fullPath);
        bytes += stat.size;
        files++;
      } catch {
        // ignore broken symlinks etc
      }
    }
  }
  return { files, bytes };
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}z`);
  if (hours > 0) parts.push(`${hours}h`);
  parts.push(`${mins}m`);
  return parts.join(" ");
}
