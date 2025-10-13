'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Home,
  FolderOpen,
  Users,
  Settings,
  LogOut,
  Crown,
  Zap,
  Shield,
  BarChart3,
  FileText,
  Bell,
  Menu,
  X,
  ChevronDown,
  Building
} from 'lucide-react'
import SignOutButton from '@/components/SignOutButton'

interface DashboardSidebarProps {
  user: any
  subscriptionInfo: any
  isOpen: boolean
  onToggle: () => void
}

export default function DashboardSidebar({ user, subscriptionInfo, isOpen, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navigationItems = [
    {
      label: 'Dashboard',
      href: '/app',
      icon: Home,
      current: pathname === '/app'
    },
    {
      label: 'Proiecte',
      href: '/app/projects',
      icon: FolderOpen,
      current: pathname.startsWith('/app/projects') && !pathname.includes('/admin')
    },
    {
      label: 'Propuneri',
      href: '/app/proposals',
      icon: FileText,
      current: pathname.startsWith('/app/proposals')
    },
    {
      label: 'Statistici',
      href: '/app/analytics',
      icon: BarChart3,
      current: pathname.startsWith('/app/analytics')
    },
    {
      label: 'Echipă',
      href: '/app/team',
      icon: Users,
      current: pathname.startsWith('/app/team')
    },
    {
      label: 'Setări',
      href: '/account',
      icon: Settings,
      current: pathname.startsWith('/account')
    }
  ]

  const getSubscriptionIcon = (planName: string) => {
    switch (planName?.toLowerCase()) {
      case 'basic': return <Shield className="h-4 w-4" />
      case 'growth': return <Zap className="h-4 w-4" />
      case 'pro': return <Crown className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  const getSubscriptionColor = (planName: string) => {
    switch (planName?.toLowerCase()) {
      case 'basic': return 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300'
      case 'growth': return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-300'
      case 'pro': return 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900 dark:text-purple-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">VS</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Dashboard</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Bine ai revenit!</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.name || user?.email}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`text-xs ${getSubscriptionColor(subscriptionInfo?.subscriptionName)}`}>
                  {getSubscriptionIcon(subscriptionInfo?.subscriptionName)}
                  <span className="ml-1">
                    {subscriptionInfo?.subscriptionName || 'Free'}
                  </span>
                </Badge>
              </div>
            </div>
          </div>

          {/* Subscription Info */}
          {subscriptionInfo?.hasSubscription && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-700 dark:text-blue-300">Proiecte rămase:</span>
                <span className="font-medium text-blue-800 dark:text-blue-200">
                  {subscriptionInfo.remainingProjects === 'unlimited' ?
                    'Nelimitate' :
                    subscriptionInfo.remainingProjects
                  }
                </span>
              </div>
              <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-1.5 mt-2">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: subscriptionInfo.remainingProjects === 'unlimited' ? '100%' :
                      `${(subscriptionInfo.remainingProjects / subscriptionInfo.totalIncluded) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${item.current
                    ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1">{item.label}</span>
                {item.current && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Admin Section */}
          {user?.role === 'admin' && (
            <div className="mt-8">
              <div className="px-4 py-2">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Admin
                </p>
              </div>
              <Link
                href="/app/admin"
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${pathname.startsWith('/app/admin')
                    ? 'bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <Building className="h-5 w-5" />
                <span className="flex-1">Admin Panel</span>
                {pathname.startsWith('/app/admin') && (
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                )}
              </Link>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-700">
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              asChild
            >
              <Link href="/pricing">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Link>
            </Button>
            <SignOutButton className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </SignOutButton>
          </div>
        </div>
      </div>
    </>
  )
}