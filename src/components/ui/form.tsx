import { Slot } from '@radix-ui/react-slot'
import React, { ReactNode, useMemo } from 'react'
import { Controller, FieldValues, FormProvider, Path, UseFormReturn } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

import { FormFieldContext, FormItemContext, useFormField } from './form-field'
import { Input } from './input'

// Type for FormFieldProps
interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  control: UseFormReturn<T>['control']
  render: (props: any) => React.ReactElement
}

// Type for FormItemProps
interface FormItemProps extends React.HTMLProps<HTMLDivElement> {
  className?: string
  children?: ReactNode
}

// Type for FormLabelProps
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
}

// Type for FormControlProps
interface FormControlProps extends React.HTMLProps<HTMLElement> {}

// Type for FormDescriptionProps
interface FormDescriptionProps extends React.HTMLProps<HTMLParagraphElement> {
  className?: string
}

// Type for FormMessageProps
interface FormMessageProps extends React.HTMLProps<HTMLParagraphElement> {
  className?: string
  children?: ReactNode
}

// const Form = FormProvider

interface FormProps<T extends FieldValues> {
  children: React.ReactNode // Accept children
  form: UseFormReturn<T> // Pass the form methods
}

const Form = <T extends FieldValues>({ form, children }: FormProps<T>) => {
  return <FormProvider {...form}>{children}</FormProvider>
}

// FormField Component
const FormField = <T extends FieldValues>({ name, control, render, ...props }: FormFieldProps<T>) => {
  const contextValue = useMemo(
    () => ({
      name,
    }),
    [name],
  )

  return (
    <FormFieldContext.Provider value={contextValue}>
      <Controller name={name} control={control} render={render} {...props} />
    </FormFieldContext.Provider>
  )
}

// FormItem Component
const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({ className, children, ...props }, ref) => {
  const id = React.useId()

  const contextId = useMemo(
    () => ({
      id,
    }),
    [id],
  )

  return (
    <FormItemContext.Provider value={contextId}>
      <div ref={ref} className={cn('mx-auto mb-0 flex w-full min-w-[180px] max-w-[440px] flex-col justify-end', className)} {...props}>
        {children}
      </div>
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

// FormLabel Component
const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField()

  return <Label ref={ref} className={cn('py-1', className)} htmlFor={formItemId} {...props} />
})
FormLabel.displayName = 'FormLabel'

// FormControl Component
const FormControl = React.forwardRef<HTMLElement, FormControlProps>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

// FormDescription Component
const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return <p ref={ref} id={formDescriptionId} className={cn('text-sm text-muted-foreground', className)} {...props} />
})
FormDescription.displayName = 'FormDescription'

// FormMessage Component
const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p ref={ref} id={formMessageId} className={cn('text-sm font-medium text-destructive', className)} {...props}>
      {body}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

interface ClassNames {
  labelClass?: string
  messageClass?: string
  descriptionClass?: string
  inputClass?: string
}
interface InputTypes extends React.HTMLProps<HTMLInputElement> {
  options?: Record<string, any>[] // Array of objects where each object can have any key-value pair
  valueField?: string
  labelField?: string
}
interface FormFieldInputProps<T extends FieldValues>
  extends Omit<React.HTMLProps<HTMLInputElement>, 'name'>, // Omit 'name' to avoid conflict
    FormFieldProps<T> {
  description?: string | React.ReactElement
  inputProps?: InputTypes
  children?: React.ReactElement
  label?: any
  type?: string
  classNames?: ClassNames
}

const renderChildren = (children, props) => {
  return typeof children === 'function' ? children(props) : children
}

const FormFieldInput = <T extends FieldValues>({
  type = 'text',
  name,
  label,
  control,
  description,
  className,
  inputProps,
  children,
  classNames,
}: Omit<FormFieldInputProps<T>, 'render'>) => {
  console.log(className)
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={classNames?.labelClass}>{label}</FormLabel>
          <FormControl>
            {children ? (
              renderChildren(children, field)
            ) : (
              <Input {...field} type={type} {...inputProps} className={cn(className, inputProps?.className, classNames?.inputClass)} />
            )}
          </FormControl>
          <FormMessage className={classNames?.messageClass} />
          <FormDescription className={classNames?.descriptionClass}>{description}</FormDescription>
        </FormItem>
      )}
    />
  )
}

export default FormFieldInput
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage }
