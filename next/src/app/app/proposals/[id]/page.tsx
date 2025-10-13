import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'
import Link from 'next/link'
import ProposalView from '@/components/ProposalView'
import type { Metadata } from 'next'
import DashboardLayout from '../../components/DashboardLayout'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await prisma.proposal.findUnique({ where: { id: params.id }, select: { title: true } })
  return { title: p?.title ? `Propunere — ${p.title}` : 'Propunere' }
}

export default async function ProposalDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const user = await findUserByEmail(session.user.email)
  if (!user) redirect('/login')

  const proposal = await prisma.proposal.findFirst({
    where: { id: params.id, project: { userId: user.id } },
    include: {
      project: true,
      items: { orderBy: { createdAt: 'asc' } }
    }
  })

  if (!proposal) redirect('/app')

  const handleApprove = async () => {
    'use server'
    // This would be implemented if we want approval functionality
    console.log('Proposal approved:', proposal.id)
  }

  const handleReject = async (reason: string) => {
    'use server'
    // This would be implemented if we want rejection functionality
    console.log('Proposal rejected:', proposal.id, reason)
  }

  return (
    <DashboardLayout title={proposal.title} subtitle={`Proiect: ${proposal.project.name}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link href="/app" className="text-blue-600 hover:text-blue-700 hover:underline">
              ← Înapoi la Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/proposal/${proposal.publicToken}`} className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
              Link public
            </Link>
            <Link href={`/api/proposals/${proposal.id}/pdf`} className="text-sm text-blue-600 hover:text-blue-700 hover:underline" target="_blank">
              Descarcă PDF
            </Link>
          </div>
        </div>

        <ProposalView
          proposal={{
            id: proposal.id,
            title: proposal.title,
            description: proposal.description || '',
            status: proposal.status,
            submittedAt: proposal.submittedAt?.toISOString() || undefined,
            approvedAt: proposal.approvedAt?.toISOString() || undefined,
            publicToken: proposal.publicToken,
            items: proposal.items,
            aiGeneratedTasks: proposal.aiGeneratedTasks as any,
            clientFeedback: proposal.clientFeedback as any,
            project: {
              name: proposal.project.name,
              description: proposal.project.description || '',
              requestDetails: proposal.project.requestDetails as any
            }
          }}
          canApprove={proposal.status === 'client_review'}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </DashboardLayout>
  )
}
