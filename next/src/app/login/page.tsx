import { redirect } from 'next/navigation'

export default function LoginPage() {
  const submit = async (formData: FormData) => {
    'use server'
    // TODO: integrate real auth later
    redirect('/projects')
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold">Autentificare</h1>
      <form action={submit} className="mt-6 grid gap-3">
        <label className="grid gap-1">
          <span>Email</span>
          <input name="email" type="email" required className="rounded border px-3 py-2" />
        </label>
        <label className="grid gap-1">
          <span>Parolă</span>
          <input name="password" type="password" required className="rounded border px-3 py-2" />
        </label>
        <button className="mt-2 rounded bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700">Intră în cont</button>
      </form>
    </main>
  )
}

