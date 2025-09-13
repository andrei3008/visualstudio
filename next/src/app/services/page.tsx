export const metadata = { title: 'Servicii — Client Portal' }

export default function ServicesPage() {
  const services = [
    {
      title: 'MVP Web App',
      desc: 'Discovery, design, dezvoltare și UAT în 4–6 săptămâni.',
      bullets: ['Stack modern', 'SSR/SEO', 'CI/CD', 'Documentație']
    },
    {
      title: 'Landing Page Premium',
      desc: 'Pagină de prezentare performantă, copy și tracking corect.',
      bullets: ['Design custom', 'GA4/Pixel', 'A/B-ready', 'SEO on-page']
    },
    {
      title: 'Integrare API/Automations',
      desc: 'Conectăm sisteme și automatizăm procesele repetitive.',
      bullets: ['Webhook-uri', 'ETL light', 'Sync bidirecțional', 'Monitorizare']
    }
  ]

  return (
    <main className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Servicii</h1>
      <p className="mt-2 text-slate-600">Pachete productizate, livrare rapidă și predictibilă.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(s => (
          <div key={s.title} className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-slate-600">{s.desc}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {s.bullets.map(b => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}

