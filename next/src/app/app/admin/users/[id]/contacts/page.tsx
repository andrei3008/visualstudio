'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  UserPlus,
  Edit,
  Trash2,
  Phone,
  Mail,
  Building,
  Star,
  Calendar,
  X,
  Check,
  AlertCircle,
  Users,
  Search,
  Filter
} from 'lucide-react'

interface Contact {
  id: string
  name: string
  position?: string
  email?: string
  phone?: string
  isPrimary: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

interface UserInfo {
  id: string
  name: string
}

export default function UserContactsPage() {
  const pathname = usePathname()
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    isPrimary: false,
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Extract user ID from pathname
  const userId = pathname.split('/').slice(-2, -1)[0]

  useEffect(() => {
    fetchContacts()
  }, [userId])

  const fetchContacts = async () => {
    if (!userId) return

    try {
      const response = await fetch(`/api/admin/users/${userId}/contacts`)
      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
        setUserInfo(data.user)
      } else {
        setError('Nu s-au putut încărca contactele')
      }
    } catch (error) {
      setError('Eroare la încărcarea contactelor')
      console.error('Error fetching contacts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddContact = () => {
    setEditingContact(null)
    setFormData({
      name: '',
      position: '',
      email: '',
      phone: '',
      isPrimary: false,
      notes: ''
    })
    setSubmitError(null)
    setSubmitSuccess(false)
    setShowAddForm(true)
  }

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
    setFormData({
      name: contact.name,
      position: contact.position || '',
      email: contact.email || '',
      phone: contact.phone || '',
      isPrimary: contact.isPrimary,
      notes: contact.notes || ''
    })
    setSubmitError(null)
    setSubmitSuccess(false)
    setShowAddForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setSubmitError('Numele este obligatoriu')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const url = editingContact
        ? `/api/admin/users/${userId}/contacts/${editingContact.id}`
        : `/api/admin/users/${userId}/contacts`

      const method = editingContact ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        if (editingContact) {
          // Update existing contact in state
          setContacts(contacts.map(c =>
            c.id === editingContact.id
              ? { ...c, ...formData, updatedAt: new Date().toISOString() }
              : c
          ))
        } else {
          // Add new contact to state
          const data = await response.json()
          setContacts([data.contact, ...contacts])
        }

        setShowAddForm(false)
        setSubmitSuccess(true)
        setTimeout(() => setSubmitSuccess(false), 3000)
      } else {
        const errorData = await response.json()
        setSubmitError(errorData.error || 'Eroare la salvare')
      }
    } catch (error) {
      setSubmitError('Eroare de rețea la salvare')
      console.error('Error saving contact:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm('Sigur doriți să ștergeți acest contact?')) return

    try {
      const response = await fetch(`/api/admin/users/${userId}/contacts/${contactId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== contactId))
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Eroare la ștergere')
      }
    } catch (error) {
      setError('Eroare de rețea la ștergere')
      console.error('Error deleting contact:', error)
    }
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone?.includes(searchTerm)
  )

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <AlertCircle className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Eroare
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {error}
          </p>
          <button
            onClick={fetchContacts}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Reîncearcă
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
          Contacte - {userInfo?.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gestionați contactele pentru acest utilizator
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Căutați contacte..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleAddContact}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Adaugă Contact
              </button>
            </div>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Check className="w-5 h-5" />
                <span>Contactul a fost salvat cu succes!</span>
              </div>
            </div>
          )}

          {/* Contacts List */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Contacte ({filteredContacts.length})
                </h2>
                {filteredContacts.length === 0 && searchTerm && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Nu s-au găsit rezultate pentru "{searchTerm}"
                  </span>
                )}
              </div>
            </div>

            {filteredContacts.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {searchTerm ? 'Niciun contact găsit' : 'Nu există contacte încă'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {searchTerm
                    ? 'Încercați să modificați termenul de căutare'
                    : 'Adăugați primul contact pentru acest utilizator'
                  }
                </p>
                {!searchTerm && (
                  <button
                    onClick={handleAddContact}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors mx-auto"
                  >
                    <UserPlus className="w-4 h-4" />
                    Adaugă Primul Contact
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {contact.name}
                          </h3>
                          {contact.isPrimary && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-full">
                              <Star className="w-3 h-3" />
                              Principal
                            </span>
                          )}
                        </div>

                        {contact.position && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                            <Building className="w-4 h-4" />
                            <span>{contact.position}</span>
                          </div>
                        )}

                        <div className="space-y-1">
                          {contact.email && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                              <Mail className="w-4 h-4" />
                              <a href={`mailto:${contact.email}`} className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                                {contact.email}
                              </a>
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${contact.phone}`} className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                                {contact.phone}
                              </a>
                            </div>
                          )}
                          {contact.notes && (
                            <div className="mt-2 p-2 bg-gray-50 dark:bg-slate-700 rounded text-sm text-gray-600 dark:text-gray-400">
                              {contact.notes}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>Adăugat: {new Date(contact.createdAt).toLocaleDateString('ro-RO')}</span>
                          {contact.updatedAt !== contact.createdAt && (
                            <span>• Modificat: {new Date(contact.updatedAt).toLocaleDateString('ro-RO')}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                          title="Editează"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Șterge"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Statistici
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Total Contacte</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {contacts.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Contact Principal</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {contacts.filter(c => c.isPrimary).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Cu Email</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {contacts.filter(c => c.email).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Cu Telefon</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {contacts.filter(c => c.phone).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Contact Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingContact ? 'Editează Contact' : 'Adaugă Contact Nou'}
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {submitError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {submitError}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nume *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Nume complet"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Poziție
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Manager, Director, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="email@exemplu.ro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="07xx xxx xxx"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPrimary"
                  checked={formData.isPrimary}
                  onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                  className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                />
                <label htmlFor="isPrimary" className="text-sm text-gray-700 dark:text-gray-300">
                  Contact principal
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Note
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Note suplimentare despre contact..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Se salvează...' : 'Salvează'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}