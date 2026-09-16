import { Reveal } from "@/components/animations/Reveal";
import type { SiteContent } from "@/types/content";

export function Signature({ content }: { content: SiteContent["signature"] }) {
  return (
    <section id="apropos" className="signature section-pad">
      <div className="signature-intro"><Reveal><p className="eyebrow">{content.eyebrow}</p><h2>{content.title}</h2></Reveal></div>
      <div className="values">
        {content.values.map((value, index) => <Reveal key={value.number} delay={index * 0.08} className="value"><span>{value.number}</span><h3>{value.title}</h3><p>{value.description}</p></Reveal>)}
      </div>
    </section>
  );
}
