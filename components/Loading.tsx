import { LoaderIcon } from 'lucide-react'

export function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex items-center gap-2">
        <LoaderIcon className="animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  )
}
