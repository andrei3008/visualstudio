import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'
import NewTaskForm from '@/components/NewTaskForm'
import NewMilestoneForm from '@/components/NewMilestoneForm'
import TaskRow from '@/components/TaskRow'
import MilestoneRow from '@/components/MilestoneRow'

import NewProposalForm from '@/components/NewProposalForm'
import NewMessageForm from '@/components/NewMessageForm'
import NewFileUploadForm from '@/components/NewFileUploadForm'
import FileDropzone from '@/components/FileDropzone'
import { Suspense } from 'react'
import FilesList from './FilesList'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Metadata } from 'next'
import { CheckCircle, Clock, FileText, MessageSquare, FolderOpen, Calendar, ArrowRight, Sparkles, BarChart3, Target } from 'lucide-react'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const proj = await prisma.project.findUnique({ where: { id: params.id }, select: { name: true } })
  return { title: proj?.name ? `Proiect — ${proj.name}` : 'Proiect' }
}

export default async function ProjectDetailPage({ params, searchParams }: { params: { id: string }; searchParams?: { tab?: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const user = await findUserByEmail(session.user.email)
  if (!user) redirect('/login')
  const project = await prisma.project.findFirst({ where: { id: params.id, userId: user.id } })
  if (!project) redirect('/app')

  const [tasks, milestones, proposals, messages] = await Promise.all([
    prisma.task.findMany({ where: { projectId: project.id }, orderBy: [{ status: 'asc' }, { dueAt: 'asc' }, { createdAt: 'desc' }] }),
    prisma.milestone.findMany({ where: { projectId: project.id }, orderBy: [{ status: 'asc' }, { dueAt: 'asc' }, { createdAt: 'desc' }] }),
    prisma.proposal.findMany({ where: { projectId: project.id }, include: { items: true }, orderBy: { createdAt: 'desc' } }),
    prisma.message.findMany({ where: { projectId: project.id, isInternal: false }, orderBy: { createdAt: 'asc' }, include: { author: { select: { email: true } } } }),
  ])

  const tab = (searchParams?.tab as string) || 'tasks'

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-50 to-zinc-50 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-zinc-400/10 dark:bg-zinc-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-zinc-400/10 dark:bg-zinc-600/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-400/5 dark:bg-zinc-600/3 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-green-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-400 dark:to-green-400">
                  {project.name}
                </h1>
                <Badge variant={String(project.status) === 'active' ? 'default' : 'secondary'} className={String(project.status) === 'active' ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700' : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-zinc-700 dark:text-gray-300 dark:border-zinc-600'}>
                  {String(project.status)}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Creat la: {new Date(project.createdAt).toLocaleDateString('ro-RO')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-gray-300 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-700 transform transition-all duration-300 hover:scale-105">
              <Link href="/app" className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Înapoi la dashboard
              </Link>
            </Button>
            <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 transform transition-all duration-300 hover:scale-105">
              <Link href="/app/projects/new" className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                Proiect nou
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
                  <FolderOpen className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Task-uri</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">{tasks.length}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-green-500 dark:text-green-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {tasks.filter(t => t.status === 'done').length} finalizate
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Milestones</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{milestones.filter(m => m.status === 'done').length}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500 dark:text-green-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  din {milestones.length} total
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-xl">
                  <FileText className="h-5 w-5 text-orange-600 dark:text-orange-300" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Proposals</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{proposals.length}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Propuneri create
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-xl">
                  <MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-300" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Mesaje</CardTitle>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{messages.length}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Comunicări
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={tab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 dark:bg-zinc-700 p-1 rounded-lg border border-gray-200 dark:border-zinc-700 mb-6">
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-800 data-[state=active]:shadow-sm rounded-md transition-all duration-200 flex items-center gap-2 text-sm font-medium"
            >
              <FolderOpen className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="milestones"
              className="data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:shadow-sm rounded-md transition-all duration-200 flex items-center gap-2 text-sm font-medium"
            >
              <CheckCircle className="h-4 w-4" />
              Milestones
            </TabsTrigger>
            <TabsTrigger
              value="proposals"
              className="data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:shadow-sm rounded-md transition-all duration-200 flex items-center gap-2 text-sm font-medium"
            >
              <FileText className="h-4 w-4" />
              Proposals
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:shadow-sm rounded-md transition-all duration-200 flex items-center gap-2 text-sm font-medium"
            >
              <Clock className="h-4 w-4" />
              Fișiere
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:shadow-sm rounded-md transition-all duration-200 flex items-center gap-2 text-sm font-medium"
            >
              <MessageSquare className="h-4 w-4" />
              Mesaje
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Tasks Form */}
              <Card className="lg:col-span-1 group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-900 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    Adaugă Task
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Creează un task nou pentru acest proiect</CardDescription>
                </CardHeader>
                <CardContent>
                  <NewTaskForm projectId={project.id} />
                </CardContent>
              </Card>

              {/* Tasks List */}
              <Card className="lg:col-span-2 group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-900 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Task-uri Active
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {tasks.length} task-uri · {tasks.filter(t => t.status === 'done').length} finalizate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {tasks.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mx-auto h-16 w-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-4 animate-pulse-slow">
                        <FolderOpen className="h-8 w-8 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nu există task-uri încă</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Creează primul task pentru începutul lucrului
                      </p>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 transform transition-all duration-300 hover:scale-105">
                        <Link href="/app/projects/new">
                          <span className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Creează Task
                          </span>
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {tasks.map((t: any) => (
                        <TaskRow
                          key={t.id}
                          projectId={project.id}
                          task={{ id: t.id, title: t.title, status: t.status as any, dueAt: (t.dueAt as any)?.toString() ?? null, estimateH: t.estimateH as any }}
                        />
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Milestones Form */}
              <Card className="lg:col-span-1 group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-900 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Adaugă Milestone
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Creează un milestone pentru a urmări progresul</CardDescription>
                </CardHeader>
                <CardContent>
                  <NewMilestoneForm projectId={project.id} />
                </CardContent>
              </Card>

              {/* Milestones List */}
              <Card className="lg:col-span-2 group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-900 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Milestones
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {milestones.length} milestones · {milestones.filter(m => m.status === 'done').length} finalizate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {milestones.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mx-auto h-16 w-16 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-2xl flex items-center justify-center mb-4 animate-pulse-slow">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nu există milestones încă</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Setează obiective și etape importante
                      </p>
                      <Button asChild className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600 transform transition-all duration-300 hover:scale-105">
                        <Link href="/app/projects/new">
                          <span className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Creează Milestone
                          </span>
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {milestones.map((m: any) => (
                        <MilestoneRow
                          key={m.id}
                          projectId={project.id}
                          item={{ id: m.id, title: m.title, status: m.status as any, dueAt: (m.dueAt as any)?.toString() ?? null }}
                        />
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="mt-6">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  Propuneri
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Gestionează propunerile de proiect și bugete
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <NewProposalForm projectId={project.id} />
                </div>

                {proposals.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto h-16 w-16 bg-orange-100 dark:bg-orange-900 rounded-2xl flex items-center justify-center mb-4 animate-pulse-slow">
                      <FileText className="h-8 w-8 text-orange-600 dark:text-orange-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nu există propuneri încă</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Creează prima propunere pentru proiectul tău
                    </p>
                    <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-700 dark:hover:bg-orange-600 transform transition-all duration-300 hover:scale-105">
                      <Link href="/app/projects/new">
                        <span className="flex items-center gap-2">
                          <ArrowRight className="h-4 w-4" />
                          Creează Propunere
                        </span>
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {proposals.map((p: any) => {
                      const total = p.items.reduce((s: number, it: any) => s + it.qty * it.unitPriceCents, 0)
                      return (
                        <li key={p.id} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-zinc-700 rounded-xl p-5 hover:-translate-y-1 dark:bg-zinc-700">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{p.title}</h4>
                                <Badge variant={p.status === 'approved' ? 'default' : p.status === 'submitted' ? 'secondary' : 'outline'} className={p.status === 'approved' ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700' : p.status === 'submitted' ? 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700' : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-zinc-700 dark:text-gray-300 dark:border-zinc-600'}>
                                  {String(p.status)}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Creat la: {new Date(p.createdAt).toLocaleDateString('ro-RO')}
                              </div>
                            </div>
                            <div className="text-right ml-6">
                              <div className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
                                {(total/100).toFixed(2)} EUR
                              </div>
                              <Button asChild variant="outline" size="sm" className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600 transform transition-all duration-300 hover:scale-105">
                                <Link href={`/app/proposals/${p.id}`} className="flex items-center gap-1">
                                  Deschide
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  Mesaje
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Comunică cu echipa de proiect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mb-6 divide-y divide-gray-100 dark:divide-zinc-700 rounded-lg max-h-96 overflow-y-auto">
                  {messages.length === 0 ? (
                    <li className="py-8 text-center">
                      <div className="h-16 w-16 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                        <MessageSquare className="h-8 w-8 text-orange-600 dark:text-orange-300" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">Nu există mesaje încă.</p>
                    </li>
                  ) : (
                    messages.map((m: any) => (
                      <li key={m.id} className="py-4 px-3 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-150">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-gray-900 dark:text-white">{m.author.email}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(m.createdAt).toLocaleString('ro-RO')}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {m.body}
                        </div>
                      </li>
                    ))
                  )}
                </ul>

                <div className="border-t border-gray-100 dark:border-zinc-700 pt-4">
                  <NewMessageForm projectId={project.id} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="mt-6">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Fișiere
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Încarcă și gestionează fișierele proiectului
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <FileDropzone projectId={project.id} />
                </div>

                <Suspense fallback={<div className="text-center py-8 text-gray-600 dark:text-gray-400">Se încarcă...</div>}>
                  <FilesList projectId={project.id} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}