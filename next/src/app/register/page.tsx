"use client"
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPlus, Shield, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        toast.success('Cont creat. Te poți autentifica acum.')
        router.push('/login?registered=1')
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Înregistrarea a eșuat')
        setLoading(false)
      }
    } catch (error) {
      toast.error('A apărut o eroare la înregistrare')
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-primary-50/30 to-accent-50 relative overflow-hidden">
      {/* Vibrant Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-300/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-300/15 rounded-full blur-3xl animate-float"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-emerald-200/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          {/* Soft Card */}
          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 transform transition-all duration-500 hover:scale-[1.02]">
            <CardHeader className="text-center pb-8">
              {/* Logo */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="relative p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border border-gray-300 shadow-lg">
                  <UserPlus className="h-10 w-10 text-gray-600 animate-pulse-slow" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Înregistrare
                  </h1>
                </div>

                <p className="text-gray-600 text-center">
                  Alătură-te platformei noastre de dezvoltare 2025
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-white/90 flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Nume complet
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    disabled={loading}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm"
                    placeholder="Nume complet"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-white/90 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email de business
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={loading}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm"
                    placeholder="exemplu@companie.ro"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-white/90 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Parolă
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      disabled={loading}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-white/70">
                    Parola trebuie să conțină cel puțin 8 caractere
                  </p>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 border border-white/20 rounded text-purple-600 bg-white/10 focus:ring-purple-500 focus:border-purple-500 backdrop-blur-sm"
                  />
                  <Label htmlFor="terms" className="text-sm text-white/80 leading-relaxed">
                    Accept <span className="text-purple-300 font-medium">termenii și condițiile</span> și <span className="text-purple-300 font-medium">politica de confidențialitate</span>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-300 rounded-full animate-spin"></div>
                      Se creează cont...
                    </div>
                  ) : (
                    <>
                      <span>Creează cont</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                </Button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-sm text-white/70">
                    Ai deja cont?{' '}
                    <Link
                      className="text-blue-300 hover:text-white font-medium transition-colors flex items-center gap-1 inline-block"
                      href="/login"
                    >
                      <Sparkles className="h-3 w-3" />
                      Autentifică-te
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Shield className="h-3 w-3 text-green-400" />
              <CheckCircle className="h-3 w-3 text-green-400" />
              <span className="text-xs text-white/70">Securitate Enterprise & GDPR Compliant</span>
            </div>
          </div>

          {/* Feature List */}
          <div className="mt-6 space-y-2">
            {[
              { icon: CheckCircle, text: 'Acces la platforma 2025 AI-Powered' },
              { icon: CheckCircle, text: 'Colaborare în timp real' },
              { icon: CheckCircle, text: 'Suport tehnic 24/7' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-white/60">
                <feature.icon className="h-3 w-3 text-green-400" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}