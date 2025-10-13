'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  TestTube,
  Code,
  ListTodo,
  Eye,
  MoreHorizontal,
  GripVertical
} from 'lucide-react'
import Link from 'next/link'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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
}

interface Project {
  id: string
  name: string
  description?: string
  status: string
}

const statusColumns = [
  { id: 'backlog', title: 'Backlog', icon: ListTodo, color: 'bg-gray-100 border-gray-200' },
  { id: 'in_progress', title: 'În Lucru', icon: Play, color: 'bg-blue-50 border-blue-200' },
  { id: 'development', title: 'Dezvoltare', icon: Code, color: 'bg-purple-50 border-purple-200' },
  { id: 'testing', title: 'Testare', icon: TestTube, color: 'bg-orange-50 border-orange-200' },
  { id: 'review', title: 'Review', icon: Eye, color: 'bg-yellow-50 border-yellow-200' },
  { id: 'done', title: 'Finalizat', icon: CheckCircle, color: 'bg-green-50 border-green-200' },
]

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
}

const TaskCard = ({ task, onEdit, onDelete }: { task: Task; onEdit: (task: Task) => void; onDelete: (taskId: string) => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-move ${
        isDragging ? 'shadow-lg border-blue-400' : 'border-gray-200'
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <GripVertical className="h-4 w-4 text-gray-400" />
          <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{task.title}</h4>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(task)
            }}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(task.id)
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
            {task.priority}
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
            <span className="text-xs text-gray-600 hidden sm:inline">
              {task.assignee.name}
            </span>
          </div>
        )}
      </div>

      {task.dueAt && (
        <div className="mt-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3 inline mr-1" />
          {new Date(task.dueAt).toLocaleDateString('ro-RO')}
        </div>
      )}
    </div>
  )
}

