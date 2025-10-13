import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ArrowLeft,
  FileText,
  CheckSquare,
  Clock,
  Target,
  FolderOpen,
  MessageSquare,
  Calendar,
  DollarSign,
  BarChart3,
  FileText as FileIcon,
  Users,
  Settings,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import AdminLayout from '../../components/AdminLayout'
import ProjectOverview from './components/ProjectOverview'

interface PageProps {
  params: {
    id: string
  }
  searchParams: {
    tab?: string
  }
}

const projectTabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'timesheets', label: 'Timesheets', icon: Clock },
  { id: 'milestones', label: 'Milestones', icon: Target },
  { id: 'files', label: 'Files', icon: FolderOpen },
  { id: 'discussions', label: 'Discussions', icon: MessageSquare },
  { id: 'gantt', label: 'Gantt', icon: Calendar },
  { id: 'tickets', label: 'Tickets', icon: FileText },
  { id: 'contracts', label: 'Contracts', icon: DollarSign },
  { id: 'sales', label: 'Sales', icon: Users },
  { id: 'notes', label: 'Notes', icon: FileIcon },
  { id: 'activity', label: 'Activity', icon: Activity },
]

// Client component for tasks tab
function TasksTabContent({ projectId }: { projectId: string }) {
  return (
    <div>
      <iframe
        src={`/app/admin/projects/${projectId}/tasks`}
        className="w-full h-[800px] border-0"
        title="Project Tasks"
      />
    </div>
  )
}

export default async function AdminProjectPage({ params, searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true }
  })
  if (currentUser?.role !== 'admin') redirect('/app')

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      _count: {
        select: {
          tasks: true,
          milestones: true,
          messages: true,
          files: true,
          proposals: true
        }
      }
    }
  })

  if (!project) {
    notFound()
  }

  const activeTab = searchParams.tab || 'overview'

  return (
    <AdminLayout
      title={`Proiect: ${project.name}`}
      subtitle={`Management complet pentru ${project.name}`}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/app/admin/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi la Proiecte
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/app/admin/projects/${project.id}/edit`}>
              <Settings className="h-4 w-4 mr-2" />
              Editează Proiect
            </Link>
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Project Header */}
        <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Client:</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {project.user.name || project.user.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`mb-2 ${
                  project.status === 'in_progress' ? 'bg-green-100 text-green-700' :
                  project.status === 'done' ? 'bg-blue-100 text-blue-700' :
                  project.status === 'request' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {project.status === 'in_progress' ? 'În Progres' :
                   project.status === 'done' ? 'Finalizat' :
                   project.status === 'request' ? 'Request' :
                   project.status}
                </Badge>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Creat: {new Date(project.createdAt).toLocaleDateString('ro-RO')}
                </div>
              </div>
            </div>

            {project.description && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{project._count.tasks}</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Task-uri</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{project._count.milestones}</div>
                <div className="text-xs text-green-600 dark:text-green-400">Milestones</div>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{project._count.messages}</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">Mesaje</div>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{project._count.files}</div>
                <div className="text-xs text-orange-600 dark:text-orange-400">Fișiere</div>
              </div>
              <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{project._count.proposals}</div>
                <div className="text-xs text-pink-600 dark:text-pink-400">Propuneri</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">0%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Progres</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} className="space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 bg-transparent h-auto p-0 overflow-x-auto">
              {projectTabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="relative data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-gray-600 dark:text-gray-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 justify-start px-3 py-3 h-12 rounded-none border-b-2 border-transparent min-w-fit"
                  >
                    <Link href={`/app/admin/projects/${project.id}?tab=${tab.id}`} className="flex items-center gap-2 w-full">
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="hidden sm:inline text-xs whitespace-nowrap">{tab.label}</span>
                    </Link>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value="overview" className="mt-0">
            <ProjectOverview project={project} />
          </TabsContent>

          <TabsContent value="tasks" className="mt-0">
            <TasksTabContent projectId={project.id} />
          </TabsContent>

          {/* Other tabs - placeholders for now */}
          {projectTabs.filter(tab => tab.id !== 'overview' && tab.id !== 'tasks').map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <Card>
                <CardContent className="p-8 text-center">
                  <tab.icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{tab.label}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Această secțiune este în dezvoltare. Va fi disponibilă curând.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  )
}