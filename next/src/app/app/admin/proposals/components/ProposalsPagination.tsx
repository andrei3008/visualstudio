'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProposalsPaginationProps {
  currentPage: number
  totalPages: number
  limit: number
  totalCount: number
}

export function ProposalsPagination({ currentPage, totalPages, limit, totalCount }: ProposalsPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateURL = (newPage: number, newLimit: number = limit) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    params.set('limit', newLimit.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateURL(newPage)
    }
  }

  const handleLimitChange = (newLimit: string) => {
    const limitNum = parseInt(newLimit)
    const newPage = Math.max(1, Math.min(currentPage, Math.ceil(totalCount / limitNum)))
    updateURL(newPage, limitNum)
  }

  // Generate page numbers to show
  const getVisiblePages = () => {
    const pages: number[] = []
    const showPages = 5 // Number of page buttons to show

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const halfShow = Math.floor(showPages / 2)

      if (currentPage <= halfShow) {
        for (let i = 1; i <= showPages; i++) {
          pages.push(i)
        }
      } else if (currentPage >= totalPages - halfShow) {
        for (let i = totalPages - showPages + 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        for (let i = currentPage - halfShow; i <= currentPage + halfShow; i++) {
          pages.push(i)
        }
      }
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Afișare <span className="font-medium">{Math.min((currentPage - 1) * limit + 1, totalCount)}-{Math.min(currentPage * limit, totalCount)}</span> din{' '}
        <span className="font-medium">{totalCount}</span> propuneri
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Elemente pe pagină:</span>
          <Select value={limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger className="w-20 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 w-9 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {currentPage > 3 && totalPages > 5 && (
              <>
                <Button
                  variant={currentPage === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(1)}
                  className="h-9 w-9 p-0"
                >
                  1
                </Button>
                {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
              </>
            )}

            {getVisiblePages().map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="h-9 w-9 p-0"
              >
                {page}
              </Button>
            ))}

            {currentPage < totalPages - 2 && totalPages > 5 && (
              <>
                {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  className="h-9 w-9 p-0"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-9 w-9 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}