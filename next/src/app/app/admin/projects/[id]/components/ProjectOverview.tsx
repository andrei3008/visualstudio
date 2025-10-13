'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  BarChart3,
  Download,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  Target,
  DollarSign,
  FileText,
  TrendingUp,
  Activity,
  AlertCircle,
  Timer
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string | null
  status: string
  createdAt: Date | string
  deadline?: Date | string | null
  budget?: number | null
  user: {
    id: string
    email: string
    name: string | null
  }
  _count: {
    tasks: number
    milestones: number
    messages: number
    files: number
    proposals: number
  }
}

interface Task {
  id: string
  title: string
  status: string
  estimateH?: number
}

interface ProjectOverviewProps {
  project: Project
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [project.id])

  const fetchTasks = async () => {
    try {
      const res = await fetch(`/api/projects/${project.id}/tasks`)
      if (res.ok) {
        const tasksData = await res.json()
        setTasks(tasksData)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'done').length
  const openTasks = totalTasks - completedTasks
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Calculate days left
  const today = new Date()
  const deadline = project.deadline ? new Date(project.deadline) : null
  const startDate = new Date(project.createdAt)
  const totalDays = deadline ? Math.ceil((deadline.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const daysLeft = deadline ? Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const daysProgress = totalDays > 0 ? Math.round(((totalDays - daysLeft) / totalDays) * 100) : 0

  // Calculate estimated hours
  const totalEstimatedHours = tasks.reduce((sum, task) => sum + (task.estimateH || 0), 0)
  const loggedHours = 0 // TODO: Implement timesheet tracking
  const billableHours = 0 // TODO: Implement billable hours logic

  return (
    <div className="space-y-6">
      {/* Project Progress Header */}
      <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Project Progress {progressPercentage}%
              </CardTitle>
              <CardDescription>
                Overview and analytics for {project.name}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export project data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Progress Overview */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Time Progress</span>
                  <span className="font-medium">{daysProgress}%</span>
                </div>
                <Progress value={daysProgress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {openTasks} / {totalTasks}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">Open Tasks</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {totalDays - daysLeft} / {totalDays}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400">Days Left</div>
                </div>
              </div>
            </div>

            {/* Main Task */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Build Website</h4>
                <Badge className="bg-blue-100 text-blue-700">Active</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="text-xs text-gray-500">
                  {completedTasks} completed out of {totalTasks} tasks
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Information */}
        <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Project Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Project #</p>
                <p className="font-medium text-gray-900 dark:text-white">1</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customer</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {project.user.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Billing Type</p>
                <p className="font-medium text-gray-900 dark:text-white">Task Hours</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                <Badge className={`${
                  project.status === 'in_progress' ? 'bg-green-100 text-green-700' :
                  project.status === 'done' ? 'bg-blue-100 text-blue-700' :
                  project.status === 'request' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {project.status === 'in_progress' ? 'In Progress' :
                   project.status === 'done' ? 'Completed' :
                   project.status === 'request' ? 'Request' :
                   project.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date Created</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(project.createdAt).toLocaleDateString('ro-RO')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(project.createdAt).toLocaleDateString('ro-RO')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {project.deadline ? new Date(project.deadline).toLocaleDateString('ro-RO') : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Logged Hours</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {loggedHours.toString().padStart(2, '0')}:00
                </p>
              </div>
            </div>

            {project.description && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Description</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {project.description}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Tags</p>
              <div className="flex gap-2">
                <Badge variant="secondary">wordpress</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hours Overview */}
        <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-green-600 dark:text-green-400" />
              Total Logged Hours
            </CardTitle>
            <CardDescription>
              Hours tracking breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hours Progress */}
            <div className="text-center py-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {loggedHours.toString().padStart(2, '0')}:00
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Logged Hours</p>
            </div>

            {/* Hours Breakdown */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Logged Hours</span>
                </div>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {loggedHours.toString().padStart(2, '0')}:00
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Billable Hours</span>
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  {billableHours.toString().padStart(2, '0')}:00
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Billed Hours</span>
                </div>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                  00:00
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Unbilled Hours</span>
                </div>
                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                  00:00
                </span>
              </div>
            </div>

            {/* Estimated Hours */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Hours</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {totalEstimatedHours}h
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expenses */}
      <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">$0.00</div>
              <div className="text-sm text-orange-600 dark:text-orange-400">Total Expenses</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">$0.00</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Billable Expenses</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">$0.00</div>
              <div className="text-sm text-green-600 dark:text-green-400">Billed Expenses</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">$0.00</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Unbilled Expenses</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}