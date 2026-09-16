import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteContent } from "@/lib/content";

export async function PageShell({ children }: { children: ReactNode }) {
  const { brand } = await getSiteContent();
  return (
    <>
      <Navbar name={brand.name} tagline={brand.tagline} />
      <main>{children}</main>
      <Footer {...brand} />
    </>
  );
}
