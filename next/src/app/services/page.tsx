'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  Zap,
  Shield,
  Users,
  BarChart3,
  Code,
  Database,
  Globe,
  Smartphone,
  Palette,
  Lightbulb,
  Rocket,
  CheckCircle,
  Star,
  Clock,
  TrendingUp,
  Award,
  Phone,
  Mail,
  ChevronRight,
  Calendar,
  UserCheck,
  Target,
  Layers,
  Settings,
  Headphones,
  RefreshCw
} from 'lucide-react'

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const categories = [
    { id: 'all', name: 'Toate Serviciile', icon: '🎯', description: 'Vezi toate serviciile noastre' },
    { id: 'popular', name: 'Populare', icon: '🔥', description: 'Cele mai căutate servicii' },
    { id: 'ecommerce', name: 'E-Commerce', icon: '🛒', description: 'Magazine online complete' },
    { id: 'education', name: 'Educație', icon: '🎓', description: 'Platforme de cursuri și training' },
    { id: 'business', name: 'Business', icon: '💼', description: 'Soluții pentru companii' },
    { id: 'mobile', name: 'Mobile', icon: '📱', description: 'Aplicații iOS și Android' }
  ]

  const processSteps = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Consultanță Inițială",
      description: "Analizăm nevoile tale și definim obiectivele proiectului",
      duration: "1-2 zile"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Design & Prototipare",
      description: "Creăm design-ul UX/UI și prototipuri interactive",
      duration: "3-7 zile"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Dezvoltare",
      description: "Implementăm funcționalitățile folosind tehnologii moderne",
      duration: "1-4 săptămâni"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Lansare & Suport",
      description: "Lansăm proiectul și oferim suport tehnic continuu",
      duration: "Continuu"
    }
  ]

  const testimonials = [
    {
      name: "Alexandra P.",
      company: "Boutique Fashion",
      role: "CEO",
      content: "Am colaborat la magazinele noastre online și rezultatele au fost excepționale. Vânzările au crescut cu 300% în primele 6 luni.",
      rating: 5,
      project: "Magazin Online Premium",
      image: "👩‍💼"
    },
    {
      name: "Mihai R.",
      company: "Tech Academy",
      role: "Fondator",
      content: "Platforma de cursuri dezvoltată a transformat complet modul în care livrăm educație. Interfață intuitivă și funcționalități avansate.",
      rating: 5,
      project: "Platformă E-Learning",
      image: "👨‍🏫"
    },
    {
      name: "Elena D.",
      company: "Clinica Medicală",
      role: "Manager",
      content: "Sistemul de programări online a redus cu 80% timpul petrecut pe telefon și a crescut satisfacția pacienților.",
      rating: 5,
      project: "Sistem Programări Online",
      image: "👩‍⚕️"
    }
  ]

  const services = [
    {
      id: 'ecommerce-full',
      category: 'ecommerce',
      title: 'Magazin Online Complet',
      description: 'Platformă e-commerce full-stack cu toate funcționalitățile necesare pentru a vinde online eficient',
      price: '1.500 - 3.500',
      duration: '2-3 săptămâni',
      popular: true,
      badge: '#1 CEL MAI VÂNDUT',
      icon: '🛒',
      color: 'orange',
      features: [
        'Design responsive și modern',
        'Management produse și categorii',
        'Integrare plăți (Stripe, Pos România)',
        'Management stocuri în timp real',
        'Sistem de discount-uri și promoții',
        'Integrare curieri (Fan Courier, DPD)',
        'Dashboard analytics și rapoarte',
        'SEO optimizare',
        'Blog integrat',
        'Sistem review-uri produse',
        'Multi-language support',
        'Ghid utilizare și training'
      ],
      technologies: ['React + Node.js + PostgreSQL', 'Vue.js + PHP + MySQL', 'Next.js + Python + Django + MongoDB'],
      perfectFor: 'Afaceri mici, antreprenori, produse fizice/digitale',
      support: '6 luni suport tehnic inclus',
      includes: ['Hosting 1 an', 'Domeniu .ro 1 an', 'SSL certificate', 'Email business']
    },
    {
      id: 'online-courses',
      category: 'education',
      title: 'Platformă Cursuri Online',
      description: 'Sistem complet pentru livrarea de conținut educațional online cu certificări și management studenți',
      price: '2.000 - 4.000',
      duration: '3-4 săptămâni',
      popular: true,
      badge: '#2 POPULAR',
      icon: '🎓',
      color: 'blue',
      features: [
        'Management cursuri și module',
        'Video hosting și streaming',
        'Sistem quiz-uri și evaluări',
        'Generare certificate automate',
        'Dashboard instructor',
        'Management studenți',
        'Integrare plăți recurente',
        'Community și forum',
        'Progress tracking',
        'Mobile responsive',
        'Live streaming support',
        'Analytics și rapoarte detaliate'
      ],
      technologies: ['React + Node.js + Express', 'Vue.js + PHP + Laravel', 'Next.js + Python + Django + FastAPI'],
      perfectFor: 'Instructori, academii, formatori, experți',
      support: '12 luni suport tehnic inclus',
      includes: ['Video hosting 100GB', 'Email marketing', 'Webinar integration']
    },
    {
      id: 'professional-site',
      category: 'all',
      title: 'Site Prezentare Profesional',
      description: 'Site corporate modern optimizat pentru conversii și branding profesional',
      price: '1.000 - 2.500',
      duration: '1-2 săptămâni',
      popular: true,
      badge: '#3 ACCESIBIL',
      icon: '🏢',
      color: 'emerald',
      features: [
        'Design modern și profesional',
        'Optimizat pentru conversii',
        'Formular contact avansat',
        'Integrare social media',
        'Blog cu CMS',
        'Google Analytics',
        'SEO on-page optimizare',
        'Galerie foto/video',
        'Testimoniale section',
        'FAQ section',
        'Chat integration',
        'Performance optimizare'
      ],
      technologies: ['React + Next.js + TypeScript', 'Vue.js + Nuxt.js + Python', 'Angular + Node.js + PostgreSQL'],
      perfectFor: 'Companii, freelanceri, consultanți, servicii profesionale',
      support: '3 luni suport tehnic inclus',
      includes: ['Performance monitoring', 'Security updates', 'Monthly backups']
    },
    {
      id: 'mobile-app',
      category: 'mobile',
      title: 'Aplicație Mobile Native',
      description: 'Aplicație iOS și Android nativă cu performanță maximă și UX excepțional',
      price: '3.000 - 8.000',
      duration: '4-8 săptămâni',
      popular: false,
      badge: 'PREMIUM',
      icon: '📱',
      color: 'purple',
      features: [
        'Dezvoltare nativă iOS (Swift)',
        'Dezvoltare nativă Android (Kotlin)',
        'Design UI/UX modern',
        'Integrare API backend',
        'Push notifications',
        'Offline functionality',
        'Real-time sync',
        'Social media integration',
        'Payment integration',
        'Analytics tracking',
        'App Store optimization',
        'Beta testing'
      ],
      technologies: ['Swift iOS + SwiftUI', 'Kotlin Android + Jetpack Compose', 'React Native + Expo'],
      perfectFor: 'Startup-uri, afaceri cu prezență mobile, servicii on-demand',
      support: '12 luni suport tehnic inclus',
      includes: ['App Store accounts setup', 'Beta testing platform', 'Crash analytics']
    },
    {
      id: 'crm-custom',
      category: 'business',
      title: 'CRM Custom Business',
      description: 'Sistem de management al relațiilor cu clienții personalizat pentru nevoile afacerii tale',
      price: '5.000 - 15.000',
      duration: '6-12 săptămâni',
      popular: false,
      badge: 'ENTERPRISE',
      icon: '👥',
      color: 'red',
      features: [
        'Management contacte și lead-uri',
        'Pipeline de vânzări personalizat',
        'Automatizări marketing',
        'Email tracking',
        'Calendar și task management',
        'Rapoarte customizabile',
        'Dashboard analytics',
        'Integrare API terțe',
        'Mobile app',
        'Role-based access',
        'Data export/import',
        'Multi-language support'
      ],
      technologies: ['React + Node.js + Express', 'PHP + Laravel + PostgreSQL', 'Python + Django + FastAPI + VLLM'],
      perfectFor: 'Agenții imobiliare, servicii financiare, B2B sales',
      support: '24 luni suport tehnic inclus',
      includes: ['Custom training', 'Data migration', 'API documentation']
    },
    {
      id: 'booking-system',
      category: 'business',
      title: 'Sistem Rezervări Programări',
      description: 'Platformă completă pentru managementul rezervărilor și programărilor online',
      price: '1.800 - 3.500',
      duration: '2-4 săptămâni',
      popular: false,
      badge: 'TRENDING',
      icon: '📅',
      color: 'indigo',
      features: [
        'Calendar rezervări interactive',
        'Management personal și servicii',
        'Automatizări email/SMS',
        'Payment integration',
        'Reminder system',
        'Customer profiles',
        'Reviews și ratings',
        'Multi-location support',
        'Mobile responsive',
        'Sync Google Calendar',
        'Recurring appointments',
        'Waitlist management'
      ],
      technologies: ['Vue.js + Node.js + Express', 'React + Python + Django', 'Next.js + MongoDB + WebRTC'],
      perfectFor: 'Clinici medicale, saloane, consultanți, service auto',
      support: '6 luni suport tehnic inclus',
      includes: ['SMS gateway', 'Email templates', 'Video consultation integration']
    }
  ]

  const faqs = [
    {
      question: "Cât durează dezvoltarea unui proiect?",
      answer: "Depinde de complexitate. Un site de prezentare: 1-2 săptămâni. Magazin online: 2-3 săptămâni. Aplicație mobilă: 4-8 săptămâni. Oferim timeline detaliat în faza de ofertare."
    },
    {
      question: "Pot vedea progresul proiectului în timp real?",
      answer: "Absolut! Oferim acces la un dashboard client dedicat unde poți monitoriza: progresul general al proiectului (procentaj completat), task-urile active cu status-uri (To Do, In Progress, Review, Done), timeline-ul cu deadline-uri clare, poze/video-uri din etapa de dezvoltare, comunicare directă cu echipa și fișiere pentru feedback. Transparența totală este prioritatea noastră!"
    },
    {
      question: "Ce tehnologii folosiți?",
      answer: "Dezvoltăm exclusiv soluții custom, fără a ne baza pe platforme CMS pre-existente. Folosim tehnologii moderne și scalabile: Frontend (React, Next.js, Vue.js, Angular, TypeScript), Backend (Node.js, Express, PHP, Laravel, Symfony, Python/Django/FastAPI), Mobile (React Native, Flutter, Swift/Kotlin native), AI/ML (Python, TensorFlow, VLLM, LangChain), Baze de date (PostgreSQL, MySQL, MongoDB, Redis) și DevOps (Docker, Kubernetes Cluster, Servere Proprii, CI/CD pipelines, Nginx, Prometheus, Grafana). Totul este programat 100% custom pentru nevoile tale specifice."
    },
    {
      question: "Oferiți suport după livrare?",
      answer: "Da, toate proiectele includ suport tehnic. Durata variază între 3-24 luni în funcție de pachetul ales. Oferim și pachete de mentenanță extinsă."
    },
    {
      question: "Cum funcționează plata?",
      answer: "Plata se face în tranșe: 40% avans la semnare contract, 40% la livrare proiect, 20% la finalizare și lansare. Acceptăm transfer bancar și card."
    },
    {
      question: "Oferiți garanție?",
      answer: "Da, oferim garanție 12 luni pentru bug-uri și erori de funcționare. Mentenanța și actualizările sunt incluse în perioada de suport."
    },
    {
      question: "Puteți lucra cu afaceri internaționale?",
      answer: "Absolut! Avem clienți din toată Europa și SUA. Lucrăm în engleză, română și franceză. Oferim suport în fusuri orare diferite."
    }
  ]

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory)

  const getColorClasses = (color: string) => {
    const colors = {
      orange: {
        bg: 'bg-gradient-to-r from-orange-500 to-red-500',
        light: 'from-orange-50 to-red-50',
        dark: 'dark:from-orange-900/10 dark:to-red-900/10',
        text: 'text-orange-600'
      },
      blue: {
        bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        light: 'from-blue-50 to-cyan-50',
        dark: 'dark:from-zinc-900/10 dark:to-zinc-900/10',
        text: 'text-blue-600'
      },
      emerald: {
        bg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
        light: 'from-emerald-50 to-teal-50',
        dark: 'dark:from-emerald-900/10 dark:to-teal-900/10',
        text: 'text-emerald-600'
      },
      purple: {
        bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
        light: 'from-purple-50 to-pink-50',
        dark: 'dark:from-purple-900/10 dark:to-pink-900/10',
        text: 'text-purple-600'
      },
      red: {
        bg: 'bg-gradient-to-r from-red-500 to-orange-500',
        light: 'from-red-50 to-orange-50',
        dark: 'dark:from-red-900/10 dark:to-orange-900/10',
        text: 'text-red-600'
      },
      indigo: {
        bg: 'bg-gradient-to-r from-indigo-500 to-blue-500',
        light: 'from-indigo-50 to-blue-50',
        dark: 'dark:from-indigo-900/10 dark:to-blue-900/10',
        text: 'text-indigo-600'
      }
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-white dark:bg-slate-950 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900/30 dark:to-slate-950"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-slate-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 dark:bg-slate-900/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-200 dark:bg-slate-900/20 rounded-full blur-2xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-slate-900/50 border border-blue-200 dark:border-slate-700 rounded-full mb-6 animate-pulse">
              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Servicii Premium</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Soluții Digitale
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent block mt-2">
                pentru Afacerea Ta
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto text-pretty leading-relaxed mb-8">
              Transformăm ideile tale în produse digitale de succes cu peste 10 ani de experiență și 300+ proiecte livrate
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {[
                { value: '300+', label: 'Proiecte Livrate', icon: '🚀' },
                { value: '50+', label: 'Clienți Fericiți', icon: '😊' },
                { value: '10+', label: 'Ani Experiență', icon: '⭐' },
                { value: '98%', label: 'Satisfacție', icon: '💯' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <Phone className="h-5 w-5" />
                Cere Ofertă Rapidă
              </Link>
              <Link href="#process" className="inline-flex items-center gap-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                <Calendar className="h-5 w-5" />
                Procesul Nostru
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Alege Categoria Dorită</h2>
            <p className="text-gray-600 dark:text-gray-400">Selectează tipul de serviciu care te interesează</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-2xl flex items-center gap-3 transition-all duration-300 border-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <div className="text-left">
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-xs opacity-75">{category.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const colors = getColorClasses(service.color)
              return (
                <Card
                  key={service.id}
                  className={`bg-white dark:bg-slate-900 rounded-3xl border-2 ${
                    service.popular ? 'border-orange-200 dark:border-orange-800' : 'border-gray-200 dark:border-gray-700'
                  } p-8 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden cursor-pointer`}
                  onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                >
                  {service.badge && (
                    <div className={`absolute top-4 right-4 ${colors.bg} text-white px-3 py-1 rounded-full text-xs font-bold z-10`}>
                      {service.badge}
                    </div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.light} ${colors.dark} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <div className="relative">
                    <div className="text-center mb-6">
                      <div className={`w-20 h-20 ${colors.bg} rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-3xl">{service.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                      <div className={`text-2xl font-bold ${colors.text} mb-2`}>{service.price} €</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-center">
                      {service.description}
                    </p>

                    {/* Expanded Details */}
                    {selectedService === service.id && (
                      <div className="space-y-6 animate-in slide-in-from-top duration-300">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            Funcționalități Incluse
                          </h4>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <Code className="h-5 w-5 text-blue-500" />
                            Tehnologii
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <Target className="h-5 w-5 text-orange-500" />
                            Perfect Pentru
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{service.perfectFor}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-green-500" />
                            Suport & Beneficii
                          </h4>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Headphones className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{service.support}</span>
                            </div>
                            {service.includes.map((item, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-center mt-6">
                      <Link href="/contact" className={`inline-flex items-center gap-2 ${colors.bg} text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                        {selectedService === service.id ? 'Cere Ofertă' : 'Detalii'}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Procesul Nostru de Lucru
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Un proces transparent și eficient care transformă viziunea ta în realitate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative h-full">
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent"></div>
                )}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{step.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ce Spun Clienții Noștri
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Peste 50+ clienți mulțumiți care au ales soluțiile noastre digitale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}, {testimonial.company}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Proiect: {testimonial.project}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Întrebări Frecvente
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Răspunsuri la cele mai comune întrebări despre serviciile noastre
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <details className="group p-6 cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {faq.question}
                    <ChevronRight className="h-5 w-5 group-open:rotate-90 transition-transform duration-300" />
                  </summary>
                  <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Rocket className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-medium text-white">Start Proiect</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Gata să Transformăm Ideea Ta în Realitate?
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
                Hai să discutăm despre proiectul tău și să îți oferim o soluție personalizată care să depășească așteptările.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Cere Ofertă Acum
                </Link>
                <Link href="mailto:contact@visualstudio.ro" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Consultanță
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-white/80 text-sm">
                  <strong>Răspuns în 24h</strong> • Consultanță Gratuită • Garanție 12 Luni
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}