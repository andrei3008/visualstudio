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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-float"></div>
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>
            <p className="text-sm text-gray-600">
              Gestionează platforma și monitorizează activitatea
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 transform transition-all duration-300 hover:scale-105">
              <Link href="/app" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Înapoi la App
              </Link>
            </Button>
            <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white transform transition-all duration-300 hover:scale-105">
              <Link href="/app/admin/projects/new" className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                Proiect nou
              </Link>
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">Utilizatori Totali</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{usersCount}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-500" />
                <p className="text-xs text-gray-500">
                  Utilizari înregistrați
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <FolderOpen className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">Proiecte Active</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{projectsCount}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-500" />
                <p className="text-xs text-gray-500">
                  Proiecte active
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">Proposals Trimise</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">{proposalsSubmitted}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <p className="text-xs text-gray-500">
                  În așteptare
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">Proposals Aprobate</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{proposalsApproved}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <p className="text-xs text-gray-500">
                  Pregătite pentru dezvoltare
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg border border-gray-200 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all duration-200 flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Vedere Generală
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all duration-200 flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4" />
              Utilizatori
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all duration-200 flex items-center gap-2 text-sm font-medium">
              <FolderOpen className="h-4 w-4" />
              Proiecte
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Recent Activity */}
              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Utilizatori Recenți
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Cei mai noi 5 utilizatori
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">
                              {user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm text-gray-900">{user.email}</span>
                        </div>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="text-xs bg-blue-100 text-blue-700">
                          {user.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Projects */}
              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-green-600" />
                    Proiecte Recente
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Cele mai noi 5 proiecte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects.slice(0, 5).map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">{p.name}</div>
                          <div className="text-xs text-gray-500">{p.user.email}</div>
                        </div>
                        <Badge variant={String(p.status) === 'active' ? 'default' : 'secondary'} className="text-xs bg-green-100 text-green-700">
                          {String(p.status)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Proposals */}
              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Proposals Recente
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Cele mai noi 5 propuneri
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {proposals.slice(0, 5).map((p) => {
                      const total = p.items.reduce((s, it) => s + it.qty * it.unitPriceCents, 0)
                      return (
                        <div key={p.id} className="py-3 border-b border-gray-100 last:border-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm text-gray-900">{p.title}</span>
                            <Badge variant={p.status === 'approved' ? 'default' : 'secondary'} className="text-xs bg-green-100 text-green-700">
                              {p.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{p.project.name}</span>
                            <span className="font-semibold text-gray-900">{(total/100).toFixed(2)} EUR</span>
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
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Utilizatori
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Toți utilizatorii înregistrați ({usersCount})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Rol</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Data Înregistrării</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xs font-medium text-blue-600">
                                  {user.email.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="text-gray-900">{user.email}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className={user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-500">
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
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-green-600" />
                  Proiecte
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Toate proiectele create ({projectsCount})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((p) => (
                    <Card key={p.id} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-xl p-5 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base text-gray-900">{p.name}</CardTitle>
                          <Badge variant={String(p.status) === 'active' ? 'default' : 'secondary'} className={String(p.status) === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {String(p.status)}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs text-gray-500">
                          Client: {p.user.email}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="text-xs text-gray-500">
                            {new Date(p.createdAt).toLocaleDateString('ro-RO')}
                          </div>
                          <Button asChild variant="outline" size="sm" className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 transform transition-all duration-300 hover:scale-105">
                            <Link href={`/app/admin/projects/${p.id}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
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