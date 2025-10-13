'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, Settings, LogOut, Shield, Users, FileText, FolderOpen, BarChart3 } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import SignOutButton from '@/components/SignOutButton'

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function AdminLayout({ children, title, subtitle, actions }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/app/admin" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 via-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hover:bg-slate-100 dark:hover:bg-slate-800">
              <Link href="/app">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="min-h-screen lg:grid lg:grid-cols-[256px_1fr]">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={session?.user}
        />

        {/* Main Content */}
        <div className="lg:contents">
          <div>
          {/* Top Header */}
          <div className="hidden lg:block bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50 px-6 py-6 shadow-sm">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-6">
                <Link href="/app/admin" className="flex items-center gap-4 hover:opacity-80 transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Admin Panel
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Management Platformă Completa</p>
                  </div>
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Live</span>
                </div>
                {actions}
                <Button variant="outline" size="sm" asChild className="hover:bg-slate-50 dark:hover:bg-slate-800">
                  <Link href="/app">
                    <Settings className="h-4 w-4 mr-2" />
                    Client View
                  </Link>
                </Button>
                <SignOutButton className="border border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 px-3 py-2 text-sm rounded-md" />
              </div>
            </div>
          </div>

          {/* Page Header */}
          {(title || subtitle) && (
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                  <div>
                    {title && (
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {title}
                      </h1>
                    )}
                    {subtitle && (
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  {actions && (
                    <div className="hidden lg:block">
                      {actions}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Page Content */}
          <main className="p-4 lg:p-8 pt-20 lg:pt-8">
            <div className="max-w-full mx-auto">
              {children}
            </div>
          </main>
          </div>
        </div>
      </div>
    </div>
  )
}