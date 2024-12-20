import { Loader2 } from 'lucide-react'
import { PropsWithChildren } from 'react'

import { Button, ButtonProps } from '@/components/ui/button'

export type AppButtonProps = ButtonProps & {
  loading?: boolean
}

export function AppButton({
  loading = false,
  children,
  ...restProps
}: PropsWithChildren<AppButtonProps>) {
  return (
    <Button type="submit" disabled={loading} {...restProps}>
      <>
        <span className={loading ? 'invisible' : ''}>{children}</span>
        {loading && <Loader2 className="absolute animate-spin" />}
      </>
    </Button>
  )
}
