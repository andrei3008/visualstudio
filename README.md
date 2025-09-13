# Client Portal (Monolith Nuxt 3)

Monolit Nuxt 3 (SSR + API routes) cu Caddy ca reverse proxy. Deploy prin Docker Compose / Portainer. Expus pe port `8007` pentru integrarea cu Cloudflare Tunnel.

## Structură
- `nuxt/` — aplicația principală (Nuxt 3)
  - `pages/` — rute UI (`index`, `projects`, `login`)
  - `server/api/` — API demo (`/api/health`, `/api/projects`)
  - `Dockerfile.nuxt` — build/runtime image
- `caddy/Caddyfile` — reverse proxy HTTP către `app:3000`
- `docker-compose.yml` — stack local (app + caddy, `8007:80`)
- `docker-compose.prod.yml` — stack pentru Portainer (prod)

## Rulare locală
```
docker compose up -d --build
# http://localhost:8007
# health: http://localhost:8007/api/health
```

## Deploy (Portainer)
- Stacks → Add stack → conținut `docker-compose.prod.yml`
- Mapare Cloudflare Tunnel: hostname → `http://localhost:8007`

## Note
- Nginx și vechiul proiect Vue CLI au fost eliminate.
- Pentru extensii: adăugați Auth, Postgres + Prisma, uploads S3/MinIO, Stripe.
