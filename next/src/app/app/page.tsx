export const metadata = { title: 'Dashboard' }

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { findUserByEmail } from '@/lib/users'
import { listProjectsByUserId } from '@/lib/projects'
import NewProjectForm from '@/components/NewProjectForm'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { Users, FolderOpen, CheckCircle, Clock, Sparkles, Rocket, TrendingUp, BarChart3, Zap } from 'lucide-react'

export default async function AppDashboard() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const user = await findUserByEmail(session.user.email)
  if (!user) redirect('/login')
  const [projects, submittedCount, approvedCount, openTasks] = await Promise.all([
    listProjectsByUserId(user.id),
    prisma.proposal.count({ where: { project: { userId: user.id }, status: 'submitted' } }),
    prisma.proposal.count({ where: { project: { userId: user.id }, status: 'approved' } }),
    prisma.task.count({ where: { project: { userId: user.id }, NOT: { status: 'done' } } }),
  ])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-50">
      {/* Animated Header */}
      <div className="relative overflow-hidden bg-blue-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <h1 className="text-3xl font-bold text-white">
                  Bun venit, {session.user.name || session.user.email}!
                </h1>
              </div>
              <p className="text-blue-100">
                Managează-ți proiectele cu AI-powered insights
              </p>
            </div>
            <div className="flex items-center gap-3 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <Button size="sm" variant="default" className="bg-white text-blue-600 hover:bg-gray-100 transform transition-all duration-300 hover:scale-105">
                <Link href="/app/projects/new" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Nou Proiect
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FolderOpen className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">Proiecte Active</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{projects.length}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <p className="text-xs text-gray-500">
                  {projects.length > 0 ? "Active în acest moment" : "Nu ai proiecte active"}
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
              <div className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{approvedCount}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-500" />
                <p className="text-xs text-gray-500">
                  Pregătite pentru dezvoltare
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
                <CardTitle className="text-sm font-medium text-gray-600">Proposals în Așteptare</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">{submittedCount}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-yellow-500" />
                <p className="text-xs text-gray-500">
                  În revizuire
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Zap className="h-5 w-5 text-orange-600" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">Task-uri Active</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{openTasks}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-500" />
                <p className="text-xs text-gray-500">
                  În lucru
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <Card className="border-0 bg-white shadow-xl group hover:shadow-2xl transition-all duration-500">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-gray-900">Proiectele Mele</h3>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                    {projects.length} Proiecte
                  </Badge>
                </div>
                <p className="text-gray-600 mt-1">
                  Gestionează-ți proiectele cu AI insights
                </p>
              </div>
              <Button size="sm" variant="outline" className="border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transform transition-all duration-300 hover:scale-105">
                <Link href="/app/projects/new">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Adaugă Proiect
                  </span>
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 animate-pulse-slow">
                  <FolderOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nu ai proiecte încă</h3>
                <p className="text-gray-600 mb-6">
                  Începe prin a-ți adăuga primul proiect și începe să lucrezi
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white transform transition-all duration-300 hover:scale-105">
                  <Link href="/app/projects/new">
                    <span className="flex items-center gap-2">
                      <Rocket className="h-4 w-4" />
                      Creează Primul Proiect
                    </span>
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((p: any, index) => (
                  <Card key={p.id} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white shadow-lg overflow-hidden">
                    <div className="h-1 bg-blue-500"></div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{p.name}</h4>
                          <p className="text-xs text-gray-500">
                            Creat la: {new Date(p.createdAt).toLocaleDateString('ro-RO')}
                          </p>
                        </div>
                        <Badge className={String(p.status) === 'active' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-gray-100 text-gray-700 border-gray-300'}>
                          {String(p.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {p.tasks?.length || 0} task-uri
                          </span>
                        </div>
                        <Button asChild variant="outline" size="sm" className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 transform transition-all duration-300 hover:scale-105">
                          <Link href={`/app/projects/${p.id}`} className="flex items-center gap-1">
                            Deschide
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}