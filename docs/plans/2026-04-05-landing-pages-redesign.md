# Redesign Landing Pages pentru Reclame Plătite

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Redesign complet al celor 3 landing pages pentru reclame plătite: /automatizari-firme, /software-custom-firme, /site-uri-prezentare-magazine-online

**Architecture:** Păstrăm framework-ul existent (Next.js App Router, Bootstrap grid, mxd-template CSS). Creăm componente noi reutilizabile. Fiecare pagină devine mai convingătoare pentru trafic plătit cu: hero vizual, social proof, proces clar, pricing evidențiat, CTA-uri repetate.

**Tech Stack:** Next.js 15, React, TypeScript, Phosphor icons, Bootstrap grid, CSS existent (main.min.css + styles.css)

---

## Noua structură pagină (toate 3):

1. **Hero redesenat** — headline puternic + subheadline cu cifre + 2 CTA-uri + mini-trust badges
2. **Pain Points** — " Probleme cu care te confrunți" — 3-4 pain points cu iconițe (NOU)
3. **TrustSection** — existent, păstrat (cifre + stats)
4. **Testimoniale** — 2-3 testimoniale cu nume + rol (NOU)
5. **Services** — existent, îmbunătățit cu iconițe Phosphor
6. **Cum funcționează** — 4 pași vizuali (NOU)
7. **Pricing** — existent, cu highlight pe "best" îmbunătățit
8. **FAQ** — existent
9. **CTA final** — ParallaxDivider + ContactForm + Cta (existente)

---

## Componente NOI de creat:

### 1. `components/landing/PainPoints.tsx`
Secțiune cu 3-4 pain points per pagină. Props: `items: PainPoint[]`

```typescript
type PainPoint = {
  icon: string; // phosphor icon name
  title: string;
  description: string;
};
```

Layout: grid 2x2 pe desktop, 1 col pe mobil. Fiecare item = icon + titlu + descriere scurtă.

### 2. `components/landing/Testimonials.tsx`
Slider/grid cu 2-3 testimoniale. Props: `items: Testimonial[]`

```typescript
type Testimonial = {
  name: string;
  role: string;
  company: string;
  text: string;
  rating?: number; // 1-5 stars
};
```

Layout: 3 card-uri pe desktop (1 row), scroll pe mobil. Fiecare card = text + stele + nume + rol.

### 3. `components/landing/HowItWorks.tsx`
4 pași cu numerotare. Props: `items: Step[]`, `sectionTitle?: string`

```typescript
type Step = {
  number: number;
  title: string;
  description: string;
  icon: string; // phosphor icon name
};
```

Layout: 4 coloane pe desktop cu linie conector între ele, 2x2 pe tabletă, 1 col pe mobil.

### 4. `components/landing/HeroStats.tsx`
Mini stats bar sub hero headline. Props: `stats: Stat[]`

```typescript
type Stat = {
  value: string; // "70+", "15+", "48h"
  label: string;
};
```

Layout: flex row cu separator pipe "|" între ele. Merge sub textul hero-ului existent.

---

## Date NOI de creat:

### 5. `data/landing-content.ts`
Fișier central cu tot conținutul per pagină (pain points, testimonials, steps, hero stats).

---

## Modificări HERO existente:

Fiecare hero component primește prop-uri noi pentru stats bar. Hero-urile existente (HeroAutomatizariFirme, HeroSiteuriMagazine, HeroSoftwareCustomFirme) se modifică pentru a include:
- HeroStats sub textul principal
- Mini trust badges sub CTA-uri ("Gratuit. Fără obligații. Răspundem în 24h." — deja există la automatizări, adăugăm la toate)

---

## TASK-URI

### Task 1: Creare types pentru componente noi
**Files:** `types/landing.ts`
Creăm tipurile: PainPoint, Testimonial, Step, Stat

### Task 2: Creare data file `data/landing-content.ts`
**Files:** `data/landing-content.ts`
Toate datele per pagină: pain points, testimonials, steps, hero stats. Placeholder data.

### Task 3: Creare componentă PainPoints
**Files:** `components/landing/PainPoints.tsx`
Secțiune "Probleme cu care te confrunți" — grid responsive cu icon + titlu + descriere.

### Task 4: Creare componentă Testimonials
**Files:** `components/landing/Testimonials.tsx`
Grid 3 card-uri cu text testimonial + nume + rol + company.

### Task 5: Creare componentă HowItWorks
**Files:** `components/landing/HowItWorks.tsx`
4 pași numerotați cu icon + titlu + descriere, conectați vizual.

### Task 6: Creare componentă HeroStats
**Files:** `components/landing/HeroStats.tsx`
Bară mini stats: flex row cu valori + label-uri, separați prin "|".

### Task 7: Update HeroAutomatizariFirme
**Files:** `components/service-heroes/HeroAutomatizariFirme.tsx`
Adăugare HeroStats + trust badges sub CTA.

