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
  CreditCard,
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
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  RefreshCw,
  XCircle
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

interface PageProps {
  searchParams: {
    page?: string
    limit?: string
    search?: string
    status?: string
    method?: string
  }
}

const statusConfig = {
  pending: { label: 'În Așteptare', color: 'bg-yellow-500', icon: Clock },
  processing: { label: 'În Procesare', color: 'bg-blue-500', icon: RefreshCw },
  completed: { label: 'Finalizat', color: 'bg-green-500', icon: CheckCircle },
  failed: { label: 'Eșuat', color: 'bg-red-500', icon: XCircle },
  refunded: { label: 'Rambursat', color: 'bg-gray-500', icon: RefreshCw },
  cancelled: { label: 'Anulat', color: 'bg-gray-700', icon: XCircle }
}

const methodConfig = {
  bank_transfer: { label: 'Transfer Bancar', icon: '🏦' },
  card: { label: 'Card', icon: '💳' },
  cash: { label: 'Numerar', icon: '💵' },
  paypal: { label: 'PayPal', icon: '🅿️' },
  stripe: { label: 'Stripe', icon: '🔵' },
  other: { label: 'Altul', icon: '📝' }
}

export default async function AdminPaymentsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
  if (u?.role !== 'admin') redirect('/app')

  // Parse pagination parameters
  const currentPage = parseInt(searchParams.page || '1')
  const limit = parseInt(searchParams.limit || '25')
  const search = searchParams.search || ''
  const status = searchParams.status || ''
  const method = searchParams.method || ''

  // Calculate pagination
  const skip = (currentPage - 1) * limit

  // Build where clause for filtering
  const whereClause: any = {}
  if (search) {
    whereClause.OR = [
      { transactionId: { contains: search, mode: 'insensitive' } },
      { invoice: { invoiceNumber: { contains: search, mode: 'insensitive' } } },
      { invoice: { clientName: { contains: search, mode: 'insensitive' } } },
      { invoice: { clientEmail: { contains: search, mode: 'insensitive' } } },
      { gateway: { contains: search, mode: 'insensitive' } },
      { notes: { contains: search, mode: 'insensitive' } }
    ]
  }
  if (status && status !== 'all') {
    whereClause.status = status
  }
  if (method && method !== 'all') {
    whereClause.method = method
  }

  // Fetch payments with pagination and filtering
  const [payments, totalCount] = await Promise.all([
    prisma.payment.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        invoice: {
          select: {
            id: true,
            invoiceNumber: true,
            title: true,
            clientName: true,
            clientEmail: true,
            totalAmount: true,
            status: true,
            project: {
              select: {
                id: true,
                name: true,
                user: {
                  select: {
                    name: true,
                    email: true
                  }
                }
              }
            }
          }
        }
      },
      skip,
      take: limit
    }),
    prisma.payment.count({ where: whereClause })
  ])

  const totalPages = Math.ceil(totalCount / limit)

  // Calculate stats
  const [totalPayments, pendingPayments, completedPayments, failedPayments, totalAmount] = await Promise.all([
    prisma.payment.count(),
    prisma.payment.count({ where: { status: 'pending' } }),
    prisma.payment.count({ where: { status: 'completed' } }),
    prisma.payment.count({ where: { status: 'failed' } }),
    prisma.payment.aggregate({
      where: { status: 'completed' },
      _sum: {
        amount: true
      }
    })
  ])

  const totalCompletedAmount = totalAmount._sum.amount || 0

  return (
    <AdminLayout
      title="Management Plăți"
      subtitle="Vizualizare și gestionare plăți și tranzacții"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportă
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Plată Nouă
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{totalPayments}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Plăți Totale</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Toate tranzacțiile</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-yellow-600 dark:text-yellow-400">{pendingPayments}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">În Așteptare</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">În procesare</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{completedPayments}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Finalizate</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">Succes</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-red-400 to-red-500 rounded-xl shadow-lg">
                <XCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-red-600 dark:text-red-400">{failedPayments}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Eșuate</p>
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">Erori</p>
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
                ${totalCompletedAmount.toLocaleString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Suma Încasată</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Total plăți finalizate</p>
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
                placeholder="Caută plăți după ID tranzacție, factură, client..."
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
              <Select defaultValue={method}>
                <SelectTrigger className="h-12 w-48">
                  <SelectValue placeholder="Metodă" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate Metodele</SelectItem>
                  {Object.entries(methodConfig).map(([key, config]) => (
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
          <span className="font-medium">{totalCount}</span> plăți
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

      {/* Payments Table */}
      <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Lista Plăți
          </CardTitle>
          <CardDescription>
            Toate plățile și tranzacțiile ({totalCount})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Plată</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Factură</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Client</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Metodă</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Sumă</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Data Plății</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => {
                  const StatusIcon = statusConfig[payment.status as keyof typeof statusConfig]?.icon || Clock
                  const statusColor = statusConfig[payment.status as keyof typeof statusConfig]?.color || 'bg-gray-500'
                  const statusLabel = statusConfig[payment.status as keyof typeof statusConfig]?.label || payment.status
                  const methodLabel = methodConfig[payment.method as keyof typeof methodConfig]?.label || payment.method
                  const methodIcon = methodConfig[payment.method as keyof typeof methodConfig]?.icon || '📝'

                  return (
                    <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-150">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {payment.transactionId || `#${payment.id.slice(0, 8)}`}
                          </div>
                          {payment.gateway && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {payment.gateway}
                            </div>
                          )}
                          {payment.gatewayFee && (
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              Taxă procesare: ${payment.gatewayFee}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-white">
                            #{payment.invoice.invoiceNumber}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {payment.invoice.title}
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">
                            Total: ${payment.invoice.totalAmount.toLocaleString()}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg">
                            <span className="text-xs font-bold text-white">
                              {payment.invoice.clientName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {payment.invoice.clientName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {payment.invoice.clientEmail}
                            </div>
                          </div>
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
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{methodIcon}</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {methodLabel}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="font-bold text-green-600 dark:text-green-400">
                            ${payment.amount.toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {payment.paidAt ? (
                            new Date(payment.paidAt).toLocaleDateString('ro-RO', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/payments/${payment.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/payments/${payment.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          {payment.status === 'pending' && (
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
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