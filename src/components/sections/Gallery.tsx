import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import type { SiteContent } from "@/types/content";

export function Gallery({ content }: { content: SiteContent["gallery"] }) {
  return (
    <section id="realisations" className="gallery-section section-pad">
      <div className="section-heading gallery-heading"><Reveal><p className="eyebrow">{content.eyebrow}</p><h2>{content.title}</h2></Reveal><Reveal delay={0.1}><p>{content.description}</p></Reveal></div>
      <div className="gallery-grid">
        {content.items.map((item, index) => <Reveal key={`${item.title}-${index}`} delay={(index % 3) * 0.06} className={`gallery-item gallery-${index + 1}`}><div className="gallery-image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 800px) 45vw, 25vw" className="cover-image" /></div><div className="gallery-caption"><span>{item.category}</span><strong>{item.title}</strong></div></Reveal>)}
      </div>
    </section>
  );
}
