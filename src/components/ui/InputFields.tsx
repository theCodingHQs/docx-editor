import { SystemFormProps } from '@/models/form';
import React from 'react';
import { FieldError, InternalFieldName, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps extends SystemFormProps {
  label: string
  labelClass?: string
  inputClassName?: string
  divWidth?: string
  value?: string | number
  name: string
  type: string
  disabled?: boolean | undefined
  required?: boolean
  min?: string | number
  // register: UseFormRegister<SystemFormProps>
  error?: FieldError
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextField = ({ label, labelClass, inputClassName, divWidth, value, disabled = false, required, type, min, error, ...props }: InputFieldProps) => {
  return (
    <div className={divWidth}>
      <label className={`block text-sm break-words text-gray-700 px-2 ${labelClass}`}>
        {label}
        {required && <span style={{color: "red"}}>&nbsp;*</span>}
      </label>
      <input className={disabled ?
        `w-full min-w-[250px] p-2 border text-[0.9rem] font-small rounded h-[25px] disabled:text-gray-500 ${inputClassName}`
        :
        `w-full min-w-[250px] p-2 border text-[0.9rem] font-small rounded h-[25px] ${inputClassName}`}
        value={value === null ? '' : value} type={type} min={min} {...props}
        />
        {error && <span style={{ color: "red", fontSize: "0.5rem" }}>{error.message}</span>}
    </div>
  )
}

export const TextField80 = ({ label, onChange, value, name, type, disabled, inputClassName, labelClass, min, divWidth, error }: InputFieldProps) => {
  return (
    <TextField
      divWidth={`lg:w-80 md:w-[40%] sm:w-[80%] ${divWidth}`}
      label={label}
      onChange={onChange}
      name={name}
      value={value}
      type={type}
      disabled={disabled}
      min={min}
      inputClassName={inputClassName}
      labelClass={labelClass}
      error={error}
    />
  )
}

export const TextField96 = ({ label, onChange, value, name, type, disabled, inputClassName, labelClass, divWidth, min, error }: InputFieldProps) => {
  return (
    <TextField
      divWidth={`lg:w-96 md:w-[40%] sm:w-[85%] ${divWidth}`}
      label={label}
      onChange={onChange}
      name={name}
      value={value}
      type={type}
      disabled={disabled}
      inputClassName={inputClassName}
      min={min}
      labelClass={labelClass}
      error={error}
      />
    )
  }
  
  export const TextField70 = ({ label, onChange, value, name, type, disabled, required, inputClassName, labelClass, min, divWidth, error }: InputFieldProps) => {
    return (
      <TextField
      divWidth={` lg:w-[70%] md:w-[40%] sm:w-[80%] ${divWidth}`}
      label={label}
      onChange={onChange}
      value={value}
      name={name}
      type={type}
      disabled={disabled}
      required={required}
      min={min}
      inputClassName={inputClassName}
      labelClass={labelClass}
      error={error}
      />
    )
  }
  
  export const TextFieldFlexible = ({ label, onChange, value, name, type, disabled, inputClassName, labelClass, min, divWidth, error }: InputFieldProps) => {
    return (
      <TextField
      divWidth={divWidth}
      label={label}
      onChange={onChange}
      value={value}
      name={name}
      type={type}
      disabled={disabled}
      min={min}
      inputClassName={inputClassName}
      labelClass={labelClass}
      error={error}
    />
  )
}

export const TextArea = ({ label, onChange, value, name, type, disabled, inputClassName, labelClass, min, error }: InputFieldProps) => {
  return (
    <div className="flex flex-wrap lg:w-[95%] md:w-[82%] sm:sm: w-[80%]">
      <label className="block text-sm px-2 break-words text-gray-700 ">{label}</label>
      <textarea className={disabled ? `w-full h-20 p-2 border border-gray-200 text-[0.9rem] font-small rounded-xl disabled:text-gray-500 ${inputClassName}` :
        `w-full h-20 p-2 border border-gray-300 text-[0.9rem] font-small rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`} value={value} name={name} onChange={onChange} disabled={disabled}></textarea>
        {error && <span style={{ color: "red", fontSize: "0.5rem" }}>{error.message}</span>}
    </div>
  )
}
