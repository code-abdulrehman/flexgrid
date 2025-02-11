import React from "react";
import { FaEye, FaTrash } from "react-icons/fa6";
import { RxDragHandleDots2 } from "react-icons/rx";

const SavedItem = ({name, value, date}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-row items-center justify-between w-full gap-2 py-4 bg-container custom-rounded-lg border border-icon">
                <div className="flex flex-row items-center w-[68%] gap-2">
                    <span className="w-16 h-16 flex items-center justify-center cursor-move">
                        <RxDragHandleDots2 className="w-12 h-12 text-primary cursor-move" />
                    </span>
                    <div className="flex flex-col items-start justify-center py-1 overflow-hidden"> 
                    <h5 className="text-secondary font-bold text-2xl text-start uppercase mb-2 overflow-hidden text-ellipsis">{name}</h5>
                    <h5 className="text-secondary font-bold text-lg text-start uppercase overflow-hidden text-ellipsis">{new Date(date).toLocaleDateString() + ", " + new Date(date).toLocaleTimeString()}</h5>
                    </div>
                    </div>

                <div className="flex items-center jsutify-end justify-end mr-2 gap-4 w-[30%]">
                    <span className=" cursor-pointer w-16 h-16 flex items-center justify-center bg-secondary rounded-full inset-b-box-shadow group transition-all duration-300" title="delete">
                        <FaTrash className="w-6 h-6 group-hover:text-danger text-secondary" />
                    </span>
                    <span className=" cursor-pointer w-16 h-16 flex items-center justify-center bg-secondary rounded-full inset-b-box-shadow group transition-all duration-300" title="info">
                        <FaEye className="w-6 h-6 group-hover:text-accent text-secondary" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SavedItem;