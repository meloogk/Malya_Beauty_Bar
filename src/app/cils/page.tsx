import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { PageShell } from "@/components/layout/PageShell";
import { getSiteContent } from "@/lib/content";

export default async function Cils() {
  const { services, pricing } = await getSiteContent();
  const service = services[1];
  const prices =
    pricing.find((group) => group.category === "Cils")?.items ?? [];
  return (
    <PageShell>
      <section className="subpage">
        <section className="page-hero">
          <div>
            <p className="eyebrow">
              ✦ {service.number} · {service.eyebrow}
            </p>
            <h1>
              Un regard
              <br />
              <em>captivant.</em>
            </h1>
          </div>
          <p>{service.description}</p>
        </section>
        <section className="page-content">
          <div className="service-detail">
            <div className="detail-image">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width:900px) 90vw, 45vw"
                className="cover-image"
              />
            </div>
            <div className="detail-copy">
              <p className="eyebrow">✦ Regard signature</p>
              <h2>
                Subtilité,
                <br />
                <em>intensité.</em>
              </h2>
              <p>
                Du rehaussement au volume, nous cherchons le juste équilibre
                entre caractère et naturel.
              </p>
              <ul className="detail-list">
                {prices.map((item) => (
                  <li key={item.name}>
                    {item.name} <span>{item.price}</span>
                  </li>
                ))}
              </ul>
              <Button href="/rendez-vous">Réserver cette prestation</Button>
            </div>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
