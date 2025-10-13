"use client"
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  FileText,
  Calendar,
  Clock,
  Target,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  User,
  Mail,
  Phone
} from 'lucide-react'

interface ProposalItem {
  id: string
  description: string
  qty: number
  unitPriceCents: number
}

interface Proposal {
  id: string
  title: string
  description: string
  status: string
  submittedAt?: string
  approvedAt?: string
  publicToken: string
  items: ProposalItem[]
  aiGeneratedTasks?: {
    estimatedTimeline?: string
    estimatedStartDate?: string
    estimatedEndDate?: string
    deliverables?: string[]
  }
  clientFeedback?: any
  project?: {
    name: string
    description: string
    requestDetails?: any
  }
}

interface ProposalViewProps {
  proposal: Proposal
  canApprove?: boolean
  onApprove?: () => void
  onReject?: (reason: string) => void
  loading?: boolean
}

export default function ProposalView({
  proposal,
  canApprove = false,
  onApprove,
  onReject,
  loading = false
}: ProposalViewProps) {
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate totals
  const subtotal = proposal.items.reduce((sum, item) => sum + (item.qty * item.unitPriceCents), 0)
  const vat = subtotal * 0.19 // 19% TVA
  const total = subtotal + vat

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON'
    }).format(amount / 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-300'
      case 'client_review':
        return 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900 dark:text-amber-300'
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300'
      case 'client_rejected':
        return 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted': return 'Trimisă'
      case 'client_review': return 'În Revizuire Client'
      case 'approved': return 'Aprobată'
      case 'client_rejected': return 'Respinsă de Client'
      default: return status
    }
  }

  const handleApprove = async () => {
    if (!onApprove) return

    setIsSubmitting(true)
    try {
      await onApprove()
      toast.success('Propunere aprobată cu succes!')
    } catch (error) {
      toast.error('Eroare la aprobarea propunerii')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error('Vă rugăm specificați motivul respingerii')
      return
    }

    if (!onReject) return

    setIsSubmitting(true)
    try {
      await onReject(rejectReason.trim())
      setShowRejectModal(false)
      setRejectReason('')
      toast.success('Feedback trimis cu succes!')
    } catch (error) {
      toast.error('Eroare la trimiterea feedback-ului')
    } finally {
      setIsSubmitting(false)
    }
  }

  const downloadPDF = () => {
    window.open(`/api/proposals/public/${proposal.publicToken}/pdf`, '_blank')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{proposal.title}</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Proiect: <span className="font-medium">{proposal.project?.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(proposal.status)}>
                {getStatusLabel(proposal.status)}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadPDF}
                disabled={loading}
              >
                <Download className="h-4 w-4 mr-2" />
                Descarcă PDF
              </Button>
            </div>
          </div>

          {/* Timeline Info */}
          {proposal.submittedAt && (
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Trimis: {new Date(proposal.submittedAt).toLocaleDateString('ro-RO')}
              </div>
              {proposal.approvedAt && (
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Aprobat: {new Date(proposal.approvedAt).toLocaleDateString('ro-RO')}
                </div>
              )}
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Descriere Propunere
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {proposal.description}
          </p>
        </CardContent>
      </Card>

      {/* Items and Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Detalii Preț
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proposal.items.map((item, index) => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{item.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cantitate: {item.qty} × {formatCurrency(item.unitPriceCents)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">
                    {formatCurrency(item.qty * item.unitPriceCents)}
                  </p>
                </div>
              </div>
            ))}

            <Separator />

            <div className="space-y-2 pt-4">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>TVA (19%):</span>
                <span>{formatCurrency(vat)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-green-600 dark:text-green-400">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline and Deliverables */}
      {proposal.aiGeneratedTasks && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timeline și Livrabile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proposal.aiGeneratedTasks.estimatedTimeline && (
                <div>
                  <h4 className="font-medium mb-2">Timeline Estimat</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {proposal.aiGeneratedTasks.estimatedTimeline}
                  </p>
                </div>
              )}

              {(proposal.aiGeneratedTasks.estimatedStartDate || proposal.aiGeneratedTasks.estimatedEndDate) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {proposal.aiGeneratedTasks.estimatedStartDate && (
                    <div>
                      <h4 className="font-medium mb-2">Dată Început Estimată</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {new Date(proposal.aiGeneratedTasks.estimatedStartDate).toLocaleDateString('ro-RO')}
                      </p>
                    </div>
                  )}
                  {proposal.aiGeneratedTasks.estimatedEndDate && (
                    <div>
                      <h4 className="font-medium mb-2">Dată Finalizare Estimată</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {new Date(proposal.aiGeneratedTasks.estimatedEndDate).toLocaleDateString('ro-RO')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {proposal.aiGeneratedTasks.deliverables && proposal.aiGeneratedTasks.deliverables.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Livrabile
                  </h4>
                  <ul className="space-y-2">
                    {proposal.aiGeneratedTasks.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-400">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Client Feedback (if rejected) */}
      {proposal.status === 'client_rejected' && proposal.clientFeedback && (
        <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <XCircle className="h-5 w-5" />
              Feedback Client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 dark:text-red-400 whitespace-pre-line">
              {proposal.clientFeedback}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {canApprove && proposal.status === 'client_review' && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Acțiune necesară</h3>
              </div>

              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Propunerea este pregătită pentru review. Puteți aproba propunerea pentru a continua cu proiectul
                sau puteți trimite feedback dacă sunt necesare modificări.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleApprove}
                  disabled={isSubmitting || loading}
                  className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-initial"
                  size="lg"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Se procesează...' : 'Aprobă Propunerea'}
                </Button>

                <Button
                  onClick={() => setShowRejectModal(true)}
                  disabled={isSubmitting || loading}
                  variant="outline"
                  className="flex-1 sm:flex-initial"
                  size="lg"
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Trimite Feedback
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-lg">Trimite Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Specificați motivele pentru care respingeți propunerea sau ce modificări sunt necesare.
                </p>

                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Descrieți motivul respingerii sau modificările necesare..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                  rows={4}
                />

                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowRejectModal(false)}
                    variant="outline"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Anulează
                  </Button>
                  <Button
                    onClick={handleReject}
                    className="flex-1"
                    disabled={isSubmitting || !rejectReason.trim()}
                  >
                    {isSubmitting ? 'Se trimite...' : 'Trimite Feedback'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}