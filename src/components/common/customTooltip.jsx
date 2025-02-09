// CustomTooltip.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaInfo } from "react-icons/fa";

const CustomTooltip = ({ tooltipText = "Info", className = "" }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipRef = useRef(null);

  // Toggle tooltip on icon click
  const handleToggleTooltip = () => {
    setIsTooltipOpen((prev) => !prev);
  };

  // Close tooltip when clicking outside of the tooltip container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsTooltipOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={tooltipRef} className={`relative inline-block ${className}`}>
      <span
        onClick={handleToggleTooltip}
        className="w-16 h-16 flex items-center justify-center bg-secondary rounded-full inset-b-box-shadow cursor-pointer"
      >
        <FaInfo className="w-8 h-8 text-primary" />
      </span>
      {isTooltipOpen && (
        <div className="rounded-xl border-2 border-icon shadow-xl absolute top-full ml-4 -left-4/5 transform -translate-x-1/2 mt-2 px-3 py-2 bg-primary text-secondary rounded shadow-lg z-50 w-[34rem] text-md font-semibold">
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
