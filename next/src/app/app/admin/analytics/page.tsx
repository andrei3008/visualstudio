import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  TrendingUp,
  Users,
  FolderOpen,
  FileText,
  DollarSign,
  Calendar,
  Download,
  Filter,
  Eye,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  Zap,
  Clock
} from 'lucide-react'
import AdminLayout from '../components/AdminLayout'

export default async function AdminAnalyticsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
  if (u?.role !== 'admin') redirect('/app')

  // Get data for analytics
  const [
    totalUsers,
    totalProjects,
    totalProposals,
    recentUsers,
    activeProjects,
    completedProjects,
    pendingProposals,
    approvedProposals,
    messagesThisMonth,
    projectsThisMonth,
    proposalsThisMonth
  ] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.proposal.count(),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    }),
    prisma.project.count({ where: { status: 'in_progress' } }),
    prisma.project.count({ where: { status: 'done' } }),
    prisma.proposal.count({ where: { status: 'submitted' } }),
    prisma.proposal.count({ where: { status: 'approved' } }),
    prisma.message.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    }),
    prisma.project.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    }),
    prisma.proposal.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    })
  ])

  // Get recent activity
  const recentActivity = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  })

  return (
    <AdminLayout
      title="Analitice și Statistici"
      subtitle="Indicatori performanță și statistici platformă"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrare Date
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportă Raport
          </Button>
        </div>
      }
    >
      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{totalUsers}</div>
                <div className="flex items-center text-green-500 text-sm">
                  <ArrowUp className="h-3 w-3" />
                  <span className="font-medium">+{recentUsers}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Utilizatori Totali</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">+{recentUsers} ultimele 30 zile</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <FolderOpen className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-black text-green-600 dark:text-green-400">{totalProjects}</div>
                <div className="flex items-center text-green-500 text-sm">
                  <ArrowUp className="h-3 w-3" />
                  <span className="font-medium">+{projectsThisMonth}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Proiecte Totale</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">{activeProjects} active, {completedProjects} finalizate</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{totalProposals}</div>
                <div className="flex items-center text-green-500 text-sm">
                  <ArrowUp className="h-3 w-3" />
                  <span className="font-medium">+{proposalsThisMonth}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Propuneri Totale</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{approvedProposals} aprobate, {pendingProposals} în așteptare</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-orange-600 dark:text-orange-400">{messagesThisMonth}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Mesaje Luna Aceasta</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Activitate comunicare</p>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Charts and Detailed Stats */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Project Status Distribution */}
        <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Distribuție Status Proiecte
            </CardTitle>
            <CardDescription>
              Repartiția proiectelor după status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{activeProjects}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {totalProjects > 0 ? Math.round((activeProjects / totalProjects) * 100) : 0}%
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${totalProjects > 0 ? (activeProjects / totalProjects) * 100 : 0}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Finalizate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{completedProjects}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0}%
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proposal Status Distribution */}
        <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Distribuție Status Propuneri
            </CardTitle>
            <CardDescription>
              Repartiția propunerilor după status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Aprobate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{approvedProposals}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {totalProposals > 0 ? Math.round((approvedProposals / totalProposals) * 100) : 0}%
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${totalProposals > 0 ? (approvedProposals / totalProposals) * 100 : 0}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">În Așteptare</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{pendingProposals}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {totalProposals > 0 ? Math.round((pendingProposals / totalProposals) * 100) : 0}%
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${totalProposals > 0 ? (pendingProposals / totalProposals) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Rata de Succes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
              {totalProposals > 0 ? Math.round((approvedProposals / totalProposals) * 100) : 0}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Propuneri aprobate din totale
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
              Activitate Lunară
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-green-600 dark:text-green-400 mb-2">
              {projectsThisMonth + proposalsThisMonth}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Proiecte + propuneri noi
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Timp Mediu Răspuns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">
              24h
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Timp mediu de procesare
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            Activitate Recentă
          </CardTitle>
          <CardDescription>
            Ultimele proiecte create în platformă
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FolderOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{project.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {project.user.name || project.user.email}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                    {String(project.status)}
                  </Badge>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(project.createdAt).toLocaleDateString('ro-RO')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}