### Task 8: Update HeroSiteuriMagazine
**Files:** `components/service-heroes/HeroSiteuriMagazine.tsx`
Adăugare HeroStats + trust badges sub CTA.

### Task 9: Update HeroSoftwareCustomFirme
**Files:** `components/service-heroes/HeroSoftwareCustomFirme.tsx`
Adăugare HeroStats + trust badges sub CTA.

### Task 10: Update pagina /automatizari-firme
**Files:** `app/(other-pages)/automatizari-firme/page.tsx`
Integrare componente noi: PainPoints > TrustSection > Testimonials > Services > HowItWorks > Pricing > FAQ > ContactForm > Cta

### Task 11: Update pagina /site-uri-prezentare-magazine-online
**Files:** `app/(other-pages)/site-uri-prezentare-magazine-online/page.tsx`
Integrare componente noi (ordinea din Task 10).

### Task 12: Update pagina /software-custom-firme
**Files:** `app/(other-pages)/software-custom-firme/page.tsx`
Integrare componente noi (ordinea din Task 10).

### Task 13: CSS pentru componente noi
**Files:** `public/css/styles.css`
Stiluri pentru PainPoints, Testimonials, HowItWorks, HeroStats. Responsive.

### Task 14: Testare vizuală
Verificare toate 3 pagini în browser la localhost:8007.

### Task 15: Commit + Push
git add, commit, push pe master.

---

## Conținut placeholder per pagină:

### /automatizari-firme

**Pain Points:**
1. ⏱ Echipe pierd ore cu copiat date dintr-un tool în altul
2. 📋 Lead-uri se pierd pentru că nimeni nu urmărește formularul
3. 🔁 Rapoarte se fac manual, săptămână de săptămână
4. ❌ Procese depind de o singură persoană care "știe cum se face"

**Steps:**
1. Discuție gratuită — Analizăm procesele tale și identificăm ce se poate automatiza
2. Plan & propunere — Primim un roadmap clar cu costuri și termene
3. Implementare — Construim și testăm automatizările pas cu pas
4. Livrare & monitorizare — Totul rulează, monitorizăm și optimizăm

**Testimonials:**
1. "Am economisit 20+ ore pe săptămână din procese repetitive." — Mihai R., Director Operațiuni
2. "Lead-urile noastre ajung acum în CRM în timp real, fără să mai pierdem niciunul." — Elena D., Marketing Manager
3. "Cel mai bun ROI pe care l-am avut vreodată pe o investiție internă." — Andrei P., CEO

**Hero Stats:** "70+ automatizări" | "48h timp răspuns" | "100% la timp"

### /site-uri-prezentare-magazine-online

**Pain Points:**
1. 🐌 Site-ul actual e lent și pierzi vizitatori
2. 📱 Arată prost pe mobil, deși 70% din trafic vine de acolo
3. 💸 Ai plătit pe un site dar nu aduce niciun lead
4. 🔒 Nu poți modifica nimic fără să apelezi la cineva

**Steps:**
1. Discuție & brief — Ne spui ce ai nevoie, noi propunem structura
2. Design & aprobare — Primești mockup-uri, le ajustăm până ești mulțumit
3. Dezvoltare — Construim site-ul rapid, cu update-uri regulate
4. Lansare & suport — Livrăm, configurăm tot, 30 zile suport inclus

**Testimonials:**
1. "Site-ul nou a crescut conversiile de 3x în prima lună." — Cristian M., Fondator
2. "Am primit un magazin online gata de vânzare, fără bătăi de cap." — Ana S., Owner
3. "În sfârșit un site pe care mă pot baza și pe care îl pot modifica singură." — Diana V., Marketing

**Hero Stats:** "50+ site-uri livrate" | "2-4 săptămâni livrare" | "100% responsive"

### /software-custom-firme

**Pain Points:**
1. 📊 Folosești 5 tool-uri diferite pentru un singur proces
2. 🚫 Soft-ul actual nu face exact ce ai nevoie — te adaptezi tu la el
3. 👥 Echipe lucrează în Excel-uri și email-uri interminabile
4. 📉 Nu ai vizibilitate reală asupra operațiunilor

**Steps:**
1. Audit & definire — Înțelegem procesele, definim cerințele tehnice
2. Arhitectură & plan — Propunem stack, structură, etape clare
3. Dezvoltare iterativă — Livrăm funcțional la fiecare 2-3 săptămâni
4. Lansare & mentenanță — Deploy, training, suport pe termen lung

**Testimonials:**
1. "Am înlocuit 3 tool-uri cu o singură platformă custom. Ecripă e mult mai productivă." — Radu I., COO
2. "Ne-au livrat exact ce aveam nevoie, nimic mai mult. Simplu și funcțional." — Maria T., Manager Proiect
3. "ROI-ul s-a văzut în 3 luni. Investiția s-a plătit singură." — Florian C., CEO

**Hero Stats:** "30+ platforme custom" | "15 ani experiență" | "Suport dedicat"
