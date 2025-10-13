'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash2, AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DeleteProjectButtonProps {
  projectId: string
  projectName: string
}

export default function DeleteProjectButton({ projectId, projectName }: DeleteProjectButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh() // Refresh the page to update the project list
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete project')
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
      alert('Failed to delete project')
    } finally {
      setIsDeleting(false)
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 border-red-200 dark:border-red-800"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Șterge
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmare Ștergere Proiect
          </DialogTitle>
          <DialogDescription>
            Ești sigur că vrei să ștergi proiectul <strong>"{projectName}"</strong>?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
              Atenție! Această acțiune va șterge permanent:
            </h4>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              <li>• Toate task-urile asociate</li>
              <li>• Toate milestone-urile</li>
              <li>• Toate mesajele și fișierele</li>
              <li>• Toate propunerile</li>
              <li>• Istoricul complet al proiectului</li>
            </ul>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Această acțiune nu poate fi anulată.
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            Anulează
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Ștergere...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Șterge Proiectul
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}