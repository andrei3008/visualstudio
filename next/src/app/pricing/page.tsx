

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Headphones, ArrowRight, Sparkles, Crown, Zap, Shield } from 'lucide-react'

interface MaintenancePackage {
  id: string
  name: string
  type: string
  price: number
  description: string
  features: string[]
  includedProjects: number | string
  createdAt: string
}

interface UserSubscription {
  id: string
  status: string
  maintenancePackage: MaintenancePackage
  currentPeriodStart: string
  currentPeriodEnd: string
  canceledAt: string
  projectsIncluded: number
  projectsUsed: number
  createdAt: string
  updatedAt: string
}

export default function PricingPage() {
  const { data: session, status } = useSession()
  const [isAnnual, setIsAnnual] = useState(false)
  const [packages, setPackages] = useState<MaintenancePackage[]>([])
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
    if (status === 'authenticated') {
      fetchSubscriptions()
    } else {
      setLoading(false)
    }
  }, [status])

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/maintenance-packages')
      const data = await res.json()
      setPackages(data.packages || [])
    } catch (error) {
      console.error('Failed to fetch packages:', error)
    }
  }

  const fetchSubscriptions = async () => {
    try {
      const res = await fetch('/api/subscriptions')
      const data = await res.json()
      setSubscriptions(data.subscriptions || [])
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async (packageId: string, packageName: string) => {
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ maintenancePackageId: packageId }),
      })

      if (res.ok) {
        const data = await res.json()
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to create checkout session')
      }
    } catch (error) {
      console.error('Failed to create subscription:', error)
      alert('Failed to create subscription')
    }
  }

  // Get package icon based on type
  const getPackageIcon = (type: string) => {
    switch (type) {
      case 'basic': return <Shield className="h-8 w-8" />
      case 'growth': return <Zap className="h-8 w-8" />
      case 'pro': return <Crown className="h-8 w-8" />
      default: return <Star className="h-8 w-8" />
    }
  }

  // Get package color based on type
  const getPackageColor = (type: string) => {
    switch (type) {
      case 'basic': return 'from-gray-500 to-gray-600'
      case 'growth': return 'from-blue-500 to-blue-600'
      case 'pro': return 'from-blue-600 to-blue-700'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  // Check if user is subscribed to a package
  const isSubscribed = (packageId: string) => {
    return subscriptions.some(sub =>
      sub.maintenancePackage.id === packageId && sub.status === 'active'
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading pricing...</p>
        </div>
      </div>
    )
  }

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
  
      {/* Header Section */}
      <section className="py-20 bg-white dark:bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-zinc-950/20 dark:to-background"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 dark:bg-zinc-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 dark:bg-zinc-900/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-zinc-950/50 border border-blue-200 dark:border-zinc-800 rounded-full mb-6 animate-pulse">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-zinc-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-zinc-300">Pachete de Servicii</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
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
            {packages.map((pkg) => {
              const subscribed = isSubscribed(pkg.id)
              const isGrowth = pkg.type === 'growth'

              return (
                <div
                  key={pkg.id}
                  className={`relative group ${isGrowth ? 'lg:-translate-y-4' : ''}`}
                >
                  {/* Popular Badge */}
                  {isGrowth && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Cel Mai Popular
                      </div>
                    </div>
                  )}

                  <Card className={`h-full bg-white dark:bg-card rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${isGrowth ? 'border-blue-500 dark:border-blue-400 shadow-lg' : 'border-gray-200 dark:border-gray-700'} group-hover:scale-105`}>
                    <CardHeader className="text-center p-8 pb-4">
                      <div className="mb-4">
                        <div className="text-4xl mb-2 text-gray-600 dark:text-gray-400">
                          {getPackageIcon(pkg.type)}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{pkg.description}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          {pkg.includedProjects === 'unlimited' ?
                            'Proiecte nelimitate' :
                            `${pkg.includedProjects} proiect${pkg.includedProjects !== 1 ? 'e' : ''} gratuite/lună`}
                        </p>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold text-gray-900 dark:text-white">
                            {isAnnual ? Math.round(pkg.price * 12 * 0.9) : pkg.price}€
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            /{isAnnual ? 'an' : 'lună'}
                          </span>
                        </div>
                        {isAnnual && (
                          <p className="text-sm text-green-600 dark:text-green-400">
                            Economisești {Math.round(pkg.price * 12 * 0.1)}€
                          </p>
                        )}
                      </div>

                      {subscribed && (
                        <Badge className="mt-4 bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700">
                          <Check className="h-3 w-3 mr-1" />
                          Activ
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="p-8 pt-4 space-y-6">
                      <div className="space-y-3">
                        {pkg.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {!session ? (
                        <Link
                          href="/login"
                          className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-center ${isGrowth ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'}`}
                        >
                          Autentifică-te pentru a abona
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <Button
                          className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                            subscribed
                              ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed'
                              : isGrowth
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                          }`}
                          disabled={subscribed}
                          onClick={() => !subscribed && handleSubscribe(pkg.id, pkg.name)}
                        >
                          {subscribed ? (
                            <>Abonat</>
                          ) : (
                            <>
                              {pkg.name === 'Pro' ? 'Contactează-ne' : 'Abonează-te'}
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            })}
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
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-zinc-900/20 dark:to-zinc-900/20 rounded-2xl p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nu ești sigur ce pachet să alegi?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Contactează-ne pentru o consultanță gratuită și îți vom recomanda cea mai bună soluție pentru afacerea ta.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
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
