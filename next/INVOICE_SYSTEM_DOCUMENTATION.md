# Comprehensive Invoice Generation System with Stripe Integration

## Overview

This document describes the comprehensive automatic invoice generation system with Stripe integration that has been implemented in the Visual Studio client portal application.

## Features Implemented

### 1. Automatic Invoice Generation from Approved Estimates
- ✅ When an estimation status changes to 'approved', automatically creates an invoice
- ✅ Client information extraction from project user
- ✅ Line items from estimation (hours x rate = total)
- ✅ Auto-generated invoice number (INV-YYYY-NNNN format)
- ✅ Status set to 'unpaid'
- ✅ Due date 30 days from creation
- ✅ Tax calculation (19% VAT)

### 2. Updated Estimation Approval Workflow
- ✅ API endpoint for estimation approval with invoice creation
- ✅ Automatic invoice creation on approval
- ✅ Client and admin notifications
- ✅ Optional invoice creation during approval
- ✅ Client notes support

### 3. Stripe Payment Integration
- ✅ Stripe checkout session creation
- ✅ Payment intent handling
- ✅ Webhook for payment confirmation
- ✅ Automatic invoice status updates when paid
- ✅ Support for multiple payment methods
- ✅ Payment method handling (card, etc.)

### 4. API Endpoints
- ✅ `POST /api/estimations/[id]/approve` - Approve estimation and create invoice
- ✅ `POST /api/invoices/[id]/pay` - Create Stripe payment session
- ✅ `POST /api/webhooks/stripe` - Handle Stripe webhooks
- ✅ `GET /api/invoices/[id]/status` - Check payment status

### 5. Frontend Integration
- ✅ Client estimations page with approval workflow
- ✅ Invoice payment interface
- ✅ Invoice viewing and management page
- ✅ Payment status updates
- ✅ Admin estimation management with invoice information

## Architecture

### Database Schema Updates

The Prisma schema has been updated with the following new fields:

#### Invoice Model
```prisma
model Invoice {
  // ... existing fields

  // Stripe integration
  stripePaymentIntentId String? @unique
  stripeCheckoutSessionId String? @unique
  stripeCustomerId String?
  paymentUrl String?

  // New status
  // Updated enum to include 'unpaid' status
}
```

#### New Indexes
- Added indexes for Stripe-related fields for better query performance

### Services

#### InvoiceService (`/src/lib/invoice-service.ts`)
- Invoice number generation (INV-YYYY-NNNN format)
- Automatic invoice creation from estimations
- Tax calculations
- Invoice status management
- Invoice statistics

#### StripeService (`/src/lib/stripe-service.ts`)
- Customer management
- Payment intent creation
- Checkout session creation
- Webhook event handling
- Payment method management
- Refund processing

#### PaymentService (`/src/lib/payment-service.ts`)
- Payment processing workflow
- Webhook event processing
- Payment history tracking
- Refund handling
- Payment statistics

### API Endpoints

#### Estimation Approval
```
POST /api/estimations/[id]/approve
```
- Approves estimation and optionally creates invoice
- Supports client notes
- Sends notifications
- Updates project status

#### Invoice Payment
```
POST /api/invoices/[id]/pay
```
- Initiates payment for invoice
- Supports checkout session or payment intent
- Returns payment URL or client secret

#### Payment Status
```
GET /api/invoices/[id]/status
```
- Returns detailed payment status
- Includes payment history
- Shows remaining amount

#### Stripe Webhooks
```
POST /api/webhooks/stripe
```
- Handles all Stripe webhook events
- Processes payment confirmations
- Updates invoice status automatically

### Frontend Components

#### Client Estimations Page (`/src/app/app/estimations/page.tsx`)
- View all estimations with status
- Approve estimations with optional invoice creation
- See invoice status for approved estimations
- Payment buttons for unpaid invoices

#### Estimation Approval Button (`/src/components/EstimationApprovalButton.tsx`)
- Modal for estimation approval
- Client notes support
- Invoice creation option
- Confirmation workflow

#### Invoice Payment Button (`/src/components/InvoicePaymentButton.tsx`)
- Payment initiation modal
- Support for checkout sessions
- Payment method selection
- Existing session handling

#### Invoice Page (`/src/app/app/invoices/[id]/page.tsx`)
- Detailed invoice view
- Payment status display
- Payment history
- Download PDF option
- Payment initiation

## Configuration

### Environment Variables Required

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Stripe Webhook Setup

