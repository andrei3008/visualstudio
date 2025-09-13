import { NextResponse } from 'next/server'

export function GET() {
  const demo = [
    { id: 1, name: 'Website prezentare', status: 'in-progress' },
    { id: 2, name: 'Aplicatie mobilă', status: 'scoping' },
    { id: 3, name: 'Portal clienți', status: 'review' }
  ]
  return NextResponse.json(demo)
}

