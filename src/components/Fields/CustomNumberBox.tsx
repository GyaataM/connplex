import React, { ChangeEvent, FocusEvent } from "react";

interface NumberFieldProps {
  id: string;
  name?: string;
  type: string;
  label?: string;
  value?: string;
  required?: boolean;
  placeholder?: string;
  fontClasses?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

const NumberField: React.FC<NumberFieldProps> = ({
  id,
  type,
  name,
  label,
  value,
  required = false,
  placeholder,
  fontClasses,
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
      <div className="relative">
        <span
          className={`${
            !!fontClasses ? fontClasses : ""
          } absolute inset-y-0 border-[var(--number-border)] left-0 pl-1 pr-1 my-2 py-0 md:py-2  flex items-center justify-center font-semibold border-r-[1px] text-black`}
        >
          +91
        </span>
        <input
          className={`${
            className
              ? className
              : `pl-12 block w-full border border-[rgba(115,114,115,0.4)] rounded-lg py-2 px-1 focus:outline-none text-base font-semibold ${
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
      </div>
    </>
  );
};

export default NumberField;
