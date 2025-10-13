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
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CreditCard, Loader2, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface InvoicePaymentButtonProps {
  invoiceId: string
  invoiceNumber: string
  amount: number
  paymentUrl?: string | null
}

export default function InvoicePaymentButton({
  invoiceId,
  invoiceNumber,
  amount,
  paymentUrl
}: InvoicePaymentButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'checkout' | 'payment_intent'>('checkout')

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/invoices/${invoiceId}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          returnUrl: `${window.location.origin}/app/invoices/${invoiceId}?payment=success`,
          cancelUrl: `${window.location.origin}/app/invoices/${invoiceId}?payment=cancelled`
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate payment')
      }

      if (data.paymentUrl) {
        // Redirect to Stripe Checkout
        window.location.href = data.paymentUrl
      } else if (data.clientSecret) {
        // For payment intent, we would need a more complex UI
        // For now, just show success and redirect
        toast.success('Sesiune de plată creată!')
        setIsOpen(false)
      }

    } catch (error) {
      console.error('Error initiating payment:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to initiate payment')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExistingPayment = () => {
    if (paymentUrl) {
      window.open(paymentUrl, '_blank')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
        >
          <CreditCard className="h-4 w-4 mr-1" />
          Plătește
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-600" />
            Plată Factură
          </DialogTitle>
          <DialogDescription>
            Plătiți factura online în siguranță prin Stripe.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Details */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Factura {invoiceNumber}
              </h4>
              <Badge variant="secondary" className="font-bold">
                ${amount.toLocaleString()}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Plata securizată prin Stripe. Acceptăm carduri de credit/debit.
            </p>
          </div>

          {/* Existing Payment Session */}
          {paymentUrl && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-2">Sesiune de plată existentă</p>
                  <p className="mb-3">
                    Aveți deja o sesiune de plată activă pentru această factură.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExistingPayment}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Deschide Plata
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Metodă de plată
            </Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as 'checkout' | 'payment_intent')}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <RadioGroupItem value="checkout" id="checkout" />
                <Label htmlFor="checkout" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Checkout Stripe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Pagină de plată securizată hosted de Stripe
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">Recomandat</Badge>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <RadioGroupItem value="payment_intent" id="payment_intent" />
                <Label htmlFor="payment_intent" className="flex-1 cursor-pointer">
                  <div>
                    <p className="font-medium">Payment Intent</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Integrare directă cu elemente de plată custom
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Information */}
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <p className="font-medium mb-1">Informații despre plată:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Plata este procesată securizat prin Stripe</li>
                  <li>Datele cardului nu sunt stocate pe serverele noastre</li>
                  <li>Veți primi confirmare prin email după plată</li>
                  <li>Statusul facturii se va actualiza automat</li>
                </ul>
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
            onClick={handlePayment}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Se procesează...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Continuă la Plată
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}