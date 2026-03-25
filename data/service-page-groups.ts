import { Service2 } from "@/types/services";

export const servicePageGroups: Record<string, Service2[]> = {
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
