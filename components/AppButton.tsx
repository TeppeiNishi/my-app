import { Loader2 } from 'lucide-react'
import { PropsWithChildren } from 'react'

import { Button, ButtonProps } from '@/components/ui/button'

type AppButtonProps = ButtonProps & {
  loading?: boolean
}

export function AppButton({
  loading,
  children,
  ...restProps
}: PropsWithChildren<AppButtonProps>) {
  return (
    <Button type="submit" disabled={loading} {...restProps}>
      <span className={loading ? 'invisible' : ''}>{children}</span>
      {loading && <Loader2 className="absolute animate-spin" />}
    </Button>
  )
}
