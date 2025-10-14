'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import AdminSidebar from '../../components/AdminSidebar'
import UserSidebar from './components/UserSidebar'
import { useRouter } from 'next/navigation'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const [mainSidebarOpen, setMainSidebarOpen] = useState(true)
  const [userSidebarOpen, setUserSidebarOpen] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  // Extract user ID from pathname
  const userId = pathname.split('/').pop()

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return

      try {
        const response = await fetch(`/api/admin/users/${userId}`)
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  const handleBackToUsers = () => {
    router.push('/app/admin/users')
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 overflow-hidden">
      {/* Main Admin Sidebar - First Column */}
      <div className={`${mainSidebarOpen ? 'w-64' : 'w-0'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 overflow-hidden flex-shrink-0`}>
        <AdminSidebar
            isOpen={mainSidebarOpen}
            onClose={() => setMainSidebarOpen(false)}
            user={session?.user}
          />
      </div>

      {/* User Secondary Sidebar - Second Column */}
      <div className={`${userSidebarOpen ? 'w-80' : 'w-0'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 overflow-hidden flex-shrink-0`}>
        <UserSidebar
          user={user}
          onBackClick={handleBackToUsers}
          isLoading={isLoading}
        />
      </div>

      {/* Main Content - Third Column */}
      <div className="flex-1 overflow-hidden min-w-0">
        <main className="h-full overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile overlay for main sidebar */}
      {mainSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMainSidebarOpen(false)}
        />
      )}

      {/* Mobile overlay for user sidebar */}
      {userSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setUserSidebarOpen(false)}
        />
      )}
    </div>
  )
}