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
  Receipt,
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
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  FileText
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
  sent: { label: 'Trimis', color: 'bg-blue-500', icon: Send },
  paid: { label: 'Plătit', color: 'bg-green-500', icon: CheckCircle },
  partially_paid: { label: 'Plătit Parțial', color: 'bg-yellow-500', icon: AlertTriangle },
  overdue: { label: 'Restant', color: 'bg-red-500', icon: AlertTriangle },
  cancelled: { label: 'Anulat', color: 'bg-gray-700', icon: Clock }
}

export default async function AdminInvoicesPage({ searchParams }: PageProps) {
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
      { invoiceNumber: { contains: search, mode: 'insensitive' } },
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { clientName: { contains: search, mode: 'insensitive' } },
      { clientEmail: { contains: search, mode: 'insensitive' } }
    ]
  }
  if (status && status !== 'all') {
    whereClause.status = status
  }

  // Fetch invoices with pagination and filtering
  const [invoices, totalCount] = await Promise.all([
    prisma.invoice.findMany({
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
        estimation: {
          select: {
            id: true,
            title: true,
            totalCost: true
          }
        },
        proposal: {
          select: {
            id: true,
            title: true,
            status: true
          }
        },
        payments: true
      },
      skip,
      take: limit
    }),
    prisma.invoice.count({ where: whereClause })
  ])

  const totalPages = Math.ceil(totalCount / limit)

  // Calculate stats
  const [totalInvoices, draftInvoices, sentInvoices, paidInvoices, overdueInvoices, totalRevenue] = await Promise.all([
    prisma.invoice.count(),
    prisma.invoice.count({ where: { status: 'draft' } }),
    prisma.invoice.count({ where: { status: 'sent' } }),
    prisma.invoice.count({ where: { status: 'paid' } }),
    prisma.invoice.count({
      where: {
        status: { in: ['sent', 'partially_paid'] },
        dueDate: { lt: new Date() }
      }
    }),
    prisma.invoice.aggregate({
      where: { status: 'paid' },
      _sum: {
        totalAmount: true
      }
    })
  ])

  const totalPaidRevenue = totalRevenue._sum.totalAmount || 0

  return (
    <AdminLayout
      title="Management Facturi"
      subtitle="Vizualizare și gestionare facturi și plăți"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportă
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Factură Nouă
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
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{totalInvoices}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Facturi Totale</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Toate facturile</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-gray-600 dark:text-gray-400">{draftInvoices}</div>
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
                <Send className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{sentInvoices}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Trimise</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Neplătite</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{paidInvoices}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Plătite</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">Finalizate</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-red-400 to-red-500 rounded-xl shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-red-600 dark:text-red-400">{overdueInvoices}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Restante</p>
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">Depășite</p>
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
                ${totalPaidRevenue.toLocaleString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Venituri</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Total încasat</p>
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
                placeholder="Caută facturi după număr, client, descriere..."
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
          <span className="font-medium">{totalCount}</span> facturi
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

      {/* Invoices Table */}
      <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Lista Facturi
          </CardTitle>
          <CardDescription>
            Toate facturile emise ({totalCount})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Factură</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Client</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Total</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Plătit</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Data Scadentă</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Data Emiterii</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => {
                  const StatusIcon = statusConfig[invoice.status as keyof typeof statusConfig]?.icon || Clock
                  const statusColor = statusConfig[invoice.status as keyof typeof statusConfig]?.color || 'bg-gray-500'
                  const statusLabel = statusConfig[invoice.status as keyof typeof statusConfig]?.label || invoice.status
                  const totalPaid = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0)
                  const isOverdue = invoice.dueDate < new Date() && ['sent', 'partially_paid'].includes(invoice.status)

                  return (
                    <tr key={invoice.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-150">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            #{invoice.invoiceNumber}
                          </div>
                          <div className="text-sm text-gray-900 dark:text-white font-medium">
                            {invoice.title}
                          </div>
                          {invoice.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {invoice.description}
                            </div>
                          )}
                          {invoice.project && (
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              Proiect: {invoice.project.name}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg">
                            <span className="text-xs font-bold text-white">
                              {invoice.clientName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {invoice.clientName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {invoice.clientEmail}
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
                        {isOverdue && (
                          <Badge className="bg-red-600 text-white border-0 mt-1">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Restant
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white">
                            ${invoice.totalAmount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            TVA: {(invoice.taxRate * 100).toFixed(0)}%
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className={`font-bold ${
                            totalPaid >= invoice.totalAmount
                              ? 'text-green-600 dark:text-green-400'
                              : totalPaid > 0
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-red-600 dark:text-red-400'
                          }`}>
                            ${totalPaid.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {invoice.payments.length} plăți
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`text-sm ${
                          isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {new Date(invoice.dueDate).toLocaleDateString('ro-RO', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(invoice.issueDate).toLocaleDateString('ro-RO', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/invoices/${invoice.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/invoices/${invoice.id}/edit`}>
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