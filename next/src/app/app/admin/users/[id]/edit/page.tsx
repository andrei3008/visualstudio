import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowLeft,
  Save,
  Users,
  Shield,
  Calendar,
  Mail,
  FolderOpen,
  MessageSquare,
  AlertTriangle,
  Edit
} from 'lucide-react'
import Link from 'next/link'
import AdminLayout from '../../../components/AdminLayout'

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditUserPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true }
  })
  if (currentUser?.role !== 'admin') redirect('/app')

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      Nume: true,
      Prenume: true,
      Companie: true,
      Telefon: true,
      Oras: true,
      Address: true,
      PostalCode: true,
      Country: true,
      Website: true,
      Notes: true,
      isActive: true,
      clientSince: true,
      createdAt: true,
      _count: {
        select: {
          projects: true,
          messages: true
        }
      }
    }
  })

  if (!user) {
    notFound()
  }

  const userStats = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      projects: {
        select: { id: true, name: true, status: true, createdAt: true }
      },
      _count: {
        select: {
          projects: true,
          messages: true
        }
      }
    }
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-0'
      case 'staff':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0'
      case 'client':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white border-0'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0'
    }
  }

  return (
    <AdminLayout
      title="Editare Utilizator"
      subtitle="Modifică informațiile utilizatorului"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/app/admin/users">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi la Utilizatori
            </Link>
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Info Card */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Informații Utilizator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.name || 'Nume nespecificat'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
                <Badge className={`w-fit mx-auto ${getRoleColor(user.role)}`}>
                  {user.role}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {userStats?._count.projects || 0}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Proiecte</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {userStats?._count.messages || 0}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Mesaje</div>
                </div>
              </div>

              <div className="text-center pt-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Înregistrat la
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString('ro-RO')}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-green-600 dark:text-green-400" />
                Editare Detalii
              </CardTitle>
              <CardDescription>
                Modifică informațiile și setările utilizatorului
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    Informații de Bază
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nume Complet</Label>
                      <Input
                        id="name"
                        defaultValue={user.name || ''}
                        placeholder="Introdu numele complet"
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        disabled
                        className="h-12 bg-gray-50 dark:bg-gray-800"
                      />
                      <p className="text-xs text-gray-500">Email-ul nu poate fi modificat</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Rol Utilizator</Label>
                    <Select defaultValue={user.role}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selectează rolul" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-gray-500" />
                    Setări de Securitate
                  </h3>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          Modificare Parolă
                        </div>
                        <div className="text-xs text-yellow-700 dark:text-yellow-300">
                          Pentru a modifica parola, va trebui să generezi o cerere de resetare
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Trimite Email Resetare Parolă
                    </Button>
                    <Button variant="outline" size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Activează 2FA
                    </Button>
                  </div>
                </div>

                {/* Additional Actions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-gray-500" />
                    Acțiuni
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/app/admin/users/${user.id}/projects`}>
                        <FolderOpen className="h-4 w-4 mr-2" />
                        Vezi Proiectele
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/app/admin/users/${user.id}/messages`}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Vezi Mesajele
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Istoric Activitate
                    </Button>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Creat: {new Date(user.createdAt).toLocaleDateString('ro-RO')}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href="/app/admin/users">
                        Anulează
                      </Link>
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Salvează Modificările
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}