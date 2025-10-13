'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  UserCheck,
  Phone,
  FileText,
  DollarSign,
  Calendar,
  Settings,
  Package,
  MessageSquare,
  CreditCard,
  TrendingUp,
  Shield,
  Clock,
  Star,
  Archive
} from 'lucide-react'

interface UserSidebarProps {
  user: any
  onBackClick: () => void
  isLoading: boolean
}

export default function UserSidebar({ user, onBackClick, isLoading }: UserSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const userMenuItems = [
    { title: 'Profil', href: '/app/admin/users/[id]/profile', icon: UserCheck },
    { title: 'Contacte', href: '/app/admin/users/[id]/contacts', icon: Phone },
    { title: 'Proiecte', href: '/app/admin/users/[id]/projects', icon: Package },
    { title: 'Propuneri', href: '/app/admin/users/[id]/proposals', icon: FileText },
    { title: 'Facturi', href: '/app/admin/users/[id]/invoices', icon: FileText },
    { title: 'Plăți', href: '/app/admin/users/[id]/payments', icon: CreditCard },
    { title: 'Milestone-uri', href: '/app/admin/users/[id]/milestones', icon: Calendar },
    { title: 'Mesaje', href: '/app/admin/users/[id]/messages', icon: MessageSquare },
    { title: 'Task-uri', href: '/app/admin/users/[id]/tasks', icon: Clock },
    { title: 'Fișiere', href: '/app/admin/users/[id]/files', icon: Archive },
    { title: 'Raporturi', href: '/app/admin/users/[id]/reports', icon: TrendingUp },
    { title: 'Contracte', href: '/app/admin/users/[id]/contracts', icon: Shield },
    { title: 'Evaluări', href: '/app/admin/users/[id]/reviews', icon: Star },
    { title: 'Setări', href: '/app/admin/users/[id]/settings', icon: Settings },
    { title: 'Finanțe', href: '/app/admin/users/[id]/finances', icon: DollarSign }
  ]

  const isActiveLink = (href: string) => {
    if (href === '/app/admin/users/[id]/profile') {
      return pathname === `/app/admin/users/${user?.id}/profile` ||
             pathname === `/app/admin/users/${user?.id}`
    }
    return pathname.includes(href.replace('[id]', user?.id || ''))
  }

  if (isLoading) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-slate-900">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      {/* User Info Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={onBackClick}
          className="flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Înapoi la utilizatori
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {user?.name || 'Utilizator necunoscut'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">
              {user?.role || 'Utilizator'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {userMenuItems.map((item) => {
            const isActive = isActiveLink(item.href)
            const Icon = item.icon

            return (
              <li key={item.title}>
                <Link
                  href={item.href.replace('[id]', user?.id || '')}
                  className={`flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-l-4 border-violet-500'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="font-medium">{item.title}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-violet-500 rounded-full"></div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Stats Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <div className="text-lg font-semibold text-slate-900 dark:text-white">0</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Proiecte</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <div className="text-lg font-semibold text-slate-900 dark:text-white">0</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Task-uri</div>
          </div>
        </div>
      </div>
    </div>
  )
}