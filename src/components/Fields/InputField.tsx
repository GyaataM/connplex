import React, { ChangeEvent, FocusEvent } from "react";

interface InputFieldProps {
  id: string;
  name?: string;
  type: string;
  label?: string;
  value?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  name,
  label,
  value,
  required = false,
  placeholder,
  onChange,
  onBlur,
  className,
  disabled,
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 font-medium text-xs text-white"
        >
          {label}
          {required && label && <span className="text-[#D21F34] ml-1">*</span>}
        </label>
      )}
      <input
        className={`${
          className
            ? className
            : `block w-full border border-[rgba(115,114,115,0.4)] rounded-lg py-2 px-4 focus:outline-none text-base font-semibold ${
                disabled && "pointer-event-none bg-[rgba(115,114,115,0.2)]"
              } `
        }`}
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={disabled}
      />
    </>
  );
};

export default InputField;
