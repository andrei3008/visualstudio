'use client'

import Link from 'next/link'
import { Shield, FileText, Mail, Phone, MapPin, Calendar } from 'lucide-react'

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8" />
            <h1 className="text-4xl font-bold text-white">GDPR - Politica de Confidențialitate</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Protejarea datelor dumneavoastră personale este prioritatea noastră conform Regulamentului General privind Protecția Datelor (UE) 2016/679
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Operatorul de date */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              1. Operatorul de date cu caracter personal
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Denumire:</strong> VISUAL STUDIO CONCEPT SRL
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Cod Unic de Înregistrare:</strong> 43527366
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Număr de Înmatriculare:</strong> J16/53/2021
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Sediu:</strong> [Adresa sediu social - a se completa]
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> contact@visualstudio.ro
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Telefon:</strong> 0771 309 843
              </p>
            </div>
          </section>

          {/* Tipuri de date colectate */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              2. Tipuri de date cu caracter personal colectate
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-zinc-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Date de identificare</h3>
                <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                  <li>• Nume și prenume</li>
                  <li>• Adresă de email</li>
                  <li>• Număr de telefon</li>
                  <li>• Nume firmă/companie</li>
                  <li>• Funcție/rol în cadrul companiei</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-zinc-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Date de contact și comunicare</h3>
                <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                  <li>• Adresă IP</li>
                  <li>• Date de navigare (cookies)</li>
                  <li>• Istoric comunicări</li>
                  <li>• Preferințe servicii</li>
                  <li>• Documente încărcate</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Scopul colectării */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              3. Scopul colectării datelor
            </h2>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">a) Furnizarea serviciilor</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Procesarea cererilor de oferte, gestionarea proiectelor, facturare și suport tehnic
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">b) Comunicare și marketing</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Trimiterea de newslettere, informații despre servicii și oferte promoționale (cu consimțământ explicit)
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">c) Îmbunătățirea serviciilor</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Analiza datelor pentru optimizarea experienței utilizatorului și dezvoltarea de noi funcționalități
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">d) Conformitate legală</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Respectarea obligațiilor legale și fiscale
                </p>
              </div>
            </div>
          </section>

          {/* Temeiul juridic */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              4. Temeiul juridic al prelucrării
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <ul className="space-y-3 text-green-800 dark:text-green-200">
                <li className="flex items-start gap-3">
                  <span className="font-semibold">Art. 6(1)(a):</span>
                  <span>Consimțământul explicit al persoanei vizate</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold">Art. 6(1)(b):</span>
                  <span>Executarea unui contract sau măsuri pre-contractuale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold">Art. 6(1)(c):</span>
                  <span>Obligație legală (fiscală, contabilă)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold">Art. 6(1)(f):</span>
                  <span>Interes legitim al operatorului</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Drepturile persoanelor vizate */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              5. Drepturile persoanelor vizate
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { right: "Dreptul de acces", desc: "Să aflați ce date colectăm despre dumneavoastră" },
                { right: "Dreptul la rectificare", desc: "Să corectați datele incorecte sau incomplete" },
                { right: "Dreptul la ștergere", desc: "Să solicitați ștergerea datelor ('dreptul de a fi uitat')" },
                { right: "Dreptul la restricționare", desc: "Să limitați modul în care folosim datele" },
                { right: "Dreptul la portabilitate", desc: "Să primiți datele într-un format structurat" },
                { right: "Dreptul la opoziție", desc: "Să vă opuneți prelucrării în anumite condiții" },
                { right: "Dreptul de a nu fi supus decizii automate", desc: "Inclusiv profilare" },
                { right: "Dreptul de a depune plângere", desc: "La Autoritatea Națională de Supraveghere" }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.right}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Perioada de păstrare */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              6. Perioada de păstrare a datelor
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
              <div className="space-y-4 text-yellow-800 dark:text-yellow-200">
                <div>
                  <h4 className="font-semibold mb-2">Date de client:</h4>
                  <p>10 ani (conform legislației fiscale române)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Date de marketing:</h4>
                  <p>Până la retragerea consimțământului</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Date de navigare:</h4>
                  <p>12 luni (cookies non-esențiale)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Date de contact:</h4>
                  <p>3 ani de la ultima interacțiune</p>
                </div>
              </div>
            </div>
          </section>

          {/* Securitatea datelor */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              7. Măsuri de securitate
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6 text-red-800 dark:text-red-200">
                <div>
                  <h4 className="font-semibold mb-3">Măsuri tehnice:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Criptare SSL/TLS</li>
                    <li>• Autentificare multi-factor</li>
                    <li>• Backup-uri securizate</li>
                    <li>• Control acces bazat pe roluri</li>
                    <li>• Monitorizare securitate 24/7</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Măsuri organizatorice:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Politici de confidențialitate</li>
                    <li>• Formare personal</li>
                    <li>• Acorduri de confidențialitate</li>
                    <li>• Audit-uri periodice</li>
                    <li>• Plan de răspuns la incidente</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Transfer internațional */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              8. Transfer internațional de date
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300">
                Datele dumneavoastră sunt stocate pe servere situate în România și Uniunea Europeană.
                Nu transferăm date în afara UE/SEE decât în condiții de securitate echivalente și cu consimțământul dumneavoastră.
              </p>
            </div>
          </section>

          {/* Contact DPO */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Mail className="h-6 w-6 text-blue-600" />
              9. Responsabil Protecția Datelor (DPO)
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Contact DPO:</h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      dpo@visualstudio.ro
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      0771 309 843
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Program de răspuns:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Răspundem la solicitările legate de protecția datelor în maxim 30 de zile calendaristice
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Modificări ale politicii */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              10. Actualizări ale politicii
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Această politică poate fi actualizată periodic pentru a reflecta schimbări în legislație sau în practicile noastre de business.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Ultima actualizare:</strong> {new Date().toLocaleDateString('ro-RO')}<br />
                <strong>Versiune:</strong> 1.0
              </p>
            </div>
          </section>

          {/* Acțiuni disponibile */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Acțiuni disponibile</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/privacy-policy" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Politica de Confidențialitate</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Detalii complete despre protecția datelor dumneavoastră</p>
              </Link>
              <Link href="/cookie-policy" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Politica de Cookies</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Informații despre cookie-urile pe care le folosim</p>
              </Link>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aveți întrebări despre această politică de confidențialitate?
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="mailto:dpo@visualstudio.ro"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Contactați DPO
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Suport
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}