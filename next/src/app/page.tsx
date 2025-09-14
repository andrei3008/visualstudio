import Link from 'next/link'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container>
          <div className="mx-auto max-w-3xl text-center pt-20 pb-16 lg:pt-28">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-primary-600 to-sky-500 bg-clip-text text-transparent">Construim software clar, rapid și transparent</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Platformă completă pentru clienți: intake, ofertare, execuție, status live și facturare – totul într-un singur loc.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link href="/login"><Button className="px-5 py-3">Intră în portal</Button></Link>
              <Link href="/projects" className="rounded-md px-5 py-3 font-semibold text-primary-700 ring-1 ring-primary-200 hover:bg-primary-50">Vezi proiecte demo</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-14">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <h3 className="text-lg font-semibold text-slate-900">Transparență totală</h3>
              <p className="mt-2 text-slate-600">Board, milestones și progres în timp real pentru fiecare proiect.</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-slate-900">Comunicare integrată</h3>
              <p className="mt-2 text-slate-600">Mesaje și fișiere în portal, notificări email/in-app.</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-slate-900">Facturare simplă</h3>
              <p className="mt-2 text-slate-600">Oferte, facturi și plăți Stripe, toate într-un singur loc.</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50">
        <Container>
          <div className="py-16">
            <h2 className="text-center text-3xl font-bold text-slate-900">Abonamente</h2>
            <p className="mt-2 text-center text-slate-600">Retainer lunar pentru mentenanță și dezvoltare continuă</p>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <Card>
                <h3 className="text-lg font-semibold text-slate-900">Basic</h3>
                <p className="mt-1 text-slate-600">10 ore/lună · SLA 48h</p>
                <p className="mt-4 text-3xl font-bold text-slate-900">€X<span className="text-base font-medium text-slate-600">/lună</span></p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>– Mentenanță & bugfix</li>
                  <li>– Mică dezvoltare</li>
                </ul>
                <Link href="/login"><Button className="mt-6 w-full">Începe</Button></Link>
              </Card>
              <Card className="border-primary-600">
                <h3 className="text-lg font-semibold text-slate-900">Growth</h3>
                <p className="mt-1 text-slate-600">30 ore/lună · SLA 24h</p>
                <p className="mt-4 text-3xl font-bold text-slate-900">€Y<span className="text-base font-medium text-slate-600">/lună</span></p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>– Iterații feature</li>
                  <li>– Optimizări & A/B</li>
                  <li>– PM inclus</li>
                </ul>
                <Link href="/login"><Button className="mt-6 w-full">Alege planul</Button></Link>
              </Card>
              <Card>
                <h3 className="text-lg font-semibold text-slate-900">Pro</h3>
                <p className="mt-1 text-slate-600">60+ ore/lună · SLA 8h</p>
                <p className="mt-4 text-3xl font-bold text-slate-900">€Z<span className="text-base font-medium text-slate-600">/lună</span></p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>– Roadmap dedicat</li>
                  <li>– Integrare CI/CD</li>
                  <li>– Suport prioritar</li>
                </ul>
                <Link href="/login"><Button className="mt-6 w-full">Contactează-ne</Button></Link>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <footer className="py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Client Portal. Toate drepturile rezervate.
      </footer>
    </div>
  )
}
