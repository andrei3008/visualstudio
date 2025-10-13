import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { InvoiceService } from '@/lib/invoice-service'
import { PaymentService } from '@/lib/payment-service'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import InvoicePaymentButton from '@/components/InvoicePaymentButton'
import {
  ArrowLeft,
  Download,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  User,
  FileText,
  Mail,
  Building,
  ExternalLink
} from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'

interface PageProps {
  params: { id: string }
  searchParams: { payment?: string }
}

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-gray-500', icon: Clock },
  unpaid: { label: 'Neplătită', color: 'bg-yellow-500', icon: Clock },
  sent: { label: 'Trimisă', color: 'bg-blue-500', icon: Mail },
  paid: { label: 'Plătită', color: 'bg-green-500', icon: CheckCircle },
  partially_paid: { label: 'Plătită Parțial', color: 'bg-orange-500', icon: AlertCircle },
  overdue: { label: 'Scadentă', color: 'bg-red-500', icon: AlertCircle },
  cancelled: { label: 'Anulată', color: 'bg-gray-500', icon: Clock }
}

export default async function InvoicePage({ params, searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true, role: true }
  })
  if (!user) redirect('/login')

  const invoiceId = params.id

  // Get invoice with all related data
  const invoice = await InvoiceService.getInvoiceDetails(invoiceId)
  if (!invoice) redirect('/app/estimations')

  // Check authorization
  const isClient = invoice.project?.userId === user.id
  const isAdmin = user.role === 'admin'

  if (!isClient && !isAdmin) {
    redirect('/app')
  }

  // Get payment status and history
  const paymentStatus = await PaymentService.getInvoicePaymentStatus(invoiceId)
  const paymentHistory = await PaymentService.getPaymentHistory(invoiceId)

  // Check if invoice is overdue
  const isOverdue = invoice.dueDate < new Date() && invoice.status !== 'paid'
  const daysUntilDue = Math.ceil((invoice.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  // Format invoice items
  const items = InvoiceService.formatInvoiceItems(invoice.items)

  // Handle payment result from URL params
  const paymentResult = searchParams.payment

  return (
    <DashboardLayout
      title={`Factura ${invoice.invoiceNumber}`}
      subtitle={invoice.title}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Payment Result Messages */}
        {paymentResult === 'success' && (
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">
                    Plată procesată cu succes!
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    Factura a fost plătită și statusul a fost actualizat.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {paymentResult === 'cancelled' && (
          <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    Plata a fost anulată
                  </p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300">
                    Puteți încerca să plătiți factura din nou oricând.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Invoice Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Factura {invoice.invoiceNumber}
                </CardTitle>
                <CardDescription>
                  {invoice.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  className={`${statusConfig[invoice.status as keyof typeof statusConfig]?.color || 'bg-gray-500'} text-white border-0`}
                >
                  {statusConfig[invoice.status as keyof typeof statusConfig]?.label || invoice.status}
                </Badge>
                {isOverdue && (
                  <Badge variant="destructive">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Scadentă
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Invoice Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Data emiterii:</span>
                  <span>{new Date(invoice.issueDate).toLocaleDateString('ro-RO')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Scadență:</span>
                  <span>{new Date(invoice.dueDate).toLocaleDateString('ro-RO')}</span>
                </div>
                {invoice.paidAt && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Plată:</span>
                    <span>{new Date(invoice.paidAt).toLocaleDateString('ro-RO')}</span>
                  </div>
                )}
              </div>

              {/* Client Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Client:</span>
                  <span>{invoice.clientName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Email:</span>
                  <span>{invoice.clientEmail}</span>
                </div>
              </div>

              {/* Project Information */}
              {invoice.project && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Proiect:</span>
                    <Link href={`/app/projects/${invoice.project.id}`} className="text-blue-600 hover:underline">
                      {invoice.project.name}
                    </Link>
                  </div>
                  {invoice.estimation && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Estimare:</span>
                      <Link href={`/app/estimations/${invoice.estimation.id}`} className="text-blue-600 hover:underline">
                        {invoice.estimation.title}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Invoice Items */}
        <Card>
          <CardHeader>
            <CardTitle>Detalii Factură</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x ${item.unitPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <Separator />

              {/* Totals */}
              <div className="space-y-2 pt-4">
                <div className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>TVA ({(invoice.taxRate * 100).toFixed(0)}%):</span>
                  <span>${invoice.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${invoice.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        {paymentStatus.payments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Istoric Plăți</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">
                        ${payment.amount.toFixed(2)} - {payment.method}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(payment.createdAt).toLocaleDateString('ro-RO')} • {payment.gateway}
                      </p>
                      {payment.notes && (
                        <p className="text-xs text-gray-400 mt-1">{payment.notes}</p>
                      )}
                    </div>
                    <Badge
                      variant={payment.status === 'completed' ? 'default' : 'secondary'}
                    >
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total plătit:</span>
                  <span className="font-bold text-green-600">
                    ${paymentStatus.paidAmount.toFixed(2)}
                  </span>
                </div>
                {paymentStatus.remainingAmount > 0 && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium">Rămas:</span>
                    <span className="font-bold text-orange-600">
                      ${paymentStatus.remainingAmount.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acțiuni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href="/app/estimations">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Înapoi la Estimări
                </Link>
              </Button>

              {invoice.paymentUrl && (
                <Button variant="outline" asChild>
                  <a href={invoice.paymentUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Link Plată
                  </a>
                </Button>
              )}

              <Button variant="outline" asChild>
                <Link href={`/api/invoices/${invoice.id}/pdf`} target="_blank">
                  <Download className="h-4 w-4 mr-2" />
                  Descarcă PDF
                </Link>
              </Button>

              {['unpaid', 'sent'].includes(invoice.status) && paymentStatus.remainingAmount > 0 && (
                <InvoicePaymentButton
                  invoiceId={invoice.id}
                  invoiceNumber={invoice.invoiceNumber}
                  amount={paymentStatus.remainingAmount}
                  paymentUrl={invoice.paymentUrl}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notes and Terms */}
        {(invoice.notes || invoice.terms) && (
          <Card>
            <CardHeader>
              <CardTitle>Note și Termeni</CardTitle>
            </CardHeader>
            <CardContent>
              {invoice.notes && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Note:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.notes}</p>
                </div>
              )}
              {invoice.terms && (
                <div>
                  <h4 className="font-medium mb-2">Termeni și Condiții:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.terms}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}