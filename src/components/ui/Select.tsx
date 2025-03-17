import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface SelectTagProps {
  label: string
  className?: string
  inputClass?: string
  optionClass?: string
  options: RandomObject[]
  name: string
  multiple?: boolean
  value?: string | number | any[]
  displayValue: string | any
  databaseValue: string | number
  register: UseFormRegister<any>
  error: FieldError | any | undefined
  valueAsNumber?: boolean
  numeric?: boolean
  disabled?: boolean
}

interface MultiSelectTagProps extends SelectTagProps{
  onChange?: any
  values: string[]
}

type RandomObject = {
  [key: string]: any
}

export const Select = ({ label, multiple, name, className, inputClass, optionClass, options, value, databaseValue, displayValue, register, error, valueAsNumber, numeric = false, disabled = false }: SelectTagProps) => {

  let [multipleOptions, setMultipleOptions] = useState<string>();

  const findOptions = () => {
    let selected = ''
    if (Array.isArray(value)) {
      value?.map?.((option) => {
        const foundOption = options.find((op) => option === op.code_value);
        selected += foundOption ? foundOption.code_desc + "," : ""
      })
    }
    setMultipleOptions(selected);
    return selected
  }
  const selected = useMemo(() => multipleOptions, [multipleOptions])

  useEffect(() => {
    findOptions()
  }, [value])

  return (
    <div className={cn("min-w-[200px] w-full sm:w-fit",className)}>
      <label className="block text-sm text-gray-800 px-2">{label}</label>
      {
        multiple ?
          <input
            className={`w-[100%] h-8 border border-10 border-b-0 bg-gray-100 rounded ${disabled ? "bg-gray-200" : ""}`}
            name={name}
            disabled={true}
            value={selected || ""}
            type={"text"}
          />
          : null
      }

      <select className={`w-full min-w-[200px] sm:w-fit p-2 border rounded text-sm font-small ${multiple ? "h-20 " : "h-9 "} ${inputClass ?? ''} ${disabled ? "bg-gray-200" : ""}`} 
        value={value} disabled={disabled}
        {...register?.(name, { valueAsNumber: numeric })} multiple={multiple}>
        <option className={optionClass} value={''}>None</option>
        {
          options?.map((option: RandomObject, index: number) => {
            return (
              <option key={index} className={optionClass} value={option[databaseValue]}>
                {/* <div> */}
                  {option[displayValue]}
                  {/* <DynamicIconButton className="bg-black" children={<RxCross1 />} /> */}
                {/* </div> */}
              </option>
            )
          })
        }
      </select>
      {error && <span className="px-2 text-xs text-destructive" >{error.message}</span>}
    </div>
  )
}

export const Select80 = (props: SelectTagProps) => {
  return (
    <Select {...props} />
  )
}

export const Select96 = (props: SelectTagProps) => {
  return (
    <Select {...props} />
  )
}

export const SelectFlexible = (props: SelectTagProps) => {
  return (
    <Select {...props} />
  )
}


export const MultiSelect = ({ label, multiple = true, name, className, inputClass, optionClass, options, value, databaseValue, displayValue, register, values, error, valueAsNumber, numeric = false, disabled = false, onChange }: MultiSelectTagProps) => {

  let [multipleOptions, setMultipleOptions] = useState<string>();

  const findOptions = () => {
    let selected = ''
    if (Array.isArray(values)) {
      values?.map?.((option) => {
        const foundOption = options.find((op) => option === op.code_value);
        selected += foundOption ? foundOption.code_desc + "," : ""
      })
    }
    setMultipleOptions(selected);
    return selected
  }
  const selected = useMemo(() => multipleOptions, [multipleOptions])

  useEffect(() => {
    findOptions()
  }, [values])

  return (
    <div className={cn("flex-1 min-w-[200px] sm:w-fit w-[20%]",className)}>
      <label className="block text-sm text-gray-800  ">{label}</label>
      {
        multiple ?
          <input
            className={`w-[100%] h-8 border border-10 border-b-0 bg-gray-100 rounded ${disabled ? "bg-gray-200" : ""}`}
            name={name}
            disabled={true}
            value={selected || ""}
            type={"text"}
          />
          : null
      }

      <select className={`w-full    rounded text-sm font-small ${multiple ? "h-20 " : "h-9 "} ${inputClass ?? ''} ${disabled ? "bg-gray-200" : ""}`} 
        value={value} disabled={disabled}
        {...register(name, { valueAsNumber: numeric })} multiple={multiple}
        onChange={onChange}>
        <option className={optionClass} value={''}>None</option>
        {
          options?.map((option: RandomObject, index: number) => {
            return (
              <option key={index} className={optionClass} value={option[databaseValue]}>
                {/* <div> */}
                  {option[displayValue]}
                  {/* <DynamicIconButton className="bg-black" children={<RxCross1 />} /> */}
                {/* </div> */}
              </option>
            )
          })
        }
      </select>
      {error && <span className="px-2 text-xs text-destructive">{error.message}</span>}
    </div>
  )
}
