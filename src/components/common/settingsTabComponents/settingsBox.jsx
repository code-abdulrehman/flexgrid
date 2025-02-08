import React, { useState, useEffect } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { GrMultiple } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

const SettingsBox = () => {
  // Initialize from local storage or default to "turquoise"
  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem("accentColor") || "turquoise";
  });

  // Multi Select toggle state
  const [multiSelect, setMultiSelect] = useState(false);

  const colorOptions = ["turquoise", "orange", "blue", "green", "purple"];

  // Update the document's data-accent attribute when accentColor changes
  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accentColor);
  }, [accentColor]);

  const handleAccentColorChange = (color) => {
    setAccentColor(color);
    localStorage.setItem("accentColor", color); // Persist the selection
  };

  const toggleMultiSelect = () => {
    setMultiSelect((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-4 custom-rounded-lg bg-content p-6 py-8">
      {/* Accent Color Section */}
      <div className="flex items-center justify-between w-full gap-4 h-12">
        <span className="text-secondary text-2xl flex items-center justify-start w-1/2 gap-2">
          <IoColorPaletteOutline className="text-secondary text-4xl" />
          <p className="text-secondary font-bold text-xl text-center uppercase">
            Accent Color
          </p>
        </span>
        <span className="flex items-center justify-end w-1/2 gap-4">
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() => handleAccentColorChange(color)}
              style={{ backgroundColor: color }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            >
              {accentColor === color && (
                <FaCheck className="text-contrast" size={14} />
              )}
            </button>
          ))}
        </span>
      </div>

      <div className="bg-divider w-full h-1"></div>

      {/* Multi Select Toggle Section */}
      <div className="flex items-center justify-between w-full gap-4 h-12">
        <span className="text-secondary text-2xl flex items-center justify-start w-1/2 gap-2">
          <GrMultiple className="text-secondary text-4xl" />
          <p className="text-secondary font-bold text-xl text-center uppercase">
            Multi Select
          </p>
        </span>
        <span className="flex items-center justify-end w-1/2">
          {/* Custom Toggle */}
          <label htmlFor="toggleMultiSelect" className="relative inline-block w-16 h-8 cursor-pointer">
            <input
              type="checkbox"
              id="toggleMultiSelect"
              className="sr-only peer"
              checked={multiSelect}
              onChange={toggleMultiSelect}
            />
            {/* Toggle Track */}
            <div className="w-full h-full rounded-full bg-gray-300 
                            peer-focus:ring-0
                            transition-colors duration-300
                            peer-checked:bg-[var(--color-primary)]"></div>
            {/* Toggle Knob */}
            <span className="absolute left-0.5 top-0.5 h-7 w-7 bg-white rounded-full 
                             transition-transform duration-300 
                             peer-checked:translate-x-8"></span>
          </label>
        </span>
      </div>
    </div>
  );
};

export default SettingsBox;
