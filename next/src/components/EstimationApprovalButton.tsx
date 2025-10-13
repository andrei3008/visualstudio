'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface EstimationApprovalButtonProps {
  estimationId: string
  estimationTitle: string
  totalCost: number
}

export default function EstimationApprovalButton({
  estimationId,
  estimationTitle,
  totalCost
}: EstimationApprovalButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [clientNotes, setClientNotes] = useState('')
  const [createInvoice, setCreateInvoice] = useState(true)

  const handleApprove = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/estimations/${estimationId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          createInvoice,
          clientNotes: clientNotes.trim() || undefined,
          sendNotification: true
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to approve estimation')
      }

      toast.success(`Estimare aprobată cu succes!${data.invoice ? ` Factura ${data.invoice.invoiceNumber} a fost creată.` : ''}`)
      setIsOpen(false)

      // Refresh the page to show updated status
      window.location.reload()

    } catch (error) {
      console.error('Error approving estimation:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to approve estimation')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Aprobă
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Aprobare Estimare
          </DialogTitle>
          <DialogDescription>
            Sunteți pe cale să aprobați estimarea și să începeți proiectul.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Estimation Details */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {estimationTitle}
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Cost total:</span>
              <Badge variant="secondary" className="font-bold">
                ${totalCost.toLocaleString()}
              </Badge>
            </div>
          </div>

          {/* Client Notes */}
          <div className="space-y-2">
            <label htmlFor="clientNotes" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Note (opțional)
            </label>
            <Textarea
              id="clientNotes"
              placeholder="Adăugați note sau comentarii despre aprobare..."
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Aceste note vor fi salvate odată cu aprobarea
            </p>
          </div>

          {/* Invoice Creation Option */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="createInvoice"
                checked={createInvoice}
                onChange={(e) => setCreateInvoice(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="createInvoice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Creează automat factură
              </label>
            </div>
            {createInvoice && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">Se va crea o factură automat:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Număr factură generat automat</li>
                      <li>Valoare: ${totalCost.toLocaleString()}</li>
                      <li>TVA 19% inclus</li>
                      <li>Scadență: 30 de zile</li>
                      <li>Poate fi plătită online prin Stripe</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <p className="font-medium">Atenție:</p>
                <p>Aprobarea acestei estimări va schimba statusul proiectului în "aprobat" și se poate începe lucrul la proiect.</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Anulează
          </Button>
          <Button
            onClick={handleApprove}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Se procesează...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Aprobă Estimarea
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}