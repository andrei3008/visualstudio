import { LandingContent } from "@/types/landing";

export const landingContent: Record<string, LandingContent> = {
  automatizariFirme: {
    painPoints: [
      {
        icon: "ph-clock-countdown",
        title: "Ore pierdute pe procese manuale",
        description:
          "Echipe pierd zeci de ore săptămânal copiind date dintr-un tool în altul, introducând informații manual și verificând erori.",
      },
      {
        icon: "ph-funnel-x",
        title: "Lead-uri care se pierd",
        description:
          "Formulare, email-uri și mesaje care nu ajung niciodată în CRM, pentru că nimeni nu le procesează constant.",
      },
      {
        icon: "ph-repeat",
        title: "Rapoarte manuale, săptămână de săptămână",
        description:
          " aceleași rapoarte, aceleași formate, aceeași pierdere de timp — luni de luni, fără nici o automatizare.",
      },
      {
        icon: "ph-user-minus",
        title: "Procese dependente de o persoană",
        description:
          "Dacă persoana cheie lipsește, totul se blochează. Nimic nu e documentat sau automatizat.",
      },
    ],
    testimonials: [
      {
        name: "Mihai R.",
        role: "Director Operațiuni",
        company: "SRL",
        text: "Am economisit 20+ ore pe săptămână din procese repetitive. Echipa se concentrează acum pe ceea ce contează cu adevărat.",
        rating: 5,
      },
      {
        name: "Elena D.",
        role: "Marketing Manager",
        company: "SRL",
        text: "Lead-urile noastre ajung acum în CRM în timp real, fără să mai pierdem niciunul. Diferența e uriașă.",
        rating: 5,
      },
      {
        name: "Andrei P.",
        role: "CEO",
        company: "SRL",
        text: "Cel mai bun ROI pe care l-am avut vreodată pe o investiție internă. S-a plătit singur în 2 luni.",
        rating: 5,
      },
    ],
    steps: [
      {
        number: 1,
        title: "Discuție gratuită",
        description:
          "Analizăm procesele tale și identificăm ce se poate automatiza. Fără costuri, fără obligații.",
        icon: "ph-chat-circle-text",
      },
      {
        number: 2,
        title: "Plan & propunere",
        description:
          "Primești un roadmap clar cu costuri, termene și rezultate estimate.",
        icon: "ph-map-trifold",
      },
      {
        number: 3,
        title: "Implementare",
        description:
          "Construim și testăm automatizările pas cu pas, cu validări la fiecare etapă.",
        icon: "ph-gear-six",
      },
      {
        number: 4,
        title: "Livrare & monitorizare",
        description:
          "Totul rulează, monitorizăm performața și optimizăm pe parcurs.",
        icon: "ph-chart-line-up",
      },
    ],
    heroStats: [
      { value: "70+", label: "automatizări livrate" },
      { value: "48h", label: "timp maxim răspuns" },
      { value: "100%", label: "proiecte la timp" },
    ],
  },

  siteuriMagazine: {
    painPoints: [
      {
        icon: "ph-turtle",
        title: "Site lent = vizitatori plecați",
        description:
          "Studiile arată că 53% dintre vizitatori pleacă dacă site-ul nu se încarcă în 3 secunde. Site-ul tău cât durează?",
      },
      {
        icon: "ph-device-mobile",
        title: "Arată prost pe mobil",
        description:
          "70% din trafic vine de pe mobil, dar majoritatea site-urilor românești nu sunt optimizate corect pentru ecrane mici.",
      },
      {
        icon: "ph-currency-dollar",
        title: "Plătești, dar nu aduce lead-uri",
        description:
          "Ai investit în site, poate chiar în reclame, dar formularul de contact e gol. Problema nu e traficul — e conversia.",
      },
      {
        icon: "ph-lock-simple-open",
        title: "Depinzi de altcineva pentru orice modificare",
        description:
          "Nu poți schimba un text, o imagine sau o ofertă fără să apelezi la cineva. Și aștepți zile pentru un simplu update.",
      },
    ],
    testimonials: [
      {
        name: "Cristian M.",
        role: "Fondator",
        company: "SRL",
        text: "Site-ul nou a crescut conversiile de 3x în prima lună. M-a convins să investesc mai mult în digital.",
        rating: 5,
      },
      {
        name: "Ana S.",
        role: "Owner",
        company: "SRL",
        text: "Am primit un magazin online gata de vânzare, fără bătăi de cap. Primele comenzi au venit în prima săptămână.",
        rating: 5,
      },
      {
        name: "Diana V.",
        role: "Marketing",
        company: "SRL",
        text: "În sfârșit un site pe care mă pot baza și pe care îl pot modifica singură. Nu mai depind de nimeni.",
        rating: 5,
      },
    ],
    steps: [
      {
        number: 1,
        title: "Discuție & brief",
        description:
          "Ne spui ce ai nevoie, noi propunem structura și funcționalitățile potrivite.",
        icon: "ph-chat-circle-text",
      },
      {
        number: 2,
        title: "Design & aprobare",
        description:
          "Primești mockup-uri, le ajustăm împreună până ești mulțumit la 100%.",
        icon: "ph-paint-brush",
      },
      {
        number: 3,
        title: "Dezvoltare",
        description:
          "Construim site-ul rapid, cu update-uri regulate. Vedezi progresul în timp real.",
        icon: "ph-code",
      },
      {
        number: 4,
        title: "Lansare & suport",
        description:
          "Dăm live, configurăm tot, 30 zile suport inclus. Tu te concentrezi pe business.",
        icon: "ph-rocket-launch",
      },
    ],
    heroStats: [
      { value: "50+", label: "site-uri livrate" },
      { value: "2-4 săpt.", label: "timp livrare" },
      { value: "100%", label: "responsive" },
    ],
  },

  softwareCustomFirme: {
    painPoints: [
      {
        icon: "ph-puzzle-piece",
        title: "5 tool-uri pentru un singur proces",
        description:
          "Date fragmentate între Excel, email, CRM, ERP și încă un tool. Nimic nu e conectat, nimic nu e sincronizat.",
      },
      {
        icon: "ph-prohibit",
        title: "Te adaptezi la soft, nu soft-ul la tine",
        description:
          "Soft-uri generice care te obligă să îți schimbi procesele. Plătești pentru funcții pe care nu le folosești.",
      },
      {
        icon: "ph-users-three",
        title: "Excel-uri și email-uri interminabile",
        description:
          "Echipe lucrează în fișiere partajate și lanțuri de email-uri. Informația se pierde, deciziile se întârzie.",
      },
      {
        icon: "ph-chart-bar",
        title: "Fără vizibilitate reală",
        description:
          "Nu știi exact ce se întâmplă în operațiuni. Rapoartele sunt întârziate, incomplete sau inexistente.",
      },
    ],
    testimonials: [
      {
        name: "Radu I.",
        role: "COO",
        company: "SRL",
        text: "Am înlocuit 3 tool-uri cu o singură platformă custom. Echipa e mult mai productivă și datele sunt într-un singur loc.",
        rating: 5,
      },
      {
        name: "Maria T.",
        role: "Manager Proiect",
        company: "SRL",
        text: "Ne-au livrat exact ce aveam nevoie, nimic mai mult. Simplu, funcțional și pe termen lung.",
        rating: 5,
      },
      {
        name: "Florian C.",
        role: "CEO",
        company: "SRL",
        text: "ROI-ul s-a văzut în 3 luni. Investiția s-a plătit singură, iar acum economisim și mai mult.",
        rating: 5,
      },
    ],
    steps: [
      {
        number: 1,
        title: "Audit & definire",
        description:
          "Înțelegem procesele tale reale și definim cerințele tehnice în detaliu.",
        icon: "ph-magnifying-glass",
      },
      {
        number: 2,
        title: "Arhitectură & plan",
        description:
          "Propunem stack tehnic, structură de date și etape clare de dezvoltare.",
        icon: "ph-blueprint",
      },
      {
        number: 3,
        title: "Dezvoltare iterativă",
        description:
          "Livrăm funcțional la fiecare 2-3 săptămâni. Vezi progresul și poți ajusta.",
        icon: "ph-arrows-clockwise",
      },
      {
        number: 4,
        title: "Lansare & mentenanță",
        description:
          "Deploy, training pentru echipă, documentație completă și suport pe termen lung.",
        icon: "ph-shield-check",
      },
    ],
    heroStats: [
      { value: "30+", label: "platforme custom" },
      { value: "15 ani", label: "experiență" },
      { value: "24/7", label: "suport dedicat" },
    ],
  },
};
