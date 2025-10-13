'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '../../../../components/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  DollarSign,
  Clock,
  Plus,
  X,
  Save,
  ArrowLeft,
  Target,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectRequest {
  id: string
  name: string
  description: string
  requestDetails: any
  user: {
    email: string
    name: string | null
  }
  createdAt: string
}

interface ProposalItem {
  id: string
  description: string
  qty: number
  unitPrice: number
  total: number
}

interface ProposalData {
  title: string
  description: string
  items: ProposalItem[]
  adminNotes: string
  estimatedTimeline: string
  estimatedStartDate: string
  estimatedEndDate: string
  deliverables: string[]
}

export default function AdminCreateProposalPage({ params }: { params: { projectId: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projectRequest, setProjectRequest] = useState<ProjectRequest | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [proposalData, setProposalData] = useState<ProposalData>({
    title: '',
    description: '',
    items: [],
    adminNotes: '',
    estimatedTimeline: '',
    estimatedStartDate: '',
    estimatedEndDate: '',
    deliverables: []
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (status === 'authenticated') {
      fetchProjectRequest()
    }
  }, [status, router, params.projectId])

  const fetchProjectRequest = async () => {
    try {
      const response = await fetch(`/api/projects/${params.projectId}/request-details`)
      if (response.ok) {
        const data = await response.json()
        setProjectRequest(data)

        // Pre-fill some proposal data based on request
        setProposalData(prev => ({
          ...prev,
          title: `Propunere pentru ${data.name}`,
          description: `Propunere detaliată pentru proiectul "${data.name}" bazată pe cererea clientului.`,
          estimatedStartDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Start in 1 week
        }))
      } else {
        router.push('/app/admin')
      }
    } catch (error) {
      console.error('Error fetching project request:', error)
      router.push('/app/admin')
    }
  }

  const addProposalItem = () => {
    const newItem: ProposalItem = {
      id: Date.now().toString(),
      description: '',
      qty: 1,
      unitPrice: 0,
      total: 0
    }
    setProposalData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const updateProposalItem = (id: string, field: keyof ProposalItem, value: string | number) => {
    setProposalData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === 'description' || field === 'qty' || field === 'unitPrice') {
            updated.total = (updated.qty || 0) * (updated.unitPrice || 0)
          }
          return updated
        }
        return item
      })
    }))
  }

  const removeProposalItem = (id: string) => {
    setProposalData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const calculateTotal = () => {
    return proposalData.items.reduce((sum, item) => sum + item.total, 0)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!proposalData.title.trim()) {
      newErrors.title = 'Titlul este obligatoriu'
    }

    if (!proposalData.description.trim()) {
      newErrors.description = 'Descrierea este obligatorie'
    }

    if (proposalData.items.length === 0) {
      newErrors.items = 'Adaugă cel puțin un item în propunere'
    } else {
      proposalData.items.forEach((item, index) => {
        if (!item.description.trim()) {
          newErrors[`item_${index}_description`] = 'Descrierea este obligatorie'
        }
        if (!item.qty || item.qty <= 0) {
          newErrors[`item_${index}_qty`] = 'Cantitatea trebuie să fie pozitivă'
        }
        if (!item.unitPrice || item.unitPrice <= 0) {
          newErrors[`item_${index}_price`] = 'Prețul trebuie să fie pozitiv'
        }
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveDraft = async () => {
    if (!validateForm()) return

    setSaving(true)
    try {
      const response = await fetch(`/api/projects/${params.projectId}/proposals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...proposalData,
          status: 'draft'
        }),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/app/admin/proposals/${result.proposal.id}`)
      } else {
        const error = await response.json()
        setErrors({ submit: error.error || 'A apărut o eroare la salvarea propunerii' })
      }
    } catch (error) {
      setErrors({ submit: 'A apărut o eroare de rețea. Încercați din nou.' })
    } finally {
      setSaving(false)
    }
  }

  const submitProposal = async () => {
    if (!validateForm()) return

    setSaving(true)
    try {
      const response = await fetch(`/api/projects/${params.projectId}/proposals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...proposalData,
          status: 'submitted'
        }),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/app/admin/proposals/${result.proposal.id}?submitted=true`)
      } else {
        const error = await response.json()
        setErrors({ submit: error.error || 'A apărut o eroare la trimiterea propunerii' })
      }
    } catch (error) {
      setErrors({ submit: 'A apărut o eroare de rețea. Încercați din nou.' })
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <DashboardLayout title="Încărcare..." subtitle="Se procesează solicitarea">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Se încarcă...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!projectRequest) {
    return (
      <DashboardLayout title="Eroare" subtitle="Cererea de proiect nu a fost găsită">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Cererea de proiect nu a fost găsită sau a fost deja procesată.
          </p>
          <Button asChild>
            <Link href="/app/admin">Înapoi la Admin Panel</Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Creează Propunere"
      subtitle={`Pentru proiectul: ${projectRequest.name}`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Project Request Info */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
                    Detalii Cerere
                  </CardTitle>
                  <CardDescription className="text-blue-700 dark:text-blue-300">
                    {projectRequest.user.name || projectRequest.user.email} • {new Date(projectRequest.createdAt).toLocaleDateString('ro-RO')}
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-300">
                {projectRequest.requestDetails?.category || 'N/A'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Buget Estimativ:</p>
                <p className="text-blue-700 dark:text-blue-300">{projectRequest.requestDetails?.budget || 'Nu specificat'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Timp Estimativ:</p>
                <p className="text-blue-700 dark:text-blue-300">{projectRequest.requestDetails?.timeline || 'Nu specificat'}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Descriere Cerere:</p>
              <p className="text-blue-700 dark:text-blue-300 text-sm">{projectRequest.description}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Cerințe Specifice:</p>
              <p className="text-blue-700 dark:text-blue-300 text-sm whitespace-pre-line">
                {projectRequest.requestDetails?.requirements || 'N/A'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Proposal Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Detalii Propunere
            </CardTitle>
            <CardDescription>
              Completează detaliile propunerii pentru client
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Informații</TabsTrigger>
                <TabsTrigger value="items">Iteme Propunere</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="notes">Note Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titlu Propunere *</Label>
                  <Input
                    id="title"
                    value={proposalData.title}
                    onChange={(e) => setProposalData(prev => ({ ...prev, title: e.target.value }))}
                    className={cn(errors.title && "border-red-500")}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descriere Propunere *</Label>
                  <Textarea
                    id="description"
                    value={proposalData.description}
                    onChange={(e) => setProposalData(prev => ({ ...prev, description: e.target.value }))}
                    rows={6}
                    className={cn(errors.description && "border-red-500")}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="items" className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Iteme Propunere</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Adaugă iteme detaliate pentru propunere
                    </p>
                  </div>
                  <Button onClick={addProposalItem} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adaugă Item
                  </Button>
                </div>

                {errors.items && (
                  <p className="text-sm text-red-500">{errors.items}</p>
                )}

                <div className="space-y-3">
                  {proposalData.items.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Item #{index + 1}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeProposalItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor={`item-${index}-description`}>Descriere *</Label>
                          <Input
                            id={`item-${index}-description`}
                            value={item.description}
                            onChange={(e) => updateProposalItem(item.id, 'description', e.target.value)}
                            placeholder="Ex: Design homepage responsive"
                            className={cn(errors[`item_${index}_description`] && "border-red-500")}
                          />
                          {errors[`item_${index}_description`] && (
                            <p className="text-sm text-red-500">{errors[`item_${index}_description`]}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`item-${index}-qty`}>Cantitate *</Label>
                          <Input
                            id={`item-${index}-qty`}
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => updateProposalItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                            className={cn(errors[`item_${index}_qty`] && "border-red-500")}
                          />
                          {errors[`item_${index}_qty`] && (
                            <p className="text-sm text-red-500">{errors[`item_${index}_qty`]}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`item-${index}-price`}>Preț Unitar (EUR) *</Label>
                          <Input
                            id={`item-${index}-price`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => updateProposalItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className={cn(errors[`item_${index}_price`] && "border-red-500")}
                          />
                          {errors[`item_${index}_price`] && (
                            <p className="text-sm text-red-500">{errors[`item_${index}_price`]}</p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-medium">Total: {(item.total / 100).toFixed(2)} EUR</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Propunere:</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {(calculateTotal() / 100).toFixed(2)} EUR
                    </span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4 mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data Început Estimată</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={proposalData.estimatedStartDate}
                      onChange={(e) => setProposalData(prev => ({ ...prev, estimatedStartDate: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data Finalizare Estimată</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={proposalData.estimatedEndDate}
                      onChange={(e) => setProposalData(prev => ({ ...prev, estimatedEndDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline Estimativ</Label>
                  <Textarea
                    id="timeline"
                    value={proposalData.estimatedTimeline}
                    onChange={(e) => setProposalData(prev => ({ ...prev, estimatedTimeline: e.target.value }))}
                    placeholder="Ex: 4 săptămâni - 2 săptămâni design, 2 săptămâni dezvoltare"
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="adminNotes">Note Interne Admin</Label>
                  <Textarea
                    id="adminNotes"
                    value={proposalData.adminNotes}
                    onChange={(e) => setProposalData(prev => ({ ...prev, adminNotes: e.target.value }))}
                    placeholder="Note interne pentru echipă (nu vor fi vizibile clientului)..."
                    rows={6}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {errors.submit && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-6">
                <p className="text-red-700 dark:text-red-300">{errors.submit}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => router.push('/app/admin')}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anulează
              </Button>

              <Button
                onClick={saveDraft}
                disabled={saving}
                variant="outline"
                className="flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Se salvează...' : 'Salvează Draft'}
              </Button>

              <Button
                onClick={submitProposal}
                disabled={saving}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {saving ? 'Se trimite...' : 'Trimite Clientului'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}