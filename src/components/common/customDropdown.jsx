import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaTimesCircle } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

const CustomDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "...",
  className = "",
  optionClassName = "",
  chevronClass = "",
  dropdownButtonClass = "",
  gridProperties = false,
  allowCross = true,
  allowAdd = true,
  nested = false,
  optionsBoxClass = "",
  onGridNumChange,
  onGridSelectChange,
  addNewWith = "Option",
  NumberInputComponent,
  SingleDropdownComponent,
  subOptionsAllow = true,
  optionsWrap = false,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Standard mode: find the selected option.
  const standardSelectedOption = options.find((opt) => opt.value === value);

  // Advanced mode: initialize gridOptions.
  const [gridOptions, setGridOptions] = useState(() => {
    if (gridProperties && !nested) {
      return options.map((opt) => ({
        value: opt.value,
        label: opt.label,
        numInput: opt.numInput || 1,
        subOption: opt.subOption || "",
        subOptions: opt.subOptions || [
          { value: "fr", label: "fr" },
          { value: "px", label: "px" },
          { value: "%", label: "%" },
        ],
      }));
    }
    return [];
  });

  const [optionCounter, setOptionCounter] = useState(
    gridProperties && !nested ? options.length + 1 : 1
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleStandardChange = (option) => {
    const oldValue = value;
    const newValue = option.value;
    onChange({ oldValue, newValue });
    setIsOpen(false);
  };

  const updateGridOptionNumInput = (index, newValue) => {
    setGridOptions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], numInput: newValue };
      return updated;
    });
    if (onGridNumChange) onGridNumChange(index, newValue);
  };

  const updateGridOptionSubOption = (index, newSubOption) => {
    setGridOptions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], subOption: newSubOption };
      return updated;
    });
    if (onGridSelectChange) onGridSelectChange(index, newSubOption);
  };

  const removeGridOption = (index) => {
    setGridOptions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddOption = () => {
    if (!gridProperties || !allowAdd) return;
    const newOption = {
      value: `new-${optionCounter}`,
      label: `${addNewWith} ${optionCounter}`,
      numInput: 1,
      subOption: "fr",
      subOptions: [
        { value: "fr", label: "fr" },
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
    };
    setGridOptions((prev) => [...prev, newOption]);
    setOptionCounter((prev) => prev + 1);
  };

  // Close dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Aggregate advanced mode values.
  useEffect(() => {
    if (gridProperties && onChange) {
      const aggregated = gridOptions
        .map((opt) =>
          opt.numInput !== "" && opt.subOption ? `${opt.numInput}${opt.subOption}` : ""
        )
        .filter((str) => str !== "")
        .join(" ");
      onChange(aggregated);
    }
  }, [gridOptions, gridProperties, onChange]);

  // Render Standard/Nested Mode.
  if (nested || !gridProperties) {
    return (
      <div
        {...rest}
        className={`relative inline-block transition-all duration-300 ease-in-out ${className}`}
        ref={dropdownRef}
      >
        <div
          className={`bg-secondary text-secondary rounded-2xl p-2 cursor-pointer text-start text-xl font-semibold flex items-center justify-between gap-2 ${dropdownButtonClass}`}
          onClick={toggleDropdown}
        >
          {standardSelectedOption ? standardSelectedOption.label : placeholder}
          {isOpen ? (
            <FaChevronUp className={`mx-1 text-md ${chevronClass}`} />
          ) : (
            <FaChevronDown className={`mx-1 text-md ${chevronClass}`} />
          )}
        </div>
        {isOpen && (
          <ul
            className={`${optionsBoxClass} absolute top-full left-0 bg-primary rounded-2xl shadow-lg z-10 mt-1 border-2 p-3 border-icon transition-all duration-300 ease-in-out flex ${optionsWrap ? "flex-wrap gap-2 flex-row w-32 justify-between" : "flex-col"}`}
          >
            {options.map((option, idx) => (
              <li
                key={idx}
                className={`p-2 cursor-pointer hover:bg-secondary hover:text-content text-start overflow-hidden text-ellipsis whitespace-nowrap font-semibold  ${optionClassName} ${
                  option.value === value ? " bg-content-hover shadow-md rounded-xl text-primary w-full" : ""
                }`}
                onClick={() => handleStandardChange(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Render Advanced Mode.
// Render Advanced Mode.
const isEmpty = gridOptions.every((opt) => !opt.numInput || opt.numInput === "");

// allNumValues is true if every option has a valid numInput and either no subOption or an empty subOption.
const allNumValues = gridOptions.every(
  (opt) => opt.numInput !== "" && (!opt.subOption || opt.subOption === "")
);

// If only number inputs are provided, join the numInput values with a slash.
const slashValue = gridOptions
  .map((opt) => `${opt.numInput}`)
  .join(" / ");

// Otherwise, if there are subOptions, join each pair (number + subOption) with a space.
const gridValue = gridOptions
  .map((opt) => `${opt.numInput}${opt.subOption}`)
  .join(" ");

// Choose which text to display.
// If the gridOptions are not empty, then if every option is only a number use slashValue;
// otherwise use gridValue. If gridOptions are empty, show the placeholder.
const advancedDisplayText = !isEmpty
  ? (allNumValues ? slashValue : gridValue)
  : placeholder;

  return (
    <div
      {...rest}
      className={`relative inline-block transition-all duration-300 ease-in-out ${className}`}
      ref={dropdownRef}
    >
      <div
        className={`bg-secondary text-secondary rounded-2xl p-2 cursor-pointer text-start text-xl font-semibold flex gap-2 items-center justify-between w-fit ${dropdownButtonClass}`}
        onClick={toggleDropdown}
      >
        {advancedDisplayText}
        {isOpen ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
      </div>
      {isOpen && (
        <div className="absolute top-full left-[-82px] mt-2 border-2 border-icon custom-rounded-lg p-4 bg-primary flex flex-col gap-2 w-[78vw] z-10 md:min-w-[32.5rem] md:max-w-[34.5rem] shadow-xl">
          {gridOptions.map((option, index) => (
            <div
              key={option.value}
              className="flex items-center justify-between gap-2 p-1 border-b border-icon last:border-0 hover:bg-secondary cursor-pointer"
            >
              <span className="text-primary font-semibold overflow-hidden text-ellipsis whitespace-nowrap text-xl w-2/3">
                {option.label}
              </span>
              <div className="flex items-center justify-end gap-2 w-1/3 text-2xl">
                {NumberInputComponent ? (
                  <NumberInputComponent
                    value={option.numInput || 1}
                    min={0}
                    max={100}
                    onChange={(e) => updateGridOptionNumInput(index, e.target.value)}
                    className="bg-secondary text-secondary text-center rounded-2xl p-1 w-fit min-w-10 max-w-16 outline-none"
                  />
                ) : (
                  <input
                    type="number"
                    value={option.numInput ? option.numInput: 1}
                    min={0}
                    max={100}
                    onChange={(e) => updateGridOptionNumInput(index, e.target.value)}
                    className="bg-secondary text-secondary text-center rounded-2xl p-1 w-fit min-w-10 max-w-16 outline-none"
                  />
                )}
                {SingleDropdownComponent ? (
                  <SingleDropdownComponent
                    nested={true}
                    options={option.subOptions}
                    value={option.subOption}
                    onChange={({ newValue }) => updateGridOptionSubOption(index, newValue)}
                    placeholder="px"
                    dropdownButtonClass="p-1 w-16"
                    optionClassName="text-2xl text-primary w-12 p-1"
                    chevronClass="text-sm ml-1"
                  />
                ) : (
                  subOptionsAllow && (
                    <CustomDropdown
                      nested={true}
                    options={option.subOptions}
                    value={option.subOption}
                    onChange={({ newValue }) => updateGridOptionSubOption(index, newValue)}
                    placeholder="px"
                    dropdownButtonClass="p-1 w-16"
                    optionClassName="text-2xl text-primary w-12 p-1"
                    chevronClass="text-sm ml-1"
                    />
                  )
                )}
                {allowCross && (
                  <button
                    onClick={() => removeGridOption(index)}
                    disabled={gridOptions.length === 1}
                    className={`text-danger w-12 rounded-xl p-2 bg-secondary flex items-center justify-center text-xl ${
                      gridOptions.length === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <FaTimesCircle />
                  </button>
                )}
              </div>
            </div>
          ))}
          {allowAdd && (
            <button
              onClick={handleAddOption}
              className="mt-2 bg-secondary text-primary py-1 rounded-xl flex items-center justify-center gap-2 font-semibold"
            >
              <FiPlusCircle /> Add
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
