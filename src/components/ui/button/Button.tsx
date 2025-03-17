import React, { forwardRef } from "react";
/* eslint-disable react/jsx-props-no-spreading */
import { useNavigateToUrl } from '@/helpers/hooks/react-router-dom';
import { cn } from "@/lib/utils";
import { Slot } from '@radix-ui/react-slot';
import { ArrowRightLeft, Ban, CalendarX, CalendarX2, CircleCheckBig, DoorOpen, Download, Edit, FileCheck, FileDown, FileText, List, MoveDown, 
  MoveUp, Plus, RotateCcw, RotateCw, Save, Search, Trash2, Copy, CircleDot } from 'lucide-react';
import TooltipAllInOne from "../../ui/tooltip/tooltip";
import { buttonVariants, ButtonVariants } from "./button-variants";

// define the ref type
//type Ref = HTMLButtonElement;

// extend the base button attributes
type ButtonProps = Omit<Omit<React.HTMLProps<HTMLButtonElement>, 'onClick'>, 'size'> & {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  preventDefault?: boolean
  asChild?: boolean
  to?: any
  onClick?: React.MouseEventHandler
  children?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, preventDefault = true, asChild = false, ...props }: ButtonProps, ref) => {
    const navigate = useNavigateToUrl()
    const handleOnClick: React.MouseEventHandler = (...args) => {
      if (preventDefault && args.length) {
        args[0].preventDefault()
      }
      if (props.to) {
        if (props.onClick) {
          props.onClick(...args)
        }
        navigate(props.to)
      } else if (props.onClick) {
        props.onClick(...args)
      }
    }

    const Comp: any = asChild ? Slot : 'button'
    return (
      <Comp className={cn('', buttonVariants({ variant, size, className }))} ref={ref} type="button" {...props} onClick={handleOnClick} />
    )
  },
)

export const SaveButtonLg = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Save" side="top">
      <Button size="md" {...props} className={cn('border rounded bg-green-600 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <Save size={16} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const AddButtonLg = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Add" side="bottom">
      <Button size="md" {...props} className={cn('border rounded bg-green-600 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit" >
        <Plus size={16} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button >
    </TooltipAllInOne>
  )
}

export const ListAllButtonLg = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="All Valuations" side="bottom">
      <Button size="md" {...props} className={cn('border rounded bg-green-600 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <List size={16} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const ListInProgressButtonLg = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="In Progress Valuations" side="bottom">
      <Button size="md" {...props} className={cn('border rounded bg-green-600 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <List size={16} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const DownloadButtonLg = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Download" side="bottom">
      <Button size="md" {...props} className={cn('border rounded bg-green-600 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <Download size={16} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const EditButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Edit" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-yellow-500 text-black hover:bg-yellow-300 hover:text-black', props.className)} type="submit">
        <Edit size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const SearchButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Search Nearby" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-green-500 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <Search size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const AuditLogButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Audit Log" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-green-500 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <FileText size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const VisitButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Visit" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-yellow-500 text-white hover:bg-yellow-300 hover:text-black', props.className)} type="submit">
        <DoorOpen size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const VisitDelayedButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Visit Delay" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-red-500 text-white hover:bg-red-300 hover:text-white', props.className)} type="submit">
        <CalendarX size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const TransferVisitButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Transfer Visit" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-green-500 text-white hover:bg-green-300 hover:text-white', props.className)} type="submit">
        <ArrowRightLeft size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const VisitReportButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Visit Report" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-green-500 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <FileCheck size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const ReportDelayedButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Report Delayed" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-red-500 text-white hover:bg-red-300 hover:text-white', props.className)} type="submit">
        <CalendarX2 size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const DispatchReportButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Dispatch" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-green-500 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <CircleDot size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const CancelButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Cancel" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-red-500 text-white hover:bg-red-300 hover:text-white', props.className)} type="submit">
        <Ban size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const DeleteButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Delete" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-red-500 text-white hover:bg-red-300 hover:text-black', props.className)} type="submit">
        <Trash2 size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const DeleteButtonLg = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Delete" side="top">
      <Button size="md" {...props} className={cn('border rounded bg-red-500 text-white hover:bg-red-300 hover:text-black', props.className)} type="submit">
        <Trash2 size={16} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const RotateCwButtonLg = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Rotate Right" side="top">
      <Button size="md" {...props} className={cn('border rounded bg-green-600 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <RotateCw size={16} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const RotateCcwButtonLg = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Rotate Left" side="top">
      <Button size="md" {...props} className={cn('border rounded bg-green-600 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <RotateCcw size={16} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const MoveUpButtonLg = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Move Up" side="top">
      <Button size="md" {...props} className={cn('border rounded bg-green-600 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <MoveUp size={16} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const MoveDownButtonLg = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Move Down" side="top">
      <Button size="md" {...props} className={cn('border rounded bg-green-600 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <MoveDown size={16} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}

export const FileDownloadButtonLg = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Download File" side="top">
      <Button size="md" {...props} className={cn('border rounded bg-green-600 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <FileDown size={16} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}


export const DraftToReadyForVisitButtonSm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Draft To Ready For Visit" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-yellow-500 text-white hover:bg-yellow-300 hover:text-black', props.className)} type="submit">
        <CircleCheckBig size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}


export const CopySm = (props: ButtonProps) => {
  return (
    <TooltipAllInOne content="Copy" side="bottom">
      <Button size="sm" {...props} className={cn('border rounded bg-green-500 text-white hover:bg-green-300 hover:text-black', props.className)} type="submit">
        <Copy size={12} className={`${props.children ? 'me-2' : ''}`} />
        {props.children}
      </Button>
    </TooltipAllInOne>
  )
}
