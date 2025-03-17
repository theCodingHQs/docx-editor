import clsx from 'clsx'
import { ReactNode, useState } from 'react'
import { Button } from './button/Button'
import { TriangleAlert } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './Dialog'

interface ConfirmDialogProps {
  onConfirmDialog?: () => void
  trigger: ReactNode
  title?: string
  desc?: string
  color?: 'destructive' | 'warning' | 'success' | 'primary'
  icon?: string
  disabled?: boolean
  confirmText?: string
  [key: string]: any
}

export default function ConfirmDialog({
  onConfirmDialog,
  trigger,
  title,
  desc,
  color = 'destructive',
  icon,
  disabled,
  confirmText,
  ...props
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((prev) => !prev)

  const onConfirm = () => {
    onConfirmDialog?.()
    setOpen(false)
  }

  return (
    <div onClick={(e) => e.stopPropagation()} {...props}>
      <Dialog open={open} onOpenChange={toggle}>
        <DialogTrigger disabled={disabled}>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-2 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className={clsx(
                      'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10',
                      {
                        'bg-destructive/10': color === 'destructive',
                        'bg-warning-strong/10': color === 'warning',
                        'bg-success-strong/10': color === 'success',
                        'bg-primary/10': color === 'primary',
                      },
                    )}
                  >
                    <TriangleAlert
                      className={clsx('h-6 w-6', {
                        'text-destructive': color === 'destructive',
                        'text-warning-strong': color === 'warning',
                        'text-success-strong': color === 'success',
                        'text-primary/80': color === 'primary',
                      })}
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">{title || 'confirm_delete'}</DialogTitle>
                    <div className="mt-2 py-4">
                      <p className="text-sm text-gray-500">{desc || 'Are you sure you want to cancel this valuation?'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button
                  size="xs"
                  onClick={onConfirm}
                  className={clsx(
                    'inline-flex w-full justify-center rounded-md border-0 px-3 py-2 text-sm font-semibold text-white sm:ml-3 sm:w-auto',
                    {
                      'bg-destructive hover:bg-destructive/90': color === 'destructive',
                      'bg-warning-strong hover:bg-warning-strong/90': color === 'warning',
                      'bg-success-strong hover:bg-success-strong/90': color === 'success',
                      'bg-primary/80 hover:bg-primary/50': color === 'primary',
                    },
                  )}
                >
                  {confirmText || 'delete'}
                </Button>
                <Button
                  size="xs"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm  text-gray-900 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
