import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  CheckSquare,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  User,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  FolderOpen,
  Timer,
  TrendingUp,
  Target,
  Zap,
  Star,
  Flag,
  PlayCircle,
  PauseCircle,
  BarChart3
} from 'lucide-react'
import AdminLayout from '../components/AdminLayout'

interface PageProps {
  searchParams: {
    page?: string
    limit?: string
    search?: string
    status?: string
    priority?: string
    assignee?: string
    project?: string
    dueDate?: string
  }
}

interface Task {
  id: string
  title: string
  description?: string
  status: 'backlog' | 'in_progress' | 'development' | 'testing' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignee?: {
    id: string
    name: string
    email: string
    role: string
  }
  project?: {
    id: string
    name: string
    status: string
    user: {
      id: string
      name: string
      email: string
    }
  }
  dueAt?: Date
  estimateH?: number
  actualH?: number
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const statusConfig = {
  backlog: { label: 'Backlog', color: 'bg-gray-500', icon: Clock },
  in_progress: { label: 'În Progres', color: 'bg-blue-500', icon: PlayCircle },
  development: { label: 'Dezvoltare', color: 'bg-purple-500', icon: Zap },
  testing: { label: 'Testare', color: 'bg-orange-500', icon: Target },
  review: { label: 'Revizuire', color: 'bg-indigo-500', icon: Eye },
  done: { label: 'Finalizat', color: 'bg-green-500', icon: CheckCircle }
}

const priorityConfig = {
  low: { label: 'Scăzut', color: 'bg-gray-400', icon: ArrowDownRight },
  medium: { label: 'Mediu', color: 'bg-blue-400', icon: ArrowUpRight },
  high: { label: 'Ridicat', color: 'bg-orange-400', icon: ArrowUpRight },
  critical: { label: 'Critic', color: 'bg-red-500', icon: Flag }
}

export default async function AdminSalesTasksPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const u = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true }
  })
  if (u?.role !== 'admin') redirect('/app')

  // Parse pagination and filter parameters
  const currentPage = parseInt(searchParams.page || '1')
  const limit = parseInt(searchParams.limit || '25')
  const search = searchParams.search || ''
  const status = searchParams.status || ''
  const priority = searchParams.priority || ''
  const assignee = searchParams.assignee || ''
  const project = searchParams.project || ''
  const dueDate = searchParams.dueDate || ''

  // Calculate pagination
  const skip = (currentPage - 1) * limit

  // Build where clause for filtering
  const whereClause: any = {}

  if (search) {
    whereClause.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { project: { name: { contains: search, mode: 'insensitive' } } },
      { assignee: { name: { contains: search, mode: 'insensitive' } } },
      { assignee: { email: { contains: search, mode: 'insensitive' } } }
    ]
  }

  if (status && status !== 'all') {
    whereClause.status = status
  }

  if (priority && priority !== 'all') {
    whereClause.priority = priority
  }

  if (assignee && assignee !== 'all') {
    whereClause.assigneeId = assignee
  }

  if (project && project !== 'all') {
    whereClause.projectId = project
  }

  if (dueDate && dueDate !== 'all') {
    const today = new Date()
    switch (dueDate) {
      case 'overdue':
        whereClause.dueAt = { lt: today }
        whereClause.status = { not: 'done' }
        break
      case 'today':
        whereClause.dueAt = {
          gte: new Date(today.setHours(0, 0, 0, 0)),
          lt: new Date(today.setHours(23, 59, 59, 999))
        }
        break
      case 'week':
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
        whereClause.dueAt = {
          gte: today,
          lte: weekFromNow
        }
        break
      case 'month':
        const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
        whereClause.dueAt = {
          gte: today,
          lte: monthFromNow
        }
        break
    }
  }

  // Fetch tasks with pagination and filtering
  const [tasks, totalCount] = await Promise.all([
    prisma.task.findMany({
      where: whereClause,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { dueAt: 'asc' },
        { createdAt: 'desc' }
      ],
      skip,
      take: limit
    }),
    prisma.task.count({ where: whereClause })
  ])

  const totalPages = Math.ceil(totalCount / limit)

  // Calculate statistics
  const now = new Date()
  const [totalTasks, backlogTasks, inProgressTasks, doneTasks, overdueTasks, criticalTasks] = await Promise.all([
    prisma.task.count({ where: whereClause }),
    prisma.task.count({ where: { ...whereClause, status: 'backlog' } }),
    prisma.task.count({ where: { ...whereClause, status: 'in_progress' } }),
    prisma.task.count({ where: { ...whereClause, status: 'done' } }),
    prisma.task.count({
      where: {
        ...whereClause,
        dueAt: { lt: now },
        status: { not: 'done' }
      }
    }),
    prisma.task.count({ where: { ...whereClause, priority: 'critical' } })
  ])

  // Fetch users and projects for filters
  const [users, projects] = await Promise.all([
    prisma.user.findMany({
      where: { role: { in: ['staff', 'admin'] } },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        _count: {
          select: {
            assignedTasks: {
              where: { status: { not: 'done' } }
            }
          }
        }
      },
      orderBy: { name: 'asc' }
    }),
    prisma.project.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            tasks: {
              where: { status: { not: 'done' } }
            }
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })
  ])

  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

  return (
    <AdminLayout
      title="Task-uri Vânzări"
      subtitle="Management complet al task-urilor pentru procesele de vânzări"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportă
          </Button>
          <Button size="sm" asChild>
            <Link href="/app/admin/sales/tasks/create">
              <Plus className="h-4 w-4 mr-2" />
              Task Nou
            </Link>
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 mb-8">
        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{totalTasks}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Task-uri Totale</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {doneTasks} finalizate ({completionRate}%)
              </p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-gray-600 dark:text-gray-400">{backlogTasks}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Backlog</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">În așteptare</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                <PlayCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{inProgressTasks}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">În Progres</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Active</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{doneTasks}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Finalizate</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">Complete</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-red-400 to-red-500 rounded-xl shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-red-600 dark:text-red-400">{overdueTasks}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Restante</p>
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">Depășite</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl shadow-lg">
                <Flag className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{criticalTasks}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Critice</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Prioritate maximă</p>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6 border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardContent className="p-6">
          <form className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                name="search"
                placeholder="Caută task-uri după titlu, descriere, assignee..."
                className="pl-10 h-12 border-gray-200 dark:border-gray-700"
                defaultValue={search}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select name="status" defaultValue={status}>
                <SelectTrigger className="h-12 w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate Statusurile</SelectItem>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="priority" defaultValue={priority}>
                <SelectTrigger className="h-12 w-36">
                  <SelectValue placeholder="Prioritate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate Prioritățile</SelectItem>
                  {Object.entries(priorityConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="assignee" defaultValue={assignee}>
                <SelectTrigger className="h-12 w-44">
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toți Assignee-ii</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name || user.email} ({user._count.assignedTasks})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="project" defaultValue={project}>
                <SelectTrigger className="h-12 w-48">
                  <SelectValue placeholder="Proiect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate Proiectele</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name} ({project._count.tasks})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="dueDate" defaultValue={dueDate}>
                <SelectTrigger className="h-12 w-36">
                  <SelectValue placeholder="Due Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate Datele</SelectItem>
                  <SelectItem value="overdue">Restante</SelectItem>
                  <SelectItem value="today">Astăzi</SelectItem>
                  <SelectItem value="week">Săptămâna</SelectItem>
                  <SelectItem value="month">Luna</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="h-12">
                <Filter className="h-4 w-4 mr-2" />
                Filtrează
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results and Pagination Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Afișare <span className="font-medium">{Math.min(skip + 1, totalCount)}-{Math.min(skip + limit, totalCount)}</span> din{' '}
          <span className="font-medium">{totalCount}</span> task-uri
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Elemente pe pagină:</span>
          <Select name="limit" defaultValue={limit.toString()}>
            <SelectTrigger className="w-20 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tasks Table */}
      <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Lista Task-uri
          </CardTitle>
          <CardDescription>
            Toate task-urile pentru procesele de vânzări ({totalCount})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Task</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Prioritate</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Assignee</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Proiect</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Client</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Due Date</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Estimare</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const StatusIcon = statusConfig[task.status].icon
                  const statusColor = statusConfig[task.status].color
                  const PriorityIcon = priorityConfig[task.priority].icon
                  const priorityColor = priorityConfig[task.priority].color
                  const isOverdue = task.dueAt && task.dueAt < new Date() && task.status !== 'done'

                  return (
                    <tr key={task.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-150">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {task.title}
                          </div>
                          {task.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                              {task.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${statusColor} text-white border-0`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[task.status].label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${priorityColor} text-white border-0`}>
                          <PriorityIcon className="h-3 w-3 mr-1" />
                          {priorityConfig[task.priority].label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        {task.assignee ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {task.assignee.name?.charAt(0).toUpperCase() || task.assignee.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {task.assignee.name || 'N/A'}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {task.assignee.role}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">Neasignat</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {task.project ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {task.project.name}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {task.project.status}
                            </Badge>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">Fără proiect</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {task.project?.user ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {task.project.user.name?.charAt(0).toUpperCase() || task.project.user.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {task.project.user.name || 'N/A'}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {task.project.user.email}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className={`text-sm ${isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                          {task.dueAt ? task.dueAt.toLocaleDateString('ro-RO', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {task.estimateH ? `${task.estimateH}h` : 'N/A'}
                          {task.actualH && (
                            <span className="text-xs text-blue-600 dark:text-blue-400 ml-1">
                              ({task.actualH}h real)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/sales/tasks/${task.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/sales/tasks/${task.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            asChild
                          >
                            <Link href={`/app/admin/sales/tasks/${task.id}/delete`}>
                              <Trash2 className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}