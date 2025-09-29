

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from "@/components/ui/card"
import { Settings, ArrowRight, Zap, Shield, Users, BarChart3, Code, Database, Globe, Smartphone, Palette, Lightbulb, Rocket, CheckCircle, Star } from 'lucide-react'

export default function ServicesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', name: 'Toate Serviciile', icon: '🎯' },
    { id: 'web', name: 'Web & Mobile', icon: '🌐' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'industry', name: 'Industrii', icon: '🏭' },
    { id: 'consulting', name: 'Consultanță', icon: '🛠️' }
  ]

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
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-2xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6 animate-pulse">
              <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Servicii Profesionale</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Serviciile Noastre
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto text-pretty leading-relaxed">
              Transformăm viziunea ta în realitate digitală prin soluții software inovatoare și personalizate
            </p>
          </div>

  
    
          {/* Aplicații Web & Mobile - Enhanced */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Aplicații Web & Mobile</h2>
                <p className="text-gray-600 dark:text-gray-400">Soluții next-generation pentru digitalizarea afacerii tale</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card
                className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredCard('web-custom')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: hoveredCard === 'web-custom' ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300" style={{
                      transform: hoveredCard === 'web-custom' ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                      transition: 'transform 0.3s ease'
                    }}>
                      <Code className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">Aplicații Web Custom</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Dezvoltăm aplicații web enterprise-grade cu arhitecturi moderne, focus pe securitate și scalabilitate.
                  </p>
                  <div className="space-y-3 mb-6">
                    {['React/Next.js', 'TypeScript', 'Node.js', 'Cloud Deploy'].map((tech, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{tech}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">150+</span>
                    <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      Detalii <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>

              <Card
                className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredCard('mobile-native')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: hoveredCard === 'mobile-native' ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300" style={{
                      transform: hoveredCard === 'mobile-native' ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                      transition: 'transform 0.3s ease'
                    }}>
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">Aplicații Mobile Native</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Aplicații native iOS și Android cu performanță maximă și UX excepțional.
                  </p>
                  <div className="space-y-3 mb-6">
                    {['Swift/Kotlin', 'React Native', 'Flutter', 'App Store'].map((tech, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{tech}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">80+</span>
                    <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
                      Detalii <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>

              <Card className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">Aplicații Cross-Platform</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Dezvoltare rapidă pentru ambele platforme cu un singur codebase.
                  </p>
                  <div className="space-y-3 mb-6">
                    {['Flutter', 'React Native', 'Cost Efficiency', 'Fast Deploy'].map((tech, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{tech}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">45+</span>
                    <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                      Detalii <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Business Solutions - Enhanced */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Soluții Business Intelligence</h2>
                <p className="text-gray-600 dark:text-gray-400">Transformăm datele în decizii strategice</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-500 group cursor-pointer">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">CRM Custom</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Gestionare relații clienți cu automatizări și rapoarte avansate
                </p>
              </Card>

              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-500 group cursor-pointer">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Database className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">ERP Solutions</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Integrare completă a proceselor business într-o singură platformă
                </p>
              </Card>

              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-500 group cursor-pointer">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors">Automatizări</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Fluxuri de lucru automatizate pentru eficiență maximă
                </p>
              </Card>

              <Card className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-500 group cursor-pointer">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">AI Integration</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Soluții inteligente pentru analiză și predicții business
                </p>
              </Card>
            </div>
          </div>

          {/* De la idee la soluție functională */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              <div className="relative text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    De la idee la soluție functională
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  Fiecare proiect este unic și deservește cerințe specifice. Află cum putem transforma ideea ta în realitate.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${selectedCategory === category.id ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'}`}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Discutăm proiectul tău
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
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

          {/* Cele mai vândute servicii - Bugete 1000-5000 euro */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800 rounded-full mb-6">
                <span className="text-2xl">🔥</span>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Cele mai căutate servicii</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Soluții Populare la Prețuri Accesibile</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Serviciile noastre cele mai vândute, perfecte pentru afaceri și antreprenori.
                Soluții complete, gata de lansare în 2-6 săptămâni.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Magazin Online - Cel mai vândut */}
              <Card className="bg-white dark:bg-card rounded-2xl border-2 border-orange-200 dark:border-orange-800 p-8 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden cursor-pointer">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                  #1 CEL MAI VÂNDUT
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">🛒</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Magazin Online Complet</h3>
                    <div className="text-2xl font-bold text-orange-600 mb-2">1.500 - 3.500 €</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Livrare: 2-3 săptămâni</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      'Platformă WordPress + WooCommerce',
                      'Design responsive și modern',
                      'Integrare plăți (Stripe, Pos România)',
                      'Management stocuri și comenzi',
                      'Optimizare SEO',
                      'Ghid utilizare și training'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Perfect pentru: Afaceri mici, antreprenori, produse fizice/digitale
                    </div>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                      Cere Ofertă
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Platformă Cursuri Online */}
              <Card className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden cursor-pointer">
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                  #2 POPULAR
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">🎓</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Platformă Cursuri Online</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-2">2.000 - 4.000 €</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Livrare: 3-4 săptămâni</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      'Sistem de gestionare cursuri',
                      'Video hosting și streaming',
                      'Quiz-uri și certificări',
                      'Dashboard pentru instructori',
                      'Integrare plăți recurente',
                      'Community și forum'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Perfect pentru: Instructori, academii, formatori, experți
                    </div>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                      Cere Ofertă
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Site Prezentare Profesional */}
              <Card className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden cursor-pointer">
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                  #3 ACCESIBIL
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">🏢</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Site Prezentare Profesional</h3>
                    <div className="text-2xl font-bold text-purple-600 mb-2">1.000 - 2.500 €</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Livrare: 1-2 săptămâni</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      'Design modern și profesional',
                      'Optimizat pentru conversii',
                      'Formular de contact avansat',
                      'Integrare social media',
                      'Blog integrat',
                      'Analytics și rapoarte'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Perfect pentru: Companii, freelanceri, consultanți
                    </div>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                      Cere Ofertă
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
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

          {/* Industry Solutions Showcase */}
          <div className="mb-20 mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Soluții pentru Orice Industrie</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Adaptăm tehnologia la nevoile specifice ale industriei tale
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                '🏥 Sănătate', '🏦 Financiar', '🛒 Retail', '🏭 Producție',
                '🎓 Educație', '🏠 Real Estate'
              ].map((industry, index) => (
                <Card key={index} className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{industry.split(' ')[0]}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{industry.split(' ')[1]}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="mt-20">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm font-medium text-white">Start Project</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Gata să transformăm ideea ta în realitate?
                </h3>
                <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
                  Hai să discutăm despre proiectul tău și să îți oferim o soluție personalizată care să depășească așteptările.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    Începe Proiectul
                  </Link>
                  <Link href="/pricing" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-2">
                    Vezi Prețuri
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
