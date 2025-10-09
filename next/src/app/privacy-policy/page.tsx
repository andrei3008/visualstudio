'use client'

import Link from 'next/link'
import { Shield, FileText, Lock, Eye, Database, Globe, Mail, Phone, AlertTriangle, CheckCircle } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8" />
            <h1 className="text-4xl font-bold text-white">Politica de Confidențialitate</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl">
            Protejăm confidențialitatea dumneavoastră. Această politică explică cum colectăm, folosim și protejăm datele dumneavoastră personale.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Introducere */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-green-600" />
              1. Introducere
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>VISUAL STUDIO CONCEPT SRL</strong> ("noi", "nouă" sau "compania") respectă confidențialitatea dumneavoastră
                și se angajează să protejeze datele dumneavoastră cu caracter personal. Această politică de confidențialitate
                explică practicile noastre privind colectarea, utilizarea și protejarea datelor dumneavoastră personale.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Vizitând site-ul <strong>www.visualstudio.ro</strong>, sunteți de acord cu practicile descrise în această politică.
              </p>
            </div>
          </section>

          {/* Informații despre companie */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Database className="h-6 w-6 text-green-600" />
              2. Informații despre Operatorul de Date
            </h2>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Datele firmei</h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p><strong>Denumire:</strong> VISUAL STUDIO CONCEPT SRL</p>
                    <p><strong>CUI:</strong> 43527366</p>
                    <p><strong>Nr. Reg. Com.:</strong> J16/53/2021</p>
                    <p><strong>Sediu:</strong> [Adresa sediu social - a se completa]</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Contact</h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p><strong>Email:</strong> contact@visualstudio.ro</p>
                    <p><strong>Telefon:</strong> 0771 309 843</p>
                    <p><strong>DPO:</strong> dpo@visualstudio.ro</p>
                    <p><strong>Website:</strong> www.visualstudio.ro</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Datele pe care le colectăm */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Eye className="h-6 w-6 text-green-600" />
              3. Ce date cu caracter personal colectăm
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-zinc-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Date pe care ni le furnizați direct</h3>
                <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                  <li>• Nume și prenume</li>
                  <li>• Adresă de email</li>
                  <li>• Număr de telefon</li>
                  <li>• Companie/organizație</li>
                  <li>• Poziție/rol profesional</li>
                  <li>• Adresă (dacă este relevantă)</li>
                  <li>• Informații din formularul de contact</li>
                  <li>• Documente încărcate (CV, specificații proiect)</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-zinc-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Date colectate automat</h3>
                <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                  <li>• Adresă IP</li>
                  <li>• Tip și versiune browser</li>
                  <li>• Sistem de operare</li>
                  <li>• Pagini vizitate pe site-ul nostru</li>
                  <li>• Timp petrecut pe site</li>
                  <li>• Link-uri accesate</li>
                  <li>• Date de geolocație (aproximative)</li>
                  <li>• Informații despre dispozitiv</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Scopul colectării */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-green-600" />
              4. De ce colectăm datele dumneavoastră
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Pentru a furniza serviciile solicitate",
                  description: "Procesarea cererilor de oferte, dezvoltarea software, managementul proiectelor și facturare",
                  icon: CheckCircle,
                  color: "text-green-600"
                },
                {
                  title: "Pentru a comunica cu dumneavoastră",
                  description: "Răspunsuri la întrebări, actualizări despre proiecte și suport tehnic",
                  icon: Mail,
                  color: "text-blue-600"
                },
                {
                  title: "Pentru a îmbunătăți serviciile noastre",
                  description: "Analiza datelor pentru optimizarea experienței utilizatorului și dezvoltarea de noi funcționalități",
                  icon: Database,
                  color: "text-blue-600"
                },
                {
                  title: "Pentru marketing și comunicare",
                  description: "Cu consimțământul dumneavoastră, pentru a vă informa despre servicii și oferte",
                  icon: Globe,
                  color: "text-orange-600"
                },
                {
                  title: "Pentru securitate și conformitate legală",
                  description: "Protecția împotriva fraudelor și respectarea obligațiilor legale și fiscale",
                  icon: Lock,
                  color: "text-red-600"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <item.icon className={`h-6 w-6 ${item.color} mt-1`} />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Temeiul juridic */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-600" />
              5. Temeiul juridic al prelucrării
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
              <div className="space-y-4 text-yellow-800 dark:text-yellow-200">
                <div className="border-l-4 border-yellow-600 pl-4">
                  <h4 className="font-semibold mb-2">Art. 6(1)(a) GDPR - Consimțământ</h4>
                  <p>Pentru marketing, newslettere și cookie-uri non-esențiale</p>
                </div>
                <div className="border-l-4 border-yellow-600 pl-4">
                  <h4 className="font-semibold mb-2">Art. 6(1)(b) GDPR - Executare contract</h4>
                  <p>Pentru furnizarea serviciilor software și managementul proiectelor</p>
                </div>
                <div className="border-l-4 border-yellow-600 pl-4">
                  <h4 className="font-semibold mb-2">Art. 6(1)(c) GDPR - Obligație legală</h4>
                  <p>Pentru respectarea obligațiilor fiscale și contabile</p>
                </div>
                <div className="border-l-4 border-yellow-600 pl-4">
                  <h4 className="font-semibold mb-2">Art. 6(1)(f) GDPR - Interes legitim</h4>
                  <p>Pentru securitate, prevenirea fraudelor și îmbunătățirea serviciilor</p>
                </div>
              </div>
            </div>
          </section>

          {/* Partajarea datelor */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Globe className="h-6 w-6 text-green-600" />
              6. Cu cine partajăm datele dumneavoastră
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 dark:text-red-300 mb-3">Nu vindem datele dumneavoastră</h3>
                <p className="text-red-800 dark:text-red-200">
                  Nu vindem, nu închiriem și nu comercializăm datele dumneavoastră personale către terți.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-zinc-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Partajare controlată</h3>
                <p className="text-blue-800 dark:text-blue-200">
                  Partajăm datele doar cu furnizori de servicii care ne ajută să operăm afacerea,
                  respectând aceleași standarde de protecție a datelor.
                </p>
              </div>
            </div>
            <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Furnizori de servicii:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { service: "Google Analytics", purpose: "Analiză trafic și performanță" },
                  { service: "Google Workspace", purpose: "Email și productivitate" },
                  { service: "Hosting providers", purpose: "Găzduire site și aplicații" },
                  { service: "Payment processors", purpose: "Procesare plăți securizate" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.service}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Securitatea datelor */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Lock className="h-6 w-6 text-green-600" />
              7. Măsuri de securitate
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Măsuri tehnice:</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Criptare SSL/TLS pentru toate transferurile de date</li>
                    <li>• Autentificare multi-factor pentru conturile interne</li>
                    <li>• Backup-uri zilnice și criptate</li>
                    <li>• Firewall și sisteme de detecție a intruziunilor</li>
                    <li>• Control acces granular bazat pe roluri</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Măsuri organizatorice:</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Formare periodică a personalului</li>
                    <li>• Acorduri de confidențialitate</li>
                    <li>• Politici de securitate și acces</li>
                    <li>• Audit-uri interne regulate</li>
                    <li>• Plan de răspuns la incidente</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Drepturile dumneavoastră */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              8. Drepturile dumneavoastră conform GDPR
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { right: "Dreptul de acces", desc: "Să știți ce date avem despre dumneavoastră" },
                { right: "Dreptul la rectificare", desc: "Să corectați datele incorecte" },
                { right: "Dreptul la ștergere", desc: "Să solicitați ștergerea datelor" },
                { right: "Dreptul la restricționare", desc: "Să limitați utilizarea datelor" },
                { right: "Dreptul la portabilitate", desc: "Să primiți datele în format portabil" },
                { right: "Dreptul la opoziție", desc: "Să vă opuneți anumitor prelucrări" },
                { right: "Dreptul la informații", desc: "Să știți cum folosim datele" },
                { right: "Dreptul de a depune plângere", desc: "La autoritatea de supraveghere" }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.right}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Perioada de păstrare */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-green-600" />
              9. Cât timp păstrăm datele dumneavoastră
            </h2>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <div className="space-y-4 text-orange-800 dark:text-orange-200">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Date de client și proiect:</h4>
                  <p>10 ani (conform legislației fiscale române)</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Date de contact și comunicare:</h4>
                  <p>3 ani de la ultima interacțiune sau până la retragerea consimțământului</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Date de marketing:</h4>
                  <p>Până la retragerea consimțământului explicit</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Date de navigare și cookies:</h4>
                  <p>12 luni pentru cookies non-esențiale</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookie-uri */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Globe className="h-6 w-6 text-green-600" />
              10. Utilizarea cookie-urilor
            </h2>
            <div className="bg-blue-50 dark:bg-zinc-900/20 rounded-lg p-6">
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                Site-ul nostru utilizează cookie-uri pentru a vă oferi cea mai bună experiență. Cookie-urile sunt fișiere mici
                care sunt stocate pe dispozitivul dumneavoastră și care ne ajută să:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { purpose: "Să reținem preferințele dumneavoastră" },
                  { purpose: "Să analizăm traficul și performanța site-ului" },
                  { purpose: "Să personalizăm conținutul" },
                  { purpose: "Să oferim funcționalități de securitate" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="text-blue-800 dark:text-blue-200">{item.purpose}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/cookie-policy" className="text-blue-600 hover:text-purple-800 dark:text-purple-400 font-medium">
                  Vezi politica detaliată de cookies →
                </Link>
              </div>
            </div>
          </section>

          {/* Copii */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-green-600" />
              11. Protecția copiilor
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <p className="text-red-800 dark:text-red-200">
                Site-ul nostru nu este destinat persoanelor sub vârsta de 18 ani. Nu colectăm cu bună știință informații
                de la copii sub 13 ani. Dacă sunteți părinte sau tutore și credeți că copilul dumneavoastră ne-a furnizat
                informații personale, vă rugăm să ne contactați imediat pentru a putea șterge aceste informații.
              </p>
            </div>
          </section>

          {/* Modificări ale politicii */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-green-600" />
              12. Modificări ale politicii
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ne rezervăm dreptul de a actualiza această politică de confidențialitate periodic. Modificările vor fi publicate
                pe această pagină și data ultimei actualizări va fi modificată corespunzător.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Recomandăm să verificați periodic această pagină</strong> pentru a fi la curent cu orice modificări.
              </p>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>Ultima actualizare:</strong> {new Date().toLocaleDateString('ro-RO')}<br />
                  <strong>Versiune:</strong> 1.0
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Mail className="h-6 w-6 text-green-600" />
              13. Contact și întrebări
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Dacă aveți întrebări, nelămuriri sau doriți să vă exercitați drepturile GDPR,
                vă rugăm să ne contactați:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Responsabil Protecția Datelor (DPO):</h4>
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
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Contact general:</h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="flex items-center gap-2">
                      📧 contact@visualstudio.ro
                    </p>
                    <p className="flex items-center gap-2">
                      📞 0771 309 843
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Acțiuni rapide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Acțiuni rapide</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/gdpr" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  GDPR
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Documentație GDPR completă</p>
              </Link>
              <Link href="/cookie-policy" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Cookies
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Politica detaliată de cookies</p>
              </Link>
              <Link href="/termeni-si-conditii" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Termeni și Condiții
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Condiții de utilizare servicii</p>
              </Link>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aveți întrebări despre confidențialitatea datelor dumneavoastră?
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
                  📞 Suport
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}