import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import PDFDocument from 'pdfkit'
import { PassThrough } from 'stream'

export async function GET(_req: Request, ctx: { params: { proposalId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const prop = await prisma.proposal.findFirst({
    where: { id: ctx.params.proposalId, project: { user: { email: session.user.email! } } },
    include: { project: true, items: { orderBy: { createdAt: 'asc' } } },
  })
  if (!prop) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const total = prop.items.reduce((s, it) => s + it.qty * it.unitPriceCents, 0)
  const doc = new PDFDocument({ margin: 50 })
  const stream = new PassThrough()
  doc.pipe(stream)

  doc.fontSize(18).text('Propunere', { align: 'right' })
  doc.moveDown(0.5)
  doc.fontSize(12).text(`Titlu: ${prop.title}`)
  doc.text(`Proiect: ${prop.project.name}`)
  doc.text(`Status: ${prop.status}`)
  if (prop.submittedAt) doc.text(`Trimis: ${new Date(prop.submittedAt).toLocaleString('ro-RO')}`)
  if (prop.approvedAt) doc.text(`Aprobat: ${new Date(prop.approvedAt).toLocaleString('ro-RO')}`)
  doc.moveDown()

  doc.fontSize(12).text('Linii ofertă:', { underline: true })
  doc.moveDown(0.5)
  prop.items.forEach((it) => {
    const lineTotal = (it.qty * it.unitPriceCents) / 100
    doc.text(`• ${it.description} — Qty: ${it.qty}, Preț unitar: ${(it.unitPriceCents/100).toFixed(2)} EUR, Total: ${lineTotal.toFixed(2)} EUR`)
  })
  doc.moveDown()
  doc.fontSize(14).text(`Total: ${(total/100).toFixed(2)} EUR`, { align: 'right' })

  doc.end()
  return new Response(stream as any, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="proposal-${prop.id}.pdf"`,
    },
  })
}

