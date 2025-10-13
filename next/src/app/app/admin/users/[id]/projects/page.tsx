import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  FolderOpen,
  Search,
  Filter,
  Plus,
  Calendar,
  User,
  FileText,
  Eye,
  Edit,
  ArrowLeft,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
// AdminLayout is handled by the parent layout.tsx

interface PageProps {
  params: {
    id: string
  }
  searchParams: {
    page?: string
    limit?: string
    search?: string
    status?: string
  }
}

export default async function AdminUserProjectsPage({ params, searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
  if (u?.role !== 'admin') redirect('/app')

  // Parse pagination parameters
  const currentPage = parseInt(searchParams.page || '1')
  const limit = parseInt(searchParams.limit || '25')
  const search = searchParams.search || ''
  const status = searchParams.status || ''

  // Calculate pagination
  const skip = (currentPage - 1) * limit

  // Get user information
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          projects: true
        }
      }
    }
  })

  if (!user) {
    notFound()
  }

  // Build where clause for filtering
  const whereClause: any = {
    userId: params.id
  }
  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ]
  }
  if (status && status !== 'all') {
    whereClause.status = status
  }

  // Fetch user projects with pagination and filtering
  const [projects, totalCount] = await Promise.all([
    prisma.project.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            proposals: true,
            tasks: true,
            milestones: true,
            messages: true
          }
        }
      },
      skip,
      take: limit
    }),
    prisma.project.count({ where: whereClause })
  ])

  const totalPages = Math.ceil(totalCount / limit)

  // Calculate stats for this user
  const [activeProjects, completedProjects, pendingProjects] = await Promise.all([
    prisma.project.count({ where: { userId: params.id, status: 'in_progress' } }),
    prisma.project.count({ where: { userId: params.id, status: 'done' } }),
    prisma.project.count({ where: { userId: params.id, status: 'request' } })
  ])

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
        return <TrendingUp className="h-3 w-3" />
      case 'done':
        return <CheckCircle className="h-3 w-3" />
      case 'request':
        return <Clock className="h-3 w-3" />
      case 'proposal_review':
        return <AlertCircle className="h-3 w-3" />
      case 'estimation':
        return <BarChart3 className="h-3 w-3" />
      case 'estimation_review':
        return <AlertCircle className="h-3 w-3" />
      case 'approved':
        return <CheckCircle className="h-3 w-3" />
      case 'scoping':
        return <AlertCircle className="h-3 w-3" />
      case 'review':
        return <AlertCircle className="h-3 w-3" />
      case 'rejected':
        return <AlertCircle className="h-3 w-3" />
      default:
        return <AlertCircle className="h-3 w-3" />
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
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Proiecte - {user.name || user.email}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Vizualizare și gestionare proiecte pentru {user.name || user.email}
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/app/admin/users/${user.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi la Utilizator
          </Link>
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Proiect Nou
        </Button>
      </div>
      {/* User Info Card */}
      <Card className="mb-6 border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Informații Utilizator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Nume</p>
              <p className="font-medium">{user.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rol</p>
              <Badge className={user.role === 'admin' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}>
                {user.role}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                <FolderOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{user._count.projects}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Proiecte Totale</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Toate proiectele</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{activeProjects}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Proiecte Active</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">În dezvoltare</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-yellow-600 dark:text-yellow-400">{pendingProjects}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">În Așteptare</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Necesită atenție</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{completedProjects}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Finalizate</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Proiecte complete</p>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6 border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Caută proiecte după nume sau descriere..."
                className="pl-10 h-12 border-gray-200 dark:border-gray-700"
                defaultValue={search}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue={status}>
                <SelectTrigger className="h-12 w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate Statusurile</SelectItem>
                  <SelectItem value="in_progress">În Dezvoltare</SelectItem>
                  <SelectItem value="done">Finalizat</SelectItem>
                  <SelectItem value="request">Request</SelectItem>
                  <SelectItem value="proposal_review">Revizuire Propunere</SelectItem>
                  <SelectItem value="estimation">Estimare</SelectItem>
                  <SelectItem value="approved">Aprobat</SelectItem>
                  <SelectItem value="rejected">Respins</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="h-12">
                <Filter className="h-4 w-4 mr-2" />
                Filtre
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results and Pagination Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Afișare <span className="font-medium">{Math.min(skip + 1, totalCount)}-{Math.min(skip + limit, totalCount)}</span> din{' '}
          <span className="font-medium">{totalCount}</span> proiecte
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Elemente pe pagină:</span>
          <Select value={limit.toString()}>
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

      {/* Projects Table */}
      <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Lista Proiecte
          </CardTitle>
          <CardDescription>
            Toate proiectele pentru {user.name || user.email} ({totalCount})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Proiect</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Categorie</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Buget</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Statistici</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Creat</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-150">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                          <FolderOpen className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {project.name}
                          </div>
                          {project.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {project.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1">{getStatusLabel(project.status)}</span>
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {(project.requestDetails as any)?.category || 'N/A'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {(project.requestDetails as any)?.budget || 'N/A'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="p-1 bg-blue-50 dark:bg-blue-900/20 rounded">
                          <div className="text-xs font-bold text-blue-600 dark:text-blue-400">{project._count.proposals}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Propuneri</div>
                        </div>
                        <div className="p-1 bg-green-50 dark:bg-green-900/20 rounded">
                          <div className="text-xs font-bold text-green-600 dark:text-green-400">{project._count.tasks}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Task-uri</div>
                        </div>
                        <div className="p-1 bg-purple-50 dark:bg-purple-900/20 rounded">
                          <div className="text-xs font-bold text-purple-600 dark:text-purple-400">{project._count.milestones}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Milestone</div>
                        </div>
                        <div className="p-1 bg-orange-50 dark:bg-orange-900/20 rounded">
                          <div className="text-xs font-bold text-orange-600 dark:text-orange-400">{project._count.messages}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Mesaje</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(project.createdAt).toLocaleDateString('ro-RO')}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/app/admin/projects/${project.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/app/admin/projects/${project.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Simple Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Pagina {currentPage} din {totalPages}
          </div>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/app/admin/users/${params.id}/projects?page=${currentPage - 1}&limit=${limit}&search=${search}&status=${status}`}>
                  Anterior
                </Link>
              </Button>
            )}
            {currentPage < totalPages && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/app/admin/users/${params.id}/projects?page=${currentPage + 1}&limit=${limit}&search=${search}&status=${status}`}>
                  Următor
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}