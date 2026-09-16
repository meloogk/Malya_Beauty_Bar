import { NextResponse } from "next/server";
import { areAdminCredentialsValid, setAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: unknown; password?: unknown };
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!areAdminCredentialsValid(email, password)) {
    return NextResponse.json({ message: "Identifiants invalides." }, { status: 401 });
  }

  await setAdminSession(email);
  return NextResponse.json({ ok: true });
}
