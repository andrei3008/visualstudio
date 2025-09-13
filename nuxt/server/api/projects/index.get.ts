type Project = { id: number; name: string; status: 'intake'|'scoping'|'in-progress'|'review'|'done' }

const demo: Project[] = [
  { id: 1, name: 'Website prezentare', status: 'in-progress' },
  { id: 2, name: 'Aplicatie mobilă', status: 'scoping' },
  { id: 3, name: 'Portal clienți', status: 'review' }
]

export default defineEventHandler(() => demo)

