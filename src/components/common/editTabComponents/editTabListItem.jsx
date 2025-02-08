import React from "react";
import PropTypes from "prop-types";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { FaInfo } from "react-icons/fa6";
import CustomInput from "../customInput";

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
  selectValue = "",
  onSelectChange = () => {},
  onInpChange = () => {},
  ...rest
}) => {
  try {
    return (
      <div
        className={`flex items-center justify-between gap-2 bg-content text-secondary custom-rounded-lg p-5 ${className}`}
      >
        <div className="flex items-center jsutify-center gap-4 w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
          <div className="min-w-24 min-h-24 bg-content-hover border border-icon custom-rounded-lg overflow-hidden flex items-center justify-center inset-t-box-shadow">
            {icon || <HiQuestionMarkCircle className="w-12 h-12 text-secondary" />}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[1.6rem] ml-2 text-primary font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </p>
            <div className="flex flex-row gap-2">
              {inpSelect && (
                <span className={`w-auto h-full order-${selectOrder}`}>
                  <CustomInput
                    placeholder="Name"
                    type="select"
                    options={options}
                    value={selectValue}
                    onChange={onSelectChange}
                    {...rest}
                  />
                </span>
              )}
              {inpNum && (
                <span className={`w-auto h-full order-${inpOrder}`}>
                  <CustomInput placeholder="px" type="number" min={0} max={1000} step={1} value={inpValue} onChange={onInpChange} {...rest} />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center jsutify-center gap-4 w-auto">
          <span className="w-16 h-16 flex items-center justify-center bg-secondary rounded-full inset-b-box-shadow" title="Info">
            <FaInfo className="w-8 h-8 text-primary" />
          </span>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in EditTabListItem component:", error);
    return null;
  }
};

export default EditTabListItem;
