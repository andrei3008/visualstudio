import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowLeft,
  Save,
  FileText,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  User,
  FolderOpen,
  Eye,
  Edit,
  Download,
  Mail,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
import AdminLayout from '../../../components/AdminLayout'

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditProposalPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true }
  })
  if (currentUser?.role !== 'admin') redirect('/app')

  const proposal = await prisma.proposal.findUnique({
    where: { id: params.id },
    include: {
      project: {
        select: {
          id: true,
          name: true,
          user: {
            select: {
              email: true,
              name: true
            }
          }
        }
      },
      items: {
        orderBy: { createdAt: 'asc' }
      }
    }
  })

  if (!proposal) {
    notFound()
  }

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

  const calculateTotal = () => {
    return proposal.items.reduce((sum, item) => sum + (item.qty * item.unitPriceCents), 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON'
    }).format(amount / 100)
  }

  return (
    <AdminLayout
      title="Editare Propunere"
      subtitle="Modifică detaliile și setările propunerii"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/app/admin/proposals">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi la Propuneri
            </Link>
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Proposal Info Card */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Informații Propunere
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {proposal.title}
                </h3>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <FolderOpen className="h-4 w-4" />
                  <span>{proposal.project.name}</span>
                </div>
                <Badge className={`w-fit mx-auto text-xs ${getStatusColor(proposal.status)}`}>
                  {getStatusIcon(proposal.status)}
                  <span className="ml-1">{getStatusLabel(proposal.status)}</span>
                </Badge>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total:</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(calculateTotal())}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Iteme:</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {proposal.items.length}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Client
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{proposal.project.user.name || proposal.project.user.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Creată la
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(proposal.createdAt).toLocaleDateString('ro-RO')}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Acțiuni Rapide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Vizualizare Propunere
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Descarcă PDF
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Trimite Email
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Istoric Modificări
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-green-600 dark:text-green-400" />
                Editare Detalii
              </CardTitle>
              <CardDescription>
                Modifică informațiile și setările propunerii
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gray-500" />
                    Informații de Bază
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="title">Titlu Propunere</Label>
                    <Input
                      id="title"
                      defaultValue={proposal.title}
                      placeholder="Introdu titlul propunerii"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descriere</Label>
                    <Textarea
                      id="description"
                      defaultValue={proposal.description || ''}
                      placeholder="Introdu descrierea propunerii"
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={proposal.status}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selectează statusul" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="submitted">Trimisă</SelectItem>
                        <SelectItem value="client_review">În Revizuire Client</SelectItem>
                        <SelectItem value="approved">Aprobată</SelectItem>
                        <SelectItem value="client_rejected">Respinsă de Client</SelectItem>
                        <SelectItem value="estimation_pending">Estimare Așteptată</SelectItem>
                        <SelectItem value="estimation_review">Estimare în Revizuire</SelectItem>
                        <SelectItem value="estimation_rejected">Estimare Respinsă</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Project Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-gray-500" />
                    Proiect
                  </h3>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <FolderOpen className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {proposal.project.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Client: {proposal.project.user.name || proposal.project.user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proposal Items */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-gray-500" />
                    Iteme Propunere
                  </h3>

                  <div className="space-y-3">
                    {proposal.items.map((item, index) => (
                      <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-500">Item #{index + 1}</span>
                          <Button variant="ghost" size="sm">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`item-${item.id}-description`}>Descriere</Label>
                            <Input
                              id={`item-${item.id}-description`}
                              defaultValue={item.description}
                              placeholder="Descriere serviciul"
                              className="h-10"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`item-${item.id}-quantity`}>Cantitate</Label>
                            <Input
                              id={`item-${item.id}-quantity`}
                              type="number"
                              defaultValue={item.qty}
                              placeholder="Cantitate"
                              className="h-10"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`item-${item.id}-unit`}>Unitate</Label>
                            <Input
                              id={`item-${item.id}-unit`}
                              defaultValue=""
                              placeholder="Unitate"
                              className="h-10"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`item-${item.id}-price`}>Preț Unitar (RON)</Label>
                            <Input
                              id={`item-${item.id}-price`}
                              type="number"
                              step="0.01"
                              defaultValue={(item.unitPriceCents / 100).toString()}
                              placeholder="Preț unitar"
                              className="h-10"
                            />
                          </div>
                        </div>

                        <div className="text-right text-sm font-medium text-gray-600 dark:text-gray-400">
                          Total: {formatCurrency(item.qty * item.unitPriceCents)}
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" size="sm" className="w-full">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Adaugă Item Nou
                    </Button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Total General:</span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Creată: {new Date(proposal.createdAt).toLocaleDateString('ro-RO')}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href="/app/admin/proposals">
                        Anulează
                      </Link>
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                      <Save className="h-4 w-4 mr-2" />
                      Salvează Modificările
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}