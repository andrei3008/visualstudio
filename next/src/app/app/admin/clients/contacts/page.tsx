'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import AdminLayout from '../../components/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Phone,
  Mail,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  User,
  Building,
  MapPin
} from 'lucide-react'
import { toast } from 'sonner'

interface Contact {
  id: string
  clientId: string
  name: string
  position?: string
  email?: string
  phone?: string
  department?: string
  isPrimary: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface Client {
  id: string
  email: string
  name?: string
  Nume?: string
  Prenume?: string
  Companie?: string
}

export default function ClientContactsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const clientId = searchParams.get('id')

  const [contacts, setContacts] = useState<Contact[]>([])
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    department: '',
    isPrimary: false,
    isActive: true
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (!clientId) {
      router.push('/app/admin/clients')
      return
    }

    fetchData()
  }, [status, clientId])

  const fetchData = async () => {
    try {
      const [contactsRes, clientRes] = await Promise.all([
        fetch(`/api/admin/clients/${clientId}/contacts`),
        fetch(`/api/admin/clients/${clientId}`)
      ])

      if (!contactsRes.ok || !clientRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const [contactsData, clientData] = await Promise.all([
        contactsRes.json(),
        clientRes.json()
      ])

      setContacts(contactsData.contacts || [])
      setClient(clientData.client)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required')
      return
    }

    try {
      setSaving(true)
      const url = editingContact
        ? `/api/admin/clients/${clientId}/contacts/${editingContact.id}`
        : `/api/admin/clients/${clientId}/contacts`
      const method = editingContact ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to save contact')

      toast.success(editingContact ? 'Contact updated successfully' : 'Contact created successfully')
      setShowCreateDialog(false)
      setEditingContact(null)
      resetForm()
      fetchData()
    } catch (error) {
      console.error('Error saving contact:', error)
      toast.error('Failed to save contact')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return

    try {
      const response = await fetch(`/api/admin/clients/${clientId}/contacts/${contactId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete contact')

      toast.success('Contact deleted successfully')
      fetchData()
    } catch (error) {
      console.error('Error deleting contact:', error)
      toast.error('Failed to delete contact')
    }
  }

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setFormData({
      name: contact.name,
      position: contact.position || '',
      email: contact.email || '',
      phone: contact.phone || '',
      department: contact.department || '',
      isPrimary: contact.isPrimary,
      isActive: contact.isActive
    })
    setShowCreateDialog(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      email: '',
      phone: '',
      department: '',
      isPrimary: false,
      isActive: true
    })
  }

  const getClientDisplayName = () => {
    if (client?.Companie) return client.Companie
    if (client?.Prenume && client?.Nume) return `${client.Prenume} ${client.Nume}`
    if (client?.name) return client.name
    return client?.email || 'Unknown Client'
  }

  if (status === 'loading' || loading) {
    return (
      <AdminLayout title="Contacte Client" subtitle="Încărcare...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout
      title="Contacte Client"
      subtitle={getClientDisplayName()}
      actions={
        <Button onClick={() => { resetForm(); setEditingContact(null); setShowCreateDialog(true) }}>
          <Plus className="h-4 w-4 mr-2" />
          Contact Nou
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Contacte</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{contacts.length}</p>
                </div>
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Contacte Principale</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {contacts.filter(c => c.isPrimary).length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-white rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Contacte Active</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {contacts.filter(c => c.isActive).length}
                  </p>
                </div>
                <Phone className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Contacte</CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No contacts found</p>
                <Button
                  onClick={() => { resetForm(); setEditingContact(null); setShowCreateDialog(true) }}
                  className="mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Contact
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Poziție</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Departament</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acțiuni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {contact.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            {contact.isPrimary && (
                              <Badge variant="default" className="text-xs">
                                Principal
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{contact.position || '-'}</span>
                      </TableCell>
                      <TableCell>
                        {contact.email ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-gray-400" />
                            {contact.email}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.phone ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-gray-400" />
                            {contact.phone}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{contact.department || '-'}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={contact.isActive ? "default" : "secondary"}
                          className={contact.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                          }
                        >
                          {contact.isActive ? 'Activ' : 'Inactiv'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(contact)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editează
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(contact.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Șterge
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Contact Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingContact ? 'Editează Contact' : 'Contact Nou'}
            </DialogTitle>
            <DialogDescription>
              {editingContact
                ? 'Modifică informațiile contactului'
                : 'Adaugă un contact nou pentru acest client'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Nume *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nume complet"
                />
              </div>
              <div>
                <Label htmlFor="position">Poziție</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Manager, Director, etc."
                />
              </div>
              <div>
                <Label htmlFor="department">Departament</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="IT, Vânzări, etc."
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+40 123 456 789"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPrimary"
                  checked={formData.isPrimary}
                  onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                />
                <Label htmlFor="isPrimary">Contact Principal</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="isActive">Activ</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Anulează
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Salvare...' : 'Salvează'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}