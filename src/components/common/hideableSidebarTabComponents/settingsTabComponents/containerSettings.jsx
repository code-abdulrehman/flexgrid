// SizingBox.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuUnfoldHorizontal, LuMoveHorizontal, LuMoveVertical } from "react-icons/lu";
import { BsTextareaResize } from "react-icons/bs";
import { toggleOption, setSizeShow, setResizeableOptions } from "../../../../lib/store/reducers/settingsOptionsReducer/settingsOptionsReducer";
import { TbTextResize } from "react-icons/tb";


const ContainerSettings = () => {
  const dispatch = useDispatch();
  const resizeableOptions = useSelector((state) => state.settingsOptions.resizeableOptions);
  const sizeShow = useSelector((state) => state.settingsOptions.sizeShow);

  const allResizeableOptions = [
    { label: "Horizontal", icon: <LuMoveHorizontal />, value: "horizontal" },
    { label: "Vertical", icon: <LuMoveVertical />, value: "vertical" },
    { label: "Both", icon: <BsTextareaResize />, value: "both" }
  ];
  const handleResizeableOptionsChange = (option) => {
    const updatedOptions = {
      horizontal: resizeableOptions.horizontal,
      vertical: resizeableOptions.vertical,
      both: resizeableOptions.both,
      [option]: !resizeableOptions[option],
    };
  
    dispatch(setResizeableOptions(updatedOptions));
  };
  

  return (
    <div className="flex flex-col items-start justify-center gap-4 custom-rounded-lg bg-content p-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between w-full gap-4 h-12">
        <span className="text-secondary text-2xl flex items-center justify-start w-1/2 gap-2">
          <LuUnfoldHorizontal className="text-secondary text-4xl" />
          <p className="text-secondary font-bold text-2xl text-start uppercase text-nowrap">
            Container
          </p>
        </span>
      </div>

      {/* Options */}
      <div className="w-full h-full rounded-lg flex justify-between items-center gap-2">
        {allResizeableOptions.map((option, index) => (
          <label key={option.value + index} className="flex flex-col items-center justify-center gap-2">
            <input
              type="checkbox"
              className="w-6 h-6 accent-primary p-2"
              checked={resizeableOptions[option.value]}
              onChange={() => handleResizeableOptionsChange(option.value)}
            />
            <span className="text-secondary text-xl font-bold flex items-center justify-center gap-2">
              {option.icon}
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <div className="bg-divider w-full h-[2px]"></div>
      <div className="flex items-center justify-between w-full gap-4 h-12">
        <span className="text-secondary text-2xl flex items-center justify-start w-1/2 gap-2">
          <TbTextResize className="text-secondary text-4xl" />
          <p className="text-secondary font-bold text-xl text-center uppercase">
            Size Show
          </p>
        </span>
        <span className="flex items-center justify-end w-1/2">
          {/* Custom Toggle */}
          <label htmlFor="sizeShow" className="relative inline-block w-16 h-8 cursor-pointer">
            <input
              type="checkbox"
              id="sizeShow"
              className="sr-only peer"
              checked={sizeShow}
              onChange={() => dispatch(setSizeShow(!sizeShow))}
            />
            {/* Toggle Track */}
            <div className="w-full h-full rounded-full bg-gray-300 
                            peer-focus:ring-0
                            transition-colors duration-300
                            bg-[var(--text-secondary)]
                            peer-checked:bg-[var(--color-primary)] "></div>
            {/* Toggle Knob */}
            <span className="absolute left-0.5 top-0.5 h-7 w-7 inset-t-box-shadow bg-white rounded-full 
                             transition-transform duration-300 
                             peer-checked:translate-x-8"></span>
          </label>
        </span>
      </div>
    </div>
  );
};

export default ContainerSettings;
