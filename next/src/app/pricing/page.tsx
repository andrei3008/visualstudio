import Link from 'next/link'

export const metadata = { title: 'Prețuri — Client Portal' }

export default function PricingPage() {
  return (
    <main className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 text-center">Abonamente</h1>
        <p className="mt-2 text-center text-slate-600">Retainer lunar pentru mentenanță și dezvoltare continuă</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Basic</h3>
            <p className="mt-1 text-slate-600">10 ore/lună · SLA 48h</p>
            <p className="mt-4 text-3xl font-bold text-slate-900">€X<span className="text-base font-medium text-slate-600">/lună</span></p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>– Mentenanță & bugfix</li>
              <li>– Mică dezvoltare</li>
            </ul>
            <Link href="/contact" className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700">Începe</Link>
          </div>
          <div className="rounded-2xl border-2 border-primary-600 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Growth</h3>
            <p className="mt-1 text-slate-600">30 ore/lună · SLA 24h</p>
            <p className="mt-4 text-3xl font-bold text-slate-900">€Y<span className="text-base font-medium text-slate-600">/lună</span></p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>– Iterații feature</li>
              <li>– Optimizări & A/B</li>
              <li>– PM inclus</li>
            </ul>
            <Link href="/contact" className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700">Alege planul</Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Pro</h3>
            <p className="mt-1 text-slate-600">60+ ore/lună · SLA 8h</p>
            <p className="mt-4 text-3xl font-bold text-slate-900">€Z<span className="text-base font-medium text-slate-600">/lună</span></p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>– Roadmap dedicat</li>
              <li>– Integrare CI/CD</li>
              <li>– Suport prioritar</li>
            </ul>
            <Link href="/contact" className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700">Contactează-ne</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

