import { Button } from "@/components/ui/Button";
import { PageShell } from "@/components/layout/PageShell";
import { getSiteContent } from "@/lib/content";

export default async function Contact() {
  const { brand, contact } = await getSiteContent();
  return (
    <PageShell>
      <section className="subpage">
        <section className="page-hero">
          <div>
            <p className="eyebrow">{contact.eyebrow}</p>
            <h1>{contact.title}</h1>
          </div>
          <p>{contact.description}</p>
        </section>
        <section className="page-content">
          <div className="contact-grid">
            <div>
              <div className="contact-card">
                <p className="eyebrow">Téléphone</p>
                <h3>{brand.phone}</h3>
                <p>Lundi — Samedi · 09:00 — 19:00</p>
              </div>
              <div className="contact-card">
                <p className="eyebrow">Email</p>
                <h3>{brand.email}</h3>
              </div>
              <div className="contact-card">
                <p className="eyebrow">Adresse</p>
                <h3>{brand.city}</h3>
              </div>
            </div>
            <div>
              <div className="contact-card">
                <p className="eyebrow">Instagram</p>
                <h3>{contact.instagram}</h3>
                <p>Suivez nos dernières réalisations et nouveautés.</p>
              </div>
              <Button href="/rendez-vous">Prendre rendez-vous</Button>
            </div>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
