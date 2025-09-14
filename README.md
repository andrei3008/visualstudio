# Client Portal (Monolith Next.js 14)

Next.js 14 (App Router) monolit cu API Routes. Deploy prin Docker Compose / Portainer. Expus pe port `8007` pentru integrarea cu Cloudflare Tunnel.

## Structură
- `next/` — aplicația principală (Next.js 14)
  - `src/app/` — pagini (`page.tsx`, `login`, `projects`) și API (`/api/health`, `/api/projects`)
  - `Dockerfile.next` — build/runtime image (standalone)
- `docker-compose.yml` — stack local (mapare `8007:3000`)
- `docker-compose.prod.yml` — stack pentru Portainer (prod)

## Rulare locală
```
docker compose up -d --build
# http://localhost:8007
# health: http://localhost:8007/api/health
```

## Deploy (Portainer)
- Stacks → Add stack → conținut `docker-compose.prod.yml`
- Cloudflare Tunnel: hostname → `http://localhost:8007`

## Mediu (NextAuth)
- În producție, `next-auth` necesită două variabile de mediu:
  - `NEXTAUTH_URL`: URL-ul public complet al aplicației (ex: `https://portal.exemplu.ro`).
  - `NEXTAUTH_SECRET`: un secret criptografic puternic.
- Prod: copiați fișierul `.env.prod.example` în `.env.prod`, completați valorile, apoi porniți stack-ul. `docker-compose.prod.yml` încarcă automat `.env.prod`.

### Seed utilizator inițial (opțional)
- Pentru primul deploy poți seta în `.env.prod` următoarele (sunt idempotente):
  - `SEED_ADMIN_EMAIL` — email admin inițial (ex: `admin@firma.ro`)
  - `SEED_ADMIN_PASSWORD` — parolă inițială (schimb-o după primul login)
  - `SEED_ADMIN_NAME` — nume afișat (ex: `Admin`)
- Containerul rulează automat migrarea și seed-ul la pornire. Dacă userul există deja, nu se creează duplicate.
- După ce ai creat contul și ai schimbat parola, poți elimina aceste variabile din `.env.prod`.

Comenzi utile pentru generarea secretului:
```
openssl rand -base64 32
# sau
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Exemplu rulare (prod):
```
cp .env.prod.example .env.prod
# editați .env.prod cu valorile corecte
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

## Note
- Am înlocuit Nuxt + Caddy cu Next.js (serverul propriu).
- Pentru extindere: Auth, Postgres + Prisma, uploads S3/MinIO, Stripe.

## Roadmap
- Vezi `ROADMAP.md` pentru lista de task-uri propusă și starea lor.
