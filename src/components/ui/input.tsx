import { cn } from "@/lib/utils";
import { FieldError, UseFormRegister } from "react-hook-form";

export type TextFieldProps = {
  name: string | never;
  register: UseFormRegister<any>;
  error?: FieldError | undefined;

  divWidth?: string;
  label?: string;
  labelclass?: string;
  type?: string;
  inputClassName?: string;
  disabled?: boolean;
  min?: any;
  max?: any;
  valueAsNumber?: boolean;
  [key: string]: any;
};

const FormField: React.FC<TextFieldProps> = ({
  divWidth,
  label,
  labelclass,
  inputClassName,
  disabled,
  type = "text",
  name,
  register,
  error,
  min,
  max,
  valueAsNumber,
  ...props
}) => (
  <div className={cn(" min-w-[200px] w-full sm:w-fit", divWidth)}>
    {label && (
      <label
        className={`block text-sm  break-words text-muted-foreground px-2 ${labelclass}`}
      >
        {label}
      </label>
    )}
    <input
      className={cn(
        `w-full p-2 border text-[0.9rem] font-small rounded h-[36px] ${disabled ? "bg-gray-100" : ""} `,
        inputClassName
      )}
      type={type}
      disabled={disabled}
      min={min}
      max={max}
      {...props}
      {...register(name, { valueAsNumber })}
    />
    {error && (
      <span className="px-2 text-xs text-destructive">
        {error.message}
      </span>
    )}
  </div>
);

export const TextField40 = (props: TextFieldProps) => {
  return <FormField {...props} />;
};

export const TextField70 = (props: TextFieldProps) => {
  return <FormField {...props} />;
};

export const TextField80 = (props: TextFieldProps) => {
  return <FormField {...props} />;
};

interface CheckBoxFieldsProps {
  fields: any[];
  valueField: string;
  labelField: string;
  register: UseFormRegister<any>;
  defaultValues?: string[]; // Array of pre-selected roles
}

import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface CheckBoxFieldsProps {
  fields: any[];
  label: string;
  valueField: string;
  labelField: string;
  name: string; // Field name (e.g., "roles", "permissions", etc.)
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  error: FieldError | undefined;
}

export const MultiCheckBoxField = ({
  fields,
  valueField,
  labelField,
  label,
  name,
  register,
  watch,
  setValue,
  error
}: CheckBoxFieldsProps) => {
  const selectedValues = watch(name) || [];

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const updatedValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);

    setValue(name, updatedValues, { shouldValidate: true });
  };

  return (
    <div className="  min-w-[200px] w-full sm:w-fit ">
      <label className="block text-sm  break-words text-muted-foreground px-2">{label}</label>
      <div className="w-full flex flex-wrap gap-2 h-fit border rounded p-4">
        {fields.map((field) => {
          const value = field[valueField];
          const isChecked = selectedValues.includes(value);

          return (
            <label htmlFor={field[valueField]} key={value} className="flex cursor-pointer items-center gap-2  rounded bg-accent px-2">
              <input
                type="checkbox"
                {...register(name)}
                value={value}
                checked={isChecked}
                id={field[valueField]}
                className="h-4 w-4"
                onChange={(e) => handleCheckboxChange(value, e.target.checked)}
              />
              <span className="border-s block text-sm  break-words text-muted-foreground p-1">{field[labelField]}</span>
            </label>
          );
        })}
      </div>
      {error && (
      <span className="px-2 text-xs text-destructive">
        {error.message}
      </span>
    )}
    </div>
  );
};

export const TextField96 = (props: TextFieldProps) => {
  return <FormField {...props} />;
};

export const TextFieldFlexible = (props: TextFieldProps) => {
  return <FormField {...props} />;
}

export const TextArea = ({
  label,
  inputClassName,
  disabled,
  name,
  register,
  error,
  ...props
}: TextFieldProps) => {
  return (
    <div {...props} className={cn("flex flex-wrap w-full", props.className)}>
      <label
        htmlFor={name}
        className={`block text-sm  px-2 break-words text-muted-foreground`}
      >
        {label}
      </label>
      <textarea
        className={cn(
          `w-full h-20 p-2 border ${disabled ? " bg-gray-100 " : " border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"} text-[0.9rem] font-small rounded`,
          inputClassName
        )}
        {...register(name)}
        disabled={disabled}
      />
      {error && (
        <span className="px-2 text-xs text-destructive">
          {error.message}
        </span>
      )}
    </div>
  );
};
