import { Button } from "@/components/ui/Button";
import { PageShell } from "@/components/layout/PageShell";
import { getSiteContent } from "@/lib/content";

export default async function Tarifs() {
  const { pricing } = await getSiteContent();
  return (
    <PageShell>
      <section className="subpage">
        <section className="page-hero">
          <div>
            <p className="eyebrow">✦ Prestations & tarifs</p>
            <h1>
              Le détail
              <br />
              <em>en toute clarté.</em>
            </h1>
          </div>
          <p>
            Des tarifs simples à consulter. Les prestations personnalisées ou
            événementielles peuvent faire l'objet d'un devis.
          </p>
        </section>
        <section className="page-content pricing">
          {pricing.map((group) => (
            <div className="price-category" key={group.category}>
              <p className="eyebrow">✦ {group.category}</p>
              <h2>{group.category}</h2>
              {group.items.map((item) => (
                <div className="price-row" key={item.name}>
                  <span>{item.name}</span>
                  <span>—</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
          ))}
          <Button href="/rendez-vous">Prendre rendez-vous</Button>
        </section>
      </section>
    </PageShell>
  );
}
