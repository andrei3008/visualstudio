import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

// Default settings that exist on first install
const DEFAULT_SETTINGS: Record<string, string> = {
  site_name: "Visual Studio Concept",
  site_description: "Creăm soluții digitale personalizate pentru afacerea ta",
  contact_email: "contact@visualstudio.ro",
  phone: "",
  address: "",
  social_facebook: "",
  social_instagram: "",
  social_linkedin: "",
  social_tiktok: "",
  meta_default_title: "Visual Studio Concept — Soluții Digitale",
  meta_default_description: "Site-uri web, aplicații, automatizări și software custom pentru firme din România.",
  google_analytics_id: "",
};

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.setting.findMany();
  const settingsMap: Record<string, string> = {};

  // Fill with defaults first, then override with DB values
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    settingsMap[key] = value;
  }
  for (const s of settings) {
    settingsMap[s.key] = s.value;
  }

  return NextResponse.json({ settings: settingsMap, defaults: DEFAULT_SETTINGS });
}

export async function PUT(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { settings } = body as { settings: Record<string, string> };

  if (!settings || typeof settings !== "object") {
    return NextResponse.json(
      { error: "Format invalid" },
      { status: 400 }
    );
  }

  // Upsert each setting
  const operations = Object.entries(settings).map(([key, value]) =>
    prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  );

  await Promise.all(operations);

  return NextResponse.json({ success: true });
}
