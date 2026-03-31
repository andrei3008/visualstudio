import { auth } from "./auth";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) return null;
  if ((session.user as { role: string }).role !== "ADMIN") return null;
  return session;
}
