import React, { useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";
import { MdOutlineReplay } from "react-icons/md";
import { IoMdRedo, IoMdTrash, IoMdAdd, IoMdUndo } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTotalItems, resetOutputCode, setSelectedItem } from "../../../lib/store/reducers/outputCodeReducer/outputCodeReducer";


const MainDash = () => {
    const dispatch = useDispatch();
    const [selectedMainDashItem, setSelectedMainDashItem] = useState("add_item");
    const totalItems = useSelector((state) => state.outputCode.totalItems);
    const selectedItem = useSelector((state) => state.outputCode.selectedItem);
    const location = useLocation();

    useEffect(() => {
        setSelectedMainDashItem(selectedItem);
        console.log(selectedItem, "selectedItem");
    }, [selectedItem]);

    const handleAddItemClick = () => {
        dispatch(setTotalItems(totalItems + 1));
    }

    const handleDuplicateItemClick = () => {
        // For single selection, get the selected index.
        if (selectedItem.length > 0) {
          // Here we assume selectedItem[0] is the index of the item to duplicate.
          const selectedIdx = selectedItem[0];
      
          // Increase the total item count so a new item appears.
          // This new item (duplicate) will be rendered at the end.
          dispatch(setTotalItems(totalItems + 1));
      
          // Optionally, if you want the duplicate to become the new selection,
          // update the selected item state to the new index (which is the old totalItems value).
          dispatch(setSelectedItem([totalItems]));
        }
      };
      

      const handleDeleteItemClick = () => {
        if (totalItems > 1 && selectedItem.length > 0) {
          // Assume single selection; delete the item at selectedItem[0]
          const deleteIndex = selectedItem[0];
          
          // Decrement the total count
          dispatch(setTotalItems(totalItems - 1));
          
          // Adjust selection: if the deleted item was last, select the new last item.
          const newSelected = deleteIndex >= totalItems - 1 
            ? [totalItems - 2] 
            : [deleteIndex];
          dispatch(setSelectedItem(newSelected));
        } else {
          dispatch(setSelectedItem([]));
        }
      };
      

    const handleReloadItemClick = () => {
        dispatch(resetOutputCode());
        dispatch(setSelectedItem([0]));
        
    }
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
         <ul className="flex items-center justify-between w-auto  md:min-w-1/4 md:max-w-1/4 custom-rounded-lg bg-primary h-24 p-6 gap-4 shadow-lg transition-all duration-300 ease-in-out" id="main-dash">
                <>
            {displayItems.map((item) => (
               <li id={item.id} key={item.id} className="flex items-center justify-center rounded-2xl p-2 cursor-pointer text-4xl w-16 h-16  active:bg-[var(--icon-bg)] active:text-white" onClick={() => {
                if (item.id === "add_item") {
                    setSelectedMainDashItem(item.id);
                    handleAddItemClick();
                } else if (item.id === "duplicate") {
                    setSelectedMainDashItem(item.id);
                    handleDuplicateItemClick();
                } else if (item.id === "delete") {
                    setSelectedMainDashItem(item.id);
                    handleDeleteItemClick();
                } else if (item.id === "reload") {
                    setSelectedMainDashItem(item.id);
                    handleReloadItemClick();
                } else {
                    setSelectedMainDashItem(item.id);
                }
               }}>
                  {item.icon}

                    </li>
            ))}
               </>
         </ul>
      </div>
   );
};

export default MainDash;