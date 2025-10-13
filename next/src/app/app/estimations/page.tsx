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
  FileCheck,
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  TrendingUp,
  ExternalLink
} from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import EstimationApprovalButton from '@/components/EstimationApprovalButton'
import InvoicePaymentButton from '@/components/InvoicePaymentButton'

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
  client_review: { label: 'În Revizuire', color: 'bg-yellow-500', icon: Eye },
  client_rejected: { label: 'Respins', color: 'bg-red-500', icon: AlertCircle },
  approved: { label: 'Aprobat', color: 'bg-green-500', icon: CheckCircle },
  rejected: { label: 'Respins', color: 'bg-red-700', icon: AlertCircle }
}

export default async function ClientEstimationsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true, role: true }
  })
  if (!user) redirect('/login')

  // Parse pagination parameters
  const currentPage = parseInt(searchParams.page || '1')
  const limit = parseInt(searchParams.limit || '25')
  const search = searchParams.search || ''
  const status = searchParams.status || ''

  // Calculate pagination
  const skip = (currentPage - 1) * limit

  // Build where clause for filtering
  const whereClause: any = {
    project: {
      userId: user.id
    }
  }

  if (search) {
    whereClause.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { project: { name: { contains: search, mode: 'insensitive' } } }
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
          select: {
            id: true,
            name: true,
            description: true
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
            dueDate: true,
            paymentUrl: true
          },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      skip,
      take: limit
    }),
    prisma.estimation.count({
      where: whereClause
    })
  ])

  const totalPages = Math.ceil(totalCount / limit)

  // Calculate stats
  const [totalEstimations, pendingEstimations, approvedEstimations, totalValue] = await Promise.all([
    prisma.estimation.count({
      where: { project: { userId: user.id } }
    }),
    prisma.estimation.count({
      where: {
        project: { userId: user.id },
        status: { in: ['submitted', 'client_review'] }
      }
    }),
    prisma.estimation.count({
      where: {
        project: { userId: user.id },
        status: 'approved'
      }
    }),
    prisma.estimation.aggregate({
      where: {
        project: { userId: user.id },
        status: 'approved'
      },
      _sum: {
        totalCost: true
      }
    })
  ])

  const totalEstimationValue = totalValue._sum.totalCost || 0

  return (
    <DashboardLayout
      title="Estimări"
      subtitle="Gestionează și aprobă estimările de costuri"
    >
      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                <FileCheck className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{totalEstimations}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Estimări Totale</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Toate estimările</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-yellow-600 dark:text-yellow-400">{pendingEstimations}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">În Așteptare</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Aprobare necesară</p>
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

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
                ${totalEstimationValue.toLocaleString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Valoare Aprobată</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Suma totală</p>
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
                placeholder="Caută estimări după titlu, descriere, proiect..."
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
            <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Estimările Tale
          </CardTitle>
          <CardDescription>
            Estimările de costuri pentru proiectele tale ({totalCount})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Estimare</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Proiect</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Ore/Tarif</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Cost Total</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Factură</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Data</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {estimations.map((estimation) => {
                  const StatusIcon = statusConfig[estimation.status as keyof typeof statusConfig]?.icon || Clock
                  const statusColor = statusConfig[estimation.status as keyof typeof statusConfig]?.color || 'bg-gray-500'
                  const statusLabel = statusConfig[estimation.status as keyof typeof statusConfig]?.label || estimation.status
                  const invoice = estimation.invoices[0]
                  const canApprove = ['submitted', 'client_review'].includes(estimation.status)

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
                              Legat de: {estimation.proposal.title}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {estimation.project.name}
                          </div>
                          {estimation.project.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                              {estimation.project.description}
                            </div>
                          )}
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
                        {invoice ? (
                          <div className="space-y-1">
                            <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'} className="text-xs">
                              {invoice.invoiceNumber}
                            </Badge>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              ${invoice.totalAmount.toLocaleString()}
                            </div>
                            {invoice.status !== 'paid' && (
                              <InvoicePaymentButton
                                invoiceId={invoice.id}
                                invoiceNumber={invoice.invoiceNumber}
                                amount={invoice.totalAmount}
                                paymentUrl={invoice.paymentUrl}
                              />
                            )}
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
                            <Link href={`/app/estimations/${estimation.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>

                          {canApprove && (
                            <EstimationApprovalButton
                              estimationId={estimation.id}
                              estimationTitle={estimation.title}
                              totalCost={estimation.totalCost}
                            />
                          )}

                          {invoice && invoice.status !== 'paid' && (
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/app/invoices/${invoice.id}`}>
                                <CreditCard className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
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
    </DashboardLayout>
  )
}