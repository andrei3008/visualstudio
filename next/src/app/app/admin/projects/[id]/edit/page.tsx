import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Save,
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
  Activity,
  User,
  Edit,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import AdminLayout from '../../../components/AdminLayout'
import ProjectOverview from '../components/ProjectOverview'

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
  { id: 'edit', label: 'Edit', icon: Edit },
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

export default async function EditProjectPage({ params, searchParams }: PageProps) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white border-0'
      case 'done':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0'
      case 'request':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0'
      case 'proposal_review':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0'
      case 'estimation':
        return 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0'
      case 'estimation_review':
        return 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0'
      case 'approved':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white border-0'
      case 'scoping':
        return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0'
      case 'review':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0'
      case 'rejected':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-0'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <BarChart3 className="h-3 w-3" />
      case 'done':
        return <CheckCircle className="h-3 w-3" />
      case 'request':
        return <Clock className="h-3 w-3" />
      case 'proposal_review':
        return <AlertTriangle className="h-3 w-3" />
      case 'estimation':
        return <Target className="h-3 w-3" />
      case 'estimation_review':
        return <AlertTriangle className="h-3 w-3" />
      case 'approved':
        return <CheckCircle className="h-3 w-3" />
      case 'scoping':
        return <AlertTriangle className="h-3 w-3" />
      case 'review':
        return <AlertTriangle className="h-3 w-3" />
      case 'rejected':
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <AlertTriangle className="h-3 w-3" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_progress': return 'În Dezvoltare'
      case 'done': return 'Finalizat'
      case 'request': return 'Request'
      case 'proposal_review': return 'În Revizuire Propunere'
      case 'estimation': return 'Estimare'
      case 'estimation_review': return 'Revizuire Estimare'
      case 'approved': return 'Aprobat'
      case 'scoping': return 'Scoping'
      case 'review': return 'În Revizuire'
      case 'rejected': return 'Respins'
      default: return status
    }
  }

  return (
    <AdminLayout
      title={`Editare Proiect: ${project.name}`}
      subtitle={`Management complet pentru ${project.name}`}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/app/admin/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi la Proiecte
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
                <Badge className={`mb-2 ${getStatusColor(project.status)}`}>
                  {getStatusIcon(project.status)}
                  <span className="ml-1">{getStatusLabel(project.status)}</span>
                </Badge>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Creat: {new Date(project.createdAt).toLocaleDateString('ro-RO')}
                </div>
              </div>
            </div>

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
                    <Link href={`/app/admin/projects/${project.id}/edit?tab=${tab.id}`} className="flex items-center gap-2 w-full">
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

          <TabsContent value="edit" className="mt-0">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Project Info Card */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Informații Proiect
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <FolderOpen className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {project.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <User className="h-4 w-4" />
                        <span>{project.user.name || project.user.email}</span>
                      </div>
                      <Badge className={`w-fit mx-auto text-xs ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1">{getStatusLabel(project.status)}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {project._count.proposals}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Propuneri</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {project._count.tasks}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Task-uri</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {project._count.milestones}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Milestone</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {project._count.messages}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Mesaje</div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Creat la
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(project.createdAt).toLocaleDateString('ro-RO')}
                      </div>
                    </div>

                    {project.budget && (
                      <div className="pt-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Buget
                        </div>
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">
                          {new Intl.NumberFormat('ro-RO', {
                            style: 'currency',
                            currency: 'RON'
                          }).format(project.budget)}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Edit Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit className="h-5 w-5 text-green-600 dark:text-green-400" />
                      Editare Detalii
                    </CardTitle>
                    <CardDescription>
                      Modifică informațiile și setările proiectului
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          <FolderOpen className="h-5 w-5 text-gray-500" />
                          Informații de Bază
                        </h3>

                        <div className="space-y-2">
                          <Label htmlFor="name">Nume Proiect</Label>
                          <Input
                            id="name"
                            defaultValue={project.name}
                            placeholder="Introdu numele proiectului"
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Descriere</Label>
                          <Textarea
                            id="description"
                            defaultValue={project.description || ''}
                            placeholder="Introdu descrierea proiectului"
                            rows={4}
                            className="resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select defaultValue={project.status}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Selectează statusul" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="request">Request</SelectItem>
                                <SelectItem value="proposal_review">Revizuire Propunere</SelectItem>
                                <SelectItem value="estimation">Estimare</SelectItem>
                                <SelectItem value="estimation_review">Revizuire Estimare</SelectItem>
                                <SelectItem value="approved">Aprobat</SelectItem>
                                <SelectItem value="in_progress">În Dezvoltare</SelectItem>
                                <SelectItem value="scoping">Scoping</SelectItem>
                                <SelectItem value="review">În Revizuire</SelectItem>
                                <SelectItem value="done">Finalizat</SelectItem>
                                <SelectItem value="rejected">Respins</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="budget">Buget (RON)</Label>
                            <Input
                              id="budget"
                              type="number"
                              step="0.01"
                              defaultValue={project.budget?.toString() || ''}
                              placeholder="Introdu bugetul"
                              className="h-12"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="startDate">Data Start</Label>
                            <Input
                              id="startDate"
                              type="date"
                              className="h-12"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="deadline">Deadline</Label>
                            <Input
                              id="deadline"
                              type="date"
                              defaultValue={project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : ''}
                              className="h-12"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Ultima modificare: {new Date(project.updatedAt).toLocaleDateString('ro-RO')}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" asChild>
                            <Link href="/app/admin/projects">
                              Anulează
                            </Link>
                          </Button>
                          <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                            <Save className="h-4 w-4 mr-2" />
                            Salvează Modificările
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="mt-0">
            <TasksTabContent projectId={project.id} />
          </TabsContent>

          {/* Other tabs - placeholders for now */}
          {projectTabs.filter(tab => tab.id !== 'overview' && tab.id !== 'edit' && tab.id !== 'tasks').map((tab) => (
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