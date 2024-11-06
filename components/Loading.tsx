import { LoaderIcon } from 'lucide-react'

export function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center gap-2">
        <LoaderIcon className="animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  )
}
