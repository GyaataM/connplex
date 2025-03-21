interface RadioButtonProps {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassName?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  label,
  value,
  checked,
  onChange,
  className,
  labelClassName,
}) => {
  // Default CSS classes
  const defaultContainerCSS = "inline-flex items-center mr-2";

  // Use the provided classes if available, otherwise use the defaults
  const finalLabelClassName = labelClassName
    ? labelClassName
    : defaultContainerCSS;

  return (
    <label className={finalLabelClassName}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`form-radio h-5 w-5 text-gray-600 ${className}`}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default RadioButton;