const Column = ({ column, tasks, onEdit, onDelete }: {
  column: typeof statusColumns[0];
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) => {
  const Icon = column.icon

  return (
    <div className={`${column.color} rounded-lg p-4 border-2 min-h-[400px]`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-5 w-5" />
        <h3 className="font-semibold text-gray-900">{column.title}</h3>
        <Badge variant="secondary" className="ml-auto">
          {tasks.length}
        </Badge>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default function ProjectTasksPage() {
  const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'backlog',
    priority: 'medium',
    assigneeId: '',
    dueAt: '',
    estimateH: '',
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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

      // Fetch users for assignment
      const usersRes = await fetch('/api/users')
      if (usersRes.ok) {
        const usersData = await usersRes.json()
        setUsers(usersData.filter((u: any) => u.role !== 'client'))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as string

    if (newStatus === 'backlog' || newStatus === 'in_progress' || newStatus === 'development' ||
        newStatus === 'testing' || newStatus === 'review' || newStatus === 'done') {

      // Update task status
      setTasks(prev => prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ))

      // Update in database
      try {
        await fetch(`/api/tasks/${taskId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        })
      } catch (error) {
        console.error('Error updating task status:', error)
        // Revert on error
        setTasks(prev => prev.map(task =>
          task.id === taskId ? { ...task, status: tasks.find(t => t.id === taskId)?.status || 'backlog' } : task
        ))
      }
    }
  }

  const handleCreateTask = async () => {
    try {
      const res = await fetch(`/api/projects/${params.id}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          estimateH: formData.estimateH ? parseInt(formData.estimateH) : null,
          dueAt: formData.dueAt || null,
        })
      })

      if (res.ok) {
        const newTask = await res.json()
        setTasks(prev => [...prev, newTask])
        setIsCreateDialogOpen(false)
        setFormData({
          title: '',
          description: '',
          status: 'backlog',
          priority: 'medium',
          assigneeId: '',
          dueAt: '',
          estimateH: '',
        })
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleUpdateTask = async () => {
    if (!editingTask) return

    try {
      const res = await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          estimateH: formData.estimateH ? parseInt(formData.estimateH) : null,
          dueAt: formData.dueAt || null,
        })
      })

      if (res.ok) {
        const updatedTask = await res.json()
        setTasks(prev => prev.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        ))
        setIsEditDialogOpen(false)
        setEditingTask(null)
        setFormData({
          title: '',
          description: '',
          status: 'backlog',
          priority: 'medium',
          assigneeId: '',
          dueAt: '',
          estimateH: '',
        })
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Ești sigur că vrei să ștergi acest task?')) return

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setTasks(prev => prev.filter(task => task.id !== taskId))
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const openEditDialog = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      assigneeId: task.assignee?.id || '',
      dueAt: task.dueAt ? new Date(task.dueAt).toISOString().split('T')[0] : '',
      estimateH: task.estimateH?.toString() || '',
    })
    setIsEditDialogOpen(true)
  }

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status)
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
          <Button onClick={() => router.push('/app/admin/projects')}>
            Înapoi la Proiecte
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/app/admin/projects/${project.id}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Înapoi la Proiect
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task-uri: {project.name}</h1>
                <p className="text-gray-600">Management task-uri cu drag & drop</p>
              </div>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Task Nou
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Creează Task Nou</DialogTitle>
                  <DialogDescription>
                    Adaugă un task nou pentru proiectul {project.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="title">Titlu</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Titlu task"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Descriere</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descriere task"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="priority">Prioritate</Label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Scăzută</SelectItem>
                          <SelectItem value="medium">Medie</SelectItem>
                          <SelectItem value="high">Ridicată</SelectItem>
                          <SelectItem value="critical">Critică</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="estimateH">Estimare ore</Label>
                      <Input
                        id="estimateH"
                        type="number"
                        value={formData.estimateH}
                        onChange={(e) => setFormData(prev => ({ ...prev, estimateH: e.target.value }))}
                        placeholder="Ore"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="assignee">Assignat</Label>
                      <Select value={formData.assigneeId} onValueChange={(value) => setFormData(prev => ({ ...prev, assigneeId: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectează utilizator" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name || user.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dueAt">Due date</Label>
                      <Input
                        id="dueAt"
                        type="date"
                        value={formData.dueAt}
                        onChange={(e) => setFormData(prev => ({ ...prev, dueAt: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateTask}>Creează Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
                <p className="text-sm text-gray-600">Total Task-uri</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{getTasksByStatus('in_progress').length}</div>
                <p className="text-sm text-gray-600">În Lucru</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">{getTasksByStatus('development').length}</div>
                <p className="text-sm text-gray-600">În Dezvoltare</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{getTasksByStatus('done').length}</div>
                <p className="text-sm text-gray-600">Finalizate</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 min-w-[1200px]">
              {statusColumns.map((column) => (
                <div key={column.id} id={column.id}>
                  <Column
                    column={column}
                    tasks={getTasksByStatus(column.id)}
                    onEdit={openEditDialog}
                    onDelete={handleDeleteTask}
                  />
                </div>
              ))}
            </div>

            <DragOverlay>
              {activeId ? (
                <TaskCard
                  task={tasks.find(t => t.id === activeId)!}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editează Task</DialogTitle>
            <DialogDescription>
              Modifică detaliile task-ului
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-title">Titlu</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Titlu task"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Descriere</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descriere task"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backlog">Backlog</SelectItem>
                    <SelectItem value="in_progress">În Lucru</SelectItem>
                    <SelectItem value="development">Dezvoltare</SelectItem>
                    <SelectItem value="testing">Testare</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Finalizat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-priority">Prioritate</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Scăzută</SelectItem>
                    <SelectItem value="medium">Medie</SelectItem>
                    <SelectItem value="high">Ridicată</SelectItem>
                    <SelectItem value="critical">Critică</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-assignee">Assignat</Label>
                <Select value={formData.assigneeId} onValueChange={(value) => setFormData(prev => ({ ...prev, assigneeId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează utilizator" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name || user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-estimateH">Estimare ore</Label>
                <Input
                  id="edit-estimateH"
                  type="number"
                  value={formData.estimateH}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimateH: e.target.value }))}
                  placeholder="Ore"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-dueAt">Due date</Label>
              <Input
                id="edit-dueAt"
                type="date"
                value={formData.dueAt}
                onChange={(e) => setFormData(prev => ({ ...prev, dueAt: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateTask}>Salvează Modificările</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}