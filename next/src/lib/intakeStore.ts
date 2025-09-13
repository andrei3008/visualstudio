export type Intake = {
  id: string
  name: string
  email: string
  company?: string
  budget?: string
  deadline?: string
  description?: string
  createdAt: string
}

const store: Intake[] = []

export function addIntake(data: Omit<Intake, 'id' | 'createdAt'>) {
  const item: Intake = {
    id: Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString(),
    ...data,
  }
  store.push(item)
  // eslint-disable-next-line no-console
  console.log('Intake received:', item)
  return item
}

export function listIntakes() {
  return store
}

