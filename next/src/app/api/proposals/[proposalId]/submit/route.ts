import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'

export async function POST(_req: Request, ctx: { params: { proposalId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const prop = await prisma.proposal.findFirst({ where: { id: ctx.params.proposalId, project: { userId: user.id } } })
  if (!prop) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (prop.status !== 'draft') return NextResponse.json({ error: 'Doar propunerile în draft pot fi trimise' }, { status: 400 })

  const updated = await prisma.proposal.update({
    where: { id: prop.id },
    data: { status: 'submitted', submittedAt: new Date() },
    select: { id: true, status: true, submittedAt: true },
  })
  return NextResponse.json(updated)
}

