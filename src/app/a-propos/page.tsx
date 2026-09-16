import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { PageShell } from "@/components/layout/PageShell";
import { getSiteContent } from "@/lib/content";

export default async function Apropos() {
  const { about } = await getSiteContent();
  return (
    <PageShell>
      <section className="subpage">
        <section className="page-hero">
          <div>
            <p className="eyebrow">{about.eyebrow}</p>
            <h1>{about.title}</h1>
          </div>
          <p>{about.intro}</p>
        </section>
        <section className="page-content">
          <div className="about-grid">
            <div className="about-image">
              <Image
                src={about.image}
                alt={about.imageAlt}
                fill
                sizes="(max-width:900px) 90vw, 45vw"
                className="cover-image"
              />
            </div>
            <div>
              <p className="eyebrow">✦ Notre philosophie</p>
              <h2>{about.philosophyTitle}</h2>
              <p>{about.philosophyText}</p>
              <Button href="/rendez-vous">Vivre l’expérience</Button>
            </div>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
