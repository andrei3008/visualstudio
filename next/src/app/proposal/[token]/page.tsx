import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import PublicApproveButton from '@/components/PublicApproveButton'

export default async function PublicProposalPage({ params }: { params: { token: string } }) {
  const prop = await prisma.proposal.findUnique({ where: { publicToken: params.token }, include: { project: true, items: { orderBy: { createdAt: 'asc' } } } })
  if (!prop) return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Propunere inexistentă</h1>
      <p className="mt-2 text-slate-600">Link-ul nu este valid.</p>
    </main>
  )
  const total = prop.items.reduce((s, it) => s + it.qty * it.unitPriceCents, 0)

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">{prop.title}</h1>
      <p className="text-slate-600">Proiect: {prop.project.name}</p>

      <ul className="mt-6 space-y-2">
        {prop.items.length === 0 ? (
          <li className="text-slate-600">Nu există linii încă.</li>
        ) : (
          prop.items.map((it) => (
            <li key={it.id} className="flex items-center justify-between rounded border border-slate-200 p-3">
              <div>
                <div className="font-medium">{it.description}</div>
                <div className="text-xs text-slate-500">Qty: {it.qty} · Preț unitar: {(it.unitPriceCents/100).toFixed(2)} EUR</div>
              </div>
              <div className="font-semibold">{((it.qty*it.unitPriceCents)/100).toFixed(2)} EUR</div>
            </li>
          ))
        )}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg font-bold">Total: {(total/100).toFixed(2)} EUR</div>
        <div className="flex items-center gap-3">
          <Link href={`/api/proposals/public/${params.token}/pdf`} className="text-sm text-primary-700 hover:underline" target="_blank">Descarcă PDF</Link>
          {prop.status === 'approved' ? (
            <span className="rounded bg-green-100 px-3 py-1 text-green-800 text-sm font-semibold">Aprobat</span>
          ) : prop.status === 'submitted' ? (
            <PublicApproveButton token={params.token} />
          ) : (
            <span className="text-sm text-slate-500">Propunerea nu este în status de trimis.</span>
          )}
        </div>
      </div>

      <div className="mt-6 text-sm text-slate-500">
        <Link href="/" className="text-primary-700 hover:underline">© Client Portal</Link>
      </div>
    </main>
  )
}
