'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import DashboardLayout from '../components/DashboardLayout'
import { FolderOpen, Plus, Calendar, ArrowRight, CheckCircle, Clock, Activity, FileText, MessageSquare } from 'lucide-react'

interface Project {
  id: string
  name: string
  status: string
  createdAt: string
  _count: {
    tasks: number
    milestones: number
    proposals: number
    messages: number
  }
}

interface ProjectLimit {
  canCreateProject: boolean
  currentProjects: number
  maxProjects: number | null
  subscriptionType: string
}

export default function ProjectsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [projectLimit, setProjectLimit] = useState<ProjectLimit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (status === 'authenticated') {
      fetchProjects()
      fetchProjectLimit()
    }
  }, [status, router])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects || [])
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const fetchProjectLimit = async () => {
    try {
      const response = await fetch('/api/projects/check-limit')
      if (response.ok) {
        const data = await response.json()
        setProjectLimit(data)
      }
    } catch (error) {
      console.error('Error fetching project limit:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700'
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-zinc-700 dark:text-gray-300 dark:border-zinc-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'on_hold':
        return <Clock className="h-4 w-4" />
      default:
        return <FolderOpen className="h-4 w-4" />
    }
  }

  if (status === 'loading' || loading) {
    return (
      <DashboardLayout title="Proiecte" subtitle="Se încarcă proiectele tale...">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Se încarcă...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Proiecte"
      subtitle={
        projectLimit
          ? `${projectLimit.currentProjects} proiect${projectLimit.currentProjects !== 1 ? 'e' : ''} active • Plan: ${projectLimit.subscriptionType}`
          : "Gestionează toate proiectele tale"
      }
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            {projectLimit && !projectLimit.canCreateProject && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  📊 Ai atins limita maximă de proiecte pentru planul tău.
                  <Link href="/pricing" className="text-yellow-900 dark:text-yellow-100 underline ml-1">
                    Fă upgrade acum
                  </Link>
                </p>
              </div>
            )}
          </div>
          <Button
            asChild
            disabled={projectLimit && !projectLimit.canCreateProject || false}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Link href="/app" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Proiect Nou
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-3xl flex items-center justify-center mb-6 animate-pulse-slow">
              <FolderOpen className="h-12 w-12 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Nu există proiecte încă
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Creează primul proiect pentru a începe să gestionezi task-uri, milestone-uri și propuneri.
            </p>
            <Button
              asChild
              size="lg"
              disabled={projectLimit && !projectLimit.canCreateProject || false}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Link href="/app" className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Creează Primul Proiect
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-zinc-800 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getStatusColor(project.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(project.status)}
                        {project.status}
                      </div>
                    </Badge>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {new Date(project.createdAt).toLocaleDateString('ro-RO')}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Proiect activ cu detalii și progres
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {project._count.tasks}
                      </div>
                      <div className="text-xs text-blue-700 dark:text-blue-300">Task-uri</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {project._count.milestones}
                      </div>
                      <div className="text-xs text-green-700 dark:text-green-300">Milestones</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {project._count.proposals}
                      </div>
                      <div className="text-xs text-orange-700 dark:text-orange-300">Propuneri</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {project._count.messages}
                      </div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">Mesaje</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                      <Link href={`/app/projects/${project.id}`} className="flex items-center justify-center gap-2">
                        <FolderOpen className="h-4 w-4" />
                        Vezi Proiect
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="grid grid-cols-3 gap-2">
                      <Button asChild variant="outline" size="sm" className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:border-zinc-600 dark:hover:border-blue-500 dark:hover:bg-zinc-700">
                        <Link href={`/app/projects/${project.id}?tab=tasks`} title="Task-uri">
                          <Activity className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="border-gray-300 hover:border-orange-400 hover:bg-orange-50 dark:border-zinc-600 dark:hover:border-orange-500 dark:hover:bg-zinc-700">
                        <Link href={`/app/projects/${project.id}?tab=proposals`} title="Propuneri">
                          <FileText className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="border-gray-300 hover:border-purple-400 hover:bg-purple-50 dark:border-zinc-600 dark:hover:border-purple-500 dark:hover:bg-zinc-700">
                        <Link href={`/app/projects/${project.id}?tab=messages`} title="Mesaje">
                          <MessageSquare className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}