# Roadmap — Client Portal

Aceasta este lista de task-uri propusă pentru dezvoltarea platformei, în ordine logică. Bifăm pe măsură ce implementăm.

## Faza 1 — Tasks & Milestones
- [ ] Schema DB: `Task`, `Milestone`
- [ ] API: GET/POST/PUT pentru `/api/projects/:id/tasks`
- [ ] API: GET/POST/PUT pentru `/api/projects/:id/milestones`
- [ ] UI: listă + creare rapidă în `/app` (per proiect)
- [ ] Status chips + due date + assignee (simplu)

## Faza 2 — Proposals (Oferte)
- [ ] Schema DB: `Proposal`, `ProposalItem`
- [ ] API: draft → submit → approve (link public)
- [ ] UI: creare/preview ofertă + PDF simplu

## Faza 3 — Mesagerie
- [ ] Schema DB: `Message (projectId, authorId, body, isInternal)`
- [ ] API: threads, mențiuni (simplu)
- [ ] UI: feed mesaje pe proiect + note interne

## Faza 4 — Fișiere
- [ ] Integrare S3/MinIO (ENV: `S3_ENDPOINT`, `S3_BUCKET`, `S3_KEY/SECRET`)
- [ ] API upload + versiuni
- [ ] UI: listare/previzualizare fișiere

## Faza 5 — Facturare & Plăți
- [ ] Schema DB: `Invoice`
- [ ] Stripe: checkout link + webhooks (status)
- [ ] UI: generare factură din Proposal

## Securitate & Conturi
- [ ] Verificare email (token)
- [ ] Reset parolă (token)
- [ ] Rate limiting login/register

## Admin & Raportare
- [ ] Admin: listă utilizatori/proiecte, acțiuni de bază
- [ ] Dashboard KPI: lead time, ore estimate vs. consumate, on‑time

— Actualizăm și reordonăm pe parcurs în funcție de nevoi.

