import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs): string {
  return twMerge(clsx(inputs))
}

// Converts locale with hyphen to locale without hyphen, accounting for script codes if present
export const convertLocaleWithHyphenToWithout = (localeWithHyphen: string): string => {
  return localeWithHyphen.replace(/-/g, '').replace(/([a-z]{2})([A-Za-z]{2,4})/, (_, p1, p2) => p1 + p2.toUpperCase())
}

export const formatDateymd = (date) => {
  if(date == null){
    return null
  }
  const day = String(date.getDate()).padStart(2, '0')  // Ensures two digits for day
  const month = String(date.getMonth() + 1).padStart(2, '0')  // getMonth() is zero-based, so add 1
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}

export const startOfMonthdmy = (date) => {
  if(date == null){
    return null
  }
  const month = String(date.getMonth() + 1).padStart(2, '0')  // getMonth() is zero-based, so add 1
  const year = date.getFullYear()

  return `01-${month}-${year}`
}

export const formatDatemonyyyy = (date) => {
  if(date == null){
    return null
  }

  return `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`
}

export const formatDateTime = (date) => {
  const day = String(date.getDate()).padStart(2, '0')  // Ensures two digits for day
  const month = String(date.getMonth() + 1).padStart(2, '0')  // getMonth() is zero-based, so add 1
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  // Format as YYYY-MM-DDTHH:MM (the format that datetime-local expects)
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export const dmyStringToDate = (dateString) => {
  const [day, month, year] = dateString.split('-')
  const convertedDate = year.length == 4 ? new Date(`${year}-${month}-${day}`) : new Date(`${day}-${month}-${year}`)
  return formatDateymd(convertedDate)
}

export const ymdTimeStringToDate = (dateString) => {
  const date = dateString.split('T')[0]
  const [year, month, day] = date.split('-')
  const convertedDate = year.length == 4 ? new Date(`${year}-${month}-${day}`) : new Date(`${day}-${month}-${year}`)
  return formatDateymd(convertedDate)
}

export const isNullOrEmpty = (data) => {
  return data === null || data === ''
}


export const twoDaysLaterdmy = (date = new Date()) => {
  const day = String(date.getDate() + 2).padStart(2, '0')  // Ensures two digits for day
  const month = String(date.getMonth() + 1).padStart(2, '0')  // getMonth() is zero-based, so add 1
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}
