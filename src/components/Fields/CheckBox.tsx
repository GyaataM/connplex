import React, { useState, useEffect } from "react";
import { useField } from "formik";
import styles from "./checkbox.module.css";
import { BsCheckLg } from "react-icons/bs";

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  value?: string;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  formik?: boolean;
  variant?: "Regular" | "White";
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  value,
  defaultChecked,
  onChange,
  onBlur,
  className,
  formik = false,
  variant = "Regular",
}) => {
  const [field, , helpers] = useField({ name, type: "checkbox", value });
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  useEffect(() => {
    if (formik) {
      helpers.setValue(isChecked);
    }
  }, [isChecked, formik, helpers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = e.target.checked;
    setIsChecked(newCheckedState);
    if (formik) {
      field.onChange(e);
    } else if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={className}>
      <div className={`flex items-center ${className}`}>
        <div
          className={`relative ${styles.checkboxInput} ${
            variant === "White" && styles.whiteCheckBox
          }`}
        >
          <input
            className={`absolute w-full h-full top-0 left-0 z-10 opacity-0 ${styles.checkboxInput}`}
            type="checkbox"
            id={id}
            name={name}
            value={value}
            checked={isChecked}
            onChange={handleChange}
            onBlur={formik ? field.onBlur : onBlur}
          />
          <div className={styles.checkmark}>
            {isChecked && (
              <BsCheckLg
                color={variant === "White" ? "var(--footer-bg)" : "white"}
                size={12}
              />
            )}
          </div>
        </div>
        {label && (
          <label className="ml-2" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
