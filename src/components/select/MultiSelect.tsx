import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useField, useFormikContext } from "formik";
import styles from "./MultiSelect.module.css";

interface MultiSelectProps {
  options: { value: number; label: string }[];
  name: string;
  label?: string;
  className?: string;
  onChange?: (selectedValues: number[]) => void;
  required?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  name,
  label,
  className,
  onChange,
  required,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { submitCount } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Add these functions to handle focus and blur
  const handleFocus = () => setIsFocused(true);

  const fieldValue = Array.isArray(field.value)
    ? field.value
    : field.value
    ? [field.value]
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
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
  }, [selectRef, helpers, isOpen]);

  const handleOptionClick = (option: { value: number; label: string }) => {
    const newValue = fieldValue.includes(option.value)
      ? fieldValue.filter((item: number) => item !== option.value)
      : [...fieldValue, option.value];
    helpers.setValue(newValue);
    setIsFocused(false);

    if (onChange) {
      onChange(newValue);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedOptionIndex(0);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setFocusedOptionIndex(0);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleDropdown();
      }
    } else {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedOptionIndex((prevIndex) =>
            Math.min(prevIndex + 1, filteredOptions.length - 1)
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedOptionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          break;
        case "Enter":
          event.preventDefault();
          if (focusedOptionIndex >= 0) {
            handleOptionClick(filteredOptions[focusedOptionIndex]);
          }
          break;
        case "Escape":
        case "Tab":
          event.preventDefault();
          setIsOpen(false);
          setIsTouched(true);
          helpers.setTouched(true);
          setIsFocused(false);
          if (event.key === "Tab") {
            // Allow the default tab behavior after closing the dropdown
            setTimeout(() => {
              if (selectRef.current) {
                selectRef.current.blur();
              }
            }, 0);
          }
          break;
      }
    }
  };

  return (
    <div className="relative inline-block w-full">
      <label
        className="block mb-2 font-medium text-[rgba(115,114,115,1)]"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        className="relative inline-block w-full"
        ref={selectRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        style={{ outline: "none" }}
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(() => {
            if (!selectRef.current?.contains(document.activeElement)) {
              setIsOpen(false);
              setIsTouched(true);
              helpers.setTouched(true);
              setIsFocused(false);
            }
          }, 0);
        }}
        aria-controls="multiselect-dropdown"
      >
        <div
          className={`flex flex-wrap w-full px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[40px] items-center ${className}${
            isFocused ? "ring-2 ring-gray-300 border-gray-300" : ""
          }`}
          onClick={toggleDropdown}
        >
          {(Array.isArray(field.value) ? field.value : []).map(
            (selectedOption: number) => {
              const option = options.find(
                (opt) => opt.value === selectedOption
              );
              return (
                <div
                  key={selectedOption}
                  className="bg-footer-bg text-white font-bold rounded-[8px] px-[13px] py-[4px] m-1 text-[12px] flex items-center"
                >
                  {option?.label}
                  {/* <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeChip(selectedOption);
                  }}
                  className="ml-2 focus:outline-none"
                >
                  ×
                </button> */}
                </div>
              );
            }
          )}
          <div className="flex items-center ml-auto pl-2 pointer-events-none">
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
          <div
            id="multiselect-dropdown"
            className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg"
            role="listbox"
          >
            <div className="mt-1 w-full relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 py-2 font-medium border-b-[1px] border-gray-300  focus:outline-none"
                onClick={(e) => e.stopPropagation()}
                ref={searchInputRef}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.8291 14.5045L11.1684 10.8438C12.0783 9.74957 12.6265 8.34447 12.6265 6.81348C12.6265 3.33221 9.7944 0.5 6.3133 0.5C2.83213 0.5 0 3.33221 0 6.81348C0 10.2945 2.83213 13.1265 6.3133 13.1265C7.84421 13.1265 9.24939 12.5784 10.3436 11.6684L14.0044 15.3292C14.1182 15.4431 14.2675 15.5 14.4168 15.5C14.566 15.5 14.7153 15.4431 14.8292 15.3292C15.0569 15.1014 15.0569 14.7322 14.8291 14.5045ZM1.16638 6.81348C1.16638 3.97536 3.47527 1.66638 6.3133 1.66638C9.15126 1.66638 11.4601 3.97536 11.4601 6.81348C11.4601 9.65137 9.15126 11.9601 6.3133 11.9601C3.47527 11.9601 1.16638 9.65137 1.16638 6.81348Z"
                    fill="#737273"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`max-h-60 overflow-y-auto ${styles.custom_scrollbar}`}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center ${
                      index === focusedOptionIndex ? "bg-blue-100" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(option);
                    }}
                    role="option"
                    aria-selected={fieldValue.includes(option.value)}
                  >
                    <div className="relative mr-2">
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(field.value)
                            ? field.value.includes(option.value)
                            : false
                        }
                        onChange={() => {}}
                        className="opacity-0 absolute h-4 w-4 rounded"
                      />
                      <div
                        className={`border-2 rounded-sm h-4 w-4 flex flex-shrink-0 justify-center items-center mr-2 ${
                          Array.isArray(field.value) &&
                          field.value.includes(option.value)
                            ? "bg-footer-bg border-footer-bg text-footer-bg"
                            : "border-gray-400"
                        }`}
                      >
                        <svg
                          width="11"
                          height="8"
                          viewBox="0 0 11 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.3531 0.182606C10.1096 -0.0608757 9.71471 -0.0608754 9.47118 0.182648L3.96379 5.69004L1.06467 2.79093C0.821147 2.5474 0.426238 2.5474 0.182673 2.79093C-0.0608912 3.03445 -0.0608912 3.42936 0.182673 3.67292L3.52277 7.01302C3.64455 7.1348 3.80417 7.19567 3.96374 7.19567C4.1233 7.19561 4.28298 7.1348 4.40472 7.01302L10.3531 1.06457C10.5966 0.821089 10.5966 0.426159 10.3531 0.182606Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                    <span>{option.label}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 font-medium">
                  No data found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* {showError && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {meta.error}
        </p>
      )} */}
    </div>
  );
};

export default MultiSelect;
