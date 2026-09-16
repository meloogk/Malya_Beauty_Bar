import Image from "next/image";
import { SplitText } from "@/components/animations/SplitText";
import { Button } from "@/components/ui/Button";
import type { SiteContent } from "@/types/content";

export function Hero({ content }: { content: SiteContent["hero"] }) {
  return (
    <section id="accueil" className="hero section-pad">
      <div className="hero-copy">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1><SplitText text={content.title} /></h1>
        <p className="hero-script">{content.script}</p>
        <p className="hero-description">{content.descriptor}</p>
        <p className="hero-body">{content.body}</p>
        <div className="hero-actions"><Button href="/rendez-vous">Prendre rendez-vous</Button><Button href="#prestations" variant="secondary">Découvrir nos prestations</Button></div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-wrap">
          <Image src={content.image} alt={content.imageAlt} fill priority sizes="(max-width: 900px) 90vw, 48vw" className="cover-image" />
        </div>
        <div className="hero-stamp">BEAUTÉ<br /><span>01 — 03</span></div>
      </div>
    </section>
  );
}
