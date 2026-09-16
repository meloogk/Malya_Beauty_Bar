import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { getSiteContent } from "@/lib/content";

export default async function Prestations() {
  const { services } = await getSiteContent();
  return (
    <PageShell>
      <section className="subpage">
        <section className="page-hero">
          <div>
            <p className="eyebrow">✦ Nos expertises</p>
            <h1>
              Nos <em>prestations.</em>
            </h1>
          </div>
          <p>
            Des gestes précis, des finitions soignées et une approche
            personnalisée pour les mains, le regard et les cheveux.
          </p>
        </section>
        <section className="page-content">
          <div className="service-grid">
            {services.map((service) => (
              <Link
                className="service-card"
                href={service.href}
                key={service.number}
              >
                <div className="service-image">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width:900px) 90vw, 30vw"
                    className="cover-image"
                  />
                </div>
                <div className="service-meta">
                  <span>{service.number}</span>
                  <span>{service.eyebrow}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="text-link">Explorer ↗</span>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </PageShell>
  );
}
