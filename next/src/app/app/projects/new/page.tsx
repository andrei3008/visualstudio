'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '../../components/DashboardLayout'
import ProjectRequestForm from '@/components/ProjectRequestForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react'

export default function NewProjectRequestPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [requestSubmitted, setRequestSubmitted] = useState(false)

  const requestSubmittedParam = searchParams.get('request_submitted')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (status === 'authenticated') {
      if (requestSubmittedParam === 'true') {
        setRequestSubmitted(true)
      }
    }
  }, [status, router, requestSubmittedParam])

  if (status === 'loading') {
    return (
      <DashboardLayout title="Încărcare..." subtitle="Se procesează solicitarea">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Se încarcă...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Project requests are unlimited - no limit checking needed

  if (requestSubmitted) {
    return (
      <DashboardLayout title="Cerere Trimisă!" subtitle="Cererea de proiect a fost trimisă cu succes">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-300" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">
                Cerere Trimisă cu Succes!
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                Cererea ta de proiect a fost trimisă către echipa noastră pentru analiză.
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
                      Echipa noastră va analiza cererea ta în maximum 24-48 ore
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Vei primi o propunere detaliată cu estimare de timp și cost
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Vei fi notificat prin email când propunerea este gata
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Poți vizualiza statusul cererii în dashboard-ul de proiecte
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                  <Link href="/app/projects" className="flex items-center gap-2">
                    Vezi Proiectele
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/app" className="flex items-center gap-2">
                    Dashboard
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Cerere Proiect Nou"
      subtitle="Completează formularul pentru a iniția o nouă cerere de proiect"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="outline" size="sm">
            <Link href="/app/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Înapoi la Proiecte
            </Link>
          </Button>
        </div>

        {/* Project Request Form */}
        <ProjectRequestForm
          onSuccess={() => setRequestSubmitted(true)}
          onCancel={() => router.push('/app/projects')}
        />

        {/* Info Card */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-semibold mb-2">Procesul de Cerere:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Completezi formularul cu detaliile proiectului</li>
                  <li>Echipa noastră analizează cererea (24-48 ore)</li>
                  <li>Primești o propunere detaliată</li>
                  <li>Revizuiești și aprobi propunerea</li>
                  <li>Proiectul devine activ și începe dezvoltarea</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}