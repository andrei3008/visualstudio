'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon, Clock, DollarSign, Target, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectRequestData {
  name: string
  description: string
  category: string
  budget: string
  timeline: string
  requirements: string
  deliverables: string
  targetAudience: string
  technicalRequirements: string
}

interface ProjectRequestFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ProjectRequestForm({ onSuccess, onCancel }: ProjectRequestFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<ProjectRequestData>({
    name: '',
    description: '',
    category: '',
    budget: '',
    timeline: '',
    requirements: '',
    deliverables: '',
    targetAudience: '',
    technicalRequirements: ''
  })

  const handleInputChange = (field: keyof ProjectRequestData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Numele proiectului este obligatoriu'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrierea este obligatorie'
    }

    if (!formData.category) {
      newErrors.category = 'Selectați o categorie'
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Cerințele sunt obligatorii'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/projects/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        onSuccess?.()
        router.push('/app/projects?request_submitted=true')
      } else {
        const error = await response.json()
        setErrors({ submit: error.error || 'A apărut o eroare la trimiterea cererii' })
      }
    } catch (error) {
      setErrors({ submit: 'A apărut o eroare de rețea. Încercați din nou.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-xl">Cerere Proiect Nou</CardTitle>
            <CardDescription>
              Completează formularul pentru a iniția o nouă cerere de proiect
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informații Generale */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informații Generale
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nume Proiect *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ex: Website Redesign"
                  className={cn(errors.name && "border-red-500")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categorie Proiect *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger className={cn(errors.category && "border-red-500")}>
                    <SelectValue placeholder="Selectează categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="mobile-app">Aplicație Mobilă</SelectItem>
                    <SelectItem value="web-app">Aplicație Web</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="design">Design/UI/UX</SelectItem>
                    <SelectItem value="marketing">Marketing Digital</SelectItem>
                    <SelectItem value="seo">SEO & Content</SelectItem>
                    <SelectItem value="other">Altceva</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descriere Proiect *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descrie pe larg proiectul tău, obiectivele și scopul..."
                rows={4}
                className={cn(errors.description && "border-red-500")}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Buget și Timp */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Buget și Timp
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budget">Buget Estimativ</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleInputChange('budget', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează bugetul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1000">Sub 1.000 EUR</SelectItem>
                    <SelectItem value="1000-3000">1.000 - 3.000 EUR</SelectItem>
                    <SelectItem value="3000-5000">3.000 - 5.000 EUR</SelectItem>
                    <SelectItem value="5000-10000">5.000 - 10.000 EUR</SelectItem>
                    <SelectItem value="10000-20000">10.000 - 20.000 EUR</SelectItem>
                    <SelectItem value="over-20000">Peste 20.000 EUR</SelectItem>
                    <SelectItem value="flexible">Flexibil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Timp Estimativ</Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => handleInputChange('timeline', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează durata" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent (sub 2 săptămâni)</SelectItem>
                    <SelectItem value="short">Scurt (2-4 săptămâni)</SelectItem>
                    <SelectItem value="medium">Mediu (1-2 luni)</SelectItem>
                    <SelectItem value="long">Lung (2-4 luni)</SelectItem>
                    <SelectItem value="extended">Extins (4+ luni)</SelectItem>
                    <SelectItem value="flexible">Flexibil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Cerințe și Livrabile */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5" />
              Cerințe și Livrabile
            </h3>

            <div className="space-y-2">
              <Label htmlFor="requirements">Cerințe Specifice *</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                placeholder="Descrie cerințele tehnice și funcționale specifice..."
                rows={4}
                className={cn(errors.requirements && "border-red-500")}
              />
              {errors.requirements && (
                <p className="text-sm text-red-500">{errors.requirements}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliverables">Livrabile Așteptate</Label>
              <Textarea
                id="deliverables"
                value={formData.deliverables}
                onChange={(e) => handleInputChange('deliverables', e.target.value)}
                placeholder="Ce livrabile specifice te aștepți (website, aplicație, design-uri, etc.)..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Public Țintă</Label>
              <Textarea
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="Cine sunt utilizatorii finali ai proiectului..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technicalRequirements">Cerințe Tehnice</Label>
              <Textarea
                id="technicalRequirements"
                value={formData.technicalRequirements}
                onChange={(e) => handleInputChange('technicalRequirements', e.target.value)}
                placeholder="Specificății tehnice, platforme, tehnologii preferate..."
                rows={3}
              />
            </div>
          </div>

          {/* Eroare generală */}
          {errors.submit && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-700 dark:text-red-300">{errors.submit}</p>
            </div>
          )}

          {/* Butoane */}
          <div className="flex gap-4 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
                className="flex-1"
              >
                Anulează
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Se trimite...' : 'Trimite Cererea'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}