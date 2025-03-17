import { cn } from '@/lib/utils'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva } from 'class-variance-authority'
import * as React from 'react'

// Define the props type for Label component
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
}

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-normal text-gray-600',
)

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
