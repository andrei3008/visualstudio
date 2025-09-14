import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Servicii',
  description: 'Servicii software la comandă — analiză, design, dezvoltare, testare, mentenanță și creștere.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <main className="py-14">
      <Container>
        <Script id="ld-breadcrumb-services" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Acasă', item: (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '') + '/' },
              { '@type': 'ListItem', position: 2, name: 'Servicii', item: (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '') + '/services' },
            ],
          }) }}
        />
        <h1 className="text-3xl font-bold">Servicii</h1>
        <p className="mt-2 text-slate-600 max-w-3xl">Acoperim cap-coadă ciclul de viață al produsului: de la idee la livrare și creștere continuă.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <h2 className="text-lg font-semibold">Analiză & Discovery</h2>
            <ul className="mt-2 list-disc pl-5 text-slate-600 text-sm">
              <li>Interviuri stakeholder</li>
              <li>Definire obiective & KPI</li>
              <li>Plan de execuție</li>
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">Design & UX</h2>
            <ul className="mt-2 list-disc pl-5 text-slate-600 text-sm">
              <li>Prototipuri interactive</li>
              <li>Design system</li>
              <li>Testare cu utilizatori</li>
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">Dezvoltare</h2>
            <ul className="mt-2 list-disc pl-5 text-slate-600 text-sm">
              <li>Web & API</li>
              <li>Integrare plăți & terțe</li>
              <li>Scalabilitate & securitate</li>
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">QA & Observabilitate</h2>
            <ul className="mt-2 list-disc pl-5 text-slate-600 text-sm">
              <li>Testare automată</li>
              <li>Monitorizare & alerte</li>
              <li>Perf tuning</li>
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">Mentenanță</h2>
            <ul className="mt-2 list-disc pl-5 text-slate-600 text-sm">
              <li>Suport & SLA</li>
              <li>Actualizări & securitate</li>
              <li>Optimizări continue</li>
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">Creștere</h2>
            <ul className="mt-2 list-disc pl-5 text-slate-600 text-sm">
              <li>A/B testing</li>
              <li>Analytics & funnels</li>
              <li>SEO tehnic</li>
            </ul>
          </Card>
        </div>
      </Container>
    </main>
  )
}
