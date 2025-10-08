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

export default async function AdminHome() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
  if (u?.role !== 'admin') redirect('/app')

  const [users, projects, proposals, usersCount, projectsCount, proposalsSubmitted, proposalsApproved, messages7d] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' }, take: 20, include: { user: true } }),
    prisma.proposal.findMany({ orderBy: { createdAt: 'desc' }, take: 20, include: { project: true, items: true } }),
    prisma.user.count(),
    prisma.project.count(),
    prisma.proposal.count({ where: { status: 'submitted' } }),
    prisma.proposal.count({ where: { status: 'approved' } }),
    prisma.message.count({ where: { createdAt: { gte: new Date(Date.now() - 7*24*60*60*1000) } } }),
  ])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-50 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-800 dark:to-slate-800">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange-400/10 dark:bg-orange-600/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 dark:bg-green-600/3 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-green-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-400 dark:to-green-400">
                Admin Panel
              </h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gestionează platforma și monitorizează activitatea
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-slate-700 transform transition-all duration-300 hover:scale-105">
              <Link href="/app" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Înapoi la App
              </Link>
            </Button>
            <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 transform transition-all duration-300 hover:scale-105">
              <Link href="/app/admin/projects/new" className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                Proiect nou
              </Link>
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Utilizatori Totali</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{usersCount}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-500 dark:text-green-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Utilizari înregistrați
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                  <FolderOpen className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Proiecte Active</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{projectsCount}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Proiecte active
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
                  <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Proposals Trimise</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{proposalsSubmitted}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  În așteptare
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Proposals Aprobate</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{proposalsApproved}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500 dark:text-green-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Pregătite pentru dezvoltare
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-slate-700 p-1 rounded-lg border border-gray-200 dark:border-slate-700 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:dark:bg-slate-800 data-[state=active]:shadow-sm rounded-md transition-all duration-200 flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Vedere Generală
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-900 data-[state=active]:shadow-sm rounded-md transition-all duration-200 flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4" />
              Utilizatori
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-900 data-[state=active]:shadow-sm rounded-md transition-all duration-200 flex items-center gap-2 text-sm font-medium">
              <FolderOpen className="h-4 w-4" />
              Proiecte
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Recent Activity */}
              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Utilizatori Recenți
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Cei mai noi 5 utilizatori
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-slate-700 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-300">
                              {user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm text-gray-900 dark:text-white">{user.email}</span>
                        </div>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          {user.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Projects */}
              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Proiecte Recente
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Cele mai noi 5 proiecte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects.slice(0, 5).map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900 dark:text-white">{p.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{p.user.email}</div>
                        </div>
                        <Badge variant={String(p.status) === 'active' ? 'default' : 'secondary'} className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          {String(p.status)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Proposals */}
              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Proposals Recente
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Cele mai noi 5 propuneri
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {proposals.slice(0, 5).map((p) => {
                      const total = p.items.reduce((s, it) => s + it.qty * it.unitPriceCents, 0)
                      return (
                        <div key={p.id} className="py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm text-gray-900 dark:text-white">{p.title}</span>
                            <Badge variant={p.status === 'approved' ? 'default' : 'secondary'} className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                              {p.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{p.project.name}</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{(total/100).toFixed(2)} EUR</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Utilizatori
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Toți utilizatorii înregistrați ({usersCount})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Rol</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Data Înregistrării</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-50 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-150">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <span className="text-xs font-medium text-blue-600 dark:text-blue-300">
                                  {user.email.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="text-gray-900 dark:text-white">{user.email}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className={user.role === 'admin' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300'}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
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

          <TabsContent value="projects">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Proiecte
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Toate proiectele create ({projectsCount})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((p) => (
                    <Card key={p.id} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-slate-700 rounded-xl p-5 hover:-translate-y-1 dark:bg-slate-700">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base text-gray-900 dark:text-white">{p.name}</CardTitle>
                          <Badge variant={String(p.status) === 'active' ? 'default' : 'secondary'} className={String(p.status) === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-slate-600 dark:text-gray-300'}>
                            {String(p.status)}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
                          Client: {p.user.email}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(p.createdAt).toLocaleDateString('ro-RO')}
                          </div>
                          <Button asChild variant="outline" size="sm" className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-slate-600 transform transition-all duration-300 hover:scale-105">
                            <Link href={`/app/admin/projects/${p.id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                              Gestionare
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
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
    </main>
  )
}