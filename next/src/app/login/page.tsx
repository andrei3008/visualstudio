"use client"
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const search = useSearchParams()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (search.get('registered') === '1') {
      toast.success('Cont creat. Te poți autentifica acum.')
    }
    if (search.get('error')) {
      toast.error('Autentificare eșuată. Verifică datele.')
    }
  }, [search])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    })

    if (res?.ok) {
      window.location.href = '/app'
    } else {
      toast.error('Email sau parolă incorecte')
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
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50/30 to-emerald-50 relative overflow-hidden">
      {/* Vibrant Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-300/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl animate-float"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-200/40 rounded-full animate-float"
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
          {/* Vibrant Card */}
          <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl border border-primary-100 transform transition-all duration-500 hover:scale-[1.02]">
            <CardHeader className="text-center pb-8">
              {/* Logo */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="relative p-4 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl border border-primary-200 shadow-lg">
                  <Shield className="h-10 w-10 text-primary-600 animate-pulse-slow" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    Autentificare
                  </h1>
                </div>

                <p className="text-gray-600 text-center">
                  Accesează platforma noastră de dezvoltare 2025
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-white/90 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
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
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Se autentifică...
                    </div>
                  ) : (
                    <>
                      <span>Intră în cont</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                </Button>

                {/* Registration Link */}
                <div className="text-center">
                  <p className="text-sm text-white/70">
                    Nu ai cont?{' '}
                    <Link
                      className="text-blue-300 hover:text-white font-medium transition-colors flex items-center gap-1 inline-block"
                      href="/register"
                    >
                      <Sparkles className="h-3 w-3" />
                      Înregistrează-te
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Decorative Elements */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-white/70">Securitate Enterprise</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}