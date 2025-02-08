import React, { useState } from "react";
import EditTabListItem from "./editTabListItem";
import {
  MdOutlineFormatAlignCenter,
  MdViewColumn,
  MdViewStream,
  MdAlignHorizontalCenter,
  MdAlignVerticalCenter,
  MdGridOn,
} from "react-icons/md";
import { CgArrowAlignH } from "react-icons/cg";
import { FaExclamationTriangle } from "react-icons/fa";

const GridPropertiesManager = () => {
  // Set the default display type to "grid"
  const [displayType, setDisplayType] = useState("grid");

  // Array of grid-related properties with default values and options
  const gridProperties = [
    {
      icon: <MdViewColumn className="text-primary w-8 h-8" />,
      title: "Grid Template Columns",
      inpType: "select",
      inpSelect: true,
      selectValue: "1fr", // default value
      options: [
        { label: "1fr", value: "1fr" },
        { label: "repeat(2, 1fr)", value: "repeat(2, 1fr)" },
        { label: "repeat(3, 1fr)", value: "repeat(3, 1fr)" },
        { label: "repeat(4, 1fr)", value: "repeat(4, 1fr)" },
      ],
    },
    {
      icon: <MdViewStream className="text-primary w-8 h-8" />,
      title: "Grid Template Rows",
      inpType: "select",
      inpSelect: true,
      selectValue: "1fr 1fr 1fr 1fr", // default value
      options: [
        { label: "1fr", value: "1fr" },
        { label: "1fr 1fr", value: "1fr 1fr" },
        { label: "1fr 1fr 1fr", value: "1fr 1fr 1fr" },
        { label: "1fr 1fr 1fr 1fr", value: "1fr 1fr 1fr 1fr" },
      ],
    },
    {
      icon: <CgArrowAlignH className="text-primary w-8 h-8" />,
      title: "Gap",
      inpType: "number",
      inpSelect: true,
      // Here we assume the number input represents the numeric gap value
      // and a secondary select lets the user pick the unit.
      inpValue: 10,
      selectValue: "px",
      inpNum: true,
      inpOrder: 1,
      selectOrder: 2,
      min: 0,
      max: 100,
      step: 1,
      options: [
        { label: "px", value: "px" },
        { label: "rem", value: "rem" },
        { label: "%", value: "%" },
      ],
    },
    {
      icon: <MdAlignHorizontalCenter className="text-primary w-8 h-8" />,
      title: "Justify Items",
      inpType: "select",
      inpSelect: true,
      selectValue: "stretch",
      options: [
        { label: "start", value: "start" },
        { label: "end", value: "end" },
        { label: "center", value: "center" },
        { label: "stretch", value: "stretch" },
      ],
    },
    {
      icon: <MdAlignVerticalCenter className="text-primary w-8 h-8" />,
      title: "Align Items",
      inpType: "select",
      inpSelect: true,
      selectValue: "stretch",
      options: [
        { label: "start", value: "start" },
        { label: "end", value: "end" },
        { label: "center", value: "center" },
        { label: "stretch", value: "stretch" },
      ],
    },
    {
      icon: <MdAlignHorizontalCenter className="text-primary w-8 h-8" />,
      title: "Justify Content",
      inpType: "select",
      inpSelect: true,
      selectValue: "start",
      options: [
        { label: "start", value: "start" },
        { label: "end", value: "end" },
        { label: "center", value: "center" },
        { label: "space-between", value: "space-between" },
        { label: "space-around", value: "space-around" },
        { label: "space-evenly", value: "space-evenly" },
      ],
    },
    {
      icon: <MdAlignVerticalCenter className="text-primary w-8 h-8" />,
      title: "Align Content",
      inpType: "select",
      inpSelect: true,
      selectValue: "start",
      options: [
        { label: "start", value: "start" },
        { label: "end", value: "end" },
        { label: "center", value: "center" },
        { label: "space-between", value: "space-between" },
        { label: "space-around", value: "space-around" },
        { label: "space-evenly", value: "space-evenly" },
      ],
    },
    {
      icon: <MdGridOn className="text-primary w-8 h-8" />,
      title: "Grid Auto Columns",
      inpType: "select",
      inpSelect: true,
      selectValue: "auto",
      options: [
        { label: "auto", value: "auto" },
        { label: "min-content", value: "min-content" },
        { label: "max-content", value: "max-content" },
        { label: "1fr", value: "1fr" },
      ],
    },
    {
      icon: <MdGridOn className="text-primary w-8 h-8" />,
      title: "Grid Auto Rows",
      inpType: "select",
      inpSelect: true,
      selectValue: "auto",
      options: [
        { label: "auto", value: "auto" },
        { label: "min-content", value: "min-content" },
        { label: "max-content", value: "max-content" },
        { label: "1fr", value: "1fr" },
      ],
    },
    {
      icon: <MdGridOn className="text-primary w-8 h-8" />,
      title: "Grid Auto Flow",
      inpType: "select",
      inpSelect: true,
      selectValue: "row",
      options: [
        { label: "row", value: "row" },
        { label: "column", value: "column" },
        { label: "dense", value: "dense" },
        { label: "row dense", value: "row dense" },
        { label: "column dense", value: "column dense" },
      ],
    },
  ];

  // Handler to update the display type (grid or block)
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
          title="Display"
          inpSelect={true}
          inpType="select"
          selectValue={displayType}
          onSelectChange={handleDisplayChange}
          options={[
            { label: "grid", value: "grid" },
            { label: "block", value: "block" },
          ]}
        />
      </div>

      {/* Render grid properties only when display is set to grid */}
      {displayType === "grid" ? (
        <div className="flex flex-col gap-6">
          {gridProperties.map((property, index) => (
            <EditTabListItem
              key={index}
              title={property.title}
              icon={property.icon}
              inpSelect={property.inpSelect}
              inpType={property.inpType}
              selectValue={property.selectValue}
              inpValue={property.inpValue}
              inpNum={property.inpNum}
              inpOrder={property.inpOrder}
              selectOrder={property.selectOrder}
              options={property.options}
              min={property.min}
              max={property.max}
              step={property.step}
            />
          ))}
        </div>
      ) : (
        <div className="p-4 bg-content custom-rounded-lg text-secondary flex items-center">
          <FaExclamationTriangle className="text-secondary w-16 h-16 mr-4" />
          Grid properties are hidden because display is set to block.
        </div>
      )}
    </>
  );
};

export default GridPropertiesManager;
