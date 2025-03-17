'use client'

import PropTypes from 'prop-types'
import * as React from 'react'

import { Button } from '@/components/ui//button/Button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import LucideIconByName from './lucide-icon-by-name'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'

export function DatePicker(props) {
  const [date, setDate] = React.useState()
  const [hours, setHours] = React.useState('12')
  const [minutes, setMinutes] = React.useState('00')

  const handleTimeChange = (type, value) => {
    if (type === 'hours') {
      setHours(value)
    } else {
      setMinutes(value)
    }
    if (date) {
      const newDate = new Date(date)
      newDate.setHours(type === 'hours' ? parseInt(value) : parseInt(hours), type === 'minutes' ? parseInt(value) : parseInt(minutes))
      props.onChange?.(newDate)
      setDate(newDate)
    }
  }

  React.useEffect(() => {
    setDate(props.selected)
  }, [props.selected])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          preventDefault={false}
          variant={'outline'}
          className={cn(
            'max-h-[40px] justify-start rounded-sm py-0 pt-0 text-left font-normal',
            !date && 'text-muted-foreground',
            props.className,
          )}
        >
          <LucideIconByName icon="Calendar" className="mr-2 h-4 w-4" />
          <span>Date</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar mode="single" selected={date} onSelect={props.onChange} initialFocus />
        <div className="flex items-center justify-center border-t p-3">
          <LucideIconByName icon="Clock" className="mr-2 h-4 w-4 opacity-50" />
          <Select value={hours} onValueChange={(value) => handleTimeChange('hours', value)}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder='hours' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                  {hour.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="mx-2">:</span>
          <Select value={minutes} onValueChange={(value) => handleTimeChange('minutes', value)}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder='minutes' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <SelectItem key={minute} value={minute.toString().padStart(2, '0')}>
                  {minute.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  )
}

DatePicker.propTypes = {
  selected: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.string,
}
