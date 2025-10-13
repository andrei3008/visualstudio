'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Activity,
  FileText,
  MessageSquare,
  CreditCard,
  Settings
} from 'lucide-react'

interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt: string
  lastLogin?: string
  phone?: string
  address?: string
  city?: string
  country?: string
}

export default function UserProfilePage() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<UserProfile | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Extract user ID from pathname
  const userId = pathname.split('/').pop()

  useEffect(() => {
    fetchUser()
  }, [userId])

  const fetchUser = async () => {
    if (!userId) return

    try {
      const response = await fetch(`/api/admin/users/${userId}`)
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setError('Utilizatorul nu a fost găsit')
      }
    } catch (error) {
      setError('Eroare la încărcarea utilizatorului')
      console.error('Error fetching user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'inactive':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activ'
      case 'pending':
        return 'În așteptare'
      case 'inactive':
        return 'Inactiv'
      default:
        return 'Necunoscut'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const handleEdit = () => {
    setEditForm(user)
    setIsEditing(true)
    setSaveError(null)
    setSaveSuccess(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditForm(null)
    setSaveError(null)
    setSaveSuccess(false)
  }

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        [field]: value
      })
    }
  }

  const handleSave = async () => {
    if (!editForm || !userId) return

    setIsSaving(true)
    setSaveError(null)
    setSaveSuccess(false)

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email,
          role: editForm.role,
          phone: editForm.phone,
          address: editForm.address,
          city: editForm.city,
          country: editForm.country,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setIsEditing(false)
        setEditForm(null)
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        const errorData = await response.json()
        setSaveError(errorData.error || 'Eroare la salvare')
      }
    } catch (error) {
      setSaveError('Eroare de rețea la salvare')
      console.error('Error saving user:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <AlertCircle className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Eroare
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {error || 'Utilizatorul nu a fost găsit'}
          </p>
          <button
            onClick={() => router.push('/app/admin/users')}
            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Înapoi la utilizatori
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Profil Utilizator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gestionați informațiile și setările utilizatorului
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Information Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Informații Utilizator
                </h2>
                <div className="flex items-center gap-2">
                  {saveSuccess && (
                    <span className="text-sm text-green-600 dark:text-green-400">
                      ✓ Salvat cu succes
                    </span>
                  )}
                  {saveError && (
                    <span className="text-sm text-red-600 dark:text-red-400">
                      {saveError}
                    </span>
                  )}
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Editează Profil
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                      >
                        Anulează
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {isSaving ? 'Se salvează...' : 'Salvează'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nume Complet
                  </label>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    {!isEditing ? (
                      <span className="text-gray-900 dark:text-white">{user.name}</span>
                    ) : (
                      <input
                        type="text"
                        value={editForm?.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="Nume complet"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    {!isEditing ? (
                      <span className="text-gray-900 dark:text-white">{user.email}</span>
                    ) : (
                      <input
                        type="email"
                        value={editForm?.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="email@exemplu.ro"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rol
                  </label>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    {!isEditing ? (
                      <span className="text-gray-900 dark:text-white capitalize">{user.role}</span>
                    ) : (
                      <select
                        value={editForm?.role || 'client'}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      >
                        <option value="client">Client</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(user.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                      {getStatusText(user.status)}
                    </span>
                  </div>
                </div>
                {user.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefon
                    </label>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{user.phone}</span>
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data Creării
                  </label>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      {new Date(user.createdAt).toLocaleDateString('ro-RO')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          {(user.address || user.city || user.country) && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Adresă
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {user.address && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{user.address}</span>
                    </div>
                  )}
                  {(user.city || user.country) && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">
                        {[user.city, user.country].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Statistici Rapide
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">Activitate</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.lastLogin ? `Ultim login: ${new Date(user.lastLogin).toLocaleDateString('ro-RO')}` : 'Niciodată'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Proiecte</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700 dark:text-gray-300">Mesaje</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700 dark:text-gray-300">Plăți</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">0</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Acțiuni Rapide
              </h2>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <Edit className="w-5 h-5" />
                <span>Editează Profil</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
                <span>Setări Cont</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>Trimite Mesaj</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}