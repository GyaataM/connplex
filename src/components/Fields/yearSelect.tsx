import React, { useState, useEffect, useRef } from "react";
import { useField, useFormikContext } from "formik";

interface YearSelectProps {
  id: string;
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  startYear?: number;
  defaultYear?: number;
  onChange?: (value: number) => void;
}

const YearSelect: React.FC<YearSelectProps> = ({
  id,
  name,
  label,
  required = false,
  className,
  disabled,
  startYear = 1900,
  defaultYear,
  onChange,
}) => {
  const [field, meta, helpers] = useField({
    name,
    value: defaultYear || "",
  });
  const { submitCount } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [localDisplayYear, setLocalDisplayYear] = useState(
    defaultYear || new Date().getFullYear()
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 12 },
    (_, i) => Math.min(localDisplayYear, currentYear) - 11 + i
  ).filter((year) => year >= startYear && year <= currentYear);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (isOpen) {
          setIsTouched(true);
          helpers.setTouched(true);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef, helpers, isOpen]);

  const handleYearClick = (year: number) => {
    helpers.setValue(year);
    setIsOpen(false);
    setIsTouched(true);
    if (onChange) {
      onChange(year);
    }
  };

  const handlePrevYears = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalDisplayYear((prev) => Math.max(startYear, prev - 12));
  };

  const handleNextYears = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalDisplayYear((prev) => Math.min(currentYear, prev + 12));
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const showError = (isTouched || submitCount > 0) && meta.error;

  return (
    <div className="relative inline-block w-full" ref={wrapperRef}>
      {label && (
        <label
          className="block mb-2 font-medium text-[rgba(115,114,115,1)]"
          htmlFor={id}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        className={`${
          className
            ? className
            : "flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-full items-center justify-between"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={toggleDropdown}
      >
        <span>
          {field.value ? (
            field.value
          ) : (
            <span className="text-[rgba(17,23,29,0.6)] font-medium ">
              Select Year
            </span>
          )}
        </span>
        <div className="flex items-center pl-2 pointer-events-none">
          <svg
            className={`w-4 h-4 text-footer-bg transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
          <div className="flex justify-between p-2 border-b">
            <button
              onClick={handlePrevYears}
              className="px-2 py-1 bg-gray-200 rounded"
              disabled={localDisplayYear <= startYear}
            >
              &lt;
            </button>
            <span>
              {years[0]} - {years[years.length - 1]}
            </span>
            <button
              onClick={handleNextYears}
              className="px-2 py-1 bg-gray-200 rounded"
              disabled={localDisplayYear >= currentYear}
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 p-2">
            {years.map((year) => (
              <div
                key={year}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                  year === field.value ? "bg-gray-100 font-bold" : ""
                }`}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </div>
            ))}
          </div>
        </div>
      )}
      {showError && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default YearSelect;
