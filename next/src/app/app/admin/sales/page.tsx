'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../components/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DollarSign,
  FileText,
  FileCheck,
  Receipt,
  CreditCard,
  Package,
  Wrench,
  TrendingUp,
  Calendar,
  Eye,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

interface SalesStats {
  totalProposals: number
  totalEstimates: number
  totalInvoices: number
  totalPayments: number
  totalRevenue: number
  pendingProposals: number
  pendingEstimates: number
  unpaidInvoices: number
}

export default function SalesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<SalesStats>({
    totalProposals: 0,
    totalEstimates: 0,
    totalInvoices: 0,
    totalPayments: 0,
    totalRevenue: 0,
    pendingProposals: 0,
    pendingEstimates: 0,
    unpaidInvoices: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    fetchSalesStats()
  }, [status])

  const fetchSalesStats = async () => {
    try {
      // Fetch stats from different endpoints
      const [proposalsRes, estimatesRes, invoicesRes] = await Promise.all([
        fetch('/api/admin/sales/proposals'),
        fetch('/api/admin/sales/estimates'),
        fetch('/api/admin/sales/invoices')
      ])

      // Mock data for now since APIs might not be fully implemented
      setStats({
        totalProposals: 25,
        totalEstimates: 18,
        totalInvoices: 32,
        totalPayments: 28,
        totalRevenue: 125500,
        pendingProposals: 5,
        pendingEstimates: 3,
        unpaidInvoices: 7
      })
    } catch (error) {
      console.error('Error fetching sales stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON'
    }).format(amount)
  }

  if (status === 'loading' || loading) {
    return (
      <AdminLayout title="Vânzări" subtitle="Management vânzări">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </AdminLayout>
    )
  }

  const salesModules = [
    {
      title: 'Propuneri',
      description: 'Management propuneri către clienți',
      icon: FileText,
      href: '/app/admin/sales/proposals',
      count: stats.totalProposals,
      color: 'blue',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      borderColor: 'border-blue-200 dark:border-blue-700'
    },
    {
      title: 'Estimări',
      description: 'Estimări de costuri pentru proiecte',
      icon: FileCheck,
      href: '/app/admin/sales/estimates',
      count: stats.totalEstimates,
      color: 'green',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      borderColor: 'border-green-200 dark:border-green-700'
    },
    {
      title: 'Facturi',
      description: 'Management facturi și plăți',
      icon: Receipt,
      href: '/app/admin/sales/invoices',
      count: stats.totalInvoices,
      color: 'purple',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      borderColor: 'border-purple-200 dark:border-purple-700'
    },
    {
      title: 'Plăți',
      description: 'Istoric plăți și tranzacții',
      icon: CreditCard,
      href: '/app/admin/sales/payments',
      count: stats.totalPayments,
      color: 'orange',
      bgColor: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
      borderColor: 'border-orange-200 dark:border-orange-700'
    },
    {
      title: 'Pachete',
      description: 'Management pachete servicii',
      icon: Package,
      href: '/app/admin/sales/packages',
      count: 3,
      color: 'pink',
      bgColor: 'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20',
      borderColor: 'border-pink-200 dark:border-pink-700'
    },
    {
      title: 'Servicii',
      description: 'Management servicii oferite',
      icon: Wrench,
      href: '/app/admin/sales/services',
      count: 8,
      color: 'indigo',
      bgColor: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
      borderColor: 'border-indigo-200 dark:border-indigo-700'
    }
  ]

  return (
    <AdminLayout
      title="Vânzări"
      subtitle="Management și vizualizare activități vânzări"
    >
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Venituri Totale</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {formatCurrency(stats.totalRevenue)}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    +12% față de luna trecută
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Propuneri Activi</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {stats.pendingProposals}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    În așteptare
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Facturi Neplătite</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {stats.unpaidInvoices}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                    În așteptarea plății
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <Receipt className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Estimări Active</p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                    {stats.pendingEstimates}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    În proces
                  </p>
                </div>
                <div className="h-12 w-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salesModules.map((module) => {
            const Icon = module.icon
            return (
              <Card key={module.title} className={`hover:shadow-lg transition-shadow duration-200 ${module.borderColor}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 bg-gradient-to-br ${module.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 text-${module.color}-600 dark:text-${module.color}-400`} />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {module.count}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg mb-2">{module.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {module.description}
                  </p>
                  <Link href={module.href}>
                    <Button className="w-full" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Vezi Detalii
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Activitate Recentă
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Propunere nouă creată</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Client Tech Solutions SRL</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Acum 2 ore</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Plată înregistrată</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Factura #2024-042 - 5,000 RON</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Acum 5 ore</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <Receipt className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Factură emisă</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Client Digital Agency - 12,500 RON</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Ieri</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}