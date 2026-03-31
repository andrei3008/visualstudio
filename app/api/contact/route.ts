import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, message, company, phone, projectType, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
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

    return NextResponse.json(contactMessage, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
