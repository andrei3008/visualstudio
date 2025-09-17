'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BarChart3, Users, Zap, Sparkles, Rocket, Shield, TrendingUp, Settings, Palette } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Hero Section with Dashboard Colors */}
      <section className="relative min-h-screen">
        <div className="relative max-w-full mx-auto px-6 py-24 text-center md:max-w-[90vw]">
          <div className="space-y-8">
            {/* Badge with Dashboard Colors */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">Visual Studio Platform 2025</span>
            </div>

            {/* Main Title with Dashboard Typography */}
            <div className="space-y-4">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight heading-two-line">
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Construim Infrastructură Tehnică
                  </span>
                  <span className="block text-gray-900">
                    pentru Viitorul Afacerilor
                  </span>
                </h1>
              </div>
              <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto text-pretty">
              De la aplicații web personalizate la soluții mobile avansate, dezvoltăm instrumentele care ajută afacerile să se adapteze și să crească.
              </p>
            </div>

            {/* Subtitle with Dashboard Voice */}
            {/* Newsletter Section */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Nu rata noutățile</p>
              <div className="relative max-w-[320px] mx-auto">
                <input
                  type="email"
                  placeholder="adresa@exemplu.com"
                  className="w-full h-12 pl-10 pr-14 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 text-gray-700 placeholder-gray-500 text-sm"
                />
                <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <button className="absolute top-1.5 right-1.5 bottom-1.5 w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center">Nu vom distribui niciodată adresa ta de email.</p>
            </div>
          </div>
        </div>

        {/* Dashboard Preview - 4 Column Layout */}
        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6 pb-24">
          <div className="p-8 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Dashboard Preview</h3>
                  <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">AI Enhanced</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Real-time</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Visual Studio Explicat Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Visual Studio Explicat</h4>
                    <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <span className="text-sm text-gray-600">Platformă modernă</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => document.getElementById('video-modal').showModal()}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Vezi ce facem
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Proiecte Active</h4>
                      <p className="text-xs text-blue-600 font-medium">Real-time analytics</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">75% Complete</span>
                    <span className="text-xs font-medium text-blue-600">În lucru</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>

              {/* Tasks Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Task-uri Active</h4>
                      <p className="text-xs text-purple-600 font-medium">AI powered workflow</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">8</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">UI Design Complete</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700 font-medium">Backend in Progress</span>
                  </div>
                </div>
              </div>

              {/* Placeholder Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Echipa Activă</h4>
                      <p className="text-xs text-green-600 font-medium">5 developeri</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">5</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">În pregătire</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Sprint nou</span>
                  </div>
                </div>
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

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
              <Rocket className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Capabilități Platformă</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Development Tools
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-pretty">
              Instrumente avansate care alimentează viitorul dezvoltării software cu capabilități AI-Powered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Rocket,
                title: 'AI-Powered Development',
                desc: 'Intelligent code generation, bug detection, and optimization suggestions powered by advanced AI.'
              },
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                desc: 'Advanced analytics and insights with real-time data visualization and performance metrics.'
              },
              {
                icon: Users,
                title: 'Collaboration Suite',
                desc: 'Seamless team collaboration with real-time editing, video calls, and integrated communication.'
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                desc: 'Bank-level encryption, advanced authentication, and compliance with global security standards.'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                desc: 'Optimized performance with 99.9% uptime and sub-second response times for all operations.'
              },
              {
                icon: Settings,
                title: 'Custom Workflows',
                desc: 'Configurable workflows and automation tools tailored to your specific development process.'
              },
              {
                icon: TrendingUp,
                title: 'Scalable Architecture',
                desc: 'Built to scale from startups to enterprises with microservices and cloud-native design.'
              },
              {
                icon: Palette,
                title: 'Custom UI Themes',
                desc: 'Beautiful, customizable themes and dark mode support for personalized development experience.'
              }
            ].map((feature, index) => (
              <Card key={feature.title} className="p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{feature.desc}</p>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000" style={{width: `${(index + 1) * 12.5}%`}}></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gray-50 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">Trusted by Innovators</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join the Revolution
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-pretty">
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
              <Card key={stat.label} className="p-8 text-center border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-xl">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-4">
                  <div className={`h-full ${stat.color} rounded-full transition-all duration-1000`} style={{width: `${(index + 1) * 33.33}%`}}></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-white relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50"></div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6 text-center">
          <div className="relative p-8 border border-blue-200 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700">Get Started Today</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ready to Build the Future?
                </span>
              </h2>

              <p className="text-lg text-gray-600 mb-10 text-pretty max-w-2xl mx-auto">
                Join thousands of developers and teams creating amazing applications with our next-generation AI-powered platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden">
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 hover:border-blue-600 hover:shadow-md hover:-translate-y-1">
                  Book a Demo
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-8">
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