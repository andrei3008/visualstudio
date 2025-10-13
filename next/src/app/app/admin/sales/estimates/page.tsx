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
  FileCheck,
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
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

interface PageProps {
  searchParams: {
    page?: string
    limit?: string
    search?: string
    status?: string
  }
}

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-gray-500', icon: Clock },
  submitted: { label: 'Trimis', color: 'bg-blue-500', icon: CheckCircle },
  client_review: { label: 'În Revizuire Client', color: 'bg-yellow-500', icon: Eye },
  client_rejected: { label: 'Respins Client', color: 'bg-red-500', icon: XCircle },
  approved: { label: 'Aprobat', color: 'bg-green-500', icon: CheckCircle },
  rejected: { label: 'Respins', color: 'bg-red-700', icon: XCircle }
}

export default async function AdminEstimatesPage({ searchParams }: PageProps) {
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
      { description: { contains: search, mode: 'insensitive' } },
      { project: { name: { contains: search, mode: 'insensitive' } } },
      { project: { user: { name: { contains: search, mode: 'insensitive' } } } },
      { project: { user: { email: { contains: search, mode: 'insensitive' } } } }
    ]
  }
  if (status && status !== 'all') {
    whereClause.status = status
  }

  // Fetch estimations with pagination and filtering
  const [estimations, totalCount] = await Promise.all([
    prisma.estimation.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        project: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        proposal: {
          select: {
            id: true,
            title: true,
            status: true
          }
        },
        invoices: {
          select: {
            id: true,
            invoiceNumber: true,
            status: true,
            totalAmount: true,
            paidAt: true,
            paymentUrl: true
          },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      skip,
      take: limit
    }),
    prisma.estimation.count({ where: whereClause })
  ])

  const totalPages = Math.ceil(totalCount / limit)

  // Calculate stats
  const [totalEstimations, draftEstimations, submittedEstimations, approvedEstimations, totalValue] = await Promise.all([
    prisma.estimation.count(),
    prisma.estimation.count({ where: { status: 'draft' } }),
    prisma.estimation.count({ where: { status: 'submitted' } }),
    prisma.estimation.count({ where: { status: 'approved' } }),
    prisma.estimation.aggregate({
      _sum: {
        totalCost: true
      }
    })
  ])

  const totalEstimationValue = totalValue._sum.totalCost || 0

  return (
    <AdminLayout
      title="Management Estimări"
      subtitle="Vizualizare și gestionare estimări de costuri"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportă
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Estimare Nouă
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <FileCheck className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{totalEstimations}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Estimări Totale</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">Toate estimările</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-gray-600 dark:text-gray-400">{draftEstimations}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Draft</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">În lucru</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{submittedEstimations}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Trimise</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Așteaptă răspuns</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{approvedEstimations}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Aprobate</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">Finalizate</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-black text-yellow-600 dark:text-yellow-400">
                ${totalEstimationValue.toLocaleString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Valoare Totală</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Suma estimată</p>
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
                placeholder="Caută estimări după titlu, descriere, client..."
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
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
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
          <span className="font-medium">{totalCount}</span> estimări
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

      {/* Estimations Table */}
      <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            Lista Estimări
          </CardTitle>
          <CardDescription>
            Toate estimările de costuri ({totalCount})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Estimare</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Client</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Proiect</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Ore</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Cost Total</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Factură</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Data Creării</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {estimations.map((estimation) => {
                  const StatusIcon = statusConfig[estimation.status as keyof typeof statusConfig]?.icon || Clock
                  const statusColor = statusConfig[estimation.status as keyof typeof statusConfig]?.color || 'bg-gray-500'
                  const statusLabel = statusConfig[estimation.status as keyof typeof statusConfig]?.label || estimation.status

                  return (
                    <tr key={estimation.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-150">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {estimation.title}
                          </div>
                          {estimation.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {estimation.description}
                            </div>
                          )}
                          {estimation.proposal && (
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              Legat de propunere: {estimation.proposal.title}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg">
                            <span className="text-xs font-bold text-white">
                              {estimation.project.user.name?.charAt(0).toUpperCase() || estimation.project.user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {estimation.project.user.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {estimation.project.user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {estimation.project.name}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            ID: {estimation.project.id.slice(0, 8)}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          className={`${statusColor} text-white border-0`}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusLabel}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white">{estimation.totalHours}h</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ${estimation.hourlyRate}/h
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="font-bold text-green-600 dark:text-green-400">
                            ${estimation.totalCost.toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {estimation.invoices && estimation.invoices.length > 0 ? (
                          <div className="space-y-1">
                            <Badge variant={estimation.invoices[0].status === 'paid' ? 'default' : 'secondary'} className="text-xs">
                              {estimation.invoices[0].invoiceNumber}
                            </Badge>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              ${estimation.invoices[0].totalAmount.toLocaleString()}
                            </div>
                            <div className="text-xs">
                              <Badge variant={estimation.invoices[0].status === 'paid' ? 'default' : 'secondary'} className="text-xs">
                                {estimation.invoices[0].status === 'paid' ? 'Plătită' :
                                 estimation.invoices[0].status === 'unpaid' ? 'Neplătită' :
                                 estimation.invoices[0].status === 'sent' ? 'Trimisă' :
                                 estimation.invoices[0].status}
                              </Badge>
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            Fără factură
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(estimation.createdAt).toLocaleDateString('ro-RO', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/estimations/${estimation.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/estimations/${estimation.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
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