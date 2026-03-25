import { Service2 } from "@/types/services";

export const servicePageGroups: Record<string, Service2[]> = {
  siteuriMagazine: [
    {
      title: "Structură clară și poziționare bună",
      image: "/img/illustrations/360x440_list-01.webp",
      desc: "Definim arhitectura site-ului astfel încât vizitatorul să înțeleagă rapid ce oferi, cui te adresezi și care este următorul pas.",
      tags: ["Mesaj clar", "Structură", "UX", "Conversie", "Wireframe"],
    },
    {
      title: "Design modern și experiență mobilă",
      image: "/img/illustrations/360x440_list-02.webp",
      desc: "Construim interfețe curate, rapide și coerente, gândite pentru mobil, desktop și pentru o primă impresie profesionistă.",
      tags: ["UI design", "Mobile-first", "Branding", "Viteză", "Credibilitate"],
    },
    {
      title: "Magazine online și integrări utile",
      image: "/img/illustrations/360x440_list-03.webp",
      desc: "Implementăm funcțiile esențiale pentru vânzare online: produse, checkout, plăți, formulare, notificări și integrarea cu alte sisteme.",
      tags: ["eCommerce", "Plăți", "Formulare", "Integrări", "Automatizare"],
    },
    {
      title: "Lansare, măsurare și îmbunătățire",
      image: "/img/illustrations/360x440_list-04.webp",
      desc: "După lansare, optimizăm performanța, pregătim terenul pentru reclame și lăsăm proiectul într-o formă ușor de crescut.",
      tags: ["SEO tehnic", "Analytics-ready", "Optimizare", "Lansare", "Suport"],
    },
  ],
  automatizariFirme: [
    {
      title: "Lead-uri și formulare fără muncă manuală",
      image: "/img/illustrations/360x440_list-01.webp",
      desc: "Conectăm formulare, emailuri, CRM-uri și notificări astfel încât lead-urile să ajungă mai repede unde trebuie și să nu se piardă pe drum.",
      tags: ["Formulare", "CRM", "Email", "WhatsApp", "Lead routing"],
    },
    {
      title: "Procese interne și operațiuni repetitive",
      image: "/img/illustrations/360x440_list-02.webp",
      desc: "Automatizăm pașii repetați din ofertare, raportare, aprobări, actualizare de status și centralizarea informațiilor.",
      tags: ["Workflow", "Aprobări", "Rapoarte", "Status", "Operațiuni"],
    },
    {
      title: "Integrări între tool-urile existente",
      image: "/img/illustrations/360x440_list-03.webp",
      desc: "Legăm aplicațiile și platformele pe care le folosești deja pentru a evita dublarea muncii și introducerea manuală de date.",
      tags: ["API", "ERP", "CRM", "eCommerce", "Sisteme interne"],
    },
    {
      title: "Vizibilitate și control",
      image: "/img/illustrations/360x440_list-04.webp",
      desc: "Pe lângă automatizare, lăsăm și claritate: notificări, status, pași de verificare și control mai bun asupra fluxului.",
      tags: ["Dashboard", "Tracking", "Notificări", "Audit", "Control"],
    },
  ],
  softwareCustomFirme: [
    {
      title: "Aplicații interne și platforme operaționale",
      image: "/img/illustrations/360x440_list-01.webp",
      desc: "Construim software intern pentru echipe care au nevoie de structură, claritate și control mai bun asupra operațiunilor zilnice.",
      tags: ["Platforme interne", "Operațiuni", "Procese", "Utilizatori", "Roluri"],
    },
    {
      title: "CRM, ERP light și dashboard-uri custom",
      image: "/img/illustrations/360x440_list-02.webp",
      desc: "Când soluțiile standard sunt prea rigide sau prea încărcate, livrăm variante custom adaptate modului tău de lucru.",
      tags: ["CRM", "ERP light", "Dashboard", "Raportare", "Vânzări"],
    },
    {
      title: "Integrări și centralizare de date",
      image: "/img/illustrations/360x440_list-03.webp",
      desc: "Conectăm sistemele existente și construim un flux coerent între departamente, tool-uri și informații critice.",
      tags: ["Integrări", "API", "Centralizare", "Date", "Automatizare"],
    },
    {
      title: "Scalare și evoluție pe termen lung",
      image: "/img/illustrations/360x440_list-04.webp",
      desc: "Gândim produsul astfel încât să poată crește în funcționalități, utilizatori și complexitate fără să devină un blocaj tehnic.",
      tags: ["Scalare", "Arhitectură", "Mentenanță", "Refactor", "Creștere"],
    },
  ],
  dezvoltareSoftware: [
    {
      title: "Aplicații web și platforme interne",
      image: "/img/illustrations/360x440_list-01.webp",
      desc: "Construim aplicații custom pentru operațiuni, vânzări, management intern și fluxuri care nu pot fi rezolvate eficient cu un tool standard.",
      tags: ["Portaluri", "Dashboard-uri", "CRM intern", "ERP", "Admin panels"],
    },
    {
      title: "Integrări și automatizare operațională",
      image: "/img/illustrations/360x440_list-02.webp",
      desc: "Conectăm sisteme, sincronizăm date și eliminăm pașii manuali care încetinesc echipa și produc erori repetitive.",
      tags: ["API", "ERP", "CRM", "Facturare", "Webhook-uri"],
    },
    {
      title: "Arhitectură și scalare",
      image: "/img/illustrations/360x440_list-03.webp",
      desc: "Punem bazele tehnice corecte pentru produse care trebuie să crească în trafic, funcționalități și complexitate fără replatformări dureroase.",
      tags: ["Backend", "Baze de date", "Scalare", "Refactor", "Performanță"],
    },
    {
      title: "Lansare și evoluție continuă",
      image: "/img/illustrations/360x440_list-04.webp",
      desc: "Nu livrăm doar cod. Lansăm controlat, măsurăm, optimizăm și continuăm produsul în funcție de ce aduce valoare în business.",
      tags: ["QA", "Deployment", "Monitorizare", "Mentenanță", "Suport"],
    },
  ],
  aplicatiiMobile: [
    {
      title: "Aplicații iOS și Android",
      image: "/img/illustrations/360x440_list-01.webp",
      desc: "Dezvoltăm aplicații mobile care oferă o experiență fluidă, rapidă și clară pentru utilizatori, cu accent pe retenție și uz real.",
      tags: ["iOS", "Android", "Cross-platform", "UX mobil", "Publicare"],
    },
    {
      title: "MVP și validare de produs",
      image: "/img/illustrations/360x440_list-02.webp",
      desc: "Te ajutăm să lansezi repede o primă versiune stabilă, suficient de bună pentru testare, feedback și primele rezultate comerciale.",
      tags: ["MVP", "Prototype", "Product scope", "Roadmap", "Iterații"],
    },
    {
      title: "Integrare cu sisteme existente",
      image: "/img/illustrations/360x440_list-03.webp",
      desc: "Conectăm aplicația mobilă la ERP, CRM, sisteme interne, plăți, notificări și alte servicii critice pentru operațiunea zilnică.",
      tags: ["API", "Plăți", "Push notifications", "Auth", "Sincronizare"],
    },
    {
      title: "Optimizare și suport post-lansare",
      image: "/img/illustrations/360x440_list-04.webp",
      desc: "Îmbunătățim stabilitatea, rezolvăm bottleneck-urile și evoluăm produsul după lansare pe baza comportamentului real al utilizatorilor.",
      tags: ["Crash fixes", "Analytics", "Release updates", "Mentenanță", "Suport"],
    },
  ],
  automatizariAI: [
    {
      title: "Automatizări pentru task-uri repetitive",
      image: "/img/illustrations/360x440_list-01.webp",
      desc: "Reducem munca manuală din procese precum clasificarea informației, completarea datelor, sumarizarea și rutarea solicitărilor.",
      tags: ["Workflow-uri", "Clasificare", "Sumarizare", "Asistenți interni", "Procese"],
    },
    {
      title: "Asistenți conversaționali și suport intern",
      image: "/img/illustrations/360x440_list-02.webp",
      desc: "Construim asistenți care răspund rapid pe baza documentației, procedurilor sau informațiilor din companie.",
      tags: ["Chatbot", "Knowledge base", "Documente", "Suport", "FAQ"],
    },
    {
      title: "AI integrat în produs",
      image: "/img/illustrations/360x440_list-03.webp",
      desc: "Adăugăm capabilități AI în aplicația ta acolo unde chiar contează pentru utilizator și pentru eficiența operațională.",
      tags: ["Feature AI", "Search", "Generare", "Scoring", "Recomandări"],
    },
    {
      title: "Control, evaluare și costuri",
      image: "/img/illustrations/360x440_list-04.webp",
      desc: "Definim limite, reguli, evaluări și fluxuri de fallback astfel încât implementarea AI să rămână utilă, sigură și sustenabilă financiar.",
      tags: ["Guardrails", "Evaluare", "Fallback", "Cost control", "Monitoring"],
    },
  ],
  devopsCloud: [
    {
      title: "CI/CD și deploy predictibil",
      image: "/img/illustrations/360x440_list-01.webp",
      desc: "Automatizăm build-urile, testele și deploy-urile pentru lansări mai rapide, mai sigure și mai puțin dependente de intervenții manuale.",
      tags: ["CI/CD", "Git workflows", "Deploy", "Rollback", "Automatizare"],
    },
    {
      title: "Infrastructură cloud scalabilă",
      image: "/img/illustrations/360x440_list-02.webp",
      desc: "Configurăm infrastructura astfel încât aplicația să reziste mai bine la creștere, trafic și schimbări de complexitate.",
      tags: ["AWS", "Cloud", "Containers", "Scalare", "Networking"],
    },
    {
      title: "Observabilitate și stabilitate",
      image: "/img/illustrations/360x440_list-03.webp",
      desc: "Punem monitorizare, logare și alerte în locurile critice, astfel încât problemele să fie detectate înainte să afecteze serios business-ul.",
      tags: ["Logs", "Monitoring", "Alerts", "Tracing", "Uptime"],
    },
    {
      title: "Optimizare de cost și securizare",
      image: "/img/illustrations/360x440_list-04.webp",
      desc: "Reducem risipa din infrastructură și introducem reguli, acces controlat și bune practici pentru un mediu tehnic mai sănătos.",
      tags: ["Cost control", "IAM", "Backups", "Policies", "Hardening"],
    },
  ],
  securitateMentenanta: [
    {
      title: "Monitorizare și intervenție rapidă",
      image: "/img/illustrations/360x440_list-01.webp",
      desc: "Urmărim sănătatea aplicației și intervenim când apar incidente, degradări de performanță sau riscuri care pot afecta continuitatea.",
      tags: ["Uptime", "Incidente", "Alerte", "Suport", "Stabilitate"],
    },
    {
      title: "Actualizări și mentenanță preventivă",
      image: "/img/illustrations/360x440_list-02.webp",
      desc: "Actualizăm dependințe, pachete și componente critice înainte ca problemele să devină costisitoare sau greu de gestionat.",
      tags: ["Update-uri", "Dependențe", "Patching", "Refactor minor", "Prevenție"],
    },
    {
      title: "Backup și recuperare",
      image: "/img/illustrations/360x440_list-03.webp",
      desc: "Definim backup-uri și pași clari de recuperare pentru date și infrastructură, astfel încât riscul operațional să fie redus.",
      tags: ["Backup", "Restore", "Disaster recovery", "Baze de date", "Planuri"],
    },
    {
      title: "Audit tehnic și securitate de bază",
      image: "/img/illustrations/360x440_list-04.webp",
      desc: "Revizuim suprafețele sensibile, accesul, configurările și practicile actuale pentru a închide vulnerabilitățile evidente și riscurile comune.",
      tags: ["Audit", "Acces", "Config review", "Hardening", "Bune practici"],
    },
  ],
};
