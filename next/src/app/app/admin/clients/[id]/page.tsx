'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Plus,
  Eye,
  Users,
  FolderOpen,
  DollarSign,
  HelpCircle,
  StickyNote,
  CreditCard,
  Receipt,
  FileMinus,
  Calculator,
  ShoppingCart,
  File as FileIcon,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'

interface ClientDetails {
  client: {
    id: string
    email: string
    name?: string
    Nume?: string
    Prenume?: string
    Companie?: string
    Telefon?: string
    Oras?: string
    Address?: string
    PostalCode?: string
    Country?: string
    Website?: string
    Notes?: string
    isActive: boolean
    clientSince: string
    role: string
    createdAt: string
    updatedAt: string
    _count: {
      projects: number
      contacts: number
      clientNotes: number
      creditNotes: number
      expenses: number
      contracts: number
      tickets: number
      estimates: number
      notifications: number
      uploadedFiles: number
    }
  }
  details: {
    recentProjects: Array<{
      id: string
      name: string
      status: string
      createdAt: string
      updatedAt: string
      budget?: number
    }>
    recentTickets: Array<{
      id: string
      title: string
      status: string
      priority: string
      openedAt: string
    }>
    activeContracts: Array<{
      id: string
      title: string
      status: string
      type: string
      value?: number
      startDate: string
      endDate?: string
    }>
    financialSummary: {
      totalExpenses: number
      expenseCount: number
      totalInvoices: number
      invoiceCount: number
      projectValue: number
    }
  }
}

export default function ClientDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.id as string

  const [clientData, setClientData] = useState<ClientDetails | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchClientDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/clients/${clientId}`)
      if (!response.ok) throw new Error('Failed to fetch client details')

      const data = await response.json()
      setClientData(data)
    } catch (error) {
      console.error('Error fetching client details:', error)
      toast.error('Failed to load client details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClientDetails()
  }, [clientId])

  const getClientDisplayName = () => {
    if (!clientData) return 'Loading...'
    const { client } = clientData
    if (client.Companie) return client.Companie
    if (client.Prenume && client.Nume) return `${client.Prenume} ${client.Nume}`
    if (client.name) return client.name
    return client.email
  }

  const getClientInitials = () => {
    if (!clientData) return 'C'
    const { client } = clientData
    if (client.Companie) return client.Companie.substring(0, 2).toUpperCase()
    if (client.Prenume && client.Nume) {
      return `${client.Prenume[0]}${client.Nume[0]}`.toUpperCase()
    }
    if (client.name) return client.name.substring(0, 2).toUpperCase()
    return client.email.substring(0, 2).toUpperCase()
  }

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      active: 'default',
      inactive: 'secondary',
      draft: 'secondary',
      submitted: 'default',
      approved: 'default',
      in_progress: 'default',
      done: 'default',
      rejected: 'destructive',
      open: 'default',
      resolved: 'default',
      closed: 'secondary'
    }
    return statusColors[status.toLowerCase()] || 'secondary'
  }

  const getPriorityColor = (priority: string) => {
    const priorityColors: Record<string, string> = {
      low: 'secondary',
      medium: 'default',
      high: 'default',
      urgent: 'destructive'
    }
    return priorityColors[priority] || 'secondary'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Loading client details...</p>
        </div>
      </div>
    )
  }

  if (!clientData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Client not found</p>
        </div>
      </div>
    )
  }

  const { client, details } = clientData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                {getClientInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {getClientDisplayName()}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{client.email}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={client.isActive ? 'default' : 'secondary'}>
            {client.isActive ? 'Active' : 'Inactive'}
          </Badge>
          <Badge variant="outline">{client.role}</Badge>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Client
          </Button>
        </div>
      </div>

      {/* Client Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client Since</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(client.clientSince).toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.floor((Date.now() - new Date(client.clientSince).getTime()) / (1000 * 60 * 60 * 24))} days as client
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{client._count.projects}</div>
            <p className="text-xs text-muted-foreground">
              Active and completed projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${details.financialSummary.projectValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Projects */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Projects</CardTitle>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {details.recentProjects.length > 0 ? (
                    details.recentProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {project.budget ? `$${project.budget.toLocaleString()}` : 'No budget'}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStatusColor(project.status) as "default" | "destructive" | "outline" | "secondary"}>
                            {project.status.replace('_', ' ')}
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(project.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                      No projects yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Tickets */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Tickets</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {details.recentTickets.length > 0 ? (
                    details.recentTickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{ticket.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            #{ticket.id.substring(0, 8)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <Badge variant={getPriorityColor(ticket.priority) as "default" | "destructive" | "outline" | "secondary"}>
                              {ticket.priority}
                            </Badge>
                            <Badge variant={getStatusColor(ticket.status) as "default" | "destructive" | "outline" | "secondary"}>
                              {ticket.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(ticket.openedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                      No support tickets yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Contracts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Contracts</CardTitle>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {details.activeContracts.length > 0 ? (
                  details.activeContracts.map((contract) => (
                    <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{contract.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {contract.type.replace('_', ' ')} •
                          {contract.startDate && ` from ${new Date(contract.startDate).toLocaleDateString()}`}
                          {contract.endDate && ` to ${new Date(contract.endDate).toLocaleDateString()}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(contract.status) as "default" | "destructive" | "outline" | "secondary"}>
                          {contract.status}
                        </Badge>
                        {contract.value && (
                          <div className="text-sm font-medium mt-1">
                            ${contract.value.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                    No active contracts
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>
                    All projects associated with this client
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Click "View All" in Recent Projects to see detailed project information
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => router.push(`/app/admin/projects?client=${clientId}`)}
                >
                  View All Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Invoices</span>
                  <span className="font-bold">${details.financialSummary.totalInvoices.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Invoice Count</span>
                  <span className="font-bold">{details.financialSummary.invoiceCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Expenses</span>
                  <span className="font-bold">${details.financialSummary.totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Expense Count</span>
                  <span className="font-bold">{details.financialSummary.expenseCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Project Value</span>
                  <span className="font-bold">${details.financialSummary.projectValue.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="h-4 w-4 mr-2" />
                  View Invoices
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  View Payments
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileMinus className="h-4 w-4 mr-2" />
                  Credit Notes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calculator className="h-4 w-4 mr-2" />
                  Estimates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Expenses
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Support Tickets</CardTitle>
                  <CardDescription>
                    All support tickets for this client
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {details.recentTickets.length > 0
                    ? `There are ${client._count.tickets} total tickets for this client.`
                    : 'No support tickets have been created for this client yet.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contracts</CardTitle>
                  <CardDescription>
                    All contracts associated with this client
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Contract
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {client._count.contracts > 0
                    ? `There are ${client._count.contracts} total contracts for this client.`
                    : 'No contracts have been created for this client yet.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contacts</CardTitle>
                  <CardDescription>
                    Contact persons associated with this client
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {client._count.contacts > 0
                    ? `There are ${client._count.contacts} contacts for this client.`
                    : 'No additional contacts have been added for this client yet.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Notes</CardTitle>
                  <CardDescription>
                    Internal notes about this client
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <StickyNote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {client._count.clientNotes > 0
                    ? `There are ${client._count.clientNotes} notes for this client.`
                    : 'No internal notes have been added for this client yet.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}