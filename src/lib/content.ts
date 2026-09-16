import { promises as fs } from "node:fs";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import type { SiteContent } from "@/types/content";

const contentPath = process.env.CONTENT_FILE
  ? path.resolve(process.env.CONTENT_FILE)
  : path.join(process.cwd(), "data", "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  noStore();
  const raw = await fs.readFile(contentPath, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await fs.mkdir(path.dirname(contentPath), { recursive: true });
  const tempPath = `${contentPath}.tmp`;
  await fs.writeFile(tempPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  await fs.rename(tempPath, contentPath);
}
