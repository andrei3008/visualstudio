'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  CheckCircle,
  ListTodo,
  Play,
  Code,
  TestTube,
  Eye,
  Filter
} from 'lucide-react'
import Link from 'next/link'

interface Task {
  id: string
  title: string
  description?: string
  status: string
  priority: string
  assignee?: {
    id: string
    name: string
    email: string
  }
  dueAt?: string
  estimateH?: number
  actualH?: number
  createdAt: string
  updatedAt: string
  completedAt?: string
}

interface Project {
  id: string
  name: string
  description?: string
  status: string
}

const statusColumns = [
  { id: 'backlog', title: 'Backlog', icon: ListTodo, color: 'bg-gray-100 border-gray-200 text-gray-700' },
  { id: 'in_progress', title: 'În Lucru', icon: Play, color: 'bg-blue-100 border-blue-200 text-blue-700' },
  { id: 'development', title: 'Dezvoltare', icon: Code, color: 'bg-purple-100 border-purple-200 text-purple-700' },
  { id: 'testing', title: 'Testare', icon: TestTube, color: 'bg-orange-100 border-orange-200 text-orange-700' },
  { id: 'review', title: 'Review', icon: Eye, color: 'bg-yellow-100 border-yellow-200 text-yellow-700' },
  { id: 'done', title: 'Finalizat', icon: CheckCircle, color: 'bg-green-100 border-green-200 text-green-700' },
]

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
}

const TaskCard = ({ task }: { task: Task }) => {
  const statusConfig = statusColumns.find(col => col.id === task.status)
  const StatusIcon = statusConfig?.icon || ListTodo

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <StatusIcon className="h-4 w-4 text-gray-500" />
          <h4 className="font-medium text-sm text-gray-900">{task.title}</h4>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
            {task.priority === 'low' ? 'Scăzută' :
             task.priority === 'medium' ? 'Medie' :
             task.priority === 'high' ? 'Ridicată' : 'Critică'}
          </Badge>
          {task.estimateH && (
            <span className="text-xs text-gray-500">
              <Clock className="h-3 w-3 inline mr-1" />
              {task.estimateH}h
            </span>
          )}
        </div>

        {task.assignee && (
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-3 w-3 text-blue-600" />
            </div>
            <span className="text-xs text-gray-600">
              {task.assignee.name}
            </span>
          </div>
        )}
      </div>

      {task.dueAt && (
        <div className="mt-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3 inline mr-1" />
          Termen: {new Date(task.dueAt).toLocaleDateString('ro-RO')}
        </div>
      )}

      {task.completedAt && (
        <div className="mt-2 text-xs text-green-600">
          <CheckCircle className="h-3 w-3 inline mr-1" />
          Finalizat: {new Date(task.completedAt).toLocaleDateString('ro-RO')}
        </div>
      )}
    </div>
  )
}

export default function ClientProjectTasksPage() {
  const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    if (sessionStatus === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (sessionStatus === 'authenticated' && params.id) {
      fetchData()
    }
  }, [sessionStatus, params.id])

  const fetchData = async () => {
    try {
      // Fetch project
      const projectRes = await fetch(`/api/projects/${params.id}`)
      if (!projectRes.ok) throw new Error('Project not found')
      const projectData = await projectRes.json()
      setProject(projectData)

      // Fetch tasks
      const tasksRes = await fetch(`/api/projects/${params.id}/tasks`)
      if (tasksRes.ok) {
        const tasksData = await tasksRes.json()
        setTasks(tasksData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTasksByStatus = (status: string) => {
    if (filterStatus === 'all') return true
    return status === filterStatus
  }

  const getFilteredTasks = () => {
    return tasks.filter(task => getTasksByStatus(task.status))
  }

  const getStats = () => {
    const total = tasks.length
    const completed = tasks.filter(t => t.status === 'done').length
    const inProgress = tasks.filter(t => ['in_progress', 'development', 'testing', 'review'].includes(t.status)).length
    const pending = tasks.filter(t => ['backlog'].includes(t.status)).length

    return { total, completed, inProgress, pending }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Proiectul nu a fost găsit</h2>
          <Button onClick={() => router.push('/app/projects')}>
            Înapoi la Proiecte
          </Button>
        </div>
      </div>
    )
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/app/projects/${project.id}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Înapoi la Proiect
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task-uri: {project.name}</h1>
                <p className="text-gray-600">Vizualizare progres task-uri</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <p className="text-sm text-gray-600">Total Task-uri</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                <p className="text-sm text-gray-600">În Progres</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                <p className="text-sm text-gray-600">În Așteptare</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <p className="text-sm text-gray-600">Finalizate</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtrează după status:</span>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  Toate ({stats.total})
                </Button>
                {statusColumns.map((column) => {
                  const count = tasks.filter(t => t.status === column.id).length
                  if (count === 0) return null
                  return (
                    <Button
                      key={column.id}
                      variant={filterStatus === column.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterStatus(column.id)}
                      className={column.color}
                    >
                      <column.icon className="h-3 w-3 mr-1" />
                      {column.title} ({count})
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        {stats.total > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Progres General</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {stats.completed} din {stats.total} task-uri finalizate ({Math.round((stats.completed / stats.total) * 100)}%)
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getFilteredTasks().map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {getFilteredTasks().length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">
                {filterStatus === 'all'
                  ? 'Nu există task-uri pentru acest proiect.'
                  : `Nu există task-uri cu statusul "${statusColumns.find(c => c.id === filterStatus)?.title}".`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}