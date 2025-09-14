import Link from 'next/link'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Acasă',
  description: 'Visual Studio — portal clienți pentru servicii software la comandă: intake, ofertare, execuție, status live și facturare.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Visual Studio — Portal clienți',
    description: 'Platformă completă: intake, ofertare, execuție, status live și facturare.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <div>
      <Script id="ld-org" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Visual Studio',
          url: (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, ''),
          logo: (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '') + '/logo.png'
        }) }}
      />
      <Script id="ld-website" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Visual Studio',
          url: (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, ''),
          potentialAction: {
            '@type': 'SearchAction',
            target: (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '') + '/?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Decorative background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* soft blobs */}
          <div className="absolute left-1/2 top-[-10%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-200/60 to-sky-200/60 blur-3xl dark:from-primary-400/20 dark:to-sky-400/20" />
          <div className="absolute right-[-10%] bottom-[-10%] h-[300px] w-[600px] rounded-full bg-gradient-to-tr from-sky-100/60 to-primary-100/60 blur-3xl dark:from-sky-300/15 dark:to-primary-300/15" />
          {/* grid only in light theme (too distracting in dark) */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.06] text-slate-400 dark:hidden" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <Container>
          <div className="mx-auto max-w-3xl text-center pt-20 pb-16 lg:pt-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
              <span>Nou</span>
              <span className="h-1 w-1 rounded-full bg-primary-600" />
              <span>Portal clienți complet</span>
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-primary-600 to-sky-500 bg-clip-text text-transparent">Construim software clar, rapid și transparent</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Platformă completă pentru clienți: intake, ofertare, execuție, status live și facturare – totul într-un singur loc.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link href="/login"><Button className="px-5 py-3">Intră în portal</Button></Link>
              <Link href="/projects" className="rounded-md px-5 py-3 font-semibold text-primary-700 ring-1 ring-primary-200 hover:bg-primary-50">Vezi proiecte demo</Link>
            </div>
            {/* Logos */}
            <div className="mt-12">
              <p className="text-xs uppercase tracking-widest text-slate-500">De încredere de echipe</p>
              <div className="mt-3 grid grid-cols-3 items-center justify-items-center gap-6 opacity-80 sm:grid-cols-5">
                {[ 
                  { src: '/logos/acme.svg', alt: 'ACME' },
                  { src: '/logos/apex.svg', alt: 'APEX' },
                  { src: '/logos/zen.svg', alt: 'ZEN' },
                  { src: '/logos/hyper.svg', alt: 'HYPER' },
                  { src: '/logos/nova.svg', alt: 'NOVA' },
                ].map(l => (
                  <span key={l.alt} className="text-slate-400 dark:text-slate-500">
                    <img src={l.src} alt={l.alt} className="h-6 w-auto" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-14">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Transparență totală', desc: 'Board, milestones și progres în timp real pentru fiecare proiect.' },
              { title: 'Comunicare integrată', desc: 'Mesaje și fișiere în portal, notificări email/in-app.' },
              { title: 'Facturare simplă', desc: 'Oferte, facturi și plăți Stripe, toate într-un singur loc.' },
              { title: 'KPI & rapoarte', desc: 'Vedere clară pe cost, timp și progres.' },
              { title: 'Securitate', desc: 'Autentificare, ACL, audit log, rate limiting.' },
              { title: 'Scalabil', desc: 'Arhitectură pregătită pentru creștere.' },
            ].map((f) => (
              <Card key={f.title} className="transition hover:-translate-y-0.5 hover:shadow-card">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                    <p className="mt-2 text-slate-600">{f.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats band */}
      <section>
        <Container>
          <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-subtle sm:grid-cols-3">
            {[
              { k: 'SLA mediu', v: '24h' },
              { k: 'Livrabile/lună', v: '50+' },
              { k: 'Satisfacție', v: '99%' },
            ].map((s) => (
              <div key={s.k}>
                <div className="text-3xl font-extrabold text-slate-900">{s.v}</div>
                <div className="text-sm text-slate-600">{s.k}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50">
        <Container>
          <div className="py-16">
            <h2 className="text-center text-3xl font-bold text-slate-900">Abonamente</h2>
            <p className="mt-2 text-center text-slate-600">Retainer lunar pentru mentenanță și dezvoltare continuă</p>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <Card>
                <h3 className="text-lg font-semibold text-slate-900">Basic</h3>
                <p className="mt-1 text-slate-600">10 ore/lună · SLA 48h</p>
                <p className="mt-4 text-3xl font-bold text-slate-900">€X<span className="text-base font-medium text-slate-600">/lună</span></p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>– Mentenanță & bugfix</li>
                  <li>– Mică dezvoltare</li>
                </ul>
                <Link href="/login"><Button className="mt-6 w-full">Începe</Button></Link>
              </Card>
              <Card className="border-primary-600 relative">
                <span className="absolute -top-3 right-4 rounded-full bg-primary-600 px-2 py-0.5 text-xs font-bold text-white">Popular</span>
                <h3 className="text-lg font-semibold text-slate-900">Growth</h3>
                <p className="mt-1 text-slate-600">30 ore/lună · SLA 24h</p>
                <p className="mt-4 text-3xl font-bold text-slate-900">€Y<span className="text-base font-medium text-slate-600">/lună</span></p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>– Iterații feature</li>
                  <li>– Optimizări & A/B</li>
                  <li>– PM inclus</li>
                </ul>
                <Link href="/login"><Button className="mt-6 w-full">Alege planul</Button></Link>
              </Card>
              <Card>
                <h3 className="text-lg font-semibold text-slate-900">Pro</h3>
                <p className="mt-1 text-slate-600">60+ ore/lună · SLA 8h</p>
                <p className="mt-4 text-3xl font-bold text-slate-900">€Z<span className="text-base font-medium text-slate-600">/lună</span></p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>– Roadmap dedicat</li>
                  <li>– Integrare CI/CD</li>
                  <li>– Suport prioritar</li>
                </ul>
                <Link href="/login"><Button className="mt-6 w-full">Contactează-ne</Button></Link>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <Container>
          <h2 className="text-center text-3xl font-bold text-slate-900">Ce spun clienții</h2>
          <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              { name: 'Ana Popescu', role: 'COO, Acme', text: 'Am pornit în 2 săptămâni cu un prototip funcțional și am livrat la timp fiecare milestone.' },
              { name: 'Mihai Ionescu', role: 'CTO, FinTech', text: 'Claritate și execuție. Dashboard-ul ne ajută să urmărim progresul zilnic.' },
              { name: 'Ioana Georgescu', role: 'Founder, Marketplace', text: 'Recomand fără rezerve: comunicare excelentă și rezultate peste așteptări.' },
            ].map((t) => (
              <Card key={t.name} className="h-full">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                    {t.name.split(' ').map(s=>s[0]).slice(0,2).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
                <p className="mt-3 text-slate-700">“{t.text}”</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <Container>
          <h2 className="text-center text-3xl font-bold text-slate-900">Întrebări frecvente</h2>
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {[
              { q: 'Cât de repede putem începe?', a: 'De regulă în 3–5 zile lucrătoare. Începem cu un scurt discovery și definim primul sprint.' },
              { q: 'Cum se facturează?', a: 'Pe bază de abonament lunar (retainer) sau per proiect. Integrare Stripe este disponibilă.' },
              { q: 'Cum urmărim progresul?', a: 'Prin portal: milestones, task-uri, mesaje, fișiere și KPI-uri vizibile în timp real.' },
            ].map((f, i) => (
              <details key={i} className="group px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
                  {f.q}
                  <span className="text-slate-400 group-open:rotate-180 transition">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                </summary>
                <p className="mt-2 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA band */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary-600 to-sky-500 p-1 shadow-card">
            <div className="rounded-2xl bg-white px-6 py-8 text-center dark:bg-slate-950">
              <h3 className="text-2xl font-extrabold text-slate-900">Gata să pornim?</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Vorbește cu noi și îți organizăm rapid primul sprint.</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <Link href="/contact"><Button>Contactează-ne</Button></Link>
                <Link href="/login" className="px-4 py-2 text-sm font-semibold text-primary-700 ring-1 ring-primary-200 rounded hover:bg-primary-50">Intră în portal</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

    </div>
  )
}
