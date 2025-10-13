import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FolderOpen, FileText, CheckCircle, AlertTriangle, Clock, TrendingUp, ArrowRight, Shield, BarChart3, Sparkles } from 'lucide-react'
import AdminLayout from './components/AdminLayout'

export default async function AdminHome() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
  if (u?.role !== 'admin') redirect('/app')

  const [users, projects, proposals, usersCount, projectsCount, proposalsSubmitted, proposalsApproved, messages7d] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
    prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        user: true,
        _count: {
          select: {
            proposals: true,
            tasks: true,
            milestones: true,
            messages: true
          }
        }
      }
    }),
    prisma.proposal.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        project: {
          include: {
            user: {
              select: {
                email: true,
                name: true
              }
            }
          }
        },
        items: true
      }
    }),
    prisma.user.count(),
    prisma.project.count(),
    prisma.proposal.count({ where: { status: 'submitted' } }),
    prisma.proposal.count({ where: { status: 'approved' } }),
    prisma.message.count({ where: { createdAt: { gte: new Date(Date.now() - 7*24*60*60*1000) } } }),
  ])

  return (
    <AdminLayout title="Admin Panel" subtitle="Management complet platformă">
      <div className="w-full space-y-8">
        {/* KPI Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-slate-50/80 to-white dark:from-zinc-800/80 dark:to-zinc-900 shadow-xl backdrop-blur-sm hover:backdrop-blur-md">
            <div className="relative z-10 p-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <div className="flex items-center gap-6">
                  <div className="p-5 bg-gradient-to-br from-slate-100/80 to-slate-200/60 dark:from-zinc-700/80 dark:to-zinc-800/60 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Users className="h-7 w-7 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-base font-bold text-gray-700 dark:text-gray-300">Utilizatori Totali</CardTitle>
                    <div className="text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{usersCount}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400/90 to-emerald-500/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Utilizatori înregistrați
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Sistem activ</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-emerald-50/80 to-white dark:from-zinc-800/80 dark:to-emerald-900/20 shadow-xl backdrop-blur-sm hover:backdrop-blur-md">
            <div className="relative z-10 p-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <div className="flex items-center gap-6">
                  <div className="p-5 bg-gradient-to-br from-emerald-400/90 to-emerald-500/80 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <FolderOpen className="h-7 w-7 text-white" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-base font-bold text-gray-700 dark:text-gray-300">Proiecte Active</CardTitle>
                    <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">{projectsCount}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400/90 to-blue-500/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Proiecte în dezvoltare
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Productivitate ridicată</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-amber-50/80 to-white dark:from-zinc-800/80 dark:to-amber-900/20 shadow-xl backdrop-blur-sm hover:backdrop-blur-md">
            <div className="relative z-10 p-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <div className="flex items-center gap-6">
                  <div className="p-5 bg-gradient-to-br from-amber-400/90 to-orange-500/80 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-base font-bold text-gray-700 dark:text-gray-300">Propuneri Trimise</CardTitle>
                    <div className="text-4xl font-black bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-300 bg-clip-text text-transparent">{proposalsSubmitted}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400/90 to-orange-500/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Propuneri în așteptare
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Necesită atenție</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-emerald-50/80 to-white dark:from-zinc-800/80 dark:to-emerald-900/20 shadow-xl backdrop-blur-sm hover:backdrop-blur-md">
            <div className="relative z-10 p-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <div className="flex items-center gap-6">
                  <div className="p-5 bg-gradient-to-br from-emerald-400/90 to-green-500/80 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <CheckCircle className="h-7 w-7 text-white" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-base font-bold text-gray-700 dark:text-gray-300">Propuneri Aprobate</CardTitle>
                    <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-green-500 dark:from-emerald-400 dark:to-green-300 bg-clip-text text-transparent">{proposalsApproved}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400/90 to-green-500/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Gata de dezvoltare
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Flux optimizat</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full space-y-12">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-zinc-800/80 dark:to-zinc-900/80 p-2 rounded-3xl border border-gray-200/50 dark:border-zinc-700/50 backdrop-blur-md shadow-xl mb-12">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-gray-50 data-[state=active]:dark:from-zinc-800 data-[state=active]:dark:to-zinc-900 data-[state=active]:shadow-xl data-[state=active]:shadow-gray-200/50 dark:data-[state=active]:shadow-zinc-700/50 rounded-2xl transition-all duration-300 flex items-center gap-4 text-sm font-bold py-4 px-6 data-[state=active]:scale-105 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white
                bg-gray-200/80 dark:bg-zinc-700/80 text-gray-500 dark:text-zinc-400
              `}>
                <TrendingUp className="h-3.5 w-3.5" />
              </div>
              Vedere Generală
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-gray-50 data-[state=active]:dark:from-zinc-800 data-[state=active]:dark:to-zinc-900 data-[state=active]:shadow-xl data-[state=active]:shadow-gray-200/50 dark:data-[state=active]:shadow-zinc-700/50 rounded-2xl transition-all duration-300 flex items-center gap-4 text-sm font-bold py-4 px-6 data-[state=active]:scale-105 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white
                bg-gray-200/80 dark:bg-zinc-700/80 text-gray-500 dark:text-zinc-400
              `}>
                <Users className="h-3.5 w-3.5" />
              </div>
              Utilizatori
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-gray-50 data-[state=active]:dark:from-zinc-800 data-[state=active]:dark:to-zinc-900 data-[state=active]:shadow-xl data-[state=active]:shadow-gray-200/50 dark:data-[state=active]:shadow-zinc-700/50 rounded-2xl transition-all duration-300 flex items-center gap-4 text-sm font-bold py-4 px-6 data-[state=active]:scale-105 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white
                bg-gray-200/80 dark:bg-zinc-700/80 text-gray-500 dark:text-zinc-400
              `}>
                <FolderOpen className="h-3.5 w-3.5" />
              </div>
              Proiecte
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Recent Activity */}
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white/80 to-gray-50/60 dark:from-zinc-800/80 dark:to-zinc-900/60 shadow-xl backdrop-blur-sm">
                <CardHeader className="pb-8">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-slate-100/80 to-slate-200/60 dark:from-zinc-700/80 dark:to-zinc-800/60 rounded-2xl shadow-lg">
                      <Users className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                    </div>
                    Utilizatori Recenți
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
                    Cei mai noi 5 utilizatori
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between py-4 px-6 border-b border-gray-100/50 dark:border-zinc-700/50 last:border-0 hover:bg-gray-50/30 dark:hover:bg-zinc-700/30 rounded-xl transition-all duration-200">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center shadow-md">
                            <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300">
                              {user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-base text-gray-900 dark:text-white font-medium">{user.email}</span>
                        </div>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="text-sm bg-zinc-100/80 text-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300 px-3 py-1">
                          {user.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Projects */}
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-emerald-50/60 to-white/60 dark:from-zinc-800/80 dark:to-emerald-900/20 shadow-xl backdrop-blur-sm">
                <CardHeader className="pb-8">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-100/80 to-emerald-200/60 dark:from-emerald-700/80 dark:to-emerald-800/60 rounded-2xl shadow-lg">
                      <FolderOpen className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
                    </div>
                    Proiecte Recente
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
                    Cele mai noi 5 proiecte
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {projects.slice(0, 5).map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-4 px-6 border-b border-gray-100/50 dark:border-zinc-700/50 last:border-0 hover:bg-emerald-50/30 dark:hover:bg-zinc-700/30 rounded-xl transition-all duration-200">
                        <div className="flex-1">
                          <div className="font-semibold text-base text-gray-900 dark:text-white mb-1">{p.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {p.user.email} • {(p.requestDetails as any)?.category || 'N/A'}
                          </div>
                        </div>
                        <Badge variant={String(p.status) === 'active' ? 'default' : 'secondary'} className="text-sm bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/80 dark:text-emerald-300 px-3 py-1">
                          {String(p.status)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Proposals */}
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-amber-50/60 to-white/60 dark:from-zinc-800/80 dark:to-amber-900/20 shadow-xl backdrop-blur-sm">
                <CardHeader className="pb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-amber-100/80 to-amber-200/60 dark:from-amber-700/80 dark:to-amber-800/60 rounded-2xl shadow-lg">
                          <FileText className="h-6 w-6 text-amber-700 dark:text-amber-300" />
                        </div>
                        Propuneri Recente
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
                        Cele mai noi 5 propuneri
                      </CardDescription>
                    </div>
                    <Button asChild variant="outline" size="sm" className="hover:shadow-md transition-all duration-300 px-4 py-2">
                      <Link href="/app/admin/proposals">
                        Vezi Toate
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {proposals.slice(0, 5).map((p) => {
                      const total = p.items.reduce((s, it) => s + it.qty * it.unitPriceCents, 0)

                      const getStatusColor = (status: string) => {
                        switch (status) {
                          case 'draft':
                            return 'bg-gray-100/80 text-gray-700 border-gray-300 dark:bg-gray-900/80 dark:text-gray-300'
                          case 'submitted':
                            return 'bg-blue-100/80 text-blue-700 border-blue-300 dark:bg-blue-900/80 dark:text-blue-300'
                          case 'client_review':
                            return 'bg-amber-100/80 text-amber-700 border-amber-300 dark:bg-amber-900/80 dark:text-amber-300'
                          case 'approved':
                            return 'bg-green-100/80 text-green-700 border-green-300 dark:bg-green-900/80 dark:text-green-300'
                          case 'client_rejected':
                            return 'bg-red-100/80 text-red-700 border-red-300 dark:bg-red-900/80 dark:text-red-300'
                          default:
                            return 'bg-gray-100/80 text-gray-700 border-gray-300 dark:bg-gray-900/80 dark:text-gray-300'
                        }
                      }

                      const getStatusLabel = (status: string) => {
                        switch (status) {
                          case 'draft': return 'Draft'
                          case 'submitted': return 'Trimisă'
                          case 'client_review': return 'În Revizuire'
                          case 'approved': return 'Aprobată'
                          case 'client_rejected': return 'Respinsă'
                          default: return status
                        }
                      }

                      return (
                        <div key={p.id} className="py-4 px-6 border-b border-gray-100/50 dark:border-zinc-700/50 last:border-0 hover:bg-amber-50/30 dark:hover:bg-zinc-700/30 rounded-xl transition-all duration-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-base text-gray-900 dark:text-white">{p.title}</span>
                            <Badge className={`text-sm ${getStatusColor(p.status)} px-3 py-1`}>
                              {getStatusLabel(p.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>{p.project.name} • {p.project.user.email}</span>
                            <span className="font-bold text-gray-900 dark:text-white">
                              {p.items.length > 0 ? new Intl.NumberFormat('ro-RO', {
                                style: 'currency',
                                currency: 'RON'
                              }).format(total/100) : 'Fără preț'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white/80 to-slate-50/60 dark:from-zinc-800/80 dark:to-zinc-900/60 shadow-xl backdrop-blur-sm">
              <CardHeader className="pb-8">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-slate-100/80 to-slate-200/60 dark:from-zinc-700/80 dark:to-zinc-800/60 rounded-2xl shadow-lg">
                    <Users className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                  </div>
                  Utilizatori
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
                  Toți utilizatorii înregistrați ({usersCount})
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200/50 dark:border-zinc-700/50">
                        <th className="text-left py-6 px-6 font-semibold text-gray-700 dark:text-gray-300 text-base">Email</th>
                        <th className="text-left py-6 px-6 font-semibold text-gray-700 dark:text-gray-300 text-base">Rol</th>
                        <th className="text-left py-6 px-6 font-semibold text-gray-700 dark:text-gray-300 text-base">Data Înregistrării</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-50/50 dark:border-zinc-700/50 hover:bg-gray-50/50 dark:hover:bg-zinc-700/50 transition-all duration-200">
                          <td className="py-6 px-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center shadow-md">
                                <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300">
                                  {user.email.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="text-base text-gray-900 dark:text-white font-medium">{user.email}</span>
                            </div>
                          </td>
                          <td className="py-6 px-6">
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className={user.role === 'admin' ? 'bg-zinc-100/80 text-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300 px-4 py-2 text-sm' : 'bg-gray-100/80 text-gray-700 dark:bg-zinc-700/80 dark:text-gray-300 px-4 py-2 text-sm'}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="py-6 px-6 text-gray-500 dark:text-gray-400 text-base">
                            {new Date(user.createdAt).toLocaleDateString('ro-RO')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-emerald-50/60 to-white/60 dark:from-zinc-800/80 dark:to-emerald-900/20 shadow-xl backdrop-blur-sm">
              <CardHeader className="pb-8">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-100/80 to-emerald-200/60 dark:from-emerald-700/80 dark:to-emerald-800/60 rounded-2xl shadow-lg">
                    <FolderOpen className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
                  </div>
                  Proiecte
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
                  Toate proiectele create ({projectsCount})
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((p) => (
                    <Card key={p.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white/90 to-gray-50/60 dark:from-zinc-700/80 dark:to-zinc-800/60 rounded-2xl p-6 backdrop-blur-sm hover:backdrop-blur-md shadow-lg">
                      <CardHeader className="pb-6">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">{p.name}</CardTitle>
                          <Badge variant={String(p.status) === 'active' ? 'default' : 'secondary'} className={String(p.status) === 'active' ? 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/80 dark:text-emerald-300 px-4 py-2 text-sm' : 'bg-gray-100/80 text-gray-700 dark:bg-zinc-700/80 dark:text-gray-300 px-4 py-2 text-sm'}>
                            {String(p.status)}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          Client: {p.user.email}
                        </CardDescription>
                        <CardDescription className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          Categoria: <Badge variant="outline" className="text-sm px-3 py-1">
                            {((p.requestDetails as any)?.category || 'N/A')}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {(p.requestDetails as any)?.budget && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 p-3 bg-gray-50/50 dark:bg-zinc-700/50 rounded-xl">
                              <span className="font-medium">Buget:</span> {(p.requestDetails as any).budget}
                            </div>
                          )}
                          {(p.requestDetails as any)?.timeline && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 p-3 bg-gray-50/50 dark:bg-zinc-700/50 rounded-xl">
                              <span className="font-medium">Timeline:</span> {(p.requestDetails as any).timeline}
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-zinc-700/50">
                            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                              {new Date(p.createdAt).toLocaleDateString('ro-RO')}
                            </div>
                            <Button asChild variant="outline" size="sm" className="border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 dark:border-zinc-600 dark:hover:border-emerald-500 dark:hover:bg-zinc-600 transform transition-all duration-300 hover:scale-105 px-4 py-2 shadow-md hover:shadow-lg">
                              <Link href={`/app/admin/projects/${p.id}`} className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center gap-2 font-medium">
                                Gestionare
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}