1. Go to Stripe Dashboard → Webhooks
2. Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.canceled`
   - `checkout.session.completed`
   - `checkout.session.expired`
4. Copy webhook secret to environment variables

## Workflow

### 1. Estimation Creation (Admin)
- Admin creates estimation for project
- Estimation status: 'draft'
- Admin submits estimation to client

### 2. Client Review & Approval
- Client views estimation on dashboard
- Client can approve estimation
- Optional: Add client notes
- Optional: Create invoice automatically

### 3. Automatic Invoice Generation
- System generates invoice number
- Creates invoice with estimation data
- Sets due date (30 days)
- Calculates VAT (19%)
- Status: 'unpaid'

### 4. Payment Initiation
- Client can pay invoice via Stripe
- Two payment methods available:
  - Stripe Checkout (recommended)
  - Payment Intent (for custom integration)
- Creates secure payment session

### 5. Payment Processing
- Client completes payment via Stripe
- Stripe sends webhook to application
- System processes webhook
- Updates invoice status to 'paid'
- Records payment transaction

### 6. Notifications
- Client receives email confirmation
- Admin receives payment notification
- System updates all related records

## Error Handling

### Common Error Scenarios

1. **Duplicate Invoice Creation**: System checks if invoice already exists
2. **Payment Failures**: Failed payments are logged and invoice remains unpaid
3. **Webhook Failures**: Failed webhooks are logged and can be retried
4. **Invalid Estimation Status**: Only 'submitted' or 'client_review' estimations can be approved
5. **Payment Session Expiry**: Expired sessions are cleaned up automatically

### Retry Logic

- Payment intents can be retried
- Expired checkout sessions are automatically cleaned up
- Failed webhooks can be manually retried

## Security

### Payment Security
- All payment processing handled by Stripe
- No card details stored on application servers
- Webhook signature verification
- HTTPS required for all payment endpoints

### Authorization
- Client can only view/pay their own invoices
- Admin can view all invoices
- Role-based access control enforced

## Monitoring & Logging

### Key Metrics
- Invoice creation rate
- Payment success rate
- Average payment time
- Revenue tracking

### Logging
- All invoice creation events
- Payment processing events
- Webhook processing results
- Error events with details

## Future Enhancements

### Planned Features
1. **PDF Invoice Generation**: Generate downloadable PDF invoices
2. **Email Templates**: Automated email notifications for invoices
3. **Payment Reminders**: Automated reminders for overdue invoices
4. **Multi-currency Support**: Support for multiple currencies
5. **Subscription Invoicing**: Recurring invoice generation
6. **Credit Notes**: Support for refunds and credit notes
7. **Advanced Reporting**: Detailed financial reports
8. **Tax Reporting**: VAT and tax reporting features

### Integration Opportunities
1. **Accounting Software**: Integration with QuickBooks, Xero
2. **Bank Reconciliation**: Automatic bank transaction matching
3. **Expense Tracking**: Integration with expense management
4. **Multi-tenant Support**: Support for multiple businesses

## Testing

### Test Scenarios
1. Estimation approval workflow
2. Invoice generation accuracy
3. Payment processing with Stripe
4. Webhook event handling
5. Error scenarios and recovery
6. Authorization and security
7. Performance under load

### Test Data
- Sample estimations with various statuses
- Test Stripe accounts for payment testing
- Mock webhook events for testing

## Deployment

### Production Checklist
- [ ] Configure Stripe production keys
- [ ] Set up production webhooks
- [ ] Configure environment variables
- [ ] Run database migrations
- [ ] Test payment flow end-to-end
- [ ] Set up monitoring and alerts
- [ ] Configure backup strategy
- [ ] Review security settings

### Monitoring Setup
- Stripe dashboard monitoring
- Application error tracking
- Database performance monitoring
- Payment success rate tracking

## Support & Troubleshooting

### Common Issues

1. **Payment Not Processing**
   - Check Stripe configuration
   - Verify webhook URL is accessible
   - Check webhook secret

2. **Invoice Not Created**
   - Verify estimation status
   - Check database connection
   - Review error logs

3. **Webhook Failures**
   - Verify webhook signature
   - Check webhook endpoint
   - Review Stripe events

### Debug Tools
- Stripe CLI for local testing
- Application logs
- Database query logs
- Network request monitoring

---

This comprehensive invoice generation system provides a complete solution for managing estimations, invoices, and payments with the security and reliability of Stripe integration. The system is designed to be scalable, secure, and user-friendly for both clients and administrators.