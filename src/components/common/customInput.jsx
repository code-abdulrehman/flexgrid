// CustomInput.jsx
import React from "react";

const CustomInput = ({
  className = "",
  placeholder = "",
  type = "text",
  value,
  onChange,
  min,
  max,
  step,
  options = [],
  ...rest
}) => {
  if (type === "select") {
    return (
      <select
        value={value}
        onChange={onChange}
        className={`bg-secondary text-secondary rounded-2xl p-2 focus:outline-none w-fit ${className}`}
        {...rest}
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="text-secondary bg-content"
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    const extraProps = type === "number" ? { min, max, step } : {};
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`bg-secondary text-secondary text-center rounded-2xl min-w-12 p-[1.5px] focus:outline-none w-fit ${className}`}
        {...extraProps}
        {...rest}
      />
    );
  }
};

export default CustomInput;
