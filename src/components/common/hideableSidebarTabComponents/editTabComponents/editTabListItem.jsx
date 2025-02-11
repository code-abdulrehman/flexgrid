import React from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { FaInfo } from "react-icons/fa6";
import CustomDropdown from "../../customDropdown";
import CustomInput from "../../customInput";
import CustomTooltip from "../../customTooltip";
import { useLocation } from "react-router-dom";

const EditTabListItem = ({
  className = "",
  icon,
  title = "Default Title",
  selectOrder = 1,
  inpOrder = 2,
  inpNum = false,
  inpSelect = false,
  options = [],
  inpValue = "",
  inpType = "",
  selectValue = "",
  onSelectChange = () => {},
  onInpChange = () => {},
  ...rest
}) => {
  const location = useLocation();
  const dropdownPlaceholder =
    rest.gridProperties && typeof selectValue === "object"
      ? "Select option"
      : selectValue;

  const handleDropdownChange = (valueObj) => {
    const newVal =
      valueObj && valueObj.newValue !== undefined ? valueObj.newValue : valueObj;
    onSelectChange(newVal);
  };

  return (
    <div
      data-inp-type={inpType}
      className={`flex items-center justify-between gap-2 bg-content text-secondary custom-rounded-lg p-3 transition-all ease-out duration-500 ${className}`}
    >
      <div className="flex items-center gap-4 w-[90%] text-ellipsis whitespace-nowrap">
        <div className="min-w-20 min-h-20 bg-content-hover border border-icon rounded-2xl text-2xl flex items-center justify-center inset-t-box-shadow">
          {icon || <HiQuestionMarkCircle className="w-12 h-12 text-secondary" />}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl ml-2 text-primary font-bold overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </p>
          <div className="flex flex-row gap-2">
            {inpSelect && (
              <span className={`w-auto h-full order-${selectOrder} overflow-visible`}>
                <CustomDropdown
                  placeholder={dropdownPlaceholder}
                  options={options}
                  value={selectValue}
                  onChange={handleDropdownChange}
                  nested={rest.nested || false}
                  dropdownButtonClass="p-2"
                  optionClassName="p-2"
                  NumberInputComponent={CustomInput}
                  {...rest}
                />
              </span>
            )}
            {inpNum && (
              <span className={`w-auto h-full order-${inpOrder}`}>
                <CustomInput
                  placeholder="px"
                  type="number"
                  min={0}
                  max={1000}
                  step={1}
                  value={inpValue}
                  onChange={(e) => onInpChange(e.target.value)}
                  {...rest}
                />
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 w-auto">
        <CustomTooltip tooltipText={`Defines the layout type, such as ${location.pathname === "/flex" ? "flex" : "grid"} or block.`} className="w-16 h-16 flex items-center justify-center bg-secondary rounded-full inset-b-box-shadow" />
      </div>
    </div>
  );
};

export default EditTabListItem;
