import React from 'react'
import { Select80, Select96 } from './Select'

interface MappingLabelsProps {
    selectFieldsArray: {
        label: string;
        name: string;
        options: RandomObject[];
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        displayValue: string | any;
        databaseValue: string | number;
        className?: string;
        inputClass?: string;
        optionClass?: string;
        value?: string | number;
    }[];
}

type RandomObject = {
    [key: string]: any
}

export const MappingSelect80 = ({ selectFieldsArray }: MappingLabelsProps) => {
    return (
        <>
            {selectFieldsArray.length > 0 && selectFieldsArray?.map((selectField) => {
                return (

                    <Select80
                        key={selectField.name}
                        label={selectField.label}
                        value={selectField.value}
                        name={selectField.name}
                        className={selectField.className}
                        inputClass={selectField.inputClass}
                        options={selectField.options}
                        displayValue={selectField.displayValue}
                        databaseValue={selectField.databaseValue}
                        onChange={selectField.onChange}
                    />
                )
            })}
        </>
    )
}

export const MappingSelect96 = ({ selectFieldsArray }: MappingLabelsProps) => {
    return (
        <>
            {selectFieldsArray?.map((selectField) => {
                return (
                    <Select96
                        key={selectField.name}
                        label={selectField.label}
                        value={selectField.value}
                        name={selectField.name}
                        className={selectField.className}
                        inputClass={selectField.inputClass}
                        options={selectField.options}
                        displayValue={selectField.displayValue}
                        databaseValue={selectField.databaseValue}
                        onChange={selectField.onChange}
                    />
                )
            })}
        </>
    )
}
