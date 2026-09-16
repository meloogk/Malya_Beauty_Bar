"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { message?: string } | null;
      setError(data?.message ?? "Connexion impossible.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="admin-auth">
      <div className="admin-auth-card">
        <p className="eyebrow">✦ Administration</p>
        <h1>Gérez votre institut.</h1>
        <p>Modifiez les textes, prestations, tarifs et visuels du site depuis un seul espace.</p>
        <form onSubmit={onSubmit} className="admin-form">
          <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required /></label>
          <label>Mot de passe<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? "Connexion…" : "Se connecter"}</button>
        </form>
      </div>
    </main>
  );
}
