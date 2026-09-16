# Éclat Divin — Institut de beauté

Site vitrine premium Next.js + TypeScript, avec espace d’administration pour modifier le contenu sans modifier le code.

## Installation

```bash
npm install
npm run dev
```

Si Windows affiche **`next n’est pas reconnu`**, cela signifie généralement que les dépendances ne sont pas installées dans le projet : exécutez `npm install`, puis `npm run dev`.

## Vérifications

```bash
npm run typecheck
npm run lint
npm run build
```

## Administration

1. Copiez `.env.example` vers `.env.local`.
2. Définissez `ADMIN_EMAIL`, `ADMIN_PASSWORD` et une longue valeur aléatoire pour `ADMIN_SESSION_SECRET`.
3. Lancez le projet et ouvrez `/admin`.
4. L’interface permet de modifier la marque, le hero, les prestations, les images, la galerie, les tarifs, la section À propos, le contact, le témoignage et les CTA.
5. Les images peuvent être remplacées par URL ou envoyées depuis l’ordinateur. Les uploads sont stockés dans `public/uploads`.

### Persistance en production

La V1 utilise un fichier JSON typé (`data/site-content.json`) pour rester simple et immédiatement exploitable sur un serveur Node/VPS. En production multi-instance/serverless, remplacez le provider fichier par MongoDB/PostgreSQL/S3 via `src/lib/content.ts`; l’interface d’administration et les types peuvent rester inchangés.

Pour Docker/VPS, montez un volume persistant sur `/app/data` et `/app/public/uploads` afin de conserver les modifications et images lors d’un redeploy.

## CI/CD

Le workflow GitHub Actions vérifie l’installation, le lint, le typage et le build. Pour une reproductibilité maximale, committez le `package-lock.json` généré par `npm install` dans votre environnement.
