import { cva, VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'flex w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input bg-background text-foreground',
        outline: 'border border-input bg-transparent focus-visible:ring-primary',
        error: 'border-error text-error focus-visible:ring-error',
        success: 'border-success text-success focus-visible:ring-success',
        warning: 'border-warning text-warning focus-visible:ring-warning',
      },
      inputSize: {
        xs: 'h-6 px-2 py-1 text-xs',
        sm: 'h-8 px-3 py-2 text-sm',
        md: 'h-10 px-4 py-2 text-sm',
        lg: 'h-12 px-4 py-4 text-base',
        xl: 'h-14 px-5 py-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  },
)

export type InputVariants = VariantProps<typeof inputVariants>

export { inputVariants }
