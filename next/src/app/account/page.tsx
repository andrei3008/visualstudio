export const metadata = { title: 'Contul meu' }

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { findUserByEmail } from '@/lib/users'
import AccountProfileForm from '@/components/AccountProfileForm'
import AccountPasswordForm from '@/components/AccountPasswordForm'

function formatDate(iso?: string) {
  if (!iso) return '-'
  try {
    return new Date(iso).toLocaleString('ro-RO', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

export default async function AccountPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const user = await findUserByEmail(session.user.email)

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 lg:px-8">
      <h1 className="text-2xl font-bold">Contul meu</h1>
      <p className="mt-1 text-slate-600">Informații despre profilul tău.</p>

      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-slate-200 p-5">
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-slate-500">Email</dt>
            <dd className="sm:col-span-2 text-slate-900">{session.user.email}</dd>

            <dt className="text-sm font-medium text-slate-500">Nume</dt>
            <dd className="sm:col-span-2 text-slate-900">{session.user.name || user?.name || '-'}</dd>

            <dt className="text-sm font-medium text-slate-500">ID utilizator</dt>
            <dd className="sm:col-span-2 text-slate-900">{user?.id || '-'}</dd>

            <dt className="text-sm font-medium text-slate-500">Creat la</dt>
            <dd className="sm:col-span-2 text-slate-900">{formatDate(user?.createdAt)}</dd>
          </dl>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Editează profil</h2>
          <p className="mt-1 text-slate-600">Actualizează numele afișat.</p>
          <div className="mt-4">
            <AccountProfileForm initialName={user?.name} />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Schimbă parola</h2>
          <p className="mt-1 text-slate-600">Folosește o parolă de minim 8 caractere, cu litere și cifre.</p>
          <div className="mt-4">
            <AccountPasswordForm />
          </div>
        </div>
      </div>
    </main>
  )
}
