'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../components/AdminLayout'
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  CheckCircle,
  XCircle,
  Download,
  Upload
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

interface Client {
  id: string
  email: string
  name?: string
  Nume?: string
  Prenume?: string
  Companie?: string
  Telefon?: string
  Oras?: string
  Address?: string
  Website?: string
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
  }
}

interface ClientsResponse {
  clients: Client[]
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  summary: {
    activeCount: number
    inactiveCount: number
    roleCounts: Record<string, number>
  }
}

export default function ClientsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [role, setRole] = useState('')
  const [city, setCity] = useState('')
  const [company, setCompany] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)
  const [summary, setSummary] = useState<any>(null)
  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)

  // Form state for creating client
  const [newClient, setNewClient] = useState({
    email: '',
    name: '',
    Nume: '',
    Prenume: '',
    Companie: '',
    Telefon: '',
    Oras: '',
    Address: '',
    PostalCode: '',
    Country: '',
    Website: '',
    Notes: '',
    isActive: true,
    role: 'client'
  })

  const fetchClients = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '25',
        ...(search && { search }),
        ...(filterStatus && { status: filterStatus }),
        ...(role && { role }),
        ...(city && { city }),
        ...(company && { company })
      })

      const response = await fetch(`/api/admin/clients?${params}`)
      if (!response.ok) throw new Error('Failed to fetch clients')

      const data: ClientsResponse = await response.json()
      setClients(data.clients)
      setPagination(data.pagination)
      setSummary(data.summary)
    } catch (error) {
      console.error('Error fetching clients:', error)
      toast.error('Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchClients()
    }
  }, [currentPage, search, filterStatus, role, city, company, status])

  const handleCreateClient = async () => {
    try {
      const response = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient)
      })

      if (!response.ok) throw new Error('Failed to create client')

      const data = await response.json()
      toast.success(`Client created successfully! Temporary password: ${data.tempPassword}`)
      setShowCreateDialog(false)
      setNewClient({
        email: '',
        name: '',
        Nume: '',
        Prenume: '',
        Companie: '',
        Telefon: '',
        Oras: '',
        Address: '',
        PostalCode: '',
        Country: '',
        Website: '',
        Notes: '',
        isActive: true,
        role: 'client'
      })
      fetchClients()
    } catch (error) {
      console.error('Error creating client:', error)
      toast.error('Failed to create client')
    }
  }

  const handleDeleteClient = async (clientId: string) => {
    if (!confirm('Are you sure you want to deactivate this client?')) return

    try {
      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete client')

      toast.success('Client deactivated successfully')
      fetchClients()
    } catch (error) {
      console.error('Error deleting client:', error)
      toast.error('Failed to delete client')
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to deactivate ${selectedClients.length} clients?`)) return

    try {
      const response = await fetch(`/api/admin/clients?ids=${selectedClients.join(',')}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete clients')

      toast.success(`${selectedClients.length} clients deactivated successfully`)
      setSelectedClients([])
      setShowBulkActions(false)
      fetchClients()
    } catch (error) {
      console.error('Error deleting clients:', error)
      toast.error('Failed to delete clients')
    }
  }

  const getClientDisplayName = (client: Client) => {
    if (client.Companie) return client.Companie
    if (client.Prenume && client.Nume) return `${client.Prenume} ${client.Nume}`
    if (client.name) return client.name
    return client.email
  }

  const getClientLocation = (client: Client) => {
    const parts = []
    if (client.Oras) parts.push(client.Oras)
    if (client.Address) parts.push(client.Address)
    return parts.join(', ') || 'No location'
  }

  if (status === 'loading') {
    return (
      <AdminLayout title="Clienti" subtitle="Management clienți">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout
      title="Clienti"
      subtitle="Management și vizualizare clienți"
      actions={
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Client Nou
        </Button>
      }
    >
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Client Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your clients and their information
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summary.activeCount + summary.inactiveCount}
              </div>
              <p className="text-xs text-muted-foreground">
                All registered clients
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {summary.activeCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Clients</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {summary.inactiveCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently inactive
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {clients.reduce((sum, client) => sum + client._count.projects, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all clients
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Roles</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Filter by city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              placeholder="Filter by company..."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedClients.length > 0 && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {selectedClients.length} client{selectedClients.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Selected
                </Button>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Deactivate Selected
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedClients([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clients ({pagination?.totalCount || 0})</CardTitle>
          <CardDescription>
            A comprehensive list of all your clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Loading clients...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedClients.length === clients.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedClients(clients.map(c => c.id))
                          } else {
                            setSelectedClients([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <TableCell>
                        <Checkbox
                          checked={selectedClients.includes(client.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedClients([...selectedClients, client.id])
                            } else {
                              setSelectedClients(selectedClients.filter(id => id !== client.id))
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {getClientDisplayName(client)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {client.email}
                          </div>
                          <Badge variant="outline" className="mt-1">
                            {client.role}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {client.Telefon && (
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3" />
                              {client.Telefon}
                            </div>
                          )}
                          {client.Website && (
                            <div className="flex items-center gap-1 text-sm text-blue-600">
                              <MapPin className="h-3 w-3" />
                              <a href={client.Website} target="_blank" rel="noopener noreferrer">
                                {client.Website.replace(/^https?:\/\//, '')}
                              </a>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {getClientLocation(client)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={client.isActive ? 'default' : 'secondary'}>
                          {client.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {client._count.projects}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(client.clientSince).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/app/admin/clients/${client.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/app/admin/clients/${client.id}/edit`)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Client
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteClient(client.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of{' '}
                    {pagination.totalCount} clients
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!pagination.hasPrev}
                      onClick={() => setCurrentPage(pagination.page - 1)}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={pagination.page === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!pagination.hasNext}
                      onClick={() => setCurrentPage(pagination.page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Client Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Client</DialogTitle>
            <DialogDescription>
              Add a new client to the system. They will receive a temporary password via email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                placeholder="client@example.com"
              />
            </div>
            <div>
              <Label htmlFor="Nume">Last Name</Label>
              <Input
                id="Nume"
                value={newClient.Nume}
                onChange={(e) => setNewClient({ ...newClient, Nume: e.target.value })}
                placeholder="Last Name"
              />
            </div>
            <div>
              <Label htmlFor="Prenume">First Name</Label>
              <Input
                id="Prenume"
                value={newClient.Prenume}
                onChange={(e) => setNewClient({ ...newClient, Prenume: e.target.value })}
                placeholder="First Name"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="Companie">Company</Label>
              <Input
                id="Companie"
                value={newClient.Companie}
                onChange={(e) => setNewClient({ ...newClient, Companie: e.target.value })}
                placeholder="Company Name"
              />
            </div>
            <div>
              <Label htmlFor="Telefon">Phone</Label>
              <Input
                id="Telefon"
                value={newClient.Telefon}
                onChange={(e) => setNewClient({ ...newClient, Telefon: e.target.value })}
                placeholder="+40 123 456 789"
              />
            </div>
            <div>
              <Label htmlFor="Oras">City</Label>
              <Input
                id="Oras"
                value={newClient.Oras}
                onChange={(e) => setNewClient({ ...newClient, Oras: e.target.value })}
                placeholder="Bucharest"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="Address">Address</Label>
              <Input
                id="Address"
                value={newClient.Address}
                onChange={(e) => setNewClient({ ...newClient, Address: e.target.value })}
                placeholder="Street Address"
              />
            </div>
            <div>
              <Label htmlFor="PostalCode">Postal Code</Label>
              <Input
                id="PostalCode"
                value={newClient.PostalCode}
                onChange={(e) => setNewClient({ ...newClient, PostalCode: e.target.value })}
                placeholder="12345"
              />
            </div>
            <div>
              <Label htmlFor="Country">Country</Label>
              <Input
                id="Country"
                value={newClient.Country}
                onChange={(e) => setNewClient({ ...newClient, Country: e.target.value })}
                placeholder="Romania"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="Website">Website</Label>
              <Input
                id="Website"
                value={newClient.Website}
                onChange={(e) => setNewClient({ ...newClient, Website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="Notes">Notes</Label>
              <textarea
                id="Notes"
                className="w-full p-2 border rounded-md"
                rows={3}
                value={newClient.Notes}
                onChange={(e) => setNewClient({ ...newClient, Notes: e.target.value })}
                placeholder="Internal notes about this client..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateClient} disabled={!newClient.email}>
              Create Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </AdminLayout>
  )
}