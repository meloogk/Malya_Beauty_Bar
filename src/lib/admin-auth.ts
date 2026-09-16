import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "beauty_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

function secret(): string {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) throw new Error("ADMIN_SESSION_SECRET is missing");
  return value;
}

function signature(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createAdminSession(email: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const payload = `${email}.${timestamp}`;
  return `${payload}.${signature(payload)}`;
}

export function isValidAdminSession(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [email, timestampText, providedSignature] = parts;
  const timestamp = Number(timestampText);
  if (!email || !Number.isFinite(timestamp)) return false;
  if (Math.floor(Date.now() / 1000) - timestamp > SESSION_MAX_AGE) return false;

  const expected = signature(`${email}.${timestampText}`);
  const provided = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expected);
  return provided.length === expectedBuffer.length && timingSafeEqual(provided, expectedBuffer);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return isValidAdminSession(store.get(COOKIE_NAME)?.value);
}

export async function setAdminSession(email: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, createAdminSession(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
}

export function areAdminCredentialsValid(email: string, password: string): boolean {
  const configuredEmail = process.env.ADMIN_EMAIL;
  const configuredPassword = process.env.ADMIN_PASSWORD;
  return Boolean(configuredEmail && configuredPassword && email === configuredEmail && password === configuredPassword);
}
