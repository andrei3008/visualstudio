'use client'

import { useState } from 'react'

// Simple glitter styles
const glitterStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(90deg); }
    50% { transform: translateY(-5px) rotate(180deg); }
    75% { transform: translateY(-15px) rotate(270deg); }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) rotate(0deg); }
    40% { transform: translateY(-30px) rotate(180deg); }
    60% { transform: translateY(-15px) rotate(90deg); }
  }

  @keyframes glitterBounce {
    0%, 15%, 45%, 75%, 100% { transform: translateY(0) rotate(0deg); }
    30% { transform: translateY(-50px) rotate(180deg); }
    60% { transform: translateY(-25px) rotate(90deg); }
  }

  @keyframes crazySpin {
    0% { transform: translateY(0) rotate(0deg) scale(1); }
    25% { transform: translateY(-40px) rotate(90deg) scale(1.2); }
    50% { transform: translateY(-60px) rotate(180deg) scale(0.8); }
    75% { transform: translateY(-30px) rotate(270deg) scale(1.1); }
    100% { transform: translateY(0) rotate(360deg) scale(1); }
  }

  @keyframes fadeInOut {
    0% { opacity: 0; transform: scale(0); }
    5% { opacity: 1; transform: scale(1); }
    85% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0); }
  }
`

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BarChart3, Users, Zap, Sparkles, Rocket, Shield, TrendingUp, Settings, Palette, Mail, FileSpreadsheet, MessageSquare, Github, Figma } from 'lucide-react'


export default function HomePage() {
  const [isCelebrating, setIsCelebrating] = useState(false)

  // Static tasks
  const tasks = [
    { name: 'UI Design Complete', progress: 100, color: 'green' },
    { name: 'Backend API Development', progress: 75, color: 'blue' },
    { name: 'Database Schema Design', progress: 45, color: 'yellow' },
    { name: 'Testing Setup', progress: 20, color: 'purple' }
  ]

  // Integration icons with floating animation
  const integrations = [
    { name: 'Gmail', icon: Mail, color: 'bg-red-500' },
    { name: 'Google Sheets', icon: FileSpreadsheet, color: 'bg-green-500' },
    { name: 'Slack', icon: MessageSquare, color: 'bg-purple-500' },
    { name: 'GitHub', icon: Github, color: 'bg-gray-800' },
    { name: 'Figma', icon: Figma, color: 'bg-pink-500' },
    { name: 'API', icon: Zap, color: 'bg-orange-500' }
  ]

  // Create crazy glitter effect
  const createGlitter = () => {
    const glitter = []
    for (let i = 0; i < 150; i++) {
      glitter.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 0.8 + Math.random() * 1.5,
        size: 6 + Math.random() * 8,
        color: ['#fbbf24', '#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#06b6d4', '#f97316', '#84cc16'][Math.floor(Math.random() * 8)]
      })
    }
    return glitter
  }

  const [glitterParticles, setGlitterParticles] = useState<any[]>([])

  const handleMagicClick = () => {
    setIsCelebrating(true)
    setGlitterParticles(createGlitter())

    setTimeout(() => {
      setIsCelebrating(false)
      setGlitterParticles([])
    }, 4000)
  }

  
  
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <style jsx>{glitterStyles}</style>

      {/* Full-screen glitter effect */}
      {isCelebrating && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {glitterParticles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute rounded-full ${Math.random() > 0.5 ? 'animate-bounce' : 'animate-spin'}`}
              style={{
                left: `${particle.left}%`,
                top: `${Math.random() * 100}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}, 0 0 ${particle.size * 6}px ${particle.color}80`,
                animationTimingFunction: `${Math.random() > 0.5 ? 'ease-in-out' : 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'}`,
                animationName: `${Math.random() > 0.5 ? 'fadeInOut, bounce' : 'fadeInOut, spin'}`,
                animationFillMode: 'both'
              }}
            ></div>
          ))}
        </div>
      )}
      {/* Minimal Hero Section with Dashboard Colors */}
      <section className="relative min-h-screen">
        <div className="relative max-w-full mx-auto px-6 pt-40 pb-24 text-center md:max-w-[90vw]">
          <div className="space-y-8">
            {/* Badge with Dashboard Colors */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Visual Studio Platform 2025</span>
            </div>

            {/* Main Title with Dashboard Typography */}
            <div className="space-y-4">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight heading-two-line">
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Construim Infrastructură Tehnică
                  </span>
                  <span className="block text-gray-900 dark:text-white">
                    pentru Viitorul Afacerilor
                  </span>
                </h1>
              </div>
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto text-pretty">
              De la aplicații web personalizate la soluții mobile avansate, dezvoltăm instrumentele care ajută afacerile să se adapteze și să crească.
              </p>
            </div>

            {/* Subtitle with Dashboard Voice */}
            {/* Newsletter Section */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Nu rata noutățile</p>
              <div className="relative max-w-[320px] mx-auto">
                <input
                  type="email"
                  placeholder="adresa@exemplu.com"
                  className="w-full h-12 pl-10 pr-14 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                />
                <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                  <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <button className="absolute top-1.5 right-1.5 bottom-1.5 w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center">Nu vom distribui niciodată adresa ta de email.</p>
            </div>
          </div>
        </div>

        {/* Dashboard Preview - 4 Column Layout in Hero */}
        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Visual Studio Explicat Card */}
            <div className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-6 h-full flex flex-col">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Visual Studio Explicat</h4>
                  <div className="h-32 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-pink-900/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Platformă modernă</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      const modal = document.getElementById('video-modal');
                      if (modal) {
                        (modal as HTMLDialogElement).showModal();
                      }
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  >
                    Vezi ce facem
                  </button>
                </div>
              </div>
            </div>

            {/* Animated Task Cards Column */}
            <div className="space-y-3">
              <div className="space-y-3">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 bg-${task.color}-500 rounded-full ${task.progress < 100 ? 'animate-pulse' : ''}`}></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-foreground">{task.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{task.progress}%</span>
                  </div>
                  {task.progress < 100 && (
                    <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full bg-${task.color}-500 rounded-full transition-all duration-1000`} style={{width: `${task.progress}%`}}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            </div>

            {/* Integration Hub Column */}
            <div className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-border shadow-sm overflow-hidden space-y-3 p-6">
              <div className="text-center pt-4">
                <div className="relative inline-block">
                  {/* Floating integration circles */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {integrations.map((integration, index) => {
                      const angle = (index / integrations.length) * 2 * Math.PI
                      const radius = 45

                      return (
                        <div
                          key={index}
                          className="absolute w-8 h-8 bg-white dark:bg-card rounded-full shadow-md flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform duration-300 cursor-pointer"
                          style={{
                            transform: `translate(${radius * Math.cos(angle)}px, ${radius * Math.sin(angle)}px)`,
                            zIndex: 10
                          }}
                        >
                          <integration.icon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </div>
                      )
                    })}
                  </div>
                  <div className="w-32 h-32 flex items-center justify-center"></div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-1">Integrări nelimitate</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Orice integrare îți imaginezi</p>
              </div>
            </div>

            {/* Magic Surprise Column */}
            <div className="space-y-3">
              <div className="h-48 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-purple-900/40 dark:via-pink-900/30 dark:to-blue-900/40 rounded-xl relative overflow-hidden group cursor-pointer border border-purple-200/50 dark:border-purple-700/30 shadow-sm" onClick={handleMagicClick}>
                {/* Magic particles background */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400 dark:bg-purple-400 rounded-full opacity-60"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>

                {/* Central magic element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg dark:shadow-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="text-3xl">{isCelebrating ? '🎉' : '✨'}</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity scale-110"></div>
                  </div>
                </div>

                {/* Hidden message */}
                <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Click pentru magie!</p>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Surpriză Specială</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ceva minunat te așteaptă</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        <dialog id="video-modal" className="modal backdrop-blur-sm">
          <div className="modal-box max-w-4xl p-0">
            <div className="relative">
              <iframe
                width="100%"
                height="450"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </section>

      {/* Enhanced Features Section - AI-Powered Development Tools */}
      <section className="py-20 bg-white dark:bg-background relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background"></div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6">
              <Rocket className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Partener Tehnic pentru Afacerea Ta</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Development Tools
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-pretty">
              Suntem mai mult decât o agenție de dezvoltare - suntem partenerul tău strategic în transformarea digitală
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Rocket,
                title: 'Dezvoltare AI-Powered',
                desc: 'Soluții inteligente care cresc odată cu afacerea ta',
                features: ['Automatizare procese', 'Detectare proactivă erori', 'Optimizare performanță'],
                highlight: true
              },
              {
                icon: Shield,
                title: 'Security by Design',
                desc: 'Securitate enterprise pentru aplicațiile tale critice',
                features: ['Criptare end-to-end', 'Conformitate GDPR', 'Monitorizare 24/7'],
                highlight: true
              },
              {
                icon: TrendingUp,
                title: 'Scalare Infinită',
                desc: 'Arhitectură modernă care suportă creșterea ta',
                features: ['Cloud-native', 'Microservicii', 'Load balancing automat'],
                highlight: false
              },
              {
                icon: Users,
                title: 'Echipă Dedicată',
                desc: 'Profesioniști care înțeleg business-ul tău',
                features: ['DevOps experți', 'Arhitecți software', 'Support 24/7'],
                highlight: false
              },
              {
                icon: Zap,
                title: 'Performance Optimizată',
                desc: 'Viteză și fiabilitate pentru utilizatori mulțumiți',
                features: ['99.9% uptime', 'Sub-second response', 'CDN global'],
                highlight: false
              },
              {
                icon: Settings,
                title: 'Monitorizare Proactivă',
                desc: 'Prevenim problemele înainte să apară',
                features: ['Alerte inteligente', 'Auto-healing', 'Backup automat'],
                highlight: true
              },
              {
                icon: BarChart3,
                title: 'Analytics Avansate',
                desc: 'Datele tale transformate în insight-uri valoroase',
                features: ['Real-time monitoring', 'Predictive analytics', 'Custom dashboards'],
                highlight: false
              },
              {
                icon: Palette,
                title: 'UI/UX Modern',
                desc: 'Experiențe digitale care impresionează',
                features: ['Design responsive', 'Accesibilitate WCAG', 'Performance optimizată'],
                highlight: false
              }
            ].map((feature, index) => (
              <Card key={feature.title} className={`p-6 border border-gray-200 dark:border-border hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden ${feature.highlight ? 'ring-2 ring-blue-500/20' : ''}`}>
                {feature.highlight && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-500 text-white text-xs">Premium</Badge>
                  </div>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-950/50 rounded-xl">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{feature.desc}</p>

                {/* Features list */}
                <div className="space-y-2 mb-4">
                  {feature.features.map((feat, featIndex) => (
                    <div key={featIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000" style={{width: `${(index + 1) * 12.5}%`}}></div>
                </div>
              </Card>
            ))}
          </div>

          {/* Trust Badge Section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800 rounded-full">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                200+ companii au ales deja parteneriatul nostru tehnic
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/20 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20"></div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Trusted by Innovators</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join the Revolution
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-pretty">
              Thousands of teams building the future with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                value: '99.9%',
                label: 'Uptime SLA',
                description: 'Always online, always available',
                icon: Shield,
                color: 'bg-blue-500'
              },
              {
                value: '50K+',
                label: 'Active Users',
                description: 'Growing community daily',
                icon: Users,
                color: 'bg-purple-500'
              },
              {
                value: '24h',
                label: 'Response Time',
                description: 'Lightning fast support',
                icon: Zap,
                color: 'bg-green-500'
              }
            ].map((stat, index) => (
              <Card key={stat.label} className="p-8 text-center border border-gray-200 dark:border-border hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 dark:bg-blue-950/50 rounded-xl">
                    <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-2">{stat.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</p>
                <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-4">
                  <div className={`h-full ${stat.color} rounded-full transition-all duration-1000`} style={{width: `${(index + 1) * 33.33}%`}}></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-white dark:bg-background relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-blue-950/20"></div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6 text-center">
          <div className="relative p-8 border border-blue-200 dark:border-blue-800 rounded-xl bg-white dark:bg-card shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Get Started Today</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ready to Build the Future?
                </span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 text-pretty max-w-2xl mx-auto">
                Join thousands of developers and teams creating amazing applications with our next-generation AI-powered platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden">
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button className="border border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 hover:border-blue-600 hover:shadow-md hover:-translate-y-1">
                  Book a Demo
                </button>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                  No credit card required • 14-day free trial • Cancel anytime
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}