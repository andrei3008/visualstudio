import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  FileText,
  Plus,
  Calendar,
  User,
  DollarSign,
  Edit,
  Eye,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import { ProposalsPagination } from './components/ProposalsPagination'

interface PageProps {
  searchParams: {
    page?: string
    limit?: string
    search?: string
    status?: string
  }
}

export default async function AdminProposals({ searchParams }: PageProps) {
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

  // Build where clause for filtering
  const whereClause: any = {}
  if (search) {
    whereClause.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { project: { name: { contains: search, mode: 'insensitive' } } },
      { project: { user: { email: { contains: search, mode: 'insensitive' } } } }
    ]
  }
  if (status && status !== 'all') {
    whereClause.status = status
  }

  // Fetch proposals with pagination and filtering
  const [proposals, totalCount] = await Promise.all([
    prisma.proposal.findMany({
      where: whereClause,
      include: {
        project: {
          include: {
            user: {
              select: {
                email: true,
                name: true
              }
            }
          }
        },
        items: true
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    }),
    prisma.proposal.count({ where: whereClause })
  ])

  const totalPages = Math.ceil(totalCount / limit)

  // Calculate stats
  const [draftCount, submittedCount, reviewCount, approvedCount] = await Promise.all([
    prisma.proposal.count({ where: { status: 'draft' } }),
    prisma.proposal.count({ where: { status: 'submitted' } }),
    prisma.proposal.count({ where: { status: 'client_review' } }),
    prisma.proposal.count({ where: { status: 'approved' } })
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0'
      case 'submitted':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0'
      case 'client_review':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0'
      case 'approved':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white border-0'
      case 'client_rejected':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-0'
      case 'estimation_pending':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0'
      case 'estimation_review':
        return 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0'
      case 'estimation_rejected':
        return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="h-3 w-3" />
      case 'submitted': return <Clock className="h-3 w-3" />
      case 'client_review': return <AlertCircle className="h-3 w-3" />
      case 'approved': return <CheckCircle className="h-3 w-3" />
      case 'client_rejected': return <AlertCircle className="h-3 w-3" />
      case 'estimation_pending': return <Clock className="h-3 w-3" />
      case 'estimation_review': return <AlertCircle className="h-3 w-3" />
      case 'estimation_rejected': return <AlertCircle className="h-3 w-3" />
      default: return <FileText className="h-3 w-3" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft'
      case 'submitted': return 'Trimisă'
      case 'client_review': return 'În Revizuire Client'
      case 'approved': return 'Aprobată'
      case 'client_rejected': return 'Respinsă de Client'
      case 'estimation_pending': return 'Estimare Așteptată'
      case 'estimation_review': return 'Estimare în Revizuire'
      case 'estimation_rejected': return 'Estimare Respinsă'
      default: return status
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON'
    }).format(amount / 100)
  }

  return (
    <AdminLayout
      title="Management Propuneri"
      subtitle="Gestionează toate propunerile de proiect"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Rapoarte
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Propunere Nouă
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-gray-600 dark:text-gray-400">{draftCount}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Draft</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Propuneri nefinalizate</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{submittedCount}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Trimise</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Așteaptă procesare</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-yellow-600 dark:text-yellow-400">{reviewCount}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">În Revizuire</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Client verifică</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{approvedCount}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Aprobate</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">Gata de dezvoltare</p>
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
                placeholder="Caută propuneri după titlu, proiect sau client..."
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Trimisă</SelectItem>
                  <SelectItem value="client_review">În Revizuire</SelectItem>
                  <SelectItem value="approved">Aprobată</SelectItem>
                  <SelectItem value="client_rejected">Respinsă</SelectItem>
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
          <span className="font-medium">{totalCount}</span> propuneri
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

      {/* Proposals Table */}
      <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Lista Propuneri
          </CardTitle>
          <CardDescription>
            Toate propunerile din platformă ({totalCount})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Propunere</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Client</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Proiect</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Valoare</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Iteme</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Creat</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => {
                  const total = proposal.items.reduce((sum, item) => sum + item.qty * item.unitPriceCents, 0)
                  return (
                    <tr key={proposal.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-150">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <FileText className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                              {proposal.title}
                            </div>
                            {proposal.description && (
                              <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                {proposal.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <User className="h-4 w-4" />
                          <span>{proposal.project.user.name || proposal.project.user.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {proposal.project.name}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`text-xs ${getStatusColor(proposal.status)}`}>
                          {getStatusIcon(proposal.status)}
                          <span className="ml-1">{getStatusLabel(proposal.status)}</span>
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {proposal.items.length > 0 ? formatCurrency(total) : 'Fără preț'}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">{proposal.items.length}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(proposal.createdAt).toLocaleDateString('ro-RO')}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/proposals/${proposal.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/proposals/${proposal.id}/edit`}>
                              <Edit className="h-4 w-4" />
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

      {/* Pagination */}
      <ProposalsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        limit={limit}
        totalCount={totalCount}
      />
    </AdminLayout>
  )
}