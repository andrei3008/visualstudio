'use client'

import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { addIntake } from '@/lib/intakeStore'
import NotifyOnMount from '@/components/NotifyOnMount'
import Script from 'next/script'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  MessageCircle,
  Send,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Building2,
  Calendar,
  Euro
} from 'lucide-react'

type Props = { searchParams?: { success?: string } }

export default function ContactPage({ searchParams }: Props) {
  const success = searchParams?.success === '1'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    deadline: '',
    description: ''
  })

  useEffect(() => {
    if (success) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [success])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { name, email, company, budget, deadline, description } = formData

      if (!name || !email) {
        redirect('/contact?success=0')
      }

      await addIntake({ name, email, company, budget, deadline, description })
      redirect('/contact?success=1')
    } catch (error) {
      console.error('Submission error:', error)
      redirect('/contact?success=0')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@visualstudio.ro',
      description: 'Răspundem în maxim 24h',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: '+40 7XX XXX XXX',
      description: 'Luni-Vineri, 9:00-18:00',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Locație',
      value: 'România',
      description: 'Lucrăm 100% remote',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Clock,
      title: 'Program',
      value: '24/7 Support',
      description: 'Pentru clienții existenți',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-background">
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


      {/* Header Section */}
      <section className="py-20 bg-white dark:bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6 animate-pulse">
              <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Contact Rapid</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Hai să vorbim despre proiectul tău
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Completează formularul de mai jos și te contactăm în maximum 24 de ore pentru a discuta despre nevoile tale de dezvoltare software.
            </p>
          </div>

          {success && (
            <div className="mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-300">Mulțumim!</h3>
                  <p className="text-green-700 dark:text-green-400">Te contactăm în curând.</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-card rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Solicitare Proiect</h2>
                  <p className="text-gray-600 dark:text-gray-400">Completează formularul și revenim cu o ofertă personalizată</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nume complet *
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                          placeholder="Ion Popescu"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                          placeholder="ion@exemplu.ro"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Companie
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                        placeholder="Numele companiei (opțional)"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Buget estimativ
                      </label>
                      <div className="relative">
                        <Euro className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                        >
                          <option value="">Nespecificat</option>
                          <option>&lt; €2k</option>
                          <option>€2k–€5k</option>
                          <option>€5k–€10k</option>
                          <option>&gt; €10k</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Termen dorit
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select
                          id="deadline"
                          name="deadline"
                          value={formData.deadline}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                        >
                          <option value="">Flexibil</option>
                          <option>1–2 săpt.</option>
                          <option>3–6 săpt.</option>
                          <option>6+ săpt.</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Descrierea proiectului
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 resize-none"
                      placeholder="Descrie pe scurt proiectul tău, funcționalitățile dorite și orice alte detalii relevante..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Se trimite...
                      </>
                    ) : (
                      <>
                        Trimite solicitarea
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informații Contact</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${info.color} p-2 flex items-center justify-center`}>
                        <info.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{info.title}</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{info.value}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">De ce să ne contactezi?</h3>
                <ul className="space-y-3">
                  {[
                    'Răspuns în maxim 24 de ore',
                    'Consultanță tehnică gratuită',
                    'Ofertă personalizată în 48h',
                    'Su dedicat pentru proiect',
                    'Transparență totală'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ai o întrebare urgentă?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Sună-ne acum sau trimite un email direct pentru consultanță imediată.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+407XXXXXXXX"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <Phone className="h-5 w-5" />
                Sună acum
              </a>
              <a
                href="mailto:contact@visualstudio.ro"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Trimite email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
