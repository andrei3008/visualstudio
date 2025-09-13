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

## Note
- Am înlocuit Nuxt + Caddy cu Next.js (serverul propriu).
- Pentru extindere: Auth, Postgres + Prisma, uploads S3/MinIO, Stripe.
