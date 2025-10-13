import { prisma } from './prisma'
import { Estimation, Invoice, User, Project } from '@prisma/client'

export interface InvoiceData {
  title: string
  description?: string
  items: InvoiceItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  totalAmount: number
  clientName: string
  clientEmail: string
  clientAddress?: any
  dueDate: Date
  notes?: string
  terms?: string
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface EstimationWithDetails extends Estimation {
  project: Project & {
    user: User
  }
}

export class InvoiceService {
  /**
   * Generate a unique invoice number in format INV-YYYY-NNNN
   */
  static async generateInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear()
    const prefix = `INV-${year}-`

    // Get the latest invoice number for this year
    const latestInvoice = await prisma.invoice.findFirst({
      where: {
        invoiceNumber: {
          startsWith: prefix
        }
      },
      orderBy: {
        invoiceNumber: 'desc'
      }
    })

    let sequenceNumber = 1
    if (latestInvoice) {
      const lastSequence = parseInt(latestInvoice.invoiceNumber.replace(prefix, ''))
      sequenceNumber = lastSequence + 1
    }

    return `${prefix}${sequenceNumber.toString().padStart(4, '0')}`
  }

  /**
   * Convert estimation items to invoice items
   */
  static convertEstimationToInvoiceItems(estimation: EstimationWithDetails): InvoiceItem[] {
    const items: InvoiceItem[] = []

    // Main development work item
    items.push({
      description: `${estimation.title} - Development Services`,
      quantity: estimation.totalHours,
      unitPrice: estimation.hourlyRate,
      total: estimation.totalCost
    })

    // Add any additional items from cost breakdown if available
    if (estimation.costBreakdown && typeof estimation.costBreakdown === 'object') {
      const breakdown = estimation.costBreakdown as any
      if (breakdown.additionalItems && Array.isArray(breakdown.additionalItems)) {
        breakdown.additionalItems.forEach((item: any) => {
          items.push({
            description: item.description || 'Additional Service',
            quantity: item.quantity || 1,
            unitPrice: item.unitPrice || 0,
            total: item.total || (item.quantity || 1) * (item.unitPrice || 0)
          })
        })
      }
    }

    return items
  }

  /**
   * Calculate tax amounts
   */
  static calculateTax(subtotal: number, taxRate: number = 0.19): { taxAmount: number; totalAmount: number } {
    const taxAmount = subtotal * taxRate
    const totalAmount = subtotal + taxAmount
    return { taxAmount, totalAmount }
  }

  /**
   * Create invoice from approved estimation
   */
  static async createInvoiceFromEstimation(estimationId: string): Promise<Invoice> {
    // Fetch estimation with all related data
    const estimation = await prisma.estimation.findUnique({
      where: { id: estimationId },
      include: {
        project: {
          include: {
            user: true
          }
        }
      }
    })

    if (!estimation) {
      throw new Error('Estimation not found')
    }

    if (estimation.status !== 'approved') {
      throw new Error('Estimation must be approved before creating invoice')
    }

    // Generate invoice number
    const invoiceNumber = await this.generateInvoiceNumber()

    // Convert estimation to invoice items
    const items = this.convertEstimationToInvoiceItems(estimation as EstimationWithDetails)

    // Calculate totals
    const subtotal = estimation.totalCost
    const taxRate = 0.19 // 19% VAT
    const { taxAmount, totalAmount } = this.calculateTax(subtotal, taxRate)

    // Set due date (30 days from now)
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 30)

    // Prepare client information
    const clientName = estimation.project.user.name || estimation.project.user.email
    const clientEmail = estimation.project.user.email

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        projectId: estimation.projectId,
        estimationId: estimation.id,
        proposalId: estimation.proposalId,

        // Client information
        clientName,
        clientEmail,
        clientAddress: null, // TODO: Add client address if available

        // Invoice details
        title: `Invoice for ${estimation.title}`,
        description: estimation.description,
        items: items as any, // Store as JSON
        subtotal,
        taxRate,
        taxAmount,
        totalAmount,

