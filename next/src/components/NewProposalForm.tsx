"use client"
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import {
  Plus,
  Trash2,
  Calendar,
  Clock,
  Target,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface ProposalItem {
  id: string
  description: string
  qty: number
  unitPrice: number
}

interface ProposalFormProps {
  projectId: string
  projectStatus?: string
}

export default function NewProposalForm({ projectId, projectStatus }: ProposalFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    adminNotes: '',
    estimatedTimeline: '',
    estimatedStartDate: '',
    estimatedEndDate: '',
    deliverables: [] as string[],
    status: 'draft' as 'draft' | 'submitted'
  })

  const [items, setItems] = useState<ProposalItem[]>([
    { id: '1', description: '', qty: 1, unitPrice: 0 }
  ])

  const [newDeliverable, setNewDeliverable] = useState('')
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0)
  const vat = subtotal * 0.19 // 19% TVA
  const total = subtotal + vat

  const addItem = () => {
    setItems([...items, {
      id: Date.now().toString(),
      description: '',
      qty: 1,
      unitPrice: 0
    }])
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id: string, field: keyof ProposalItem, value: string | number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setFormData(prev => ({
        ...prev,
        deliverables: [...prev.deliverables, newDeliverable.trim()]
      }))
      setNewDeliverable('')
    }
  }

  const removeDeliverable = (index: number) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index)
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON'
    }).format(amount)
  }

  const isFormValid = () => {
    return formData.title.trim() &&
           formData.description.trim() &&
           items.some(item => item.description.trim() && item.qty > 0 && item.unitPrice > 0)
  }

  const canSubmit = projectStatus === 'request' || projectStatus === 'proposal_review'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) {
      toast.error('Vă rugăm completați toate câmpurile obligatorii')
      return
    }

    if (!canSubmit) {
      toast.error('Propunerile pot fi create doar pentru proiecte în status "request" sau "proposal_review"')
      return
    }

    startTransition(async () => {
      try {
        const validItems = items.filter(item =>
          item.description.trim() && item.qty > 0 && item.unitPrice > 0
        )

        const payload = {
          title: formData.title.trim(),
          description: formData.description.trim(),
          adminNotes: formData.adminNotes.trim(),
          estimatedTimeline: formData.estimatedTimeline.trim(),
          estimatedStartDate: formData.estimatedStartDate || null,
          estimatedEndDate: formData.estimatedEndDate || null,
          deliverables: formData.deliverables,
          items: validItems,
          status: formData.status
        }

        const res = await fetch(`/api/projects/${projectId}/proposals`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        })

        const data = await res.json()

        if (res.ok) {
          toast.success(formData.status === 'submitted'
            ? 'Propunere trimisă clientului pentru review!'
            : 'Propunere salvată ca draft')

          // Reset form
          setFormData({
            title: '',
            description: '',
            adminNotes: '',
            estimatedTimeline: '',
            estimatedStartDate: '',
            estimatedEndDate: '',
            deliverables: [],
            status: 'draft'
          })
          setItems([{ id: '1', description: '', qty: 1, unitPrice: 0 }])

          router.refresh()
        } else {
          toast.error(data?.error || 'Crearea propunerii a eșuat')
        }
      } catch (error) {
        console.error('Error creating proposal:', error)
        toast.error('Eroare la crearea propunerii')
      }
    })
  }

  if (!canSubmit) {
    return (
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">
              Propunerile pot fi create doar pentru proiecte în status "request" sau "proposal_review".
              Status actual: <Badge variant="outline">{projectStatus}</Badge>
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Creare Propunere Proiect
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informații Generale</h3>

              <div>
                <Label htmlFor="title">Titlu Propunere *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Titlu propunere"
                  disabled={pending}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descriere *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descriere detaliată a propunerii..."
                  rows={4}
                  disabled={pending}
                  required
                />
              </div>

              <div>
                <Label htmlFor="adminNotes">Note Admin (doar intern)</Label>
                <Textarea
                  id="adminNotes"
                  value={formData.adminNotes}
                  onChange={(e) => setFormData(prev => ({ ...prev, adminNotes: e.target.value }))}
                  placeholder="Note interne pentru echipa admin..."
                  rows={2}
                  disabled={pending}
                />
              </div>
            </div>

            {/* Timeline and Dates */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Timeline și Termene
              </h3>

              <div>
                <Label htmlFor="estimatedTimeline">Timeline Estimat</Label>
                <Textarea
                  id="estimatedTimeline"
                  value={formData.estimatedTimeline}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedTimeline: e.target.value }))}
                  placeholder="Ex: 6-8 săptămâni, în funcție de complexitatea cerințelor..."
                  rows={2}
                  disabled={pending}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estimatedStartDate">Dată Început Estimată</Label>
                  <Input
                    id="estimatedStartDate"
                    type="date"
                    value={formData.estimatedStartDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedStartDate: e.target.value }))}
                    disabled={pending}
                  />
                </div>
                <div>
                  <Label htmlFor="estimatedEndDate">Dată Finalizare Estimată</Label>
                  <Input
                    id="estimatedEndDate"
                    type="date"
                    value={formData.estimatedEndDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedEndDate: e.target.value }))}
                    disabled={pending}
                  />
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5" />
                Livrabile
              </h3>

              <div className="flex gap-2">
                <Input
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  placeholder="Adaugă un livrabil..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDeliverable())}
                  disabled={pending}
                />
                <Button type="button" onClick={addDeliverable} disabled={pending}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.deliverables.length > 0 && (
                <div className="space-y-2">
                  {formData.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-2 rounded">
                      <span className="text-sm">{deliverable}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDeliverable(index)}
                        disabled={pending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Items and Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Items și Prețuri
              </h3>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <Card key={item.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
                      <div className="md:col-span-2">
                        <Label>Descriere Item *</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Descriere serviciu/produs..."
                          disabled={pending}
                        />
                      </div>
                      <div>
                        <Label>Cantitate *</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 1)}
                          disabled={pending}
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label>Preț Unitar (RON) *</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            disabled={pending}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          disabled={pending || items.length === 1}
                          className="mt-6"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-right text-sm text-gray-600 dark:text-gray-400">
                      Total: {formatCurrency(item.qty * item.unitPrice)}
                    </div>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addItem}
                  disabled={pending}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adaugă Item
                </Button>
              </div>

              {/* Pricing Summary */}
              <Card className="bg-slate-50 dark:bg-slate-800">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TVA (19%):</span>
                      <span>{formatCurrency(vat)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-green-600 dark:text-green-400">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Submit Actions */}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={pending || !isFormValid()}
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {pending ? 'Se creează...' : formData.status === 'submitted'
                  ? 'Trimite Propunerea'
                  : 'Salvează ca Draft'
                }
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData(prev => ({ ...prev, status: prev.status === 'draft' ? 'submitted' : 'draft' }))}
                disabled={pending || !isFormValid()}
              >
                {formData.status === 'draft' ? 'Trimite Direct' : 'Salvează Draft'}
              </Button>
            </div>

            {formData.status === 'submitted' && (
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Propunerea va fi trimisă clientului pentru review</span>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}