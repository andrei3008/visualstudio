import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Construim software clar, rapid și transparent
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Platformă completă pentru clienți: intake, ofertare, execuție, status live și facturare – totul într-un singur loc.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/login" className="rounded-md bg-primary-600 px-5 py-3 text-white font-semibold shadow hover:bg-primary-700">
                Intră în portal
              </Link>
              <Link href="/projects" className="rounded-md px-5 py-3 font-semibold text-primary-700 ring-1 ring-primary-200 hover:bg-primary-50">
                Vezi proiecte demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Transparență totală</h3>
            <p className="mt-2 text-slate-600">Board, milestones și progres în timp real pentru fiecare proiect.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Comunicare integrată</h3>
            <p className="mt-2 text-slate-600">Mesaje și fișiere în portal, notificări email/in-app.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Facturare simplă</h3>
            <p className="mt-2 text-slate-600">Oferte, facturi și plăți Stripe, toate într-un singur loc.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900">Abonamente</h2>
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
              <Link href="/login" className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700">Începe</Link>
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
              <Link href="/login" className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700">Alege planul</Link>
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
              <Link href="/login" className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700">Contactează-ne</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Client Portal. Toate drepturile rezervate.
      </footer>
    </div>
  )
}

