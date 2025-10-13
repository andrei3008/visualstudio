'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Rocket,
  FileText,
  Users,
  Crown,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target
} from 'lucide-react'
import Link from 'next/link'

interface QuickActionsProps {
  subscriptionInfo?: any
  projectsCount?: number
}

export default function QuickActions({ subscriptionInfo, projectsCount }: QuickActionsProps) {
  const actions = [
    {
      title: 'Trimite Cerere Proiect',
      description: 'Trimite o cerere pentru un nou proiect',
      icon: Plus,
      color: 'blue',
      href: '/app/projects/new',
      disabled: false,
      badge: null
    },
    {
      title: 'Trimite Propunere',
      description: 'Creează o ofertă pentru un proiect existent',
      icon: FileText,
      color: 'green',
      href: '/app/proposals/new',
      disabled: projectsCount === 0,
      badge: projectsCount === 0 ? 'Necesită proiecte' : null
    },
    {
      title: 'Gestionează Echipa',
      description: 'Adaugă membri și asignează task-uri',
      icon: Users,
      color: 'purple',
      href: '/app/team',
      disabled: false
    },
    {
      title: 'Vezi Statistici',
      description: 'Analizează performanța și progresul',
      icon: TrendingUp,
      color: 'orange',
      href: '/app/analytics',
      disabled: false
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'hover:bg-blue-50 dark:hover:bg-blue-950/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-700 dark:text-blue-300',
        icon: 'text-blue-600 dark:text-blue-400'
      },
      green: {
        bg: 'hover:bg-green-50 dark:hover:bg-green-950/20',
        border: 'border-green-200 dark:border-green-800',
        text: 'text-green-700 dark:text-green-300',
        icon: 'text-green-600 dark:text-green-400'
      },
      purple: {
        bg: 'hover:bg-purple-50 dark:hover:bg-purple-950/20',
        border: 'border-purple-200 dark:border-purple-800',
        text: 'text-purple-700 dark:text-purple-300',
        icon: 'text-purple-600 dark:text-purple-400'
      },
      orange: {
        bg: 'hover:bg-orange-50 dark:hover:bg-orange-950/20',
        border: 'border-orange-200 dark:border-orange-800',
        text: 'text-orange-700 dark:text-orange-300',
        icon: 'text-orange-600 dark:text-orange-400'
      }
    }
    return colorMap[color as keyof typeof colorMap]
  }

  return (
    <Card className="bg-white dark:bg-slate-800 border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Acțiuni Rapide
          </CardTitle>
          <Badge className="bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-300">
            {actions.filter(a => !a.disabled).length} disponibile
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid gap-4">
          {actions.map((action, index) => {
            const colors = getColorClasses(action.color)

            return (
              <Link
                key={index}
                href={action.href}
                className={`
                  group relative p-4 rounded-xl border-2 border-dashed
                  transition-all duration-300 hover:border-solid
                  ${action.disabled
                    ? 'opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-700'
                    : `${colors.bg} ${colors.border}`
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${action.disabled ? 'bg-gray-100 dark:bg-gray-800' : `${colors.bg} ${colors.icon}`}
                    `}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {action.badge && (
                      <Badge
                        variant="outline"
                        className={`
                          text-xs ${action.disabled
                            ? 'border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400'
                            : 'border-red-300 text-red-600 dark:border-red-600 dark:text-red-400'
                          }
                        `}
                      >
                        {action.badge}
                      </Badge>
                    )}
                    <ArrowRight className={`
                      h-4 w-4 transition-transform duration-300
                      ${action.disabled ? 'text-gray-400' : `${colors.text} group-hover:translate-x-1`}
                    `} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Upgrade CTA */}
        {subscriptionInfo && !subscriptionInfo.hasSubscription && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    Deblochează Funcționalități Premium
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Acces nelimitat la proiecte și multe altele
                  </p>
                </div>
              </div>
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/pricing" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Upgrade
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}