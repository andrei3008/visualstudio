"use client"
import { useState, useTransition, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Crown, AlertTriangle, Lock } from 'lucide-react'
import Link from 'next/link'

interface ProjectLimit {
  canCreateProject: boolean
  currentProjects: number
  maxProjects: number
  remainingProjects: number
  planType: 'free' | 'subscription' | 'unlimited'
  subscriptionName: string | null
  message: string | null
}

export default function NewProjectForm() {
  const [name, setName] = useState('')
  const [pending, startTransition] = useTransition()
  const [projectLimit, setProjectLimit] = useState<ProjectLimit | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchProjectLimit()
  }, [])

  const fetchProjectLimit = async () => {
    try {
      const res = await fetch('/api/projects/check-limit')
      const data = await res.json()
      setProjectLimit(data)
    } catch (error) {
      console.error('Failed to fetch project limit:', error)
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name.trim()) return

    // Check if user can create project
    if (projectLimit && !projectLimit.canCreateProject) {
      toast.error(projectLimit.message || 'Nu poți crea proiecte')
      return
    }

    startTransition(async () => {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (res.ok) {
        toast.success('Proiect creat')
        setName('')
        fetchProjectLimit() // Refresh project limits
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Crearea a eșuat')
      }
    })
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Adaugă Proiect Nou</CardTitle>
          {projectLimit && (
            <Badge
              className={
                projectLimit.planType === 'unlimited'
                  ? 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700'
                  : projectLimit.planType === 'subscription'
                  ? 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                  : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300'
              }
            >
              {projectLimit.subscriptionName || 'Free'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Project Limit Info */}
        {projectLimit && (
          <div className="mb-4 p-3 rounded-lg border">
            {projectLimit.planType === 'unlimited' ? (
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm text-purple-700 dark:text-purple-300">
                  Proiecte nelimitate
                </span>
              </div>
            ) : projectLimit.planType === 'subscription' ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Proiecte rămase:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {projectLimit.remainingProjects}/{projectLimit.maxProjects}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(projectLimit.remainingProjects / projectLimit.maxProjects) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Necesită abonament
                </span>
              </div>
            )}
          </div>
        )}

        {/* Alert if cannot create project */}
        {projectLimit && !projectLimit.canCreateProject && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700 dark:text-red-300">
                <p className="font-medium mb-1">Limită atinsă</p>
                <p>{projectLimit.message}</p>
                {projectLimit.planType === 'free' && (
                  <Link href="/pricing" className="inline-flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline">
                    <Crown className="h-3 w-3" />
                    Vezi planuri disponibile
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nume proiect"
            disabled={pending || (projectLimit && !projectLimit.canCreateProject) || false}
          />
          <Button
            type="submit"
            disabled={pending || (projectLimit && !projectLimit.canCreateProject) || false}
            className="w-full"
          >
            {pending ? 'Se creează...' : 'Adaugă proiect'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

