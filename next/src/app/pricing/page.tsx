

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'Prețuri',
  description: 'Abonamente & prețuri — retainer lunar pentru mentenanță și dezvoltare continuă.',
  alternates: { canonical: '/pricing' },
}

export default function PricingPage() {
  return (
    <main className="py-14">
      <div className="container">
        <Script id="ld-breadcrumb-pricing" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Acasă', item: (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '') + '/' },
              { '@type': 'ListItem', position: 2, name: 'Prețuri', item: (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '') + '/pricing' },
            ],
          }) }}
        />
        <h1 className="text-3xl font-bold text-slate-900">Prețuri</h1>
        <p className="mt-2 text-slate-600">Alege pachetul potrivit echipei tale.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card>
            <h2 className="text-lg font-semibold">Basic</h2>
            <p className="mt-1 text-slate-600">10 ore/lună · SLA 48h</p>
            <p className="mt-4 text-3xl font-bold text-slate-900">€X<span className="text-base font-medium text-slate-600">/lună</span></p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>– Mentenanță & bugfix</li>
              <li>– Mică dezvoltare</li>
            </ul>
            <Link href="/login"><Button className="mt-6 w-full">Începe</Button></Link>
          </Card>
          <Card className="border-primary-600">
            <h2 className="text-lg font-semibold">Growth</h2>
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
            <h2 className="text-lg font-semibold">Pro</h2>
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
    </main>
  )
}
