"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  name: string;
  tagline: string;
};

const links = [
  ["Accueil", "/"],
  ["Prestations", "/prestations"],
  ["Réalisations", "/realisations"],
  ["À propos", "/a-propos"],
  ["Tarifs", "/tarifs"]
] as const;

export function Navbar({ name, tagline }: NavbarProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">ED</span>
          <span><strong>{name}</strong><small>{tagline}</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="nav-cta" href="/rendez-vous">Prendre rendez-vous <span>↗</span></Link>
        <button className="menu-toggle" type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && <div className="mobile-menu">{links.map(([label, href], index) => <Link key={href} href={href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</Link>)}<Link className="button button-primary mobile-book" href="/rendez-vous" onClick={() => setOpen(false)}>Prendre rendez-vous ↗</Link></div>}
    </header>
  );
}
