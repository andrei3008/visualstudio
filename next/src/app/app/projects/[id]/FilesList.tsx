import { prisma } from '@/lib/prisma'
import DeleteFileButton from '@/components/DeleteFileButton'
import { Badge } from '@/components/ui/badge'

export default async function FilesList({ projectId }: { projectId: string }) {
  const files = await prisma.file.findMany({ where: { projectId, isInternal: false }, orderBy: { createdAt: 'desc' } })
  return (
    <ul className="mt-4 divide-y divide-slate-100 rounded-md">
      {files.length === 0 ? (
        <li className="py-4 text-slate-600">Nu există fișiere încă.</li>
      ) : (
        files.map((f) => (
          <li key={f.id} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 py-2 px-2 -mx-2 odd:bg-slate-50 text-sm">
            <div className="flex items-center gap-2">
              <div className="font-medium">{f.originalName}</div>
              <div className="text-xs text-slate-500">{(f.size/1024).toFixed(1)} KB · {new Date(f.createdAt).toLocaleString('ro-RO')}</div>
            </div>
            <div className="text-slate-600">{f.mimeType}</div>
            <div className="sm:text-right">
              <a href={`/api/files/${f.id}`} className="text-primary-700 hover:underline" target="_blank">Descarcă</a>
            </div>
            <div className="sm:text-right">
              <DeleteFileButton fileId={f.id} />
            </div>
          </li>
        ))
      )}
    </ul>
  )
}
