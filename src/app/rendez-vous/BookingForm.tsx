"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { Service } from "@/types/content";

type BookingService = Pick<Service, "title"> & {
  id: string;
  duration: string;
  price: string;
};

export function BookingForm({ services }: { services: BookingService[] }) {
  const [service, setService] = useState("");
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent)
    return (
      <main className="booking-page">
        <Link href="/" className="back-link">
          ← Retour au site
        </Link>
        <div className="booking-shell">
          <div className="success">
            <p className="eyebrow">✦ Demande envoyée</p>
            <h1>
              Merci, votre
              <br />
              <em>demande est prête.</em>
            </h1>
            <p>
              La confirmation pourra être reliée ultérieurement aux
              disponibilités réelles, aux rappels et au paiement.
            </p>
            <Link className="button button-primary" href="/">
              Retour à l’accueil
            </Link>
          </div>
        </div>
      </main>
    );

  return (
    <main className="booking-page">
      <Link href="/" className="back-link">
        ← Retour au site
      </Link>
      <div className="booking-shell">
        <p className="eyebrow">✦ Rendez-vous</p>
        <h1>
          Votre moment
          <br />
          <em>commence ici.</em>
        </h1>
        <p>
          Choisissez votre univers et laissez vos coordonnées. Cette V1 prépare
          le parcours pour l’intégration future des disponibilités, rappels et
          paiements.
        </p>
        <form className="booking-form" onSubmit={submit}>
          <div className="booking-step">
            <p className="eyebrow">01 · Choisir une prestation</p>
            <div className="choice-grid">
              {services.map((item) => (
                <button
                  type="button"
                  className={`choice ${service === item.id ? "selected" : ""}`}
                  key={item.id}
                  onClick={() => setService(item.id)}
                >
                  <strong>{item.title}</strong>
                  <small>
                    {item.duration} · {item.price}
                  </small>
                </button>
              ))}
            </div>
          </div>
          <div className="booking-step">
            <p className="eyebrow">02 · Vos informations</p>
            <div className="field-grid">
              <div className="field">
                <label htmlFor="name">Nom complet</label>
                <input id="name" required placeholder="Votre nom" />
              </div>
              <div className="field">
                <label htmlFor="phone">Téléphone</label>
                <input id="phone" required placeholder="+225 ..." />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="vous@email.com" />
              </div>
              <div className="field">
                <label htmlFor="date">Date souhaitée</label>
                <input id="date" type="date" required />
              </div>
              <div className="field">
                <label htmlFor="time">Créneau souhaité</label>
                <select id="time" required defaultValue="">
                  <option value="" disabled>
                    Choisir
                  </option>
                  <option>09:00</option>
                  <option>11:00</option>
                  <option>14:00</option>
                  <option>16:00</option>
                  <option>18:00</option>
                </select>
              </div>
            </div>
          </div>
          {service && (
            <div className="booking-summary">
              <strong>
                {services.find((item) => item.id === service)?.title}
              </strong>{" "}
              · Votre demande sera confirmée après vérification de la
              disponibilité.
            </div>
          )}
          <button className="booking-submit" type="submit" disabled={!service}>
            Envoyer ma demande de rendez-vous ↗
          </button>
        </form>
      </div>
    </main>
  );
}
