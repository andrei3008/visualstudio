import { redirect } from 'next/navigation'
import { addIntake } from '@/lib/intakeStore'
import NotifyOnMount from '@/components/NotifyOnMount'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactează echipa Visual Studio pentru proiecte software la comandă.',
  alternates: { canonical: '/contact' },
}


type Props = { searchParams?: { success?: string } }

export default function ContactPage({ searchParams }: Props) {
  const success = searchParams?.success === '1'

  async function submit(formData: FormData) {
    'use server'
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const company = String(formData.get('company') || '').trim() || undefined
    const budget = String(formData.get('budget') || '').trim() || undefined
    const deadline = String(formData.get('deadline') || '').trim() || undefined
    const description = String(formData.get('description') || '').trim() || undefined

    if (!name || !email) {
      redirect('/contact?success=0')
    }

    addIntake({ name, email, company, budget, deadline, description })
    redirect('/contact?success=1')
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-14 lg:px-8">
      <Script id="ld-breadcrumb-contact" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Acasă', item: (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '') + '/' },
            { '@type': 'ListItem', position: 2, name: 'Contact', item: (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '') + '/contact' },
          ],
        }) }}
      />
      <h1 className="text-3xl font-bold text-slate-900">Contact</h1>
      <p className="mt-2 text-slate-600">Spune-ne pe scurt ce ai nevoie și revenim rapid.</p>

      {success && <NotifyOnMount type="success" message="Mulțumim! Te contactăm în curând." />}

      <form action={submit} className="mt-8 grid gap-4">
        <div className="grid gap-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="name">Nume</label>
          <input id="name" name="name" required className="rounded border border-slate-300 px-3 py-2" />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="rounded border border-slate-300 px-3 py-2" />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="company">Companie</label>
          <input id="company" name="company" className="rounded border border-slate-300 px-3 py-2" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="budget">Buget</label>
            <select id="budget" name="budget" className="rounded border border-slate-300 px-3 py-2">
              <option value="">Nespecificat</option>
              <option>&lt; €2k</option>
              <option>€2k–€5k</option>
              <option>€5k–€10k</option>
              <option>&gt; €10k</option>
            </select>
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="deadline">Termen</label>
            <select id="deadline" name="deadline" className="rounded border border-slate-300 px-3 py-2">
              <option value="">Flexibil</option>
              <option>1–2 săpt.</option>
              <option>3–6 săpt.</option>
              <option>6+ săpt.</option>
            </select>
          </div>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="description">Descriere</label>
          <textarea id="description" name="description" rows={5} className="rounded border border-slate-300 px-3 py-2" />
        </div>

        <button className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700">
          Trimite cererea
        </button>
      </form>
    </main>
  )
}
