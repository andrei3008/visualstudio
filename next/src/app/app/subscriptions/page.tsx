'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, ArrowRight, Home, Sparkles } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

export default function SubscriptionsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    const successParam = searchParams.get('success')
    const canceledParam = searchParams.get('canceled')
    const sessionIdParam = searchParams.get('session_id')

    setSuccess(successParam === 'true')
    setSessionId(sessionIdParam)
    setLoading(false)

    // If no success or canceled param, redirect to pricing
    if (!successParam && !canceledParam) {
      router.push('/pricing')
    }
  }, [searchParams, router])

  if (loading) {
    return (
      <DashboardLayout title="Procesare..." subtitle="Se procesează solicitarea ta">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Processing...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title={success ? "Abonament Activat!" : "Plată Anulată"}
      subtitle={success ? "Felicitări! Abonamentul tău a fost activat" : "Procesul de plată a fost anulat"}
    >
      <div className="max-w-2xl mx-auto">
        {success ? (
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-300" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">
                Abonament Activat cu Succes!
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                Felicitări! Abonamentul tău a fost activat și poți începe să folosești beneficiile imediat.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-4">
                  Ce se întâmplă în continuare:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Primești acces la proiectele gratuite incluse în abonamentul tău
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Poți crea proiecte noi direct din dashboard
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Abonamentul se va reînnoi automat lunar
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                  <Link href="/app" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Mergi la Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/pricing" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Vezi Alte Planuri
                  </Link>
                </Button>
              </div>

              {sessionId && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Session ID: {sessionId}
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-300" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-800 dark:text-red-200">
                Plată Anulată
              </CardTitle>
              <CardDescription className="text-red-700 dark:text-red-300">
                Procesul de plată a fost anulat. Nu s-a efectuat nicio plată și abonamentul nu a fost activat.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-4">
                  Poți încerca din nou:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Revizuie informațiile de plată
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Verifică datele cardului
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Contactează suportul dacă problema persistă
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1 bg-red-600 hover:bg-red-700">
                  <Link href="/pricing" className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Încearcă din Nou
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/app" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Mergi la Dashboard
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}