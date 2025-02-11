// SizingBox.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuUnfoldHorizontal, LuMoveHorizontal, LuMoveVertical } from "react-icons/lu";
import { BsTextareaResize } from "react-icons/bs";
import { RiTextBlock } from "react-icons/ri";
import { RiBox1Line } from "react-icons/ri";
// Rename the imported action creator to avoid collision
import { showItemsName as toggleShowItemsName } from "../../../../lib/store/reducers/settingsOptionsReducer/settingsOptionsReducer";

const ItemsSettings = () => {
  const dispatch = useDispatch();
  const showItemsName = useSelector((state) => state.settingsOptions.showItemsName);

  return (
    <div className="flex flex-col items-start justify-center gap-4 custom-rounded-lg bg-content p-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between w-full gap-4 h-12">
        <span className="text-secondary text-2xl flex items-center justify-start w-1/2 gap-2">
          <RiBox1Line className="text-secondary text-4xl" />
          <p className="text-secondary font-bold text-2xl text-start uppercase text-nowrap">
            Items
          </p>
        </span>
      </div>

      <div className="bg-divider w-full h-[2px]"></div>

      <div className="flex items-center justify-between w-full gap-4 h-12">
        <span className="text-secondary text-2xl flex items-center justify-start w-1/2 gap-2">
          <RiTextBlock className="text-secondary text-4xl" />
          <p className="text-secondary font-bold text-xl text-center uppercase">
            Show Name
          </p>
        </span>
        <span className="flex items-center justify-end w-1/2">
          {/* Custom Toggle */}
          <label htmlFor="showItemsName" className="relative inline-block w-16 h-8 cursor-pointer">
            <input
              type="checkbox"
              id="showItemsName"
              className="sr-only peer"
              checked={showItemsName}
              onChange={() => dispatch(toggleShowItemsName(!showItemsName))}
            />
            {/* Toggle Track */}
            <div className="w-full h-full rounded-full bg-gray-300 
                            peer-focus:ring-0
                            transition-colors duration-300
                            bg-[var(--text-secondary)]
                            peer-checked:bg-[var(--color-primary)]">
            </div>
            {/* Toggle Knob */}
            <span className="absolute left-0.5 top-0.5 h-7 w-7 inset-t-box-shadow bg-white rounded-full 
                             transition-transform duration-300 
                             peer-checked:translate-x-8">
            </span>
          </label>
        </span>
      </div>
    </div>
  );
};

export default ItemsSettings;
