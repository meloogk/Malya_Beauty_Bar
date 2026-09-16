import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import type { Service } from "@/types/content";

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="prestations" className="services section-pad">
      <div className="section-heading">
        <Reveal><p className="eyebrow">✦ Nos expertises</p><h2>L’art de révéler<br /><em>votre beauté.</em></h2></Reveal>
        <Reveal delay={0.1}><p>Trois univers, une même exigence : créer une mise en beauté qui vous ressemble.</p></Reveal>
      </div>
      <div className="service-grid">
        {services.map((service, index) => (
          <Reveal key={service.number} delay={index * 0.08} className={index === 1 ? "service-card service-card-offset" : "service-card"}>
            <Link href={service.href}>
              <div className="service-image"><Image src={service.image} alt={service.title} fill sizes="(max-width: 800px) 90vw, 30vw" className="cover-image" /></div>
              <div className="service-meta"><span>{service.number}</span><span>{service.eyebrow}</span></div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="text-link">Découvrir <b>↗</b></span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
