'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  User,
  Settings,
  LogOut,
  Bell,
  Home,
  Sparkles
} from 'lucide-react'
import SignOutButton from './SignOutButton'
import NotificationBell from './NotificationBell'
import ThemeToggle from './ThemeToggle'

interface NavbarProps {
  session: any
  isAdmin: boolean
}

export default function Navbar({ session, isAdmin }: NavbarProps) {
  const [navbarState, setNavbarState] = useState<'transparent' | 'styled' | 'hidden'>('styled')
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroSectionHeight = window.innerHeight // 100vh

      if (currentScrollY === 0) {
        // At the very top - transparent
        setNavbarState('transparent')
      } else if (currentScrollY <= heroSectionHeight) {
        // Scrolling but still in hero section - styled with background and border
        setNavbarState('styled')
      } else {
        // Past hero section - hidden
        setNavbarState('hidden')
      }
    }

    // Set initial state and mark as mounted
    handleScroll()
    setIsMounted(true)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getNavbarClasses = () => {
    switch (navbarState) {
      case 'transparent':
        return 'bg-transparent border-0 opacity-100 translate-y-0'
      case 'styled':
        return 'bg-white/95 dark:bg-card/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-700/30 opacity-100 translate-y-0'
      case 'hidden':
        return 'opacity-0 -translate-y-full pointer-events-none'
      default:
        return 'bg-transparent border-0 opacity-100 translate-y-0'
    }
  }

  // Don't render anything until we know the correct state
  if (!isMounted) {
    return null
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarClasses()}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group relative">
              {/* Animated Icon */}
              <div className="relative">
                {/* Clean modern logo */}
                <div className="relative">
                  {/* Simple shadow/glow */}
                  <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

                  {/* Main icon container */}
                  <div className="relative w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-lg group-hover:shadow-blue-500/25">
                    {/* VS initials */}
                    <div className="relative z-10 flex items-center justify-center">
                      <span className="text-white font-bold text-xs tracking-tighter leading-none">
                        <span className="block">VS</span>
                      </span>
                    </div>
                  </div>

                  {/* Subtle corner accent */}
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Clean modern text */}
              <span className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                Visual Studio
              </span>
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/services"
              className={`text-sm font-medium transition-colors relative group ${
                pathname === '/services'
                  ? 'text-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Servicii
              <div className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                pathname === '/services' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></div>
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors relative group ${
                pathname === '/pricing'
                  ? 'text-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Prețuri
              <div className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                pathname === '/pricing' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></div>
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors relative group ${
                pathname === '/contact'
                  ? 'text-emerald-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              Contact
              <div className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></div>
            </Link>
            <Link
              href="/projects"
              className={`text-sm font-medium transition-colors relative group ${
                pathname === '/projects'
                  ? 'text-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Proiecte
              <div className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                pathname === '/projects' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></div>
            </Link>
          </div>

          {/* User Actions - Right side */}
          <div className="flex items-center gap-3">
            {session?.user ? (
              <div className="flex items-center gap-2">
                {/* Dashboard Link */}
                <Link href="/app">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                      pathname.startsWith('/app') && !pathname.startsWith('/app/admin') ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50' : ''
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  </Button>
                </Link>

                {/* Admin Link */}
                {isAdmin && (
                  <Link href="/app/admin">
                    <Badge
                      variant="outline"
                      className={`text-xs transition-all duration-300 ${
                        pathname.startsWith('/app/admin')
                          ? 'border-blue-400 text-blue-700 bg-blue-50 dark:bg-blue-950/50'
                          : 'border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50'
                      }`}
                    >
                      Admin
                    </Badge>
                  </Link>
                )}

                {/* User Menu */}
                <div className="relative group">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm">{session.user?.email?.split('@')[0]}</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  </Button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-card rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <div className="py-2">
                      <Link href="/account">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-200"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Contul meu
                        </Button>
                      </Link>

                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                      <div className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg mx-2 mb-2">
                        <Bell className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                        <NotificationBell />
                        <span className="ml-2">Notificări</span>
                      </div>

                      <SignOutButton className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50 transition-all duration-200">
                        <LogOut className="h-4 w-4 mr-2" />
                        Ieșire
                      </SignOutButton>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <span>Intră în portal</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/register" className="hidden sm:block">
                  <Button
                    size="sm"
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Înregistrare
                  </Button>
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}