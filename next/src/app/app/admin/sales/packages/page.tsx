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
  Package,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Users,
  DollarSign,
  Star,
  CheckCircle,
  XCircle,
  Settings
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

interface PageProps {
  searchParams: {
    page?: string
    limit?: string
    search?: string
    type?: string
    isPublic?: string
  }
}

const packageTypeConfig = {
  basic: { label: 'Basic', color: 'bg-blue-500', icon: '📦' },
  growth: { label: 'Growth', color: 'bg-green-500', icon: '🚀' },
  pro: { label: 'Pro', color: 'bg-purple-500', icon: '⭐' }
}

export default async function AdminPackagesPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
  if (u?.role !== 'admin') redirect('/app')

  // Parse pagination parameters
  const currentPage = parseInt(searchParams.page || '1')
  const limit = parseInt(searchParams.limit || '25')
  const search = searchParams.search || ''
  const type = searchParams.type || ''
  const isPublic = searchParams.isPublic || ''

  // Calculate pagination
  const skip = (currentPage - 1) * limit

  // Build where clause for filtering
  const whereClause: any = {}
  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ]
  }
  if (type && type !== 'all') {
    whereClause.type = type
  }
  if (isPublic !== 'all' && isPublic !== '') {
    whereClause.isPublic = isPublic === 'true'
  }

  // Fetch packages with pagination and filtering
  const [packages, totalCount] = await Promise.all([
    prisma.maintenancePackage.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            subscriptions: true
          }
        }
      },
      skip,
      take: limit
    }),
    prisma.maintenancePackage.count({ where: whereClause })
  ])

  const totalPages = Math.ceil(totalCount / limit)

  // Calculate stats
  const [totalPackages, publicPackages, basicPackages, growthPackages, proPackages, totalSubscriptions] = await Promise.all([
    prisma.maintenancePackage.count(),
    prisma.maintenancePackage.count({ where: { isPublic: true } }),
    prisma.maintenancePackage.count({ where: { type: 'basic' } }),
    prisma.maintenancePackage.count({ where: { type: 'growth' } }),
    prisma.maintenancePackage.count({ where: { type: 'pro' } }),
    prisma.subscription.aggregate({
      _count: {
        id: true
      }
    })
  ])

  return (
    <AdminLayout
      title="Management Pachete"
      subtitle="Vizualizare și gestionare pachete de mentenanță"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportă
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Pachet Nou
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
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{totalPackages}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Pachete Totale</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Toate pachetele</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{publicPackages}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Publice</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">Vizibile clienți</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{basicPackages}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Basic</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Pachete de bază</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{growthPackages}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Growth</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">Pachete creștere</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl shadow-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{proPackages}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Pro</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Pachete premium</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-yellow-600 dark:text-yellow-400">{totalSubscriptions._count.id}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Abonamente</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Active</p>
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
                placeholder="Caută pachete după nume sau descriere..."
                className="pl-10 h-12 border-gray-200 dark:border-gray-700"
                defaultValue={search}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue={type}>
                <SelectTrigger className="h-12 w-48">
                  <SelectValue placeholder="Tip Pachet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate Tipurile</SelectItem>
                  {Object.entries(packageTypeConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue={isPublic}>
                <SelectTrigger className="h-12 w-48">
                  <SelectValue placeholder="Vizibilitate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="true">Public</SelectItem>
                  <SelectItem value="false">Privat</SelectItem>
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
          <span className="font-medium">{totalCount}</span> pachete
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

      {/* Packages Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {packages.map((pkg) => {
          const typeConfig = packageTypeConfig[pkg.type as keyof typeof packageTypeConfig]
          const features = Array.isArray(pkg.features) ? pkg.features : []

          return (
            <Card key={pkg.id} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <div className="absolute top-0 right-0 p-2">
                {pkg.isPublic ? (
                  <Badge className="bg-green-500 text-white border-0">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Public
                  </Badge>
                ) : (
                  <Badge className="bg-gray-500 text-white border-0">
                    <XCircle className="h-3 w-3 mr-1" />
                    Privat
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-gradient-to-br ${typeConfig.color.replace('bg-', 'from-')} to-${typeConfig.color.replace('bg-', 'to-')} rounded-xl shadow-lg`}>
                      <span className="text-2xl">{typeConfig.icon}</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {pkg.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {typeConfig.label}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    ${(pkg.priceCents / 100).toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">/lună</span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <CardDescription className="text-sm line-clamp-3">
                    {pkg.description}
                  </CardDescription>

                  {features.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">Caracteristici:</h4>
                      <ul className="space-y-1">
                        {features.slice(0, 4).map((feature: any, index: number) => (
                          <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                        {features.length > 4 && (
                          <li className="text-xs text-gray-500 dark:text-gray-400">
                            +{features.length - 4} mai multe caracteristici
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">{pkg.includedProjects}</span> proiecte incluse
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">{pkg._count.subscriptions}</span> abonamente
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="ghost" size="sm" asChild className="flex-1">
                      <Link href={`/app/admin/sales/packages/${pkg.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Vizualizează
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="flex-1">
                      <Link href={`/app/admin/sales/packages/${pkg.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editează
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Table View Alternative */}
      <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Tabel Pachete
          </CardTitle>
          <CardDescription>
            Toate pachetele de mentenanță ({totalCount})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Pachet</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Tip</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Preț</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Proiecte</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Abonamente</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Vizibilitate</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => {
                  const typeConfig = packageTypeConfig[pkg.type as keyof typeof packageTypeConfig]

                  return (
                    <tr key={pkg.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-150">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 bg-gradient-to-br ${typeConfig.color.replace('bg-', 'from-')} to-${typeConfig.color.replace('bg-', 'to-')} rounded-lg shadow-lg`}>
                            <span className="text-lg">{typeConfig.icon}</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {pkg.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {pkg.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${typeConfig.color} text-white border-0`}>
                          {typeConfig.label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white">
                            ${(pkg.priceCents / 100).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">/lună</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white">{pkg.includedProjects}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="font-bold text-blue-600 dark:text-blue-400">{pkg._count.subscriptions}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={pkg.isPublic ? 'bg-green-500 text-white border-0' : 'bg-gray-500 text-white border-0'}>
                          {pkg.isPublic ? 'Public' : 'Privat'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/sales/packages/${pkg.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/sales/packages/${pkg.id}/edit`}>
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