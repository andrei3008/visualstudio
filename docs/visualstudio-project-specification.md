# Visual Studio Website Project Specification

Last updated: 2026-04-07

## Purpose

Visual Studio Concept is a Romanian presentation and lead-generation website for a custom software development company. The site positions the company around software custom, websites and online stores, AI/business automation, mobile apps, DevOps/cloud, and maintenance/security services.

The project is not only a static brochure site. It also includes a lead capture flow, an admin dashboard for contact messages, marketing tracking hooks, SEO metadata, Docker deployment assets, and an early Romanian content automation pipeline.

## Repository And Runtime

- Repository: `https://github.com/andrei3008/visualstudio.git`
- Active working branch: `feature/vis-6-romanian-content-pipeline`
- Local project path: `/home/node/Proiecte/visualstudio`
- App stack: Next.js 16 App Router, React 19, TypeScript
- Persistence: Prisma with SQLite
- Auth: NextAuth credentials provider with Prisma-backed users
- Styling/assets: global CSS under `public/css/styles.css`, local assets under `public/`
- Test runner: Vitest
- Deployment packaging: Next standalone output with Docker production image

## Primary Product Areas

### Public Website

The main public application is implemented through App Router pages under `app/`.

Core routes:

- `/`: primary homepage for Visual Studio Concept
- `/contact`: lead capture/contact page
- `/servicii`: services overview
- `/dezvoltare-software`: software development service page
- `/automatizari-ai`: AI automation service page
- `/automatizari-firme`: business automation landing page
- `/aplicatii-mobile`: mobile applications service page
- `/devops-cloud`: DevOps and cloud service page
- `/securitate-mentenanta`: security and maintenance service page
- `/software-custom-firme`: custom software landing page
- `/site-uri-prezentare-magazine-online`: websites and online stores landing page
- `/despre-noi`: about page
- `/portofoliu`: portfolio page
- `/blog`: blog listing page
- `/faq`: FAQ page
- `/termeni-si-conditii`, `/politica-de-confidentialitate`, `/politica-de-cookie-uri`: legal pages
- `/preview`: internal preview page

Navigation data is stored in `data/menu.json` and `data/footer-nav.json`.

### Homepage Composition

The root page uses reusable sections from `components/homes/home-software-development-company/` and shared components:

- Hero
- Marquee sliders
- Services
- About
- Capabilities
- Tech stacks
- Facts
- Blog highlights
- CTA
- Footer

The page metadata targets Romanian search intent around custom software, web/mobile apps, AI automation, DevOps, and cloud.

### Service Landing Pages

The three conversion-focused landing page content groups live in `data/landing-content.ts`:

- `automatizariFirme`
- `siteuriMagazine`
- `softwareCustomFirme`

Each group defines pain points, testimonials, implementation steps, and hero stats. Pricing data is split into:

- `data/pricing-siteuri.json`
- `data/pricing-automatizari.json`
- `data/pricing-software-custom.json`
- `data/pricing.json`

## Lead Capture Flow

### Frontend Form

The contact form is implemented in `components/other-pages/contact/ContactForm.tsx`.

Current visible fields:

- Name
- E-mail
- Phone
- Message

The form also includes:

- Client-side validation through `schemas/contact.ts`
- Honeypot bot trap
- Local browser submission limits: 3 per 15 minutes, 5 per hour
- 10-second post-submit cooldown
- Toast success/error messages

Current implementation note: the schema includes optional `Company`, `ProjectType`, and `Budget`, and the API supports these fields, but the visible contact form currently does not render or send them.

### API Route

`POST /api/contact` is implemented in `app/api/contact/route.ts`.

Behavior:

- Reads client IP from `x-forwarded-for` or `x-real-ip`
- Applies server-side in-memory rate limit: 5 submissions per IP per hour
- Requires `name`, `email`, and `message`
- Validates email format
- Stores messages in Prisma `ContactMessage`
- Returns `201` with the created message on success

Known limitation: server-side rate limit is process-local memory, so limits reset on restart and are not shared across multiple production instances.

## Admin Dashboard

The admin UI lives under `app/admin/`.

Routes:

- `/admin/login`: credentials login page
- `/admin`: dashboard with total/new/read message counts and recent messages
- `/admin/mesaje`: full message management page

API routes:

- `GET /api/contact-messages`: list messages, filter by read status, search by name/email/company/message
- `PATCH /api/contact-messages/[id]`: mark a message read/unread
- `DELETE /api/contact-messages/[id]`: delete a message

Access control:

- `lib/auth.ts` configures NextAuth credentials auth.
- `lib/auth-guard.ts` only permits users with role `ADMIN`.
- Prisma `User` supports roles `ADMIN`, `EDITOR`, and `VIEWER`, but current admin APIs only accept `ADMIN`.

