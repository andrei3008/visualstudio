'use client'

import Link from 'next/link'
import { Cookie, Shield, Settings, Eye, Lock, FileText, AlertTriangle, Mail } from 'lucide-react'

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="h-8 w-8" />
            <h1 className="text-4xl font-bold text-white">Politica de Cookies</h1>
          </div>
          <p className="text-xl text-orange-100 max-w-3xl">
            Informații detaliate despre modul în care folosim cookie-urile pentru a vă îmbunătăți experiența pe site-ul nostru
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Ce sunt cookie-urile */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Cookie className="h-6 w-6 text-orange-600" />
              1. Ce sunt cookie-urile?
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cookie-urile sunt fișiere text mici care sunt stocate pe dispozitivul dumneavoastră (computer, tabletă, telefon mobil)
                atunci când vizitați un site web. Acestea conțin informații care sunt transferate către dispozitivul dumneavoastră
                și permit site-ului să vă recunoască și să vă ofere o experiență personalizată.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Cookie-urile sunt utilizate pe scară largă pentru a face site-urile web să funcționeze sau să funcționeze mai eficient,
                precum și pentru a furniza informații proprietarilor site-ului.
              </p>
            </div>
          </section>

          {/* Tipuri de cookie-uri */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-orange-600" />
              2. Tipuri de cookie-uri pe care le folosim
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Cookie-uri Esențiale
                </h3>
                <ul className="space-y-2 text-green-800 dark:text-green-200">
                  <li>• Autentificare și securitate</li>
                  <li>• Prevăzute de lege</li>
                  <li>• Necesare pentru funcționarea site-ului</li>
                  <li>• Management sesiune utilizator</li>
                  <li>• Protecție împotriva fraudelor</li>
                </ul>
                <p className="text-sm text-green-700 dark:text-green-300 mt-3">
                  <strong>Durată:</strong> Până la închiderea browser-ului
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Cookie-uri de Performanță
                </h3>
                <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                  <li>• Google Analytics</li>
                  <li>• Monitorizare trafic</li>
                  <li>• Optimizare viteză site</li>
                  <li>• Analiză comportament utilizatori</li>
                  <li>• Rapoarte de utilizare</li>
                </ul>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-3">
                  <strong>Durată:</strong> 12 luni
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-3 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Cookie-uri Funcționale
                </h3>
                <ul className="space-y-2 text-purple-800 dark:text-purple-200">
                  <li>• Preferințe limbă</li>
                  <li>• Setări vizualizare</li>
                  <li>• Conținut personalizat</li>
                  <li>• Salvare preferințe utilizator</li>
                  <li>• Theme preferences</li>
                </ul>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-3">
                  <strong>Durată:</strong> 6 luni
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-orange-900 dark:text-orange-300 mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Cookie-uri de Marketing
                </h3>
                <ul className="space-y-2 text-orange-800 dark:text-orange-200">
                  <li>• Rețele sociale (Facebook, LinkedIn)</li>
                  <li>• Publicitate țintită</li>
                  <li>• Campanii remarketing</li>
                  <li>• Analiză eficiență campanii</li>
                  <li>• Personalizare reclame</li>
                </ul>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-3">
                  <strong>Durată:</strong> Până la retragerea consimțământului
                </p>
              </div>
            </div>
          </section>

          {/* Cookie-uri specifice */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Cookie className="h-6 w-6 text-orange-600" />
              3. Cookie-uri specifice folosite
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Nume</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Tip</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Durată</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Scop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">session_id</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Esențial</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Sesiune</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Autentificare utilizator</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">theme_preference</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Funcțional</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">6 luni</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Salvare preferințe tema</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">_ga</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Performanță</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">2 ani</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Google Analytics</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">_gid</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Performanță</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">24 ore</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Google Analytics</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">cookie_consent</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Esențial</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">1 an</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Salvare preferințe cookies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Cum gestionăm cookie-urile */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Settings className="h-6 w-6 text-orange-600" />
              4. Cum puteți gestiona cookie-urile
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Prin browser</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Majoritatea browser-elor permit controlul cookie-urilor prin setări
                </p>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Chrome: Settings → Privacy</li>
                  <li>• Firefox: Options → Privacy</li>
                  <li>• Safari: Preferences → Privacy</li>
                  <li>• Edge: Settings → Privacy</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Prin bannerul nostru</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  La prima vizită, veți vedea un banner pentru consimțământ cookie-uri
                </p>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Acceptare toate</li>
                  <li>• Respingere non-esențiale</li>
                  <li>• Preferințe personalizate</li>
                  <li>• Modificare oricând</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Servicii externe</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Puteți gestiona preferințele pentru servicii third-party
                </p>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Google Ads Settings</li>
                  <li>• Facebook Ad Preferences</li>
                  <li>• LinkedIn Ads Settings</li>
                  <li>• Your Online Choices</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Impactul dezactivării */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              5. Impactul dezactivării cookie-urilor
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
              <div className="space-y-4 text-yellow-800 dark:text-yellow-200">
                <div>
                  <h4 className="font-semibold mb-2">Dacă dezactivați cookie-uri esențiale:</h4>
                  <p>• Nu vă veți putea autentifica în contul de utilizator</p>
                  <p>• Anumite funcționalități ale site-ului nu vor fi disponibile</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Dacă dezactivați cookie-uri de performanță:</h4>
                  <p>• Nu vom putea analiza traficul și îmbunătăți site-ul</p>
                  <p>• Existența dumneavoastră pe site nu va fi înregistrată în statistici</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Dacă dezactivați cookie-uri funcționale:</h4>
                  <p>• Vă trebui să setați preferințele la fiecare vizită</p>
                  <p>• Conținutul nu va fi personalizat</p>
                </div>
              </div>
            </div>
          </section>

          {/* Politica third-party */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-orange-600" />
              6. Servicii third-party și cookie-uri externe
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Site-ul nostru utilizează servicii externe care pot seta cookie-uri proprii. Aceste servicii sunt:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "Google Analytics", purpose: "Analiză trafic și performanță", privacy: "https://policies.google.com/privacy" },
                  { name: "Google reCAPTCHA", purpose: "Protecție împotriva spam-ului", privacy: "https://policies.google.com/privacy" },
                  { name: "Facebook Pixel", purpose: "Analiză campanii marketing", privacy: "https://www.facebook.com/privacy/policy/" },
                  { name: "LinkedIn Insight Tag", purpose: "Analiză audiență B2B", privacy: "https://www.linkedin.com/legal/privacy-policy" }
                ].map((service, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{service.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{service.purpose}</p>
                    <a href={service.privacy} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400">
                      Vezi politica de confidențialitate →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Actualizări */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-orange-600" />
              7. Actualizări ale politicii
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Această politică poate fi actualizată periodic pentru a reflecta schimbări în legislație,
                în serviciile noastre sau în practicile industriei.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <div>
                  <strong>Ultima actualizare:</strong><br />
                  {new Date().toLocaleDateString('ro-RO')}
                </div>
                <div>
                  <strong>Versiune:</strong><br />
                  1.0
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Lock className="h-6 w-6 text-orange-600" />
              8. Contact și întrebări
            </h2>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Pentru întrebări GDPR:</h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      dpo@visualstudio.ro
                    </p>
                    <p className="flex items-center gap-2">
                      📞 0771 309 843
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Pentru suport tehnic:</h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="flex items-center gap-2">
                      📧 contact@visualstudio.ro
                    </p>
                    <p className="flex items-center gap-2">
                      🌐 www.visualstudio.ro
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Link-uri utile */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Resurse utile</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/gdpr" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  GDPR
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Politica de confidențialitate completă</p>
              </Link>
              <Link href="/privacy-policy" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Privacy Policy
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Politica generală de confidențialitate</p>
              </Link>
              <a href="https://www.anspdcp.ro/" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  ANSPDCP
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Autoritatea Națională de Supraveghere</p>
              </a>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aveți întrebări despre politica noastră de cookies?
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="mailto:dpo@visualstudio.ro"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Contactați DPO
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg transition-colors"
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