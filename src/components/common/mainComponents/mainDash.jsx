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
        // Make sure we have more than one item to delete from and something selected.
        if (totalItems > 1 && selectedItem.length > 0) {
          // For single selection, assume selectedItem[0] is the item to delete.
          const deleteIndex = selectedItem[0];
      
          // Decrease the total number of items.
          dispatch(setTotalItems(totalItems - 1));
      
          // Determine which item should be selected after deletion.
          // If the deleted item was the last one, select the new last item.
          // Otherwise, keep the same index (which now corresponds to the next item).
          let newSelected;
          if (deleteIndex >= totalItems - 1) {
            newSelected = [totalItems - 2]; // new last index (after deletion)
          } else {
            newSelected = [deleteIndex];
          }
          dispatch(setSelectedItem(newSelected));
        } else {
          // If there is only one item, you might want to clear the selection or handle it differently.
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
         <div className="flex items-center justify-between w-auto  md:min-w-1/4 md:max-w-1/4 custom-rounded-lg bg-primary h-24 p-6 gap-4 shadow-lg transition-all duration-300 ease-in-out" id="main-dash">
            {displayItems.map((item) => (
                <>
               <div id={item.id} key={item.id} className={`flex items-center justify-center rounded-2xl p-2 cursor-pointer text-4xl w-16 h-16  active:bg-icon active:text-white ${selectedMainDashItem === item.id ? "bg-icon text-white" : ""}`} onClick={() => {
                if (item.id === "add_item") {
                    handleAddItemClick();
                    setSelectedMainDashItem(item.id);
                } else if (item.id === "duplicate") {
                    handleDuplicateItemClick();
                    setSelectedMainDashItem(item.id);
                } else if (item.id === "delete") {
                    handleDeleteItemClick();
                    setSelectedMainDashItem(item.id);
                } else if (item.id === "reload") {
                    handleReloadItemClick();
                    setSelectedMainDashItem(item.id);
                } else {
                    setSelectedMainDashItem(item.id);
                }
               }}>
                  {item.icon}

                    </div>
               {/* {item.index === (item.index+1 %2 )&& 
                <div className="h-10 w-[2px] bg-divider inline-block mx-1"></div>
                } */}
               </>
            ))}
         </div>
      </div>
   );
};

export default MainDash;