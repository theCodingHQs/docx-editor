import { cn } from '@/lib/utils'
import { DialogDescription, DialogTriggerProps } from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './Dialog'

interface ModalFormProps {
  open: boolean
  children: ReactNode
  toggle: () => void
  trigger?: ReactNode
  title?: ReactNode
  desc?: ReactNode
  footer?: ReactNode
  size?: string
  className?: string
  triggerProps?: DialogTriggerProps & React.RefAttributes<HTMLButtonElement>
}

type SizeType = 'sm' | 'md' | 'lg' | 'xl'

export function Modal({ open, children, toggle, trigger, title, desc, footer, size, triggerProps, className }: Readonly<ModalFormProps>) {
  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogTrigger {...triggerProps} onClick={toggle} className={cn('grid', triggerProps?.className)}>
        {trigger}
      </DialogTrigger>
      <DialogContent
        size={size as SizeType}
        className="bg-secondary/60"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="py-1 text-muted-foreground">{desc}</DialogDescription>
        </DialogHeader>
        <div className={cn('relative max-h-[90vh] p-4 border flex-grow overflow-auto rounded bg-white', className)}>{children}</div>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
