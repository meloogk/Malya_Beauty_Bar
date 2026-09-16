import Link from "next/link";

type FooterProps = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  city: string;
};

export function Footer({ name, tagline, description, phone, email, city }: FooterProps) {
  return <footer className="footer"><div className="footer-main"><div><div className="footer-brand"><span className="brand-mark">ED</span><div><strong>{name}</strong><small>{tagline}</small></div></div><p>{description}</p></div><div className="footer-links"><div><span>Navigation</span><Link href="/">Accueil</Link><Link href="/prestations">Prestations</Link><Link href="/realisations">Réalisations</Link><Link href="/a-propos">À propos</Link></div><div><span>Contact</span><a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a><a href={`mailto:${email}`}>{email}</a><span>{city}</span></div></div></div><div className="footer-bottom"><span>© 2026 {name}</span><span>Mentions légales · Confidentialité</span><span>Instagram ↗</span></div></footer>;
}
