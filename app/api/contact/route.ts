import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limit: 5 requests per IP per hour
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { allowed, remaining, resetAt } = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Prea multe cereri. Încearcă din nou mai târziu." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const body = await request.json();

    const { name, email, message, company, phone, projectType, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        {
          status: 400,
          headers: { "X-RateLimit-Remaining": String(remaining) },
        }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        {
          status: 400,
          headers: { "X-RateLimit-Remaining": String(remaining) },
        }
      );
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        company: company || null,
        phone: phone || null,
        projectType: projectType || null,
        budget: budget || null,
      },
    });

    return NextResponse.json(contactMessage, {
      status: 201,
      headers: { "X-RateLimit-Remaining": String(remaining) },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
