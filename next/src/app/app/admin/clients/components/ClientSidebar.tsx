'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  UserCheck,
  Phone,
  StickyNote,
  FileText,
  Receipt,
  CreditCard,
  FileCheck,
  FileMinus,
  Calculator,
  DollarSign,
  ShoppingCart,
  FileContract,
  HelpCircle,
  Folder,
  Building,
  Calendar,
  Users,
  CheckSquare,
  Eye,
  Archive,
  Settings
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ClientSidebarProps {
  clientId: string
  clientName: string
  clientEmail: string
  isOpen: boolean
  onToggle: () => void
}

const clientMenuItems = [
  {
    title: 'Profil',
    href: '/app/admin/clients/[id]/profile',
    icon: UserCheck,
    description: 'Informații profil client'
  },
  {
    title: 'Contacte',
    href: '/app/admin/clients/[id]/contacts',
    icon: Phone,
    description: 'Contacte client'
  },
  {
    title: 'Note',
    href: '/app/admin/clients/[id]/notes',
    icon: StickyNote,
    description: 'Note interne client'
  },
  {
    title: 'Situație',
    href: '/app/admin/clients/[id]/statement',
    icon: FileText,
    description: 'Situație cont client'
  },
  {
    title: 'Facturi',
    href: '/app/admin/clients/[id]/invoices',
    icon: Receipt,
    description: 'Facturi client'
  },
  {
    title: 'Plăți',
    href: '/app/admin/clients/[id]/payments',
    icon: CreditCard,
    description: 'Plăți client'
  },
  {
    title: 'Propuneri',
    href: '/app/admin/clients/[id]/proposals',
    icon: FileCheck,
    description: 'Propuneri client'
  },
  {
    title: 'Note Credit',
    href: '/app/admin/clients/[id]/credit-notes',
    icon: FileMinus,
    description: 'Note credit client'
  },
  {
    title: 'Estimări',
    href: '/app/admin/clients/[id]/estimates',
    icon: Calculator,
    description: 'Estimări client'
  },
  {
    title: 'Abonamente',
    href: '/app/admin/clients/[id]/subscriptions',
    icon: DollarSign,
    description: 'Abonamente client'
  },
  {
    title: 'Cheltuieli',
    href: '/app/admin/clients/[id]/expenses',
    icon: ShoppingCart,
    description: 'Cheltuieli client'
  },
  {
    title: 'Contracte',
    href: '/app/admin/clients/[id]/contracts',
    icon: FileContract,
    description: 'Contracte client'
  },
  {
    title: 'Proiecte',
    href: '/app/admin/clients/[id]/projects',
    icon: Building,
    description: 'Proiecte client'
  },
  {
    title: 'Task-uri',
    href: '/app/admin/clients/[id]/tasks',
    icon: CheckSquare,
    description: 'Task-uri client'
  },
  {
    title: 'Tichete',
    href: '/app/admin/clients/[id]/tickets',
    icon: HelpCircle,
    description: 'Tichete client'
  },
  {
    title: 'Fișiere',
    href: '/app/admin/clients/[id]/files',
    icon: Folder,
    description: 'Fișiere client'
  }
]

export default function ClientSidebar({ clientId, clientName, clientEmail, isOpen, onToggle }: ClientSidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = (href: string) => {
    const currentPath = pathname.replace(/\/\d+/, '/[id]')
    return currentPath === href
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-50 transform transition-transform duration-300 ease-in-out
        lg:relative lg:z-auto lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Navigare Client
          </h2>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Archive className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Client info header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {clientName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                {clientName}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                {clientEmail}
              </p>
            </div>
          </div>
          <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            Client Activ
          </Badge>
        </div>

        {/* Navigation menu */}
        <nav className="p-4 space-y-2">
          {clientMenuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href.replace('[id]', clientId)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }
                `}
                onClick={() => {
                  // Close mobile menu after navigation
                  if (window.innerWidth < 1024) {
                    onToggle()
                  }
                }}
              >
                <div className={`
                  h-5 w-5 flex items-center justify-center
                  ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}
                `}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span>{item.title}</span>
                    {active && (
                      <div className="h-1 w-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
                {active && (
                  <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Settings className="h-4 w-4" />
              <span>Setări Client</span>
            </button>
            <Link
              href="/app/admin/clients"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Înapoi la lista de clienți</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}