import React from 'react'
import { TextField80, TextField96, TextFieldFlexible } from './InputFields'

interface MappingLabelsProps {
  inputFieldData: {
    divWidth?: string
    label: string
    value?: string | number
    name: string
    type: string
    min?: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => any
  }[]
}

export const MappingLabels96 = ({ inputFieldData }: MappingLabelsProps) => {
  return (
    <>
      {inputFieldData.length > 0 &&
        inputFieldData.map((field) => {
          return (
            <TextField96 key={field.name} label={field.label} onChange={field.handleChange} name={field.name} value={field.value === null ? '' : field.value} type={field.type} min={field.min} />
          )
        })}
    </>
  )
}

export const MappingLabels80 = ({ inputFieldData }: MappingLabelsProps) => {
  return (
    <>
      {
        inputFieldData.length > 0 &&
        inputFieldData.map((field) => (
          <TextField80 key={field.name} label={field.label} onChange={field.handleChange} name={field.name} value={field.value === null ? '' : field.value} type={field.type} min={field.min} />
        ))}
    </>
  )
}

export const MappingLabelsFlexible = ({ inputFieldData }: MappingLabelsProps) => {
  return (
    <>
      {inputFieldData.length > 0 &&
        inputFieldData.map((field) => {
          return (
            <TextFieldFlexible divWidth={field.divWidth} key={field.name} label={field.label} onChange={field.handleChange} name={field.name} value={field.value === null ? '' : field.value} type={field.type} min={field.min} />
          )
        })}
    </>
  )
}
