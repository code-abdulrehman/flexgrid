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
  const heightValue = showItemsName ? (height == "auto" ? "auto" : height + 30) : height == "auto" ? "auto" : height;

  return (
    <div
      className={`relative flex flex-col bg-container custom-rounded-lg border border-icon bg-content item-shadow cursor-pointer hover:bg-content-hover transition-[background-color, height, visibility] ease-out duration-500 group/item ${className || ''}`}
      style={{
        width: `${width}${widthUnit}`,
        height: `${heightValue}${heightUnit}`,
        minWidth: `${width}${widthUnit}`,
        minHeight: `${heightValue}${heightUnit}`,
      }}
    >
      <span className="relative float-right inline-block">
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

      <div className="flex flex-col items-between w-full h-full">
        {showItemsName && (
          <span className="h-[30px] flex items-center justify-between  ml-1 transition-[visibility, height, opacity] ease-out duration-500 cursor-default" onClick={(e)=>{
            console.log("editing area", index)
            setIsEditing(true)
            console.log(isEditing, "isEditing")
          }}>
            {isEditing ? (
              <CustomInput
                value={inputValue}
                type="text"
                maxLength={10}
                placeholder="..."
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setIsEditing(true)
                  console.log("Input value changed", e.target.value)
                }}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                className="w-full h-full p-0"
                autoFocus
              />
            ) : (
              <div className="flex items-center justify-center px-2 min-w-8 max-w-fit h-12 bg-secondary rounded-2xl relative">
                <p className="text-2xl text-center font-bold text-nowrap text-ellipsis overflow-hidden">{inputValue}</p>
                <HiPencil
                  className="absolute -top-2 -right-4 text-primary transition-[visibility] ease-in duration-200 text-3xl group-hover/item:visible invisible rounded-full p-1 bg-content-hover cursor-default scale-125"
                  onClick={handleEdit}
                />
              </div>
            )}
          </span>
        )}

        <div className="flex-1 border-2 custom-rounded-lg border-icon w-full h-full"
          onClick={onClick}
          onMouseEnter={() => {
            setIsEditing(false)
          }}>
          {/* You can add extra content here if needed */}
        </div>
      </div>
    </div>
  );
};

export default Item;
