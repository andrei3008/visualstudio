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
  Wrench,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Clock,
  DollarSign,
  Settings,
  Zap,
  Code,
  Palette,
  Globe,
  Shield,
  CheckCircle,
  XCircle
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

interface PageProps {
  searchParams: {
    page?: string
    limit?: string
    search?: string
    category?: string
    isPublic?: string
  }
}

const categoryConfig = {
  development: { label: 'Dezvoltare', color: 'bg-blue-500', icon: Code },
  design: { label: 'Design', color: 'bg-purple-500', icon: Palette },
  consulting: { label: 'Consulting', color: 'bg-green-500', icon: Settings },
  maintenance: { label: 'Mentenanță', color: 'bg-orange-500', icon: Shield },
  marketing: { label: 'Marketing', color: 'bg-pink-500', icon: Globe },
  other: { label: 'Altele', color: 'bg-gray-500', icon: Settings }
}

const serviceIconMap = {
  development: '💻',
  design: '🎨',
  consulting: '📊',
  maintenance: '🔧',
  marketing: '📈',
  other: '📦'
}

export default async function AdminServicesPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
  if (u?.role !== 'admin') redirect('/app')

  // Parse pagination parameters
  const currentPage = parseInt(searchParams.page || '1')
  const limit = parseInt(searchParams.limit || '25')
  const search = searchParams.search || ''
  const category = searchParams.category || ''
  const isPublic = searchParams.isPublic || ''

  // Calculate pagination
  const skip = (currentPage - 1) * limit

  // Build where clause for filtering
  const whereClause: any = {}
  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { category: { contains: search, mode: 'insensitive' } }
    ]
  }
  if (category && category !== 'all') {
    whereClause.category = category
  }
  if (isPublic !== 'all' && isPublic !== '') {
    whereClause.isPublic = isPublic === 'true'
  }

  // Fetch services with pagination and filtering
  const [services, totalCount] = await Promise.all([
    prisma.service.findMany({
      where: whereClause,
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: {
            invoiceItems: true
          }
        }
      },
      skip,
      take: limit
    }),
    prisma.service.count({ where: whereClause })
  ])

  const totalPages = Math.ceil(totalCount / limit)

  // Calculate stats
  const [totalServices, publicServices, developmentServices, designServices, avgPrice, usedServices] = await Promise.all([
    prisma.service.count(),
    prisma.service.count({ where: { isPublic: true } }),
    prisma.service.count({ where: { category: 'development' } }),
    prisma.service.count({ where: { category: 'design' } }),
    prisma.service.aggregate({
      _avg: {
        priceCents: true
      }
    }),
    prisma.service.count({
      where: {
        invoiceItems: {
          some: {}
        }
      }
    })
  ])

  const averagePrice = avgPrice._avg.priceCents ? avgPrice._avg.priceCents / 100 : 0

  return (
    <AdminLayout
      title="Management Servicii"
      subtitle="Vizualizare și gestionare catalog servicii"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportă
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Serviciu Nou
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
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{totalServices}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Servicii Totale</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">În catalog</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{publicServices}</div>
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
                <Code className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{developmentServices}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Dezvoltare</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Servicii tech</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl shadow-lg">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{designServices}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Design</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Servicii creative</p>
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
                ${averagePrice.toLocaleString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Preț Mediu</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Per serviciu</p>
            </CardContent>
          </div>
        </Card>

        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 shadow-xl">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{usedServices}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Utilizate</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">În facturi</p>
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
                placeholder="Caută servicii după nume, descriere, categorie..."
                className="pl-10 h-12 border-gray-200 dark:border-gray-700"
                defaultValue={search}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue={category}>
                <SelectTrigger className="h-12 w-48">
                  <SelectValue placeholder="Categorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate Categoriile</SelectItem>
                  {Object.entries(categoryConfig).map(([key, config]) => (
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
          <span className="font-medium">{totalCount}</span> servicii
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

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {services.map((service) => {
          const categoryConfigData = categoryConfig[service.category as keyof typeof categoryConfig] || categoryConfig.other
          const CategoryIcon = categoryConfigData.icon
          const features = Array.isArray(service.features) ? service.features : []

          return (
            <Card key={service.id} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <div className="absolute top-0 right-0 p-2">
                {service.isPublic ? (
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
                    <div className={`p-3 bg-gradient-to-br ${categoryConfigData.color.replace('bg-', 'from-')} to-${categoryConfigData.color.replace('bg-', 'to-')} rounded-xl shadow-lg`}>
                      <CategoryIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {service.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {categoryConfigData.label}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    ${(service.priceCents / 100).toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {service.duration ? `/ ${service.duration}h` : '/ serviciu'}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <CardDescription className="text-sm line-clamp-3">
                    {service.description}
                  </CardDescription>

                  {features.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">Caracteristici:</h4>
                      <ul className="space-y-1">
                        {features.slice(0, 3).map((feature: any, index: number) => (
                          <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                        {features.length > 3 && (
                          <li className="text-xs text-gray-500 dark:text-gray-400">
                            +{features.length - 3} mai multe caracteristici
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600 dark:text-gray-400">
                      Moneda: <span className="font-medium">{service.currency}</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Folosit: <span className="font-medium">{service._count.invoiceItems}x</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="ghost" size="sm" asChild className="flex-1">
                      <Link href={`/app/admin/sales/services/${service.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Vizualizează
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="flex-1">
                      <Link href={`/app/admin/sales/services/${service.id}/edit`}>
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
            <Wrench className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Tabel Servicii
          </CardTitle>
          <CardDescription>
            Toate serviciile din catalog ({totalCount})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Serviciu</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Categorie</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Preț</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Durată</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Folosit</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Vizibilitate</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => {
                  const categoryConfigData = categoryConfig[service.category as keyof typeof categoryConfig] || categoryConfig.other

                  return (
                    <tr key={service.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-150">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 bg-gradient-to-br ${categoryConfigData.color.replace('bg-', 'from-')} to-${categoryConfigData.color.replace('bg-', 'to-')} rounded-lg shadow-lg`}>
                            <span className="text-lg">{serviceIconMap[service.category as keyof typeof serviceIconMap] || '📦'}</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {service.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${categoryConfigData.color} text-white border-0`}>
                          {categoryConfigData.label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white">
                            ${(service.priceCents / 100).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{service.currency}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white">
                            {service.duration || '-'}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {service.duration ? 'ore' : ''}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="font-bold text-blue-600 dark:text-blue-400">{service._count.invoiceItems}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={service.isPublic ? 'bg-green-500 text-white border-0' : 'bg-gray-500 text-white border-0'}>
                          {service.isPublic ? 'Public' : 'Privat'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/sales/services/${service.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/app/admin/sales/services/${service.id}/edit`}>
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