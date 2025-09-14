import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'
import Link from 'next/link'
import NewProposalItemForm from '@/components/NewProposalItemForm'
import SubmitProposalButton from '@/components/SubmitProposalButton'
import DeleteProposalItemButton from '@/components/DeleteProposalItemButton'

export default async function ProposalDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const user = await findUserByEmail(session.user.email)
  if (!user) redirect('/login')
  const proposal = await prisma.proposal.findFirst({ where: { id: params.id, project: { userId: user.id } }, include: { project: true, items: { orderBy: { createdAt: 'asc' } } } })
  if (!proposal) redirect('/app')
  const total = proposal.items.reduce((s, it) => s + it.qty * it.unitPriceCents, 0)

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{proposal.title}</h1>
          <p className="text-slate-600">Proiect: <Link href={`/app/projects/${proposal.projectId}`} className="text-primary-700 hover:underline">{proposal.project.name}</Link></p>
        </div>
        <Link href="/app" className="text-sm text-primary-700 hover:underline">← Înapoi la dashboard</Link>
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">Status: <span className="font-semibold text-slate-900">{String(proposal.status)}</span></div>
          <div className="flex items-center gap-3">
            <Link href={`/proposal/${proposal.publicToken}`} className="text-sm text-primary-700 hover:underline">Link public</Link>
            <Link href={`/api/proposals/${proposal.id}/pdf`} className="text-sm text-primary-700 hover:underline" target="_blank">Descarcă PDF</Link>
            {proposal.status === 'draft' && <SubmitProposalButton proposalId={proposal.id} />}
          </div>
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Linii ofertă</h2>
        <div className="mt-4"><NewProposalItemForm proposalId={proposal.id} /></div>
        <ul className="mt-6 space-y-2">
          {proposal.items.length === 0 ? (
            <li className="text-slate-600">Nu există linii încă.</li>
          ) : (
            proposal.items.map((it: any) => (
              <li key={it.id} className="flex items-center justify-between rounded border border-slate-200 p-3">
                <div>
                  <div className="font-medium">{it.description}</div>
                  <div className="text-xs text-slate-500">Qty: {it.qty} · Preț unitar: {(it.unitPriceCents/100).toFixed(2)} EUR</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-semibold">{((it.qty*it.unitPriceCents)/100).toFixed(2)} EUR</div>
                  <DeleteProposalItemButton proposalId={proposal.id} itemId={it.id} />
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="mt-6 text-right text-lg font-bold">Total: {(total/100).toFixed(2)} EUR</div>
      </section>
    </main>
  )
}
