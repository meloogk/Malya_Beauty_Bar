import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { requireAdmin } from "@/lib/admin-response";
import { siteContentSchema } from "@/lib/content-schema";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  return NextResponse.json(await getSiteContent());
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const parsed = siteContentSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ message: "Le contenu envoyé ne respecte pas le format attendu." }, { status: 422 });
    }
    await saveSiteContent(parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "Le contenu est invalide ou impossible à enregistrer." }, { status: 400 });
  }
}
