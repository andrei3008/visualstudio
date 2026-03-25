## Visual Studio Concept

Site de prezentare și generare lead-uri construit cu `Next.js 16`, `React 19` și `TypeScript`.

## Getting Started

Rulează proiectul local:

```bash
npm run dev
```

Deschide `http://localhost:3000`.

## Scripturi utile

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Tracking reclame

Tracking-ul este pregătit, dar se activează doar dacă setezi variabilele din `.env.local`.

Copiază din `.env.example`:

```bash
cp .env.example .env.local
```

Variabile disponibile:

```bash
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_TAG_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL=
```

Ce face infrastructura existentă:
- trimite `PageView` la schimbare de rută;
- trimite event de `Lead` / `generate_lead` după trimiterea formularului de contact;
- trimite event pentru click pe linkuri de tip `wa.me`, `tel:` și `mailto:`.

Dacă nu setezi variabilele, nu se încarcă niciun script de tracking.