        // Status and dates
        status: 'unpaid',
        issueDate: new Date(),
        dueDate,

        // Notes and terms
        notes: `Invoice generated from approved estimation "${estimation.title}"`,
        terms: 'Payment due within 30 days. Late payments may incur additional fees.'
      }
    })

    // Log the invoice creation
    console.log(`Created invoice ${invoice.invoiceNumber} from estimation ${estimation.id}`)

    return invoice
  }

  /**
   * Update invoice status
   */
  static async updateInvoiceStatus(
    invoiceId: string,
    status: string,
    paymentData?: {
      paidAt?: Date
      stripePaymentIntentId?: string
      stripeCheckoutSessionId?: string
      stripeCustomerId?: string
      paymentUrl?: string
    }
  ): Promise<Invoice> {
    const updateData: any = { status }

    if (paymentData) {
      Object.assign(updateData, paymentData)
    }

    if (status === 'paid' && !updateData.paidAt) {
      updateData.paidAt = new Date()
    }

    const invoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: updateData
    })

    console.log(`Updated invoice ${invoice.invoiceNumber} status to ${status}`)
    return invoice
  }

  /**
   * Get invoice with all related data
   */
  static async getInvoiceDetails(invoiceId: string): Promise<Invoice | null> {
    return await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        project: {
          include: {
            user: true
          }
        },
        estimation: true,
        proposal: true,
        payments: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })
  }

  /**
   * Get unpaid invoices
   */
  static async getUnpaidInvoices(): Promise<Invoice[]> {
    return await prisma.invoice.findMany({
      where: {
        status: {
          in: ['unpaid', 'sent']
        }
      },
      include: {
        project: {
          include: {
            user: true
          }
        },
        estimation: true
      },
      orderBy: {
        dueDate: 'asc'
      }
    })
  }

  /**
   * Get overdue invoices
   */
  static async getOverdueInvoices(): Promise<Invoice[]> {
    const now = new Date()
    return await prisma.invoice.findMany({
      where: {
        status: {
          in: ['unpaid', 'sent']
        },
        dueDate: {
          lt: now
        }
      },
      include: {
        project: {
          include: {
            user: true
          }
        },
        estimation: true
      },
      orderBy: {
        dueDate: 'asc'
      }
    })
  }

  /**
   * Format invoice items for display
   */
  static formatInvoiceItems(itemsJson: any): InvoiceItem[] {
    try {
      if (typeof itemsJson === 'string') {
        return JSON.parse(itemsJson)
      }
      return itemsJson || []
    } catch (error) {
      console.error('Error parsing invoice items:', error)
      return []
    }
  }

  /**
   * Create payment record
   */
  static async createPaymentRecord(data: {
    invoiceId: string
    amount: number
    method: string
    status: string
    transactionId?: string
    gateway?: string
    gatewayFee?: number
    notes?: string
  }) {
    return await prisma.payment.create({
      data: {
        ...data,
        paidAt: data.status === 'completed' ? new Date() : null
      }
    })
  }

  /**
   * Get invoice statistics
   */
  static async getInvoiceStats() {
    const [
      totalInvoices,
      paidInvoices,
      unpaidInvoices,
      overdueInvoices,
      totalRevenue,
      pendingRevenue
    ] = await Promise.all([
      prisma.invoice.count(),
      prisma.invoice.count({ where: { status: 'paid' } }),
      prisma.invoice.count({
        where: { status: { in: ['unpaid', 'sent'] } }
      }),
      prisma.invoice.count({
        where: {
          status: { in: ['unpaid', 'sent'] },
          dueDate: { lt: new Date() }
        }
      }),
      prisma.invoice.aggregate({
        where: { status: 'paid' },
        _sum: { totalAmount: true }
      }),
      prisma.invoice.aggregate({
        where: { status: { in: ['unpaid', 'sent'] } },
        _sum: { totalAmount: true }
      })
    ])

    return {
      totalInvoices,
      paidInvoices,
      unpaidInvoices,
      overdueInvoices,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      pendingRevenue: pendingRevenue._sum.totalAmount || 0
    }
  }
}