## Data Model

The Prisma schema defines:

- `User`: email, name, bcrypt password, role, timestamps
- `ContactMessage`: lead/contact message fields, source, read status, timestamps

SQLite is used through `DATABASE_URL`. Production Docker config expects a persistent database at `file:/app/data/prod.db`.

## Marketing And Tracking

Tracking infrastructure exists but is disabled unless public environment variables are set:

- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_GOOGLE_TAG_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`

`components/tracking/TrackingProvider.tsx` and `lib/marketing.ts` support:

- Page view tracking on route changes
- Google `generate_lead` event
- Google Ads conversion event when label is configured
- Meta Pixel `PageView` and `Lead`
- Contact click events for WhatsApp, phone, and email links

Cookie consent wraps tracking through `CookieConsentProvider` and `CookieConsentUI`.

## SEO, Robots, And Security Headers

SEO support:

- Per-page metadata objects across public pages
- `app/sitemap.ts` static sitemap
- `app/robots.ts` allows public pages and blocks `/admin/` and `/api/`
- JSON-LD injected from `components/seo/JsonLd`

Security headers are configured in `next.config.ts`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- CSP with explicit script/image/font/connect sources
- `frame-ancestors 'none'`
- Production-only `upgrade-insecure-requests`

Risk to verify before major third-party additions: CSP currently needs manual updates for new analytics, embeds, fonts, media providers, or API integrations.

## Deployment

Development:

- `npm run dev` starts Next dev server.
- `docker-compose.yml` maps host `localhost:8007` to container port `3000`.

Production:

- `next.config.ts` uses `output: "standalone"`.
- `Dockerfile.next` builds a standalone Next server with Prisma generated during build.
- `docker-compose.prod.yml` runs image `ghcr.io/andrei3008/visualstudio:latest` as `visualstudio-web` on host port `8007`.
- SQLite data is persisted with the `visualstudio-data` volume mounted at `/app/data`.
- Container startup runs `npx prisma migrate deploy && node server.js`.

Production environment required:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- Optional tracking variables listed above

## Automation Pipeline

The `automation/romanian-content-pipeline/` folder is a dry-run scaffold for Romanian content automation.

Current capability:

- Generates Romanian dry-run templates for blog, X, Instagram, and YouTube Shorts
- Schedules 3 posts per channel per day at 09:00, 13:00, and 17:00 UTC
- Simulates publishing adapters and retry behavior
- Writes local run artifacts under `artifacts/`

Current status: suitable for engineering validation only. It still needs approved production credentials, real channel adapters, and final CMO-approved campaign copy before public publishing.

## Verification State

Known from recent project setup:

- `npm run build` passed after dependency setup.
- `npx eslint components/headers/Header1.tsx` passed during the navbar CTA task.
- Full `npm run lint` had pre-existing unrelated lint errors.
- Full `npm test` had pricing CTA assertion failures because tests expect `/contact` while some pricing data uses `#contact-form`.

These failures should be handled as separate cleanup tasks before treating CI as a release gate.

## Current Gaps And Recommended Implementation Tasks

1. Fix contact form field parity.
   The schema and API support `Company`, `ProjectType`, and `Budget`, but the visible form currently sends only name, email, phone, and message.

2. Resolve pricing CTA consistency.
   Align pricing JSON and tests on whether CTA links should target `/contact` or `#contact-form`.

3. Clean up full lint failures.
   Bring the full ESLint run back to green so future changes can use it as a reliable gate.

4. Add production-grade rate limiting.
   Replace or augment the in-memory IP limiter if the deployment becomes multi-instance or needs restart-resistant abuse protection.

5. Verify admin session behavior in production.
   Confirm `AUTH_SECRET`, `AUTH_URL`, cookie settings, and credential seed/migration process are documented and tested for the deployed container.

6. Add lead notification workflow.
   Contact messages are stored, but there is no confirmed outbound notification to email/Slack/CRM.

7. Expand automation pipeline only after credential and copy approval.
   Replace dry-run adapters with real API clients only after social/channel credentials and final Romanian campaign templates are approved.

8. Review CSP before new embeds or analytics providers.
   Any new third-party script, image, iframe, or connection domain requires a deliberate update to `next.config.ts`.

## Implementation Principles For Next Tasks

- Keep public marketing copy Romanian-first and conversion-focused.
- Treat contact/lead capture as the critical business flow.
- Keep admin APIs protected by server-side auth checks, not just UI guards.
- Avoid committing production credentials; use env vars and deployment secrets.
- Keep Docker production behavior compatible with standalone Next output and Prisma migrations.
- Prefer small, verifiable tasks with `npm run build`, focused ESLint checks, and relevant Vitest tests.
