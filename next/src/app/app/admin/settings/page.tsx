import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Shield,
  Database,
  Bell,
  Mail,
  Globe,
  Smartphone,
  Lock,
  Key,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Clock,
  Users,
  FileText
} from 'lucide-react'
import AdminLayout from '../components/AdminLayout'

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
  if (u?.role !== 'admin') redirect('/app')

  // Get system stats
  const [
    totalUsers,
    totalProjects,
    totalProposals,
    databaseSize
  ] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.proposal.count(),
    // Note: In a real app, you would get actual database size
    "124.5 MB"
  ])

  return (
    <AdminLayout
      title="Setări Sistem"
      subtitle="Configurări și administrare platformă"
    >
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-gray-100/50 to-white/50 dark:from-zinc-800/50 dark:to-zinc-900/50 p-1.5 rounded-2xl border border-gray-200/50 dark:border-zinc-700/50 backdrop-blur-sm shadow-lg mb-8">
          <TabsTrigger value="general" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-gray-50 data-[state=active]:dark:from-zinc-800 data-[state=active]:dark:to-zinc-900 data-[state=active]:shadow-lg rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-bold py-3">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-gray-50 data-[state=active]:dark:from-zinc-800 data-[state=active]:dark:to-zinc-900 data-[state=active]:shadow-lg rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-bold py-3">
            <Shield className="h-4 w-4" />
            Securitate
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-gray-50 data-[state=active]:dark:from-zinc-800 data-[state=active]:dark:to-zinc-900 data-[state=active]:shadow-lg rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-bold py-3">
            <Bell className="h-4 w-4" />
            Notificări
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-gray-50 data-[state=active]:dark:from-zinc-800 data-[state=active]:dark:to-zinc-900 data-[state=active]:shadow-lg rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-bold py-3">
            <Database className="h-4 w-4" />
            Mentenanță
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Site Settings */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Setări Site
                </CardTitle>
                <CardDescription>
                  Configurări generale ale platformei
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Nume Platformă
                  </label>
                  <Input
                    defaultValue="Visual Studio Platform"
                    className="h-12 border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Email Contact
                  </label>
                  <Input
                    type="email"
                    defaultValue="admin@visualstudio.com"
                    className="h-12 border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Limbă Implicită
                  </label>
                  <select className="w-full h-12 px-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800">
                    <option value="ro">Română</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Mod Întreținere</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Arată pagina de întreținere utilizatorilor</div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* System Info */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Informații Sistem
                </CardTitle>
                <CardDescription>
                  Statistici și detalii platformă
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalUsers}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Utilizatori</div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalProjects}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Proiecte</div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalProposals}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Propuneri</div>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{databaseSize}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">DB Size</div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Versiune Platformă</span>
                    <Badge variant="outline">v2.1.0</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Framework</span>
                    <Badge variant="outline">Next.js 14</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Database</span>
                    <Badge variant="outline">PostgreSQL</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Ultimul Backup</span>
                    <Badge variant="outline">2025-10-10 14:30</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Authentication */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
                  Autentificare
                </CardTitle>
                <CardDescription>
                  Setări de securitate pentru autentificare
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Verificare Email</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Necesită verificarea emailului pentru conturi noi</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Autentificare cu 2 Factori</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Activează 2FA pentru toți utilizatorii</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Parolă Complexă</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Necesită parolă complexă (min 8 caractere)</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Sesiune Expiră (minute)
                  </label>
                  <Input
                    type="number"
                    defaultValue="30"
                    className="h-12 border-gray-200 dark:border-gray-700"
                  />
                </div>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Chei API
                </CardTitle>
                <CardDescription>
                  Management chei API și acces extern
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Securitate Chei API
                      </div>
                      <div className="text-xs text-yellow-700 dark:text-yellow-300">
                        Păstrează cheile API în siguranță și nu le partaja public
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Stripe API</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">sk_test_****</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  <Key className="h-4 w-4 mr-2" />
                  Generează Cheie Nouă
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Email Notifications */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Notificări Email
                </CardTitle>
                <CardDescription>
                  Configurări emailuri automate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Utilizatori Noi</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Notifică adminii despre utilizatori noi</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Propuneri Noi</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Notifică despre propuneri trimise</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Proiecte Noi</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Notifică despre proiecte create</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Backup Zilnic</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Raport backup zilnic</div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Push Notifications */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Notificări Push
                </CardTitle>
                <CardDescription>
                  Configurări notificări mobile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Notificări Push</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Activează notificări push pentru mobil</div>
                  </div>
                  <Switch />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Server Key Firebase
                  </label>
                  <Input
                    type="password"
                    defaultValue="****"
                    className="h-12 border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-green-800 dark:text-green-200">
                        Configurare Completă
                      </div>
                      <div className="text-xs text-green-700 dark:text-green-300">
                        Serviciul de notificări este configurat și funcțional
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance */}
        <TabsContent value="maintenance">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Database */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Mentenanță Bază de Date
                </CardTitle>
                <CardDescription>
                  Operațiuni mentenanță și backup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12">
                    <Download className="h-4 w-4 mr-2" />
                    Backup
                  </Button>
                  <Button variant="outline" className="h-12">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ultimul Backup</span>
                    <Badge variant="outline">2025-10-10 14:30</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Procentaj Completare</span>
                    <Badge className="bg-green-100 text-green-700 border-green-200">100%</Badge>
                  </div>
                </div>

                <Button className="w-full" variant="destructive">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Resetare Bază de Date
                </Button>
              </CardContent>
            </Card>

            {/* Cache */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  Cache și Performanță
                </CardTitle>
                <CardDescription>
                  Optimizare cache și performanță
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Redis Cache</div>
                      <div className="text-xs text-green-600 dark:text-green-400">Activ</div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">Conectat</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">CDN</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">Cloudflare</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Activ</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Golește Cache
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Zap className="h-4 w-4 mr-2" />
                    Optimizare
                  </Button>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Sugestie Optimizare
                      </div>
                      <div className="text-xs text-yellow-700 dark:text-yellow-300">
                        Se recomandă golirea cache-ului o dată pe săptămână
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}