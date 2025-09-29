

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Check, Star, Headphones, ArrowRight, Sparkles } from 'lucide-react'


export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const pricingPlans = [
    {
      name: 'Basic',
      description: 'Perfect pentru proiecte mici și mentenanță',
      price: { monthly: 499, annual: 4490 },
      hours: '10 ore/lună',
      sla: 'SLA 48h',
      popular: false,
      features: [
        'Mentenanță & bugfix',
        'Mică dezvoltare',
        'Suport email',
        'Raport lunar',
        '1 proiect activ'
      ],
      color: 'from-gray-500 to-gray-600',
      icon: '🚀'
    },
    {
      name: 'Growth',
      description: 'Ideal pentru afaceri în creștere',
      price: { monthly: 1299, annual: 11690 },
      hours: '30 ore/lună',
      sla: 'SLA 24h',
      popular: true,
      features: [
        'Iterații feature',
        'Optimizări & A/B',
        'PM inclus',
        'Suport prioritar',
        '3 proiecte active',
        'Raport săptămânal'
      ],
      color: 'from-blue-500 to-purple-600',
      icon: '⚡'
    },
    {
      name: 'Pro',
      description: 'Pentru companii cu nevoi complexe',
      price: { monthly: 2499, annual: 22490 },
      hours: '60+ ore/lună',
      sla: 'SLA 8h',
      popular: false,
      features: [
        'Roadmap dedicat',
        'Integrare CI/CD',
        'Suport prioritar 24/7',
        'Proiecte nelimitate',
        'Dedicated team lead',
        'Raport zilnic'
      ],
      color: 'from-purple-500 to-pink-600',
      icon: '👑'
    }
  ]

  const additionalServices = [
    {
      title: 'Consultanță Tehnică',
      description: 'Analiză arhitecturală și recomandări tehnice',
      price: '150€/oră',
      icon: '💡'
    },
    {
      title: 'Audit & Optimizare',
      description: 'Performanță, securitate și cod',
      price: 'de la 800€',
      icon: '🔍'
    },
    {
      title: 'Training Echipă',
      description: 'Workshop-uri și sesiuni de mentorat',
      price: '200€/oră',
      icon: '🎓'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 dark:bg-gray-900/20 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Acasă</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Prețuri</span>
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
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6 animate-pulse">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Pachete de Servicii</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Prețuri Transparente
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Alege pachetul perfect pentru nevoile tale de dezvoltare software. Flexibilitate maximă și suport dedicat.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex items-center">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isAnnual ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
              >
                Lunar
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isAnnual ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
              >
                Anual <span className="text-green-600 dark:text-green-400">-10%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative group ${plan.popular ? 'lg:-translate-y-4' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Cel Mai Popular
                    </div>
                  </div>
                )}

                <Card className={`h-full bg-white dark:bg-card rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${plan.popular ? 'border-blue-500 dark:border-blue-400 shadow-lg' : 'border-gray-200 dark:border-gray-700'} group-hover:scale-105`}>
                  <CardHeader className="text-center p-8 pb-4">
                    <div className="mb-4">
                      <div className="text-4xl mb-2">{plan.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{plan.description}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{plan.hours} • {plan.sla}</p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {isAnnual ? plan.price.annual : plan.price.monthly}€
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          /{isAnnual ? 'an' : 'lună'}
                        </span>
                      </div>
                      {isAnnual && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Economisești {plan.price.monthly * 12 - plan.price.annual}€
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={plan.name === 'Pro' ? '/contact' : '/login'}
                      className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'}`}
                    >
                      {plan.name === 'Pro' ? 'Contactează-ne' : plan.name === 'Growth' ? 'Alege Planul' : 'Începe'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Servicii Suplimentare</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Completează pachetul ales cu servicii suplimentare pentru nevoi specifice
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index} className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{service.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{service.price}</span>
                        <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                          Cere ofertă →
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nu ești sigur ce pachet să alegi?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Contactează-ne pentru o consultanță gratuită și îți vom recomanda cea mai bună soluție pentru afacerea ta.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                <Headphones className="h-5 w-5" />
                Consultanță Gratuită
              </Link>
              <Link href="/services" className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-medium transition-all duration-300">
                Vezi Serviciile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Compară Funcționalitățile</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              O vedere detaliată a ceea ce primești în fiecare pachet
            </p>
          </div>

          <div className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="grid grid-cols-12 gap-0 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="col-span-6 p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Funcționalitate</h3>
              </div>
              <div className="col-span-2 p-4 text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">Basic</h3>
              </div>
              <div className="col-span-2 p-4 text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">Growth</h3>
              </div>
              <div className="col-span-2 p-4 text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">Pro</h3>
              </div>
            </div>

            {[
              { feature: 'Ore dezvoltare lunar', basic: '10 ore', growth: '30 ore', pro: '60+ ore' },
              { feature: 'Timp răspuns', basic: '48h', growth: '24h', pro: '8h' },
              { feature: 'Proiecte active', basic: '1', growth: '3', pro: 'Nelimitat' },
              { feature: 'Project Manager', basic: '❌', growth: '✅', pro: '✅' },
              { feature: 'Suport 24/7', basic: '❌', growth: '❌', pro: '✅' },
              { feature: 'CI/CD Setup', basic: '❌', growth: '❌', pro: '✅' },
              { feature: 'Rapoarte', basic: 'Lunare', growth: 'Săptămânale', pro: 'Zilnice' },
              { feature: 'Dedicated team lead', basic: '❌', growth: '❌', pro: '✅' }
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-12 gap-0 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <div className="col-span-6 p-4">
                  <span className="text-gray-700 dark:text-gray-300">{row.feature}</span>
                </div>
                <div className="col-span-2 p-4 text-center">
                  <span className={`font-medium ${row.basic === '✅' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>{row.basic}</span>
                </div>
                <div className="col-span-2 p-4 text-center">
                  <span className={`font-medium ${row.growth === '✅' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>{row.growth}</span>
                </div>
                <div className="col-span-2 p-4 text-center">
                  <span className={`font-medium ${row.pro === '✅' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>{row.pro}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
