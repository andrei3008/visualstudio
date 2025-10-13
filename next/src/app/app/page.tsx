export const metadata = { title: 'Dashboard' }

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { findUserByEmail } from '@/lib/users'
import { listProjectsByUserId } from '@/lib/projects'
import DashboardLayout from './components/DashboardLayout'
import StatsCard from './components/StatsCard'
import QuickActions from './components/QuickActions'
import DeleteProjectButton from '@/components/DeleteProjectButton'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import {
  Users,
  FolderOpen,
  CheckCircle,
  Clock,
  Rocket,
  TrendingUp,
  BarChart3,
  Zap,
  Crown,
  Activity,
  FileText,
  Calendar,
  Target,
  Plus
} from 'lucide-react'

export default async function AppDashboard() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const user = await findUserByEmail(session.user.email)
  if (!user) redirect('/login')

  // Fetch proposals directly using Prisma
  const proposals = await prisma.proposal.findMany({
    where: {
      project: {
        userId: user.id
      }
    },
    include: {
      project: {
        select: {
          id: true,
          name: true,
          description: true,
          requestDetails: true
        }
      },
      items: true
    },
    orderBy: { createdAt: 'desc' }
  })

  const [allProposalsCount, submittedCount, approvedCount, openTasks, activeSubscription] = await Promise.all([
    prisma.proposal.count({ where: { project: { userId: user.id } } }),
    prisma.proposal.count({ where: { project: { userId: user.id }, status: 'submitted' } }),
    prisma.proposal.count({ where: { project: { userId: user.id }, status: 'approved' } }),
    prisma.task.count({ where: { project: { userId: user.id }, NOT: { status: 'done' } } }),
    prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: 'active'
      },
      include: {
        maintenancePackage: true
      }
    })
  ])

  // Calculate free projects remaining
  const freeProjectsRemaining = activeSubscription
    ? activeSubscription.maintenancePackage.includedProjects === -1
      ? 'unlimited'
      : Math.max(0, activeSubscription.maintenancePackage.includedProjects - activeSubscription.projectsUsed)
    : 0

  // Prepare subscription info for components
  const subscriptionInfo = activeSubscription ? {
    hasSubscription: true,
    canCreateProject: freeProjectsRemaining === 'unlimited' || freeProjectsRemaining > 0,
    subscriptionName: activeSubscription.maintenancePackage.name,
    remainingProjects: freeProjectsRemaining,
    totalIncluded: activeSubscription.maintenancePackage.includedProjects === -1 ?
      'unlimited' : activeSubscription.maintenancePackage.includedProjects
  } : {
    hasSubscription: false,
    canCreateProject: false,
    subscriptionName: null,
    remainingProjects: 0,
    totalIncluded: 0
  }

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={`Bun venit, ${session.user.name || session.user.email}!`}
      actions={
        !activeSubscription && (
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/pricing" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Vezi Planuri
            </Link>
          </Button>
        )
      }
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Propuneri Totale"
            value={proposals.length}
            description="Toate propunerile tale"
            icon={FolderOpen}
            color="blue"
          />
          <StatsCard
            title="Abonament"
            value={activeSubscription ? activeSubscription.maintenancePackage.name : 'Free'}
            description={
              activeSubscription
                ? `${freeProjectsRemaining === 'unlimited' ? 'Nelimitate' : freeProjectsRemaining} gratuite`
                : 'Niciun abonament'
            }
            icon={Crown}
            color="purple"
          />
          <StatsCard
            title="Propuneri Totale"
            value={allProposalsCount}
            description="Toate propunerile tale"
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            title="Task-uri Active"
            value={openTasks}
            description="În progres"
            icon={Activity}
            color="orange"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Projects Area - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-md">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Proiectele Tale
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Management și vizualizare proiecte
                    </p>
                  </div>
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/app/projects/new" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Proiect Nou
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {proposals.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                      <FolderOpen className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Nu ai propuneri încă
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Trimite o cerere de proiect pentru a începe
                    </p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/app/projects/new" className="flex items-center gap-2">
                        <Rocket className="h-4 w-4" />
                        Trimite Cerere Proiect
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {proposals.map((proposal: any) => (
                      <div
                        key={proposal.id}
                        className="group p-4 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <FolderOpen className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {proposal.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {proposal.items?.length || 0} item-uri • Status: {proposal.status}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              proposal.status === 'approved'
                                ? 'bg-green-100 text-green-700 border-green-300'
                                : 'bg-gray-100 text-gray-700 border-gray-300'
                            }>
                              {proposal.status}
                            </Badge>
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Link href={`/app/proposals/${proposal.id}`}>
                                Vezi Propunere
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="space-y-6">
            <QuickActions
              subscriptionInfo={subscriptionInfo}
              projectsCount={proposals.length}
            />

            {/* Recent Activity */}
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-md">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Activitate Recente
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Proiect nou creat
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Acum 2 ore
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Propunere aprobată
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Acum 5 ore
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Task completat
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Ieri
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}