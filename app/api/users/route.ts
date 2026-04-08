import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search");
  const role = searchParams.get("role");

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
    ];
  }

  if (role) {
    where.role = role;
  }

  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { email, name, password, role } = body;

  if (!email || !name || !password) {
    return NextResponse.json(
      { error: "Email, nume și parolă sunt obligatorii" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Parola trebuie să aibă minim 8 caractere" },
      { status: 400 }
    );
  }

  const validRoles = ["ADMIN", "EDITOR", "VIEWER"];
  const userRole = role || "VIEWER";
  if (!validRoles.includes(userRole)) {
    return NextResponse.json({ error: "Rol invalid" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Există deja un utilizator cu acest email" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: userRole,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
