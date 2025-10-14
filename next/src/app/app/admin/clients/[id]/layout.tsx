'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import AdminSidebar from '../../components/AdminSidebar'
import ClientSidebar from '../components/ClientSidebar'
import { Button } from '@/components/ui/button'
import { Menu, ArrowLeft, UserCheck, SidebarClose } from 'lucide-react'
import Link from 'next/link'

export default function ClientLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const clientId = params.id as string
  const [mainSidebarOpen, setMainSidebarOpen] = useState(true)
  const [clientSidebarOpen, setClientSidebarOpen] = useState(true)
  const [clientName, setClientName] = useState('Client')
  const [clientEmail, setClientEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (!clientId) {
      router.push('/app/admin/clients')
      return
    }

    fetchClientInfo()
  }, [status, clientId])

  const fetchClientInfo = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}`)
      if (!response.ok) throw new Error('Failed to fetch client info')

      const data = await response.json()
      const client = data.client

      // Set display name based on available fields
      if (client.Companie) {
        setClientName(client.Companie)
      } else if (client.Prenume && client.Nume) {
        setClientName(`${client.Prenume} ${client.Nume}`)
      } else if (client.name) {
        setClientName(client.name)
      } else {
        setClientName(client.email)
      }

      setClientEmail(client.email)
    } catch (error) {
      console.error('Error fetching client info:', error)
      setClientName('Client necunoscut')
      setClientEmail('')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMainSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setClientSidebarOpen(!clientSidebarOpen)}
            >
              <UserCheck className="h-5 w-5" />
            </Button>
            <Link href="/app/admin/clients" className="p-2">
              <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">
                  {clientName}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Client Portal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden lg:block">
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/app/admin/clients" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {clientName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {clientName}
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Client Management Portal
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {clientEmail}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex pt-16 lg:pt-0">
        {/* Main Admin Sidebar - First Column */}
        <div className={`
          hidden lg:block
          ${mainSidebarOpen ? 'w-64' : 'w-0'}
          bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700
          transition-all duration-300 ease-in-out
          overflow-hidden
          flex-shrink-0
        `}>
          <div className="h-full">
            <AdminSidebar
                isOpen={mainSidebarOpen}
                onClose={() => setMainSidebarOpen(false)}
                user={session?.user}
              />
          </div>
        </div>

        {/* Mobile Admin Sidebar */}
        <div className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-40 transform transition-transform duration-300 ease-in-out lg:hidden
          ${mainSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full">
            <AdminSidebar
                isOpen={mainSidebarOpen}
                onClose={() => setMainSidebarOpen(false)}
                user={session?.user}
              />
          </div>
        </div>

        {/* Client Secondary Sidebar - Second Column */}
        <div className={`
          ${clientSidebarOpen ? 'w-80' : 'w-0'}
          bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700
          transition-all duration-300 ease-in-out
          overflow-hidden
          flex-shrink-0
        `}>
          <div className="h-full">
            <ClientSidebar
              clientId={clientId}
              clientName={clientName}
              clientEmail={clientEmail}
              isOpen={clientSidebarOpen}
              onToggle={() => setClientSidebarOpen(!clientSidebarOpen)}
            />
          </div>
        </div>

        {/* Mobile Client Sidebar */}
        <div className={`
          fixed top-0 left-0 h-full w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-40 transform transition-transform duration-300 ease-in-out lg:hidden
          ${clientSidebarOpen ? 'translate-x-64' : 'translate-x-0'}
        `}>
          <div className="h-full">
            <ClientSidebar
              clientId={clientId}
              clientName={clientName}
              clientEmail={clientEmail}
              isOpen={clientSidebarOpen}
              onToggle={() => setClientSidebarOpen(!clientSidebarOpen)}
            />
          </div>
        </div>

        {/* Main Content - Third Column */}
        <div className="flex-1 overflow-hidden min-w-0">
          <main className="min-h-screen">
            <div className="p-6">
              <Suspense fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              }>
                {children}
              </Suspense>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile overlay for main sidebar */}
      {mainSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMainSidebarOpen(false)}
        />
      )}

      {/* Mobile overlay for client sidebar */}
      {clientSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setClientSidebarOpen(false)}
        />
      )}

      {/* Toggle button for client sidebar on desktop */}
      {clientSidebarOpen && (
        <Button
          variant="outline"
          size="sm"
          className="hidden lg:block fixed left-[28rem] top-20 z-20"
          onClick={() => setClientSidebarOpen(false)}
        >
          <SidebarClose className="h-4 w-4" />
        </Button>
      )}

      {/* Toggle button for main sidebar on desktop */}
      {mainSidebarOpen && (
        <Button
          variant="outline"
          size="sm"
          className="hidden lg:block fixed left-72 top-20 z-20"
          onClick={() => setMainSidebarOpen(false)}
        >
          <SidebarClose className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}