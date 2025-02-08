// flexPropertiesManager.js
import React, { useState } from "react";
import EditTabListItem from "./editTabListItem";
import { MdOutlineFormatAlignCenter, MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { TbTextWrap } from "react-icons/tb";
import { LuAlignHorizontalJustifyStart } from "react-icons/lu";
import { LuAlignVerticalJustifyEnd } from "react-icons/lu";
import { LuAlignVerticalJustifyCenter } from "react-icons/lu";
import { CgArrowAlignH } from "react-icons/cg";
import { FaExclamationTriangle } from "react-icons/fa";

const FlexPropertiesManager = () => {
  const [displayType, setDisplayType] = useState("flex");

  // Array of flex-related properties
  const flexProperties = [
    {
      icon: <MdOutlineSubdirectoryArrowRight className="text-primary w-8 h-8" />,
      title: "Flex Direction",
      inpType: "select",
      inpSelect: true,
      options: [
        { label: "row", value: "row" },
        { label: "row-reverse", value: "row-reverse" },
        { label: "column", value: "column" },
        { label: "column-reverse", value: "column-reverse" },
      ],
    },
    {
      icon: <TbTextWrap className="text-primary w-8 h-8" />,
      title: "Flex Wrap",
      inpType: "select",
      inpSelect: true,
      options: [
        { label: "nowrap", value: "nowrap" },
        { label: "wrap", value: "wrap" },
        { label: "wrap-reverse", value: "wrap-reverse" },
      ],
    },
    {
      icon: <LuAlignHorizontalJustifyStart className="text-primary w-8 h-8" />,
      title: "Justify Content",
      inpType: "select",
      inpSelect: true,
      options: [
        { label: "flex-start", value: "flex-start" },
        { label: "flex-end", value: "flex-end" },
        { label: "center", value: "center" },
        { label: "space-between", value: "space-between" },
        { label: "space-around", value: "space-around" },
        { label: "space-evenly", value: "space-evenly" },
      ],
    },
    {
      icon: <LuAlignVerticalJustifyEnd className="text-primary w-8 h-8" />,
      title: "Align Items",
      inpType: "select",
      inpSelect: true,
      options: [
        { label: "stretch", value: "stretch" },
        { label: "flex-start", value: "flex-start" },
        { label: "flex-end", value: "flex-end" },
        { label: "center", value: "center" },
        { label: "baseline", value: "baseline" },
      ],
    },
    {
      icon: <LuAlignVerticalJustifyCenter className="text-primary w-8 h-8" />,
      title: "Align Content",
      inpType: "select",
      inpSelect: true,
      options: [
        { label: "stretch", value: "stretch" },
        { label: "flex-start", value: "flex-start" },
        { label: "flex-end", value: "flex-end" },
        { label: "center", value: "center" },
        { label: "space-between", value: "space-between" },
        { label: "space-around", value: "space-around" },
      ],
    },
    {
      icon: <CgArrowAlignH className="text-primary w-8 h-8" />,
      title: "Gap",
      inpType: "number",
      min: 0,
      max: 100,
      step: 1,
      inpSelect: true,
      options: [
        { label: "px", value: "px" },
        { label: "rem", value: "rem" },
        { label: "%", value: "%" },
      ],
      inpValue: 10,
      selectValue: "px",
      inpNum: true,
      inpOrder: 1,
      selectOrder: 2,
    },
  ];

  // Update display type when the user selects a different option
  const handleDisplayChange = (e) => {
    setDisplayType(e.target.value);
  };

  return (
    <>
      {/* Display Type Selector */}
      <div className="mb-4">       
      <EditTabListItem
              key={0}
              icon={<MdOutlineFormatAlignCenter className="text-primary w-8 h-8" />}
              title={"Display Type"}
              inpSelect={true}
              inpType={"select"}
              selectValue={displayType}
              onSelectChange={handleDisplayChange}
              options={[
                { label: "Flex", value: "flex" },
                { label: "Block", value: "block" },
              ]}
            />
      </div>

      {/* Render flex properties only if display type is "flex" */}
      {displayType === "flex" ? (
        <div className="flex flex-col gap-6">
          {flexProperties.map((property, index) => (
            <EditTabListItem
              key={index}
              title={property.title}
              icon={property.icon}
              inpSelect={property.inpSelect}
              inpType={property.inpType}
              inpValue={property.inpValue}
              selectValue={property.selectValue}
              inpNum={property.inpNum}
              inpOrder={property.inpOrder}
              selectOrder={property.selectOrder}
              options={property.options}
            />
          ))}
        </div>
      ) : (
        <div className="p-4 bg-content custom-rounded-lg text-secondary flex items-center">
         <FaExclamationTriangle className="text-secondary w-16 h-16 mr-4" /> Flex properties are hidden because display is set to block.
        </div>
      )}
    </>
  );
};

export default FlexPropertiesManager;
