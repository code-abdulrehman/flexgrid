import React, { useState, useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { HiPencil } from "react-icons/hi2";
import CustomInput from "../customInput";

const Item = ({
   width = 150,
   height = 150,
   widthUnit = "px",
   heightUnit = "px",
   name = "item",
   icon,
   children,
   selected = false,
   onClick, // Parent onClick handler (if needed)
   className,
   index = 0,
}) => {
   const [isEditing, setIsEditing] = useState(false);
   const [inputValue, setInputValue] = useState(index + 1);

   // Save edited value and exit edit mode
   const handleBlur = () => {
      if (inputValue.trim() === "") {
         setInputValue(index + 1); // Revert to default if empty
      }
      setIsEditing(false);
   };

   // Handle key press (Enter to save and exit)
   const handleKeyDown = (e) => {
      if (e.key === "Enter") {
         handleBlur();
      }
   };

   // Update inputValue only when index changes
   useEffect(() => {
      setInputValue(index + 1);
      console.log(index);
   }, [index]);

   useEffect(() => {
      console.log("Editing:", isEditing);
   }, [isEditing]);

   // Click on the container
   const handleContainerClick = () => {
      setIsEditing(false);
      // Optionally call the parent's onClick
      if (onClick) {
         onClick();
      }
   };

   // Click on the pencil icon to start editing
   const handleEdit = (e) => {
      e.stopPropagation(); // Prevent the container's click event from firing
      setIsEditing(true);
      console.log("Editing:", isEditing);
   };

   return (
      <div
         className={`flex flex-col gap-2 bg-container custom-rounded-lg border border-icon bg-content item-shadow cursor-pointer p-4 hover:bg-content-hover transition-[background-color] ease-out duration-500 group/item ${className}`}
         // onClick={handleContainerClick}
         style={{
            width: `${width}${widthUnit}`,
            height: `${height}${heightUnit}`,
         }}
      >
         {/* Checkmark Icon */}
         {selected && (
            <span className="relative">
               <IoIosCheckmarkCircle className="text-accent transition-all ease-out duration-500 text-5xl absolute -top-7 -right-6 bg-primary rounded-full" />
            </span>
         )}

         <div className="flex items-center justify-between">
            <span className="flex items-center justify-between">
               {isEditing ? (
                  <CustomInput
                     value={inputValue}
                     type="text"
                     maxLength={15}
                     placeholder="..."
                     onChange={(e) => setInputValue(e.target.value)}
                     onBlur={handleBlur} // Save on blur
                     onKeyDown={handleKeyDown} // Save on Enter
                     onClick={(e) => e.stopPropagation()} // Prevent container click
                     autoFocus // Focus automatically when editing starts
                  />
               ) : (
                  <div className="flex items-center justify-center pl-2 w-16 h-12 bg-primary rounded-2xl relative">
                     <p className="text-3xl text-center font-bold">{inputValue}</p>
                     <HiPencil
                        className="absolute -top-2 -right-4 text-primary transition-[visibility] ease-in duration-200 text-3xl group-hover/item:visible invisible rounded-full p-1 bg-content-hover cursor-pointer"
                        onClick={handleEdit}
                     />
                  </div>
               )}
            </span>

            {children}
         </div>
      </div>
   );
};

export default Item;
