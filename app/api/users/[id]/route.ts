import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import bcrypt from "bcryptjs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Utilizator negăsit" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { name, email, role, password } = body;

  // Prevent self-deactivation
  const currentUserId = (session.user as { id: string }).id;
  if (id === currentUserId && role && role !== "ADMIN") {
    return NextResponse.json(
      { error: "Nu poți schimba propriul rol" },
      { status: 400 }
    );
  }

  const data: Record<string, unknown> = {};
  if (name !== undefined) data.name = name;
  if (email !== undefined) data.email = email;
  if (role !== undefined) {
    const validRoles = ["ADMIN", "EDITOR", "VIEWER"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Rol invalid" }, { status: 400 });
    }
    data.role = role;
  }
  if (password) {
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Parola trebuie să aibă minim 8 caractere" },
        { status: 400 }
      );
    }
    data.password = await bcrypt.hash(password, 12);
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { error: "Nicio modificare specificată" },
      { status: 400 }
    );
  }

  // Check email uniqueness if changing
  if (email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.id !== id) {
      return NextResponse.json(
        { error: "Există deja un utilizator cu acest email" },
        { status: 409 }
      );
    }
  }

  try {
    const updated = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Utilizator negăsit" },
      { status: 404 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const currentUserId = (session.user as { id: string }).id;

  if (id === currentUserId) {
    return NextResponse.json(
      { error: "Nu poți șterge propriul cont" },
      { status: 400 }
    );
  }

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Utilizator negăsit" },
      { status: 404 }
    );
  }
}
