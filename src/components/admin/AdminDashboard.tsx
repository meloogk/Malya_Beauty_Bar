/* eslint-disable @next/next/no-img-element */
"use client";

import { ChangeEvent, useEffect, useState } from "react";
import type { SiteContent } from "@/types/content";

const input = "admin-input";

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return <label className="admin-field"><span>{label}</span>{multiline ? <textarea className={input} value={value} onChange={(event) => onChange(event.target.value)} rows={4} /> : <input className={input} value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = (await response.json().catch(() => null)) as { url?: string; message?: string } | null;
    if (!response.ok || !data?.url) setError(data?.message ?? "Échec de l’envoi.");
    else onChange(data.url);
    setUploading(false);
    event.target.value = "";
  }

  return <div className="admin-image-field"><Field label={label} value={value} onChange={onChange} /><label className="admin-upload">{uploading ? "Envoi…" : "Remplacer par une image"}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={upload} hidden /></label>{error && <small className="admin-error">{error}</small>}{value && <img src={value} alt="Aperçu" className="admin-image-preview" />}</div>;
}

export function AdminDashboard() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content").then(async (response) => {
      if (!response.ok) throw new Error("Session expirée.");
      return response.json() as Promise<SiteContent>;
    }).then(setContent).catch((error: Error) => setStatus(error.message)).finally(() => setLoading(false));
  }, []);

  function update(mutator: (draft: SiteContent) => void) {
    setContent((current) => {
      if (!current) return current;
      const draft: SiteContent = structuredClone(current);
      mutator(draft);
      return draft;
    });
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    setStatus(null);
    const response = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    const data = (await response.json().catch(() => null)) as { message?: string } | null;
    setStatus(response.ok ? "Modifications enregistrées." : data?.message ?? "Impossible d’enregistrer.");
    setSaving(false);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  if (loading) return <main className="admin-page"><p>Chargement de l’administration…</p></main>;
  if (!content) return <main className="admin-page"><p className="admin-error">{status ?? "Contenu indisponible."}</p></main>;

  return <main className="admin-page">
    <header className="admin-header"><div><p className="eyebrow">✦ Éclat Divin</p><h1>Administration du site</h1><p>Les changements sont appliqués à la page d’accueil après enregistrement.</p></div><div className="admin-actions"><a href="/" target="_blank" rel="noreferrer">Voir le site ↗</a><button type="button" onClick={logout}>Déconnexion</button></div></header>

    <div className="admin-toolbar"><strong>{status ?? "Prêt à modifier le contenu."}</strong><button type="button" onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer les modifications"}</button></div>

    <section className="admin-card"><h2>Identité de l’institut</h2><div className="admin-grid"><Field label="Nom" value={content.brand.name} onChange={(value) => update((draft) => { draft.brand.name = value; })} /><Field label="Signature" value={content.brand.tagline} onChange={(value) => update((draft) => { draft.brand.tagline = value; })} /><Field label="Téléphone" value={content.brand.phone} onChange={(value) => update((draft) => { draft.brand.phone = value; })} /><Field label="Email" value={content.brand.email} onChange={(value) => update((draft) => { draft.brand.email = value; })} /><Field label="Ville / adresse" value={content.brand.city} onChange={(value) => update((draft) => { draft.brand.city = value; })} /><Field label="Description SEO" value={content.brand.description} multiline onChange={(value) => update((draft) => { draft.brand.description = value; })} /></div></section>

    <section className="admin-card"><h2>Hero</h2><div className="admin-grid"><Field label="Surtitre" value={content.hero.eyebrow} onChange={(value) => update((draft) => { draft.hero.eyebrow = value; })} /><Field label="Titre principal" value={content.hero.title} onChange={(value) => update((draft) => { draft.hero.title = value; })} /><Field label="Signature manuscrite" value={content.hero.script} onChange={(value) => update((draft) => { draft.hero.script = value; })} /><Field label="Services affichés" value={content.hero.descriptor} onChange={(value) => update((draft) => { draft.hero.descriptor = value; })} /><Field label="Texte" value={content.hero.body} multiline onChange={(value) => update((draft) => { draft.hero.body = value; })} /><ImageField label="Image du hero" value={content.hero.image} onChange={(value) => update((draft) => { draft.hero.image = value; })} /><Field label="Texte alternatif image" value={content.hero.imageAlt} onChange={(value) => update((draft) => { draft.hero.imageAlt = value; })} /></div></section>

    <section className="admin-card"><h2>Prestations</h2>{content.services.map((service, index) => <div className="admin-item" key={service.number}><h3>{service.number} · {service.title}</h3><div className="admin-grid"><Field label="Nom" value={service.title} onChange={(value) => update((draft) => { draft.services[index].title = value; })} /><Field label="Catégorie" value={service.eyebrow} onChange={(value) => update((draft) => { draft.services[index].eyebrow = value; })} /><Field label="Description" value={service.description} multiline onChange={(value) => update((draft) => { draft.services[index].description = value; })} /><Field label="Lien" value={service.href} onChange={(value) => update((draft) => { draft.services[index].href = value; })} /><ImageField label="Image" value={service.image} onChange={(value) => update((draft) => { draft.services[index].image = value; })} /></div></div>)}</section>

    <section className="admin-card"><h2>Réalisations / galerie</h2>{content.gallery.items.map((item, index) => <div className="admin-item" key={`${item.title}-${index}`}><h3>Réalisation {index + 1}</h3><div className="admin-grid"><Field label="Catégorie" value={item.category} onChange={(value) => update((draft) => { draft.gallery.items[index].category = value as SiteContent["gallery"]["items"][number]["category"]; })} /><Field label="Titre" value={item.title} onChange={(value) => update((draft) => { draft.gallery.items[index].title = value; })} /><ImageField label="Image" value={item.image} onChange={(value) => update((draft) => { draft.gallery.items[index].image = value; })} /></div></div>)}</section>

    <section className="admin-card"><h2>Signature & expérience</h2><div className="admin-grid"><Field label="Titre signature" value={content.signature.title} onChange={(value) => update((draft) => { draft.signature.title = value; })} /><Field label="Description expérience" value={content.experience.description} multiline onChange={(value) => update((draft) => { draft.experience.description = value; })} /></div>{content.signature.values.map((value, index) => <div className="admin-item" key={value.number}><div className="admin-grid"><Field label={`Valeur ${index + 1}`} value={value.title} onChange={(next) => update((draft) => { draft.signature.values[index].title = next; })} /><Field label="Description" value={value.description} multiline onChange={(next) => update((draft) => { draft.signature.values[index].description = next; })} /></div></div>)}</section>

    <section className="admin-card"><h2>À propos & contact</h2><div className="admin-grid"><Field label="Titre à propos" value={content.about.title} onChange={(value) => update((draft) => { draft.about.title = value; })} /><Field label="Introduction à propos" value={content.about.intro} multiline onChange={(value) => update((draft) => { draft.about.intro = value; })} /><Field label="Titre philosophie" value={content.about.philosophyTitle} onChange={(value) => update((draft) => { draft.about.philosophyTitle = value; })} /><Field label="Texte philosophie" value={content.about.philosophyText} multiline onChange={(value) => update((draft) => { draft.about.philosophyText = value; })} /><ImageField label="Image à propos" value={content.about.image} onChange={(value) => update((draft) => { draft.about.image = value; })} /><Field label="Instagram" value={content.contact.instagram} onChange={(value) => update((draft) => { draft.contact.instagram = value; })} /><Field label="Titre contact" value={content.contact.title} onChange={(value) => update((draft) => { draft.contact.title = value; })} /><Field label="Description contact" value={content.contact.description} multiline onChange={(value) => update((draft) => { draft.contact.description = value; })} /></div></section>

    <section className="admin-card"><h2>Témoignage & appel à l’action</h2><div className="admin-grid"><Field label="Témoignage" value={content.testimonial.quote} multiline onChange={(value) => update((draft) => { draft.testimonial.quote = value; })} /><Field label="Cliente" value={content.testimonial.author} onChange={(value) => update((draft) => { draft.testimonial.author = value; })} /><Field label="Détail" value={content.testimonial.detail} onChange={(value) => update((draft) => { draft.testimonial.detail = value; })} /><Field label="Titre CTA" value={content.bookingCta.title} onChange={(value) => update((draft) => { draft.bookingCta.title = value; })} /><Field label="Texte CTA" value={content.bookingCta.description} multiline onChange={(value) => update((draft) => { draft.bookingCta.description = value; })} /></div></section>

    <section className="admin-card"><h2>Tarifs</h2>{content.pricing.map((group, groupIndex) => <div className="admin-item" key={group.category}><h3>{group.category}</h3>{group.items.map((item, itemIndex) => <div className="admin-price-row" key={itemIndex}><input className={input} value={item.name} onChange={(event) => update((draft) => { draft.pricing[groupIndex].items[itemIndex].name = event.target.value; })} /><input className={input} value={item.price} onChange={(event) => update((draft) => { draft.pricing[groupIndex].items[itemIndex].price = event.target.value; })} /></div>)}</div>)}</section>

    <div className="admin-bottom-save"><button type="button" onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer les modifications"}</button></div>
  </main>;
}
