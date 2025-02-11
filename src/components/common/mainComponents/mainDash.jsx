import React, { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";
import { MdOutlineReplay } from "react-icons/md";
import { IoMdRedo, IoMdTrash, IoMdAdd, IoMdUndo } from "react-icons/io";
import { useLocation } from "react-router-dom";
const MainDash = () => {
    const [selectedItem, setSelectedItem] = useState("add_item");
    const location = useLocation();

    const allItems = [
        {
            id: "add_item",
            name: "add item",
            icon: <IoMdAdd />
        },
        {
            id: "duplicate",
            name: "duplicate",
            icon: <IoCopyOutline />
        },
    
        {
            id: "delete",
            name: "delete",
            icon: <IoMdTrash />
        },
        {
            id: "reload",
            name: "reload",
            icon: <MdOutlineReplay />
        },
        {
            id: "undo",
            name: "undo",
            icon: <IoMdUndo />
        },
        {
            id: "redo",
            name: "redo",
            icon: <IoMdRedo />
        },
        {
            id: "grid",
            name: "grid",
            icon: <HiHashtag />
        },
    ]  
    const displayItems = location.pathname === "/grid" ? allItems : allItems.slice(0, -1);
 
   return (
      <div className="flex gap-4 my-6 w-full justify-center items-center">
         <div className="flex items-center justify-between w-auto  md:min-w-1/4 md:max-w-1/4 custom-rounded-lg bg-primary h-24 p-6 gap-4 shadow-lg transition-all duration-300 ease-in-out">
            {displayItems.map((item) => (
                <>
               <div key={item.id} className={`flex items-center justify-center rounded-2xl p-2 cursor-pointer text-4xl w-16 h-16  active:bg-icon active:text-white ${selectedItem === item.id ? "bg-icon text-white" : ""}`} onClick={() => setSelectedItem(item.id)}>
                  {item.icon}
               </div>
               {item.index === (item.index+1 %2 )&& 
                <div className="h-10 w-[2px] bg-divider inline-block mx-1"></div>
                }
               </>
            ))}
         </div>
      </div>
   );
};

export default MainDash;