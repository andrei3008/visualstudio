'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Shield,
  Users,
  FolderOpen,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Building,
  TrendingUp,
  Activity,
  Bell,
  ChevronDown,
  ChevronRight,
  DollarSign,
  FileCheck,
  Receipt,
  CreditCard,
  Package,
  Wrench,
  CheckSquare,
  } from 'lucide-react'
import SignOutButton from '@/components/SignOutButton'

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
  user: any
}

export default function AdminSidebar({ isOpen, onClose, user }: AdminSidebarProps) {
  const pathname = usePathname()
  const [expandedSales, setExpandedSales] = useState(false)
  
  const navigationItems = [
    {
      title: 'Panou Principal',
      href: '/app/admin',
      icon: Home,
      description: 'Vedere generală'
    },
    {
      title: 'Utilizatori',
      href: '/app/admin/users',
      icon: Users,
      description: 'Management utilizatori'
    },
    {
      title: 'Proiecte',
      href: '/app/admin/projects',
      icon: FolderOpen,
      description: 'Management proiecte'
    },
    {
      title: 'Task-uri',
      href: '/app/admin/tasks',
      icon: CheckSquare,
      description: 'Management task-uri'
    },
    {
      title: 'Vânzări',
      href: '/app/admin/sales',
      icon: DollarSign,
      description: 'Management vânzări',
      isExpandable: true,
      children: [
        {
          title: 'Propuneri',
          href: '/app/admin/sales/proposals',
          icon: FileText,
          description: 'Management propuneri'
        },
        {
          title: 'Estimări',
          href: '/app/admin/sales/estimates',
          icon: FileCheck,
          description: 'Management estimări'
        },
        {
          title: 'Facturi',
          href: '/app/admin/sales/invoices',
          icon: Receipt,
          description: 'Management facturi'
        },
        {
          title: 'Plăți',
          href: '/app/admin/sales/payments',
          icon: CreditCard,
          description: 'Management plăți'
        },
          {
          title: 'Pachete',
          href: '/app/admin/sales/packages',
          icon: Package,
          description: 'Management pachete'
        },
        {
          title: 'Servicii',
          href: '/app/admin/sales/services',
          icon: Wrench,
          description: 'Management servicii'
        }
      ]
    },
    {
      title: 'Analitice',
      href: '/app/admin/analytics',
      icon: BarChart3,
      description: 'Statistici și rapoarte'
    },
    {
      title: 'Setări',
      href: '/app/admin/settings',
      icon: Settings,
      description: 'Configurări sistem'
    }
  ]

  const isActiveLink = (href: string) => {
    if (href === '/app/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  // Check if any sales sub-item is active to auto-expand
  const isSalesActive = pathname.startsWith('/app/admin/sales')

  // Auto-expand sales when any sub-item is active
  React.useEffect(() => {
    if (isSalesActive && !expandedSales) {
      setExpandedSales(true)
    }
  }, [isSalesActive, expandedSales])

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 lg:relative lg:inset-auto lg:left-auto lg:right-auto
        w-64 h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-slate-700/50
        transform transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-slate-700/50">
          <Link href="/app/admin" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent text-lg">
                Admin Panel
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Control Center</p>
            </div>
          </Link>

          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200/50 dark:border-slate-700/50 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-12 w-12 shadow-lg ring-2 ring-white dark:ring-slate-700">
                <AvatarFallback className="bg-gradient-to-br from-red-100 to-red-200 text-red-600 dark:from-red-900 dark:to-red-800 dark:text-red-300 font-bold">
                  <Shield className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                {user?.name || user?.email}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Super Admin
                </p>
                <div className="px-2 py-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full">
                  PRO
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-3">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = isActiveLink(item.href)

            // Handle expandable items
            if (item.isExpandable) {
              const isSalesItem = item.href === '/app/admin/sales'
              const isItemActive = isSalesActive
              const isExpanded = expandedSales
              const setExpanded = setExpandedSales
              const itemColor = 'green'

              return (
                <div key={item.href} className="space-y-1">
                  {/* Main expandable item */}
                  <button
                    onClick={() => setExpanded(!isExpanded)}
                    className={`
                      group relative flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-sm font-bold
                      transition-all duration-300 ease-out
                      ${isItemActive
                        ? `bg-gradient-to-r from-${itemColor}-500 to-${itemColor}-600 text-white shadow-lg shadow-${itemColor}-500/25 scale-105`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white dark:hover:from-slate-800 dark:hover:to-slate-700 hover:shadow-md hover:scale-102 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                  >
                    <div className={`
                      relative z-10 transition-all duration-300
                      ${isItemActive ? 'text-white' : `text-gray-500 group-hover:text-${itemColor}-500 dark:text-gray-400 dark:group-hover:text-${itemColor}-400`}
                    `}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 relative z-10 text-left">
                      <div className={`
                        transition-all duration-300
                        ${isItemActive ? 'text-white' : 'text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white'}
                      `}>
                        {item.title}
                      </div>
                      <div className={`
                        text-xs mt-0.5 transition-all duration-300
                        ${isItemActive ? 'text-white/80 font-medium' : 'text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300'}
                      `}>
                        {item.description}
                      </div>
                    </div>
                    <div className={`
                      transition-transform duration-300
                      ${isExpanded ? 'rotate-180' : ''}
                    `}>
                      <ChevronDown className={`
                        h-4 w-4 transition-all duration-300
                        ${isItemActive ? 'text-white' : `text-gray-400 group-hover:text-${itemColor}-500 dark:group-hover:text-${itemColor}-400`}
                      `} />
                    </div>
                    {isItemActive && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                    )}
                  </button>

                  {/* Sub-items */}
                  {isExpanded && item.children && (
                    <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon
                        const isChildActive = pathname === child.href

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              if (window.innerWidth < 1024) {
                                onClose()
                              }
                            }}
                            className={`
                              group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium
                              transition-all duration-300 ease-out
                              ${isChildActive
                                ? `bg-gradient-to-r from-${itemColor}-100 to-${itemColor}-200 dark:from-${itemColor}-900/30 dark:to-${itemColor}-800/30 text-${itemColor}-700 dark:text-${itemColor}-300 scale-102`
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-slate-800/50 dark:hover:to-slate-700/50 hover:text-gray-900 dark:hover:text-white hover:scale-102'
                              }
                            `}
                          >
                            <div className={`
                              transition-all duration-300
                              ${isChildActive ? `text-${itemColor}-600 dark:text-${itemColor}-400` : `text-gray-400 group-hover:text-${itemColor}-500 dark:text-gray-500 dark:group-hover:text-${itemColor}-400`}
                            `}>
                              <ChildIcon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className={`
                                transition-all duration-300
                                ${isChildActive ? `text-${itemColor}-700 dark:text-${itemColor}-300 font-semibold` : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'}
                              `}>
                                {child.title}
                              </div>
                            </div>
                            {isChildActive && (
                              <div className={`absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-${itemColor}-500 rounded-full`}></div>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            // Regular navigation items
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  // Close mobile sidebar after navigation
                  if (window.innerWidth < 1024) {
                    onClose()
                  }
                }}
                className={`
                  group relative flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold
                  transition-all duration-300 ease-out
                  ${isActive
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white dark:hover:from-slate-800 dark:hover:to-slate-700 hover:shadow-md hover:scale-102 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <div className={`
                  relative z-10 transition-all duration-300
                  ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-red-500 dark:text-gray-400 dark:group-hover:text-red-400'}
                `}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 relative z-10">
                  <div className={`
                    transition-all duration-300
                    ${isActive ? 'text-white' : 'text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white'}
                  `}>
                    {item.title}
                  </div>
                  <div className={`
                    text-xs mt-0.5 transition-all duration-300
                    ${isActive ? 'text-white/80 font-medium' : 'text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300'}
                  `}>
                    {item.description}
                  </div>
                </div>
                {isActive && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200/50 dark:border-slate-700/50 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-900/50">
          <div className="space-y-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start h-12 px-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-white dark:hover:from-slate-800 dark:hover:to-slate-700 transition-all duration-300 group"
              asChild
            >
              <Link href="/app">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Home className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Client Dashboard
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Switch to client view
                    </div>
                  </div>
                </div>
              </Link>
            </Button>

            <SignOutButton className="w-full justify-start h-12 px-4 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/20 dark:hover:to-red-900/30 transition-all duration-300 group" />
          </div>
        </div>
      </div>
    </>
  )
}