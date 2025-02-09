// GridPropertiesManager.jsx
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
  // State for display type
  const [displayType, setDisplayType] = useState("grid");

  // Advanced dropdown states (initialized as empty strings so that rendered values are strings)
  const [gridTemplateColumnsValue, setGridTemplateColumnsValue] = useState("");
  const [gridTemplateRowsValue, setGridTemplateRowsValue] = useState("");
  const [gapValue, setGapValue] = useState("");

  // Simple grid properties state
  const [simpleGridSettings, setSimpleGridSettings] = useState({
    justifyItems: "stretch",
    alignItems: "stretch",
    justifyContent: "start",
    alignContent: "start",
    gridAutoColumns: "auto",
    gridAutoRows: "auto",
    gridAutoFlow: "row",
  });

  // --- Options for Advanced Dropdowns ---
  const gridTemplateColumnsOptions = [
    {
      value: "col-1",
      label: "Column 1",
      numInput: 1,
      subOption: "fr",
      subOptions: [
        { value: "fr", label: "fr" },
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
    },
    {
      value: "col-2",
      label: "Column 2",
      numInput: 1,
      subOption: "fr",
      subOptions: [
        { value: "fr", label: "fr" },
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
    },
    {
      value: "col-3",
      label: "Column 3",
      numInput: 1,
      subOption: "fr",
      subOptions: [
        { value: "fr", label: "fr" },
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
    },
    // Add additional columns as needed.
  ];

  const gridTemplateRowsOptions = [
    {
      value: "row-1",
      label: "Row 1",
      numInput: 1,
      subOption: "fr",
      subOptions: [
        { value: "fr", label: "fr" },
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
    },
    {
      value: "row-2",
      label: "Row 2",
      numInput: 1,
      subOption: "fr",
      subOptions: [
        { value: "fr", label: "fr" },
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
    },
    {
      value: "row-3",
      label: "Row 3",
      numInput: 1,
      subOption: "fr",
      subOptions: [
        { value: "fr", label: "fr" },
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
    },
  ];

  const gapOptions = [
    {
      value: "colgap",
      label: "Column Gap",
      numInput: 10,
      subOption: "px",
      subOptions: [
        { value: "px", label: "px" },
        { value: "rem", label: "rem" },
        { value: "%", label: "%" },
      ],
    },
    {
      value: "rowgap",
      label: "Row Gap",
      numInput: 10,
      subOption: "px",
      subOptions: [
        { value: "px", label: "px" },
        { value: "rem", label: "rem" },
        { value: "%", label: "%" },
      ],
    },
  ];

  // --- Options for Simple Grid Properties ---
  const simpleGridProperties = [
    {
      key: "justifyItems",
      icon: <MdAlignHorizontalCenter className="text-primary w-8 h-8" />,
      title: "Justify Items",
      inpType: "select",
      inpSelect: true,
      selectValue: simpleGridSettings.justifyItems,
      options: [
        { label: "start", value: "start" },
        { label: "end", value: "end" },
        { label: "center", value: "center" },
        { label: "stretch", value: "stretch" },
      ],
      nested: true,
    },
    {
      key: "alignItems",
      icon: <MdAlignVerticalCenter className="text-primary w-8 h-8" />,
      title: "Align Items",
      inpType: "select",
      inpSelect: true,
      selectValue: simpleGridSettings.alignItems,
      options: [
        { label: "start", value: "start" },
        { label: "end", value: "end" },
        { label: "center", value: "center" },
        { label: "stretch", value: "stretch" },
      ],
      nested: true,
    },
    {
      key: "justifyContent",
      icon: <MdAlignHorizontalCenter className="text-primary w-8 h-8" />,
      title: "Justify Content",
      inpType: "select",
      inpSelect: true,
      selectValue: simpleGridSettings.justifyContent,
      options: [
        { label: "start", value: "start" },
        { label: "end", value: "end" },
        { label: "center", value: "center" },
        { label: "space-between", value: "space-between" },
        { label: "space-around", value: "space-around" },
        { label: "space-evenly", value: "space-evenly" },
      ],
      nested: true,
    },
    {
      key: "alignContent",
      icon: <MdAlignVerticalCenter className="text-primary w-8 h-8" />,
      title: "Align Content",
      inpType: "select",
      inpSelect: true,
      selectValue: simpleGridSettings.alignContent,
      options: [
        { label: "start", value: "start" },
        { label: "end", value: "end" },
        { label: "center", value: "center" },
        { label: "space-between", value: "space-between" },
        { label: "space-around", value: "space-around" },
        { label: "space-evenly", value: "space-evenly" },
      ],
      nested: true,
    },
    {
      key: "gridAutoColumns",
      icon: <MdGridOn className="text-primary w-8 h-8" />,
      title: "Grid Auto Columns",
      inpType: "select",
      inpSelect: true,
      selectValue: simpleGridSettings.gridAutoColumns,
      options: [
        { label: "auto", value: "auto" },
        { label: "min-content", value: "min-content" },
        { label: "max-content", value: "max-content" },
        { label: "1fr", value: "1fr" },
      ],
      nested: true,
    },
    {
      key: "gridAutoRows",
      icon: <MdGridOn className="text-primary w-8 h-8" />,
      title: "Grid Auto Rows",
      inpType: "select",
      inpSelect: true,
      selectValue: simpleGridSettings.gridAutoRows,
      options: [
        { label: "auto", value: "auto" },
        { label: "min-content", value: "min-content" },
        { label: "max-content", value: "max-content" },
        { label: "1fr", value: "1fr" },
      ],
      nested: true,
    },
    {
      key: "gridAutoFlow",
      icon: <MdGridOn className="text-primary w-8 h-8" />,
      title: "Grid Auto Flow",
      inpType: "select",
      inpSelect: true,
      selectValue: simpleGridSettings.gridAutoFlow,
      options: [
        { label: "row", value: "row" },
        { label: "column", value: "column" },
        { label: "dense", value: "dense" },
        { label: "row dense", value: "row dense" },
        { label: "column dense", value: "column dense" },
      ],
      nested: true,
    },
  ];

  const handleDisplayChange = (newValue) => {
    setDisplayType(newValue);
  };

  const handleSimpleChange = (key, newValue) => {
    setSimpleGridSettings((prev) => ({
      ...prev,
      [key]: newValue,
    }));
    // console.log(`${key} changed to:`, newValue);
  };

  return (
    <>
      {/* Display Type Selector */}
      <div className="mb-4">
        <EditTabListItem
          key="display"
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
          nested={true}
        />
      </div>

      {displayType === "grid" ? (
        <div className="flex flex-col gap-6">
          {/* Advanced dropdown for Grid Template Columns */}
          <EditTabListItem
            key="gridTemplateColumns"
            title="Grid Template Columns"
            icon={<MdViewColumn className="text-primary w-8 h-8" />}
            inpSelect={true}
            inpType="select"
            selectValue={gridTemplateColumnsValue}
            options={gridTemplateColumnsOptions}
            addNewWith="Column"
            gridProperties={true}
            onSelectChange={(val) => {
              setGridTemplateColumnsValue(val);
            }}
          />

          {/* Advanced dropdown for Grid Template Rows */}
          <EditTabListItem
            key="gridTemplateRows"
            title="Grid Template Rows"
            icon={<MdViewStream className="text-primary w-8 h-8" />}
            inpSelect={true}
            inpType="select"
            selectValue={gridTemplateRowsValue}
            options={gridTemplateRowsOptions}
            addNewWith="Row"
            gridProperties={true}
            onSelectChange={(val) => {
              setGridTemplateRowsValue(val);
            }}
          />

          {/* Advanced dropdown for Gap */}
          <EditTabListItem
            key="gap"
            title="Gap"
            icon={<CgArrowAlignH className="text-primary w-8 h-8" />}
            inpSelect={true}
            inpType="number"
            placeholder="10px 10px"
            inpValue={10}
            selectValue={gapValue}
            options={gapOptions}
            allowAdd={false}
            allowCross={false}
            gridProperties={true}
            onSelectChange={(val) => {
              setGapValue(val);
            }}
          />

          {/* Render simple grid properties */}
          {simpleGridProperties.map((property) => (
            <EditTabListItem
              key={property.key}
              title={property.title}
              icon={property.icon}
              inpSelect={property.inpSelect}
              inpType={property.inpType}
              selectValue={simpleGridSettings[property.key]}
              onSelectChange={(val) => handleSimpleChange(property.key, val)}
              options={property.options}
              nested={property.nested}
            />
          ))}
        </div>
      ) : (
        <div className="p-4 bg-content custom-rounded-lg text-secondary flex items-center">
          <FaExclamationTriangle className="text-secondary w-16 h-16 mr-4" />
          Grid properties are hidden because display is set to block.
        </div>
      )}

      {/* Optional: Display the current state for debugging */}
      <div className="mt-6 p-4 bg-secondary text-primary custom-rounded-lg">
        <h2 className="text-lg font-bold">Current Grid Settings</h2>
        <pre className=" overflow-auto">
          {JSON.stringify(
            {
              displayType,
              gridTemplateColumnsValue,
              gridTemplateRowsValue,
              gapValue,
              simpleGridSettings,
            },
            null,
            2
          )}
        </pre>
      </div>
    </>
  );
};

export default GridPropertiesManager;
