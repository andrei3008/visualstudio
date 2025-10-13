'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Calendar,
  Edit,
  Save,
  X,
  Check,
  AlertCircle
} from 'lucide-react'
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
  }
}

export default function ClientProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const clientId = searchParams.get('id')
  const isEditMode = searchParams.get('edit') === 'true'
  const isNewMode = searchParams.get('action') === 'new'

  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editMode, setEditMode] = useState(isEditMode || isNewMode)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (!clientId && !isNewMode) {
      router.push('/app/admin/clients')
      return
    }

    if (clientId && !isNewMode) {
      fetchClient()
    } else if (isNewMode) {
      setLoading(false)
    }
  }, [status, clientId, isNewMode])

  const fetchClient = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}`)
      if (!response.ok) throw new Error('Failed to fetch client')

      const data = await response.json()
      setClient(data.client)
      setFormData({
        email: data.client.email,
        name: data.client.name || '',
        Nume: data.client.Nume || '',
        Prenume: data.client.Prenume || '',
        Companie: data.client.Companie || '',
        Telefon: data.client.Telefon || '',
        Oras: data.client.Oras || '',
        Address: data.client.Address || '',
        PostalCode: data.client.PostalCode || '',
        Country: data.client.Country || '',
        Website: data.client.Website || '',
        Notes: data.client.Notes || '',
        isActive: data.client.isActive,
        role: data.client.role
      })
    } catch (error) {
      console.error('Error fetching client:', error)
      toast.error('Failed to load client')
      router.push('/app/admin/clients')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.email) {
      toast.error('Email is required')
      return
    }

    try {
      setSaving(true)
      const url = isNewMode ? '/api/admin/clients' : `/api/admin/clients/${clientId}`
      const method = isNewMode ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to save client')

      const data = await response.json()

      if (isNewMode) {
        toast.success(`Client created successfully! Temporary password: ${data.tempPassword}`)
        router.push(`/app/admin/clients/[id]/profile?id=${data.client.id}`)
      } else {
        toast.success('Client updated successfully')
        setClient(data.client)
        setEditMode(false)
      }
    } catch (error) {
      console.error('Error saving client:', error)
      toast.error('Failed to save client')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete client')

      toast.success('Client deactivated successfully')
      router.push('/app/admin/clients')
    } catch (error) {
      console.error('Error deleting client:', error)
      toast.error('Failed to delete client')
    }
  }

  const getClientDisplayName = () => {
    if (formData.Companie) return formData.Companie
    if (formData.Prenume && formData.Nume) return `${formData.Prenume} ${formData.Nume}`
    if (formData.name) return formData.name
    return formData.email
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO')
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isNewMode ? "Client Nou" : "Profil Client"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isNewMode ? "Adăugare client nou" : getClientDisplayName()}
          </p>
        </div>
        {!isNewMode && (
          <div className="flex items-center gap-2">
            {editMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (client) {
                      setFormData({
                        email: client.email,
                        name: client.name || '',
                        Nume: client.Nume || '',
                        Prenume: client.Prenume || '',
                        Companie: client.Companie || '',
                        Telefon: client.Telefon || '',
                        Oras: client.Oras || '',
                        Address: client.Address || '',
                        PostalCode: client.PostalCode || '',
                        Country: client.Country || '',
                        Website: client.Website || '',
                        Notes: client.Notes || '',
                        isActive: client.isActive,
                        role: client.role
                      })
                    }
                    setEditMode(false)
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Anulează
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Salvare...' : 'Salvează'}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setEditMode(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editează
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Dezactivează
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Client Info Cards */}
      {!isNewMode && client && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Proiecte</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{client._count.projects}</p>
                </div>
                <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Task-uri</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">{client._count.tickets}</p>
                </div>
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Estimări</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{client._count.estimates}</p>
                </div>
                <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">€</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Status</p>
                  <Badge
                    variant={client.isActive ? "default" : "secondary"}
                    className={client.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                    }
                  >
                    {client.isActive ? 'Activ' : 'Inactiv'}
                  </Badge>
                </div>
                <UserCheck className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Client Details Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Informații Client
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="address">Adresă</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!editMode}
                    placeholder="client@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Rol</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                    disabled={!editMode}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="Nume">Nume</Label>
                  <Input
                    id="Nume"
                    value={formData.Nume}
                    onChange={(e) => setFormData({ ...formData, Nume: e.target.value })}
                    disabled={!editMode}
                    placeholder="Nume de familie"
                  />
                </div>
                <div>
                  <Label htmlFor="Prenume">Prenume</Label>
                  <Input
                    id="Prenume"
                    value={formData.Prenume}
                    onChange={(e) => setFormData({ ...formData, Prenume: e.target.value })}
                    disabled={!editMode}
                    placeholder="Prenume"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="Companie">Companie</Label>
                  <Input
                    id="Companie"
                    value={formData.Companie}
                    onChange={(e) => setFormData({ ...formData, Companie: e.target.value })}
                    disabled={!editMode}
                    placeholder="Nume companie"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="Telefon">Telefon</Label>
                  <Input
                    id="Telefon"
                    value={formData.Telefon}
                    onChange={(e) => setFormData({ ...formData, Telefon: e.target.value })}
                    disabled={!editMode}
                    placeholder="+40 123 456 789"
                  />
                </div>
                <div>
                  <Label htmlFor="Website">Website</Label>
                  <Input
                    id="Website"
                    value={formData.Website}
                    onChange={(e) => setFormData({ ...formData, Website: e.target.value })}
                    disabled={!editMode}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="address" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="Address">Adresă</Label>
                  <Input
                    id="Address"
                    value={formData.Address}
                    onChange={(e) => setFormData({ ...formData, Address: e.target.value })}
                    disabled={!editMode}
                    placeholder="Stradă, număr, bloc, apartament"
                  />
                </div>
                <div>
                  <Label htmlFor="Oras">Oraș</Label>
                  <Input
                    id="Oras"
                    value={formData.Oras}
                    onChange={(e) => setFormData({ ...formData, Oras: e.target.value })}
                    disabled={!editMode}
                    placeholder="București"
                  />
                </div>
                <div>
                  <Label htmlFor="PostalCode">Cod Poștal</Label>
                  <Input
                    id="PostalCode"
                    value={formData.PostalCode}
                    onChange={(e) => setFormData({ ...formData, PostalCode: e.target.value })}
                    disabled={!editMode}
                    placeholder="123456"
                  />
                </div>
                <div>
                  <Label htmlFor="Country">Țară</Label>
                  <Input
                    id="Country"
                    value={formData.Country}
                    onChange={(e) => setFormData({ ...formData, Country: e.target.value })}
                    disabled={!editMode}
                    placeholder="România"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Notes Section */}
          <div className="mt-6">
            <Label htmlFor="Notes">Note Interne</Label>
            <Textarea
              id="Notes"
              value={formData.Notes}
              onChange={(e) => setFormData({ ...formData, Notes: e.target.value })}
              disabled={!editMode}
              placeholder="Note interne despre acest client..."
              rows={4}
            />
          </div>

          {/* Status Toggle (only for existing clients) */}
          {!isNewMode && (
            <div className="mt-6 flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                disabled={!editMode}
              />
              <Label htmlFor="isActive">Client Activ</Label>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Client Metadata */}
      {!isNewMode && client && (
        <Card>
          <CardHeader>
            <CardTitle>Informații Sistem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Client din:</span>
                <span className="font-medium">{formatDate(client.clientSince)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Creat la:</span>
                <span className="font-medium">{formatDate(client.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Actualizat:</span>
                <span className="font-medium">{formatDate(client.updatedAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dezactivare Client</DialogTitle>
            <DialogDescription>
              Ești sigur că vrei să dezactivezi acest client? Clientul nu va putea accesa platforma dar datele vor fi păstrate.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Anulează
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Dezactivează
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}