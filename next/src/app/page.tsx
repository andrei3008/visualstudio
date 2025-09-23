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

  @keyframes gradient-x {
    0%, 100% { background-size: 200% 200%; background-position: left center; }
    50% { background-size: 200% 200%; background-position: right center; }
  }

  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .animate-gradient-x {
    animation: gradient-x 3s ease infinite;
    background-size: 200% 200%;
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
  }
`

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BarChart3, Users, Zap, Sparkles, Rocket, Shield, TrendingUp, Settings, Palette, Mail, FileSpreadsheet, MessageSquare, Github, Figma, Calendar, Download } from 'lucide-react'


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

        {/* Enhanced Video Modal */}
        <dialog id="video-modal" className="modal backdrop-blur-sm">
          <div className="modal-box max-w-6xl p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visual Studio Platform</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Descoperă puterea platformei noastre</p>
                </div>
              </div>
              <form method="dialog">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                  <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Video Container */}
            <div className="relative bg-black">
              <div className="aspect-video flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>

              {/* Video Overlay Effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                  <div className="px-3 py-1 bg-gray-900/80 text-white text-xs font-medium rounded-full">
                    HD
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Video Info */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Transformă Afacerea Ta cu Tehnologie AI-Powered</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Descoperă cum platforma noastră revoluționară ajută companiile să își digitalizeze operațiunile,
                    să optimizeze procesele și să crească exponențial folosind inteligența artificială.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Dezvoltare rapidă și eficientă</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Integrare seamless cu sistemele existente</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Suport tehnic 24/7 dedicat</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Gata să începem?</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Programează un demo gratuită și vezi cum putem transforma afacerea ta.
                    </p>

                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                        <Calendar className="h-4 w-4" />
                        Programează Demo
                      </button>

                      <button className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                        <Download className="h-4 w-4" />
                        Descarcă Broșură
                      </button>
                    </div>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center justify-center gap-4 py-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">A</div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">M</div>
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium">R</div>
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium">+200</div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Companii partenere</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>🔒 Confidențialitate asigurată</span>
                <span>•</span>
                <span>⏱️ 14 zile trial gratuit</span>
              </div>
              <form method="dialog">
                <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200">
                  Închide
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </section>

      {/* Servicii Cheie - Stil Dashboard */}
      <section className="py-20 bg-white dark:bg-background relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background"></div>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6 animate-pulse">
              <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Servicii Cheie</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Soluții Esențiale pentru Afacerea Ta
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-pretty">
              Cele mai importante servicii care transformă afacerile noastre clienți
            </p>
          </div>

          {/* Dashboard-style Services Cards */}
          <div className="space-y-12">
            {/* Aplicații Web & Mobile */}
            <div className="bg-white dark:bg-card rounded-3xl border border-gray-200 dark:border-gray-700 p-12 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer transform hover:scale-[1.02]">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>

              <div className="relative grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Aplicații Web & Mobile</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400">Soluții digitale next-generation</p>
                    </div>
                  </div>

                  {/* Interactive Metrics */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-blue-100 text-sm font-medium">Proiecte livrate</span>
                          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">+28%</span>
                        </div>
                        <div className="text-4xl font-bold mb-2">150+</div>
                        <div className="text-blue-100 text-sm">aplicații de succes</div>
                        <div className="mt-3 h-8">
                          <svg className="w-full h-full" viewBox="0 0 100 30">
                            <path
                              d="M 0,25 Q 25,15 50,20 T 100,10"
                              fill="none"
                              stroke="rgba(255,255,255,0.5)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-purple-100 text-sm font-medium">Satisfacție clienți</span>
                          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">+12%</span>
                        </div>
                        <div className="text-4xl font-bold mb-2">98%</div>
                        <div className="text-purple-100 text-sm">ratenă de succes</div>
                        <div className="mt-3 flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-300 text-lg mx-0.5">⭐</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Creăm experiențe digitale memorabile prin aplicații web și mobile personalizate,
                    folosind cele mai avansate tehnologii pentru a asigura performanță maximă și
                    satisfacție excepțională pentru utilizatori.
                  </p>

                  {/* Interactive Features */}
                  <div className="flex flex-wrap gap-3">
                    {['React Native', 'Next.js', 'TypeScript', 'Cloud Deploy'].map((tech, index) => (
                      <span key={index} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <Link href="/services" className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Explorează serviciile
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Right side - Visual */}
                <div className="relative">
                  {/* Interactive device mockup */}
                  <div className="relative bg-gray-900 rounded-3xl p-8 shadow-2xl transform group-hover:rotate-3 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

                    {/* Screen content */}
                    <div className="relative bg-white rounded-2xl h-64 overflow-hidden">
                      <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                        <div className="space-y-3">
                          <div className="h-3 bg-blue-200 rounded w-3/4"></div>
                          <div className="h-3 bg-purple-200 rounded w-1/2"></div>
                          <div className="h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg mt-4"></div>
                          <div className="grid grid-cols-3 gap-2 mt-4">
                            {[...Array(6)].map((_, i) => (
                              <div key={i} className="h-8 bg-gray-200 rounded"></div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Floating elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* E-Commerce */}
            <div className="bg-white dark:bg-card rounded-3xl border border-gray-200 dark:border-gray-700 p-12 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer transform hover:scale-[1.02]">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Shopping cart animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🛒</div>
                <div className="absolute bottom-10 left-10 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">💳</div>
              </div>

              <div className="relative grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <span className="text-3xl">🛒</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">E-Commerce Complete</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400">Platforme de vânzare de top</p>
                    </div>
                  </div>

                  {/* Interactive Metrics */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-green-100 text-sm font-medium">Vânzări generate</span>
                          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">+67%</span>
                        </div>
                        <div className="text-4xl font-bold mb-2">€2.5M+</div>
                        <div className="text-green-100 text-sm">în ultimul an</div>
                        <div className="mt-3 h-8">
                          <svg className="w-full h-full" viewBox="0 0 100 30">
                            <path
                              d="M 0,25 Q 25,10 50,15 T 100,5"
                              fill="none"
                              stroke="rgba(255,255,255,0.5)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-blue-100 text-sm font-medium">Conversie</span>
                          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">+34%</span>
                        </div>
                        <div className="text-4xl font-bold mb-2">4.8%</div>
                        <div className="text-blue-100 text-sm">rată medie</div>
                        <div className="mt-3 flex justify-center">
                          <span className="text-2xl">📈</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Dezvoltăm platforme e-commerce complete cu management stocuri, procesare plăți securizată,
                    integrare curieri și sisteme avansate de marketing pentru a maximiza vânzările tale.
                  </p>

                  {/* Interactive Features */}
                  <div className="flex flex-wrap gap-3">
                    {['Stripe', 'Plăți', 'Stocuri', 'Analytics'].map((feature, index) => (
                      <span key={index} className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors cursor-pointer">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <Link href="/services" className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Explorează serviciile
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Right side - Visual */}
                <div className="relative">
                  {/* Interactive shopping interface */}
                  <div className="relative bg-gray-900 rounded-3xl p-8 shadow-2xl transform group-hover:-rotate-3 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

                    {/* Store interface */}
                    <div className="relative bg-white rounded-2xl h-64 overflow-hidden">
                      <div className="h-full bg-gradient-to-br from-green-50 to-blue-50 p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-8 h-8 bg-gray-200 rounded"></div>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          </div>
                        </div>

                        {/* Product grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg p-2 shadow-sm">
                              <div className="h-12 bg-gradient-to-r from-green-200 to-blue-200 rounded mb-2"></div>
                              <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-2 bg-gray-200 rounded w-1/2 mt-1"></div>
                            </div>
                          ))}
                        </div>

                        {/* Cart icon */}
                        <div className="absolute bottom-4 right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* E-Learning */}
            <div className="bg-white dark:bg-card rounded-3xl border border-gray-200 dark:border-gray-700 p-12 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer transform hover:scale-[1.02]">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Education elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🎓</div>
                <div className="absolute bottom-10 right-10 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">📚</div>
              </div>

              <div className="relative grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <span className="text-3xl">🎓</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">E-Learning Platforme</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400">Educație digitală interactivă</p>
                    </div>
                  </div>

                  {/* Interactive Metrics */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-purple-100 text-sm font-medium">Studenți activi</span>
                          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">+89%</span>
                        </div>
                        <div className="text-4xl font-bold mb-2">25K+</div>
                        <div className="text-purple-100 text-sm">pe platforme noastre</div>
                        <div className="mt-3 h-8">
                          <svg className="w-full h-full" viewBox="0 0 100 30">
                            <path
                              d="M 0,25 Q 25,10 50,15 T 100,5"
                              fill="none"
                              stroke="rgba(255,255,255,0.5)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-pink-100 text-sm font-medium">Cursuri disponibile</span>
                          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">+45</span>
                        </div>
                        <div className="text-4xl font-bold mb-2">350+</div>
                        <div className="text-pink-100 text-sm">varietate de conținut</div>
                        <div className="mt-3 flex justify-center">
                          <span className="text-2xl">🎯</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Creăm platforme e-learning interactive cu funcționalități avansate pentru studenți și profesori,
                    incluzând sisteme de evaluare, progres tracking și certificări digitale.
                  </p>

                  {/* Interactive Features */}
                  <div className="flex flex-wrap gap-3">
                    {['Video', 'Quizuri', 'Certificate', 'Progress'].map((feature, index) => (
                      <span key={index} className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <Link href="/services" className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Explorează serviciile
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Right side - Visual */}
                <div className="relative">
                  {/* Interactive learning interface */}
                  <div className="relative bg-gray-900 rounded-3xl p-8 shadow-2xl transform group-hover:rotate-3 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

                    {/* Learning interface */}
                    <div className="relative bg-white rounded-2xl h-64 overflow-hidden">
                      <div className="h-full bg-gradient-to-br from-purple-50 to-pink-50 p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex gap-2">
                            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-sm">👨‍🎓</div>
                            <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-sm">👩‍🏫</div>
                          </div>
                          <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
                        </div>

                        {/* Course progress */}
                        <div className="space-y-3">
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Module 1</span>
                              <span className="text-xs text-green-600">✓ Complet</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{width: '100%'}}></div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Module 2</span>
                              <span className="text-xs text-blue-600">75%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{width: '75%'}}></div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Module 3</span>
                              <span className="text-xs text-gray-500">În curând</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full"></div>
                          </div>
                        </div>

                        {/* Play button */}
                        <div className="absolute bottom-4 right-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white">
                          ▶️
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Quick Stats */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-200 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-200 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>

              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    label: 'Ani experiență',
                    value: '8+',
                    color: 'blue',
                    icon: '🚀',
                    description: 'De la fondare'
                  },
                  {
                    label: 'Clienți fericiți',
                    value: '200+',
                    color: 'purple',
                    icon: '😊',
                    description: 'Parteneri de încredere'
                  },
                  {
                    label: 'Proiecte livrate',
                    value: '350+',
                    color: 'green',
                    icon: '🎯',
                    description: 'Cu succes garantat'
                  },
                  {
                    label: 'Echipă dedicată',
                    value: '25',
                    color: 'orange',
                    icon: '👥',
                    description: 'Experți în domeniu'
                  }
                ].map((stat, index) => (
                  <div key={index} className="group">
                    <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden">
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.color === 'blue' ? 'from-blue-500 to-purple-500' : stat.color === 'purple' ? 'from-purple-500 to-pink-500' : stat.color === 'green' ? 'from-green-500 to-blue-500' : 'from-orange-500 to-red-500'} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                      {/* Icon */}
                      <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>

                      {/* Value */}
                      <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color === 'blue' ? 'from-blue-600 to-purple-600' : stat.color === 'purple' ? 'from-purple-600 to-pink-600' : stat.color === 'green' ? 'from-green-600 to-blue-600' : 'from-orange-600 to-red-600'} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>

                      {/* Label */}
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {stat.label}
                      </div>

                      {/* Description */}
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.description}
                      </div>

                      {/* Animated line */}
                      <div className={`mt-3 h-0.5 bg-gradient-to-r ${stat.color === 'blue' ? 'from-blue-400 to-purple-400' : stat.color === 'purple' ? 'from-purple-400 to-pink-400' : stat.color === 'green' ? 'from-green-400 to-blue-400' : 'from-orange-400 to-red-400'} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soluții AI-Powered - Dashboard-uri Personalizate */}
      <section className="py-20 bg-white dark:bg-background relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background"></div>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6 animate-pulse">
              <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Dashboard-uri Customizate</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Creăm Dashboard-uri pentru Orice Afacere
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-pretty">
              Transformăm datele complexe în vizualizări clare și intuitive, ajutându-vă să luați decizii inteligente și să creșteți eficiența afacerii dumneavoastră
            </p>
          </div>

          {/* Dashboard-uri Personalizate pentru Afaceri */}
          <div className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10"></div>
            {/* Floating elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-2xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="relative">
              {/* Exemplu Dashboard Afaceri */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Indicatori Cheie */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-100 text-sm font-medium">Vânzări Totale</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full group-hover:bg-white/30 transition-colors">+15.3%</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">245.832 RON</div>
                    <div className="text-blue-100 text-xs">vs 213.256 RON luna trecută</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-100 text-sm font-medium">Clienți Activi</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full group-hover:bg-white/30 transition-colors">+22.1%</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">1.847</div>
                    <div className="text-purple-100 text-xs">vs 1.513 clienți luna trecută</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-100 text-sm font-medium">Rata de Conversie</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full group-hover:bg-white/30 transition-colors">+5.7%</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">4.82%</div>
                    <div className="text-green-100 text-xs">vs 4.56% media industriei</div>
                  </div>
                </div>

                {/* Chart Performantă Afaceri */}
                <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6 relative overflow-hidden group cursor-pointer">
                  {/* Chart Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Performanța Afacerii Dumneavoastră</h4>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">7 Zile</span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">30 Zile</span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">90 Zile</span>
                    </div>
                  </div>

                  {/* Animated Line Chart */}
                  <div className="relative h-64 mb-4">
                    {/* Grid lines */}
                    <div className="absolute inset-0">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="absolute w-full border-t border-gray-200 dark:border-gray-600" style={{top: `${(i + 1) * 20}%`}}></div>
                      ))}
                    </div>

                    {/* Chart line */}
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
                        </linearGradient>
                      </defs>

                      {/* Area under curve */}
                      <path
                        d="M 0,150 Q 50,120 100,140 T 200,100 Q 250,80 300,90 T 400,60 L 400,200 L 0,200 Z"
                        fill="url(#lineGradient)"
                        className="opacity-60"
                      />

                      {/* Main line */}
                      <path
                        d="M 0,150 Q 50,120 100,140 T 200,100 Q 250,80 300,90 T 400,60"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="group-hover:stroke-blue-600 transition-colors duration-300"
                      />

                      {/* Data points */}
                      {[
                        {x: 0, y: 150},
                        {x: 100, y: 140},
                        {x: 200, y: 100},
                        {x: 300, y: 90},
                        {x: 400, y: 60}
                      ].map((point, index) => (
                        <circle
                          key={index}
                          cx={point.x}
                          cy={point.y}
                          r="4"
                          fill="#3B82F6"
                          className="group-hover:r-6 transition-all duration-300 cursor-pointer"
                        />
                      ))}
                    </svg>

                    {/* Floating stats pe chart */}
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-700">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Performanță Maximă</div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">96.8%</div>
                    </div>
                  </div>

                  {/* Chart footer */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Vânzări</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span>Clienți</span>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">Date Live</span>
                  </div>
                </div>
              </div>

              {/* Business Types Row */}
              <div className="mt-12">
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Perfect pentru Orice Tip de Afacere</h4>
                  <p className="text-gray-600 dark:text-gray-400">Dashboard-uri personalizate pentru nevoile specifice ale industriei dumneavoastră</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      icon: '🏪',
                      title: 'Retail & E-commerce',
                      description: 'Urmăriți vânzări, inventar și comportament clienți',
                      color: 'from-blue-500 to-blue-600'
                    },
                    {
                      icon: '🏭',
                      title: 'Producție & Industrie',
                      description: 'Monitorizați eficiența producției și costuri',
                      color: 'from-purple-500 to-purple-600'
                    },
                    {
                      icon: '🏥',
                      title: 'Sănătate & Medical',
                      description: 'Gestionați pacienți și operațiuni medicale',
                      color: 'from-green-500 to-green-600'
                    },
                    {
                      icon: '🏦',
                      title: 'Servicii Financiare',
                      description: 'Analizați tranzacții și riscuri financiare',
                      color: 'from-orange-500 to-orange-600'
                    }
                  ].map((business, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200 dark:border-gray-700">
                      <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{business.icon}</div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{business.title}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{business.description}</p>
                      <div className={`mt-4 h-1 bg-gradient-to-r ${business.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                {[
                  { label: 'Vizualizări Pagină', value: '128.5K', change: '+23.7%', color: 'blue' },
                  { label: 'Rata de Retenție', value: '87.3%', change: '+4.2%', color: 'green' },
                  { label: 'Valoare Mediu Comandă', value: '347 RON', change: '+12.8%', color: 'purple' },
                  { label: 'Clienți Noi', value: '423', change: '+18.9%', color: 'orange' }
                ].map((metric, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-pointer group">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.label}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{metric.value}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${metric.change.startsWith('+') ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clienți și Soluții - Structura Modall.ca */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/20 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20"></div>
        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-2xl opacity-20 animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-2xl opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200 dark:bg-green-900/20 rounded-full blur-2xl opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          {/* Companii cu care am lucrat - ca pe modall.ca */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Am colaborat cu companii extraordinare
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-pretty">
              Parteneriate care au transformat afaceri prin tehnologie inovatoare
            </p>
          </div>

          {/* Logo-uri companii */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
            {[
              { name: 'TechCorp', initials: 'T', color: 'from-blue-500 to-blue-600' },
              { name: 'InnovateLab', initials: 'I', color: 'from-purple-500 to-purple-600' },
              { name: 'DataFlow', initials: 'D', color: 'from-green-500 to-green-600' },
              { name: 'CloudVision', initials: 'C', color: 'from-yellow-500 to-yellow-600' },
              { name: 'SmartSolutions', initials: 'S', color: 'from-red-500 to-red-600' },
              { name: 'FutureTech', initials: 'F', color: 'from-indigo-500 to-indigo-600' }
            ].map((company, index) => (
              <div key={index} className="flex items-center justify-center group">
                <div className="bg-white dark:bg-card border border-gray-200 dark:border-gray-700 rounded-xl w-24 h-24 flex items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600 relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${company.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <span className="text-2xl font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{company.initials}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Soluțiile noastre - ca pe modall.ca */}
          <div className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10"></div>
            <div className="relative">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Construim software personalizat pentru afacerea ta să prospere
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Soluțiile noastre
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Platforme online personalizate',
                    description: 'Aplicații web create special pentru nevoile afacerii tale',
                    icon: '🌐',
                    color: 'from-blue-400 to-blue-600'
                  },
                  {
                    title: 'Sisteme de management business',
                    description: 'Soluții complete pentru organizarea și optimizarea operațiunilor',
                    icon: '⚙️',
                    color: 'from-purple-400 to-purple-600'
                  },
                  {
                    title: 'Aplicații mobile',
                    description: 'Experiențe mobile native și cross-platform de înaltă calitate',
                    icon: '📱',
                    color: 'from-green-400 to-green-600'
                  },
                  {
                    title: 'Integrare AI și Machine Learning',
                    description: 'Transformă datele în insight-uri valoroase cu inteligență artificială',
                    icon: '🤖',
                    color: 'from-yellow-400 to-yellow-600'
                  },
                  {
                    title: 'Cloud și infrastructură',
                    description: 'Soluții scalabile și securizate pentru nevoile tale tehnice',
                    icon: '☁️',
                    color: 'from-red-400 to-red-600'
                  },
                  {
                    title: 'Consultanță tehnică',
                    description: 'Expertiză pentru a ghida transformarea digitală a afacerii tale',
                    icon: '💡',
                    color: 'from-indigo-400 to-indigo-600'
                  }
                ].map((solution, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer relative overflow-hidden">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    <div className="relative">
                      <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{solution.icon}</div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{solution.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-action Final - Structura Modall.ca */}
      <section className="py-20 bg-white dark:bg-background relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-blue-950/20"></div>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-2xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6 text-center">
          <div className="relative p-12 border border-blue-200 dark:border-blue-800 rounded-2xl bg-white dark:bg-card shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-[1.02]">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-purple-50/30 to-transparent pointer-events-none"></div>
            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                animation: 'gridMove 20s linear infinite'
              }}></div>
            </div>

            <div className="relative">
              {/* Badge with animation */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-8 animate-pulse hover:animate-none transition-all duration-300">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Începe Astăzi</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                  Pregătit să Construiești Viitorul Afacerilor Tale?
                </span>
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-pretty max-w-3xl mx-auto leading-relaxed">
                Alătură-te miilor de dezvoltatori și companii care creează aplicații uimitoare cu platforma noastră AI-powered de nouă generație.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-500 flex items-center gap-4 shadow-2xl hover:shadow-3xl hover:-translate-y-2 group relative overflow-hidden transform hover:scale-105">
                  <span className="relative z-10">Începe Perioada Gratuită</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
                <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-500 hover:border-blue-600 hover:shadow-xl hover:-translate-y-2 hover:scale-105 relative overflow-hidden group">
                  <span className="relative z-10">Programează un Demo</span>
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              </div>

              <div className="mt-12 space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  <span className="inline-flex items-center gap-3">
                    <span className="w-3 h-3 bg-green-500 rounded-full inline-block animate-pulse"></span>
                    Fără card de credit necesar • 14 zile perioadă gratuită • Anulează oricând
                  </span>
                </p>
                <div className="flex items-center justify-center gap-6 text-xs text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    GDPR Compliant
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    99.9% Uptime
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    24/7 Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}