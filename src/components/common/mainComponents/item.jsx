import React, { useState, useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { HiPencil } from "react-icons/hi2";
import CustomInput from "../customInput";
import { useSelector } from "react-redux";
const Item = ({
  width = 150,
  height = 150,
  widthUnit = "px",
  heightUnit = "px",
  name = "item",
  icon,
  selected = false,
  onClick, // Parent onClick handler
  className,
  index = 0,
}) => {
  const showItemsName = useSelector((state) => state.settingsOptions.showItemsName);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(index + 1);

  const handleBlur = () => {
    if (inputValue.toString().trim() === "") {
      setInputValue(index + 1);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  useEffect(() => {
    setInputValue(index + 1);
  }, [index]);

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <div
      className={`relative flex flex-col gap-2 bg-container custom-rounded-lg border border-icon bg-content item-shadow cursor-pointer p-4 hover:bg-content-hover transition-[background-color] ease-out duration-500 group/item ${className || ''}`}
      onClick={onClick}
      style={{
        width: `${width}${widthUnit}`,
        height: `${height}${heightUnit}`,
        minWidth: `${width}${widthUnit}`,
        minHeight: `${height}${heightUnit}`,
      }}
    >
      <span className="relative">
      {selected && (
        <>
          <div className="relative"  
          onClick={(e) => { 
              e.stopPropagation(); 
              console.log("Select button clicked on item", index); 
            }}>
            <IoIosCheckmarkCircle className="text-accent transition-all ease-out duration-500 text-5xl absolute -top-7 -right-6 bg-primary rounded-full" />
          </div>
        </>
      )}
      </span>

      <div className="flex items-center justify-between w-full">
        {showItemsName && (
        <span className="flex items-center justify-between">
          {isEditing ? (
            <CustomInput
              value={inputValue}
              type="text"
              maxLength={15}
              placeholder="..."
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          ) : (
            <div className="flex items-center justify-center pl-2 w-16 h-12 bg-primary rounded-2xl relative">
              <p className="text-3xl text-center font-bold">{inputValue}</p>
              <HiPencil
                className="absolute -top-2 -right-4 text-primary transition-[visibility] ease-in duration-200 text-3xl group-hover/item:visible invisible rounded-full p-1 bg-content-hover cursor-default scale-125"
                onClick={handleEdit}
              />
            </div>
          )}
        </span>
        )}

        <div className="flex-1 ml-4">
          {/* You can add extra content here if needed */}
        </div>
      </div>
    </div>
  );
};

export default Item;
