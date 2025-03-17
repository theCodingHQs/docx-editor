import { cn } from '@/lib/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import * as React from 'react'

// Dialog components from Radix
const Dialog = DialogPrimitive.Root
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

// Define size types for DialogContent
type SizeType = 'sm' | 'md' | 'lg' | 'xl'

// Utility function to get size
const getSize = (size?: SizeType): string => {
  switch (size) {
    case 'md':
      return 'sm:max-w-4xl'
    case 'lg':
      return 'sm:max-w-7xl'
    case 'xl':
      return 'sm:min-h-full sm:min-w-full'
    default:
      return 'sm:max-w-1xl'
  }
}

// DialogTrigger with explicit types
interface DialogTriggerProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {
  className?: string
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(({ className, ...props }, ref) => {
  return <DialogPrimitive.Trigger ref={ref} className={cn('w-full', className)} {...props} />
})
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName

// DialogOverlay with explicit types
interface DialogOverlayProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
  className?: string
}

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-[radial-gradient(rgba(0,_0,_0,_0.1)_1px,_#fff9_1px)] bg-[size:3px_3px] backdrop-blur-[4px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// DialogContent with explicit types
interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  className?: string
  children: React.ReactNode
  size?: SizeType
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(({ className, children, size, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      aria-describedby="dialog-description"
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 flex w-full max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col justify-between border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
        getSize(size),
      )}
      {...props}
    >
      {children}

      <DialogPrimitive.Close>
        <button
          className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
          aria-label="Close"
        >
          <X className="h-4 w-4 bg-white" />
          <span className="sr-only">Close</span>
        </button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

// DialogHeader with explicit types
interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

// DialogFooter with explicit types
interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const DialogFooter: React.FC<DialogFooterProps> = ({ className, ...props }) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)
DialogFooter.displayName = 'DialogFooter'

// DialogTitle with explicit types
interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  className?: string
}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props}>
    {children}
  </DialogPrimitive.Title>
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

// DialogDescription with explicit types
interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
  className?: string
}

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

// Exporting all components
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
}

