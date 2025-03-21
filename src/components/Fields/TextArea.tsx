import React, { ChangeEvent, FocusEvent } from "react";

interface TextAreaProps {
  id: string;
  name?: string;
  label?: string;
  value?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  label,
  value,
  required = false,
  placeholder,
  onChange,
  onBlur,
  className,
  rows = 4,
  disabled,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 font-medium text-[rgba(115,114,115,1)]"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`${
          className
            ? className
            : `block w-full border border-[rgba(115,114,115,0.4)] rounded-lg py-2 px-4 focus:outline-none font-medium ${
                disabled && "pointer-event-none bg-[rgba(115,114,115,0.2)]"
              }`
        }`}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
      />
    </div>
  );
};

export default TextArea;
