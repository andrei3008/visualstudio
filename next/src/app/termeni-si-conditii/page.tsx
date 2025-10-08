'use client'

import Link from 'next/link'
import {
  FileText,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Mail,
  Phone
} from 'lucide-react'

export default function TermeniSiConditiiPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8" />
            <h1 className="text-4xl font-bold text-white">Termeni și Condiții</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Termenii și condițiile de utilizare a serviciilor oferite de VISUAL STUDIO CONCEPT SRL
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Introducere */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              1. Introducere și Acceptare
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Acești termeni și condiții ("Termeni") guvernează utilizarea site-ului <strong>www.visualstudio.ro</strong>
                și a serviciilor oferite de <strong>VISUAL STUDIO CONCEPT SRL</strong> ("noi", "compania" sau "Visual Studio").
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Accesând și utilizând site-ul nostru, sunteți de acord cu acești Termeni. Dacă nu sunteți de acord
                cu acești Termeni, vă rugăm să nu utilizați serviciile noastre.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Date companie:</strong> VISUAL STUDIO CONCEPT SRL, CUI: 43527366, Nr. Reg. Com.: J16/53/2021
                </p>
              </div>
            </div>
          </section>

          {/* Definiții */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              2. Definiții
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Termeni cheie:</h4>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <div>
                      <strong>"Site":</strong> www.visualstudio.ro și toate subdomeniile sale
                    </div>
                    <div>
                      <strong>"Servicii":</strong> Dezvoltare software, consultanță tehnică, mentenanță și alte servicii oferite
                    </div>
                    <div>
                      <strong>"Client":</strong> Persoana fizică sau juridică care utilizează serviciile noastre
                    </div>
                    <div>
                      <strong>"Cont":</strong> Accesul securizat la platforma noastră
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Continuare definiții:</h4>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <div>
                      <strong>"Conținut":</strong> Texte, imagini, coduri, documentație și alte materiale de pe site
                    </div>
                    <div>
                      <strong>"Proprietate intelectuală":</strong> Drepturi de autor, mărci, brevete și alte drepturi
                    </div>
                    <div>
                      <strong>"Date cu caracter personal":</strong> Orice informație care identifică o persoană
                    </div>
                    <div>
                      <strong>"Forță majoră":</strong> Evenimente imprevizibile și inevitabile
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Serviciile oferite */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-blue-600" />
              3. Serviciile Oferite
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Dezvoltare software la comandă",
                  description: "Aplicații web, mobile și desktop personalizate conform cerințelor clientului"
                },
                {
                  title: "Consultanță tehnică",
                  description: "Expertiză în alegerea tehnologiilor, arhitectură software și bune practici"
                },
                {
                  title: "Management de proiect",
                  description: "Coordonare proiecte, planificare, monitorizare și raportare"
                },
                {
                  title: "Mentenanță și suport",
                  description: "Actualizări, remedieri bug-uri, optimizări și suport tehnic"
                },
                {
                  title: "Integrare sisteme",
                  description: "Conectare cu sisteme existente, API-uri și servicii third-party"
                },
                {
                  title: "Formare și documentare",
                  description: "Instruire utilizatori și creare documentație tehnică"
                }
              ].map((service, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Obligațiile clientului */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
              4. Obligațiile Clientului
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
              <div className="space-y-4 text-yellow-800 dark:text-yellow-200">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Furnizarea informațiilor corecte:</h4>
                  <p>Sunteți responsabil pentru acuratețea informațiilor furnizate și pentru actualizarea lor în timp util.</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Securitatea contului:</h4>
                  <p>Păstrați confidențialitatea credențialelor de acces și notificați-ne imediat în caz de acces neautorizat.</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Respectarea legislației:</h4>
                  <p>Asigurați-vă că proiectele și cerințele respectă legile aplicabile, inclusiv GDPR și drepturile de autor.</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Colaborare și comunicare:</h4>
                  <p>Furnizați feedback-ul necesar și răspundeți la întrebări într-un timp rezonabil.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Proprietate intelectuală */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              5. Proprietate Intelectuală
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="space-y-4 text-blue-800 dark:text-blue-200">
                <div>
                  <h4 className="font-semibold mb-2">Drepturile noastre:</h4>
                  <p>Site-ul, design-ul, codul sursă, textele, imaginile și alte materiale sunt proprietatea noastră intelectuală
                  și sunt protejate de legile privind drepturile de autor și proprietatea intelectuală.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Licența de utilizare:</h4>
                  <p>Vă acordăm o licență limitată, non-exclusivă și revocabilă de a utiliza site-ul și serviciile noastre
                  în conformitate cu acești Termeni.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Proprietatea codului sursă:</h4>
                  <p>Codul sursă dezvoltat pentru dumneavoastră vă aparține după plata integrală a serviciilor, cu excepția
                  componentelor reutilizabile sau a bibliotecilor noastre interne.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Restricții:</h4>
                  <p>Nu aveți dreptul de a copia, modifica, distribui sau revinde serviciile noastre fără permisiune scrisă.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Prețuri și plată */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-blue-600" />
              6. Prețuri și Condiții de Plată
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <div className="space-y-4 text-green-800 dark:text-green-200">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Prețuri:</h4>
                  <p>Toate prețurile sunt exprimate în RON și nu includ TVA. Prețurile pot fi modificate cu 30 de zile înainte de notificare.</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Modalități de plată:</h4>
                  <p>Acceptăm plata prin transfer bancar, card online și alte metode convenite prin contract.</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Termene de plată:</h4>
                  <p>• 50% avans la semnarea contractului<br />
                  • 50% la livrarea finală<br />
                  • Pentru proiecte lungi: plată în funcție de milestone-uri</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Facturare:</h4>
                  <p>Facturile vor fi emise conform legislației fiscale române în vigoare.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Termeni de livrare */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" />
              7. Termeni de Livrare și Acceptanță
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="space-y-4 text-blue-800 dark:text-blue-200">
                <div>
                  <h4 className="font-semibold mb-2">Estimări de timp:</h4>
                  <p>Termenii de livrare sunt estimați și pot fi afectați de complexitatea proiectului și disponibilitatea informațiilor din partea clientului.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Procesul de livrare:</h4>
                  <p>• Livrare în etape (milestone-uri)<br />
                  • Testare și validare<br />
                  • Documentație tehnică<br />
                  • Formare utilizatori (dacă este cazul)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Perioada de testare:</h4>
                  <p>Beneficiați de o perioadă de 14 zile pentru testare și raportarea problemelor după livrarea finală.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Acceptanța proiectului:</h4>
                  <p>Proiectul este considerat acceptat la semnarea procesului-verbal de recepție sau după expirarea perioadei de testare fără obiecții majore.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Suport și mentenanță */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-blue-600" />
              8. Suport Tehnic și Mentenanță
            </h2>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
              <div className="space-y-4 text-indigo-800 dark:text-indigo-200">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Suport gratuit:</h4>
                  <p>30 de zile de suport gratuit după livrarea finală pentru remedierea bug-urilor raportate.</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Pachete de mentenanță:</h4>
                  <p>Oferim pachete de mentenanță cu opțiuni lunare sau anuale, inclusiv:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Actualizări de securitate</li>
                    <li>• Optimizări performanță</li>
                    <li>• Suport prioritar</li>
                    <li>• Backup-uri regulate</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Timp de răspuns:</h4>
                  <p>• Critic: 4 ore<br />
                  • Ridicat: 24 ore<br />
                  • Normal: 48 ore<br />
                  • Scăzut: 72 ore</p>
                </div>
              </div>
            </div>
          </section>

          {/* Limitarea răspunderii */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
              9. Limitarea Răspunderii
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <div className="space-y-4 text-red-800 dark:text-red-200">
                <div>
                  <h4 className="font-semibold mb-2">Limitări generale:</h4>
                  <p>Răspunderea noastră totală față de dumneavoastră pentru orice pierderi sau daune rezultate din utilizarea serviciilor
                  noastre nu va depăși valoarea totală plătită de dumneavoastră pentru serviciile respective în ultimele 12 luni.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Excluderi:</h4>
                  <p>Nu suntem responsabili pentru:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Pierderi indirecte, consecvente sau punitive</li>
                    <li>• Pierderi de profit sau de afaceri</li>
                    <li>• Daune rezultate din utilizarea necorespunzătoare</li>
                    <li>• Probleme cauzate de factori externi</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Forță majoră:</h4>
                  <p>Nu suntem responsabili pentru nerespectarea obligațiilor în caz de forță majoră, inclusiv dar nu limitat la:
                  dezastre naturale, războaie, greve, pandemii sau alte evenimente imprevizibile.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Încetarea contractului */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              10. Încetarea Contractului
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="font-semibold mb-2">Încetare de către client:</h4>
                  <p>Puteți înceta contractul în orice moment, dar veți fi responsabil pentru plata serviciilor deja prestate
                  și a costurilor aferente lucrărilor în progres.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Încetare de către noi:</h4>
                  <p>Ne rezervăm dreptul de a înceta contractul în caz de:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Nerespectarea acestor Termeni</li>
                    <li>• Plăți întârziate de peste 30 de zile</li>
                    <li>• Utilizare abuzivă a serviciilor</li>
                    <li>• Activități ilegale sau frauduloase</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Procedură de încetare:</h4>
                  <p>Orice parte poate înceta contractul cu notificare scrisă cu cel puțin 30 de zile înainte, cu excepția cazurilor de încălcare gravă.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Politica de confidențialitate */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              11. Confidențialitate
            </h2>
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6">
              <div className="space-y-4 text-teal-800 dark:text-teal-200">
                <div>
                  <h4 className="font-semibold mb-2">Confidențialitate reciprocă:</h4>
                  <p>Ambele părți se angajează să păstreze confidențialitatea tuturor informațiilor schimbate în timpul colaborării.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Informații confidențiale:</h4>
                  <p>Includ, dar nu se limitează la: strategii de afaceri, informații financiare, date tehnice, cod sursă, specificații și orice alte informații marcate ca fiind confidențiale.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Excepții:</h4>
                  <p>Obligația de confidențialitate nu se aplică pentru informații:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Public cunoscute</li>
                    <li>• Obținute legal de la terți</li>
                    <li>• Dezvăluite prin cerințe legale</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Dispoziții finale */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              12. Dispoziții Finale
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="font-semibold mb-2">Legea aplicabilă:</h4>
                  <p>Acești Termeni sunt guvernați de legislația română. Orice dispută va fi rezolvată în instanțele competente din România.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Separabilitate:</h4>
                  <p>Dacă orice prevedere a acestor Termeni este considerată invalidă sau neaplicabilă, celelalte prevederi rămân în vigoare.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Renunțare:</h4>
                  <p>Nerenunțarea la orice drept sau prevedere nu constituie o renunțare la acel drept sau prevedere.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Modificări:</h4>
                  <p>Ne rezervăm dreptul de a modifica acești Termeni cu notificare prealabilă de cel puțin 15 zile.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-6">
                  <p className="text-blue-800 dark:text-blue-200">
                    <strong>Ultima actualizare:</strong> {new Date().toLocaleDateString('ro-RO')}<br />
                    <strong>Versiune:</strong> 1.0
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Mail className="h-6 w-6 text-blue-600" />
              13. Contact
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Pentru întrebări sau clarificări privind acești Termeni și Condiții, vă rugăm să ne contactați:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Informații contact:</h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="flex items-center gap-2">
                      📧 contact@visualstudio.ro
                    </p>
                    <p className="flex items-center gap-2">
                      📞 0771 309 843
                    </p>
                    <p className="flex items-center gap-2">
                      🌐 www.visualstudio.ro
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Date firme:</h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p><strong>Denumire:</strong> VISUAL STUDIO CONCEPT SRL</p>
                    <p><strong>CUI:</strong> 43527366</p>
                    <p><strong>Nr. Reg. Com.:</strong> J16/53/2021</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Link-uri utile */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Documente relevante</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/privacy-policy" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Policy
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Politica de confidențialitate</p>
              </Link>
              <Link href="/gdpr" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  GDPR
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Protecția datelor personale</p>
              </Link>
              <Link href="/cookie-policy" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  🍪
                  Cookies
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Politica de utilizare cookies</p>
              </Link>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aveți întrebări despre acești Termeni și Condiții?
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="mailto:contact@visualstudio.ro"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Contactați-ne
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