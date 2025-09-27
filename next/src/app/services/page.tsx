

import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { Card } from "@/components/ui/card"
import { Settings, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Servicii',
  description: 'Soluții complete pentru transformarea digitală a afacerii tale - Aplicații web & mobile, soluții business, aplicații pentru industrii și consultanță tehnică.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 dark:bg-gray-900/20 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Acasă</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Servicii</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <section className="py-20 bg-white dark:bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6 animate-pulse">
              <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Servicii Profesionale</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Serviciile Noastre
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-pretty">
              Soluții complete pentru transformarea digitală a afacerii tale
            </p>
          </div>

          {/* Aplicații Web & Mobile */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">🌐</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Aplicații Web & Mobile</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">Aplicații Web Custom</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Dezvoltăm aplicații web personalizate folosind cele mai moderne tehnologii, asigurând performanță, securitate și scalabilitate. De la platforme complexe la aplicații simple, creăm soluții adaptate nevoilor specifice ale afacerii tale.
                </p>
              </Card>
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">Aplicații Mobile Native</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Creăm aplicații mobile native pentru iOS și Android, optimizate pentru performanță maximă și experiență utilizator excepțională. Integrăm cele mai noi funcționalități ale platformelor mobile pentru a oferi soluții complete.
                </p>
              </Card>
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">Aplicații Cross-Platform</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Dezvoltăm aplicații cross-platform folosind framework-uri moderne precum React Native și Flutter, reducând costurile și timpul de dezvoltare menținând calitatea și performanța pe ambele platforme mobile.
                </p>
              </Card>
            </div>
          </div>

          {/* Soluții pentru Business */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">💼</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Soluții pentru Business</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">CRM Custom</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Implementăm sisteme CRM personalizate pentru a gestiona relațiile cu clienții, a automatiza procesele de vânzare și a crește eficiența echipei tale de vânzări.
                </p>
              </Card>
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">ERP Solutions</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Dezvoltăm soluții ERP complete pentru integrarea tuturor proceselor de business, de la gestionarea resurselor la planificare financiară și controlul stocurilor.
                </p>
              </Card>
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors">Automatizări</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Automatizăm procesele repetitive și fluxurile de lucru pentru a crește productivitatea, reduce erorile umane și a elibera timp pentru activități cu valoare adăugată.
                </p>
              </Card>
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">AI Integration</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Integrăm soluții de inteligență artificială pentru a optimiza procesele, a analiza date și a oferi insight-uri valoroase pentru luarea deciziilor strategice în business.
                </p>
              </Card>
            </div>
          </div>

          {/* Aplicații pentru Industrii */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">🏭</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Aplicații pentru Industrii</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">Educație</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Platforme e-learning și management educațional cu funcționalități interactive pentru studenți și profesori. Sisteme de evaluare și raportare performante.
                </p>
              </Card>
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">Sănătate</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Soluții pentru managementul pacienților, programări online, evidențe medicale și telemedicină. Respectăm standardele de securitate și confidențialitate.
                </p>
              </Card>
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">Imobiliare</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Platforme pentru gestionarea proprietăților, programări vizionări, portaluri pentru agenți imobiliari și sisteme de evaluare automată a proprietăților.
                </p>
              </Card>
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">E-Commerce</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Platforme complete de comerț electronic cu management stocuri, procesare plăți, integrare curier și sisteme avansate de marketing și analiză.
                </p>
              </Card>
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">Food & Restaurant</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Aplicații pentru livrare food, rezervări online, meniuri digitale și sisteme de management pentru restaurante. Integrare cu multiple platforme de livrare.
                </p>
              </Card>
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💳</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">Fintech</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Soluții financiare securizate cu procesare plăți, management portofoliu, analize investiționale și platforme de trading cu respectarea regulamentelor.
                </p>
              </Card>
            </div>
          </div>

          {/* Consultanță & Mentenanță */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">🛠️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Consultanță & Mentenanță</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors">Consultanță Tehnică</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Oferim consultanță specializată pentru alegerea tehnologiilor potrivite, arhitectura sistemelor și optimizarea proceselor de dezvoltare. Analizăm nevoile tale și recomandăm cele mai bune soluții tehnice.
                </p>
              </Card>
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-pink-600 transition-colors">Mentenanță & Support</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Asigurăm mentenanță continuă pentru aplicațiile dezvoltate, inclusiv actualizări, securitate, optimizare performanță și suport tehnic 24/7 pentru a asigura funcționarea impecabilă.
                </p>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Gata să începem proiectul tău?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Contactează-ne astăzi pentru o consultanță gratuită și descoperă cum putem transforma afacerea ta prin soluții software personalizate.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
                Înapoi la Acasă
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
