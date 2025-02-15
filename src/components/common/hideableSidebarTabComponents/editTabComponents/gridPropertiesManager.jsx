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
import { CgArrowAlignH, CgScrollV } from "react-icons/cg";
import { FaExclamationTriangle } from "react-icons/fa";

const GridPropertiesManager = () => {
  // State for display type
  const [displayType, setDisplayType] = useState("grid");

  // Advanced dropdown states
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
    overflow: "auto",
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
        { label: "min-content", value: "min" },
        { label: "max-content", value: "max" },
        { label: "1fr", value: "fr" },
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
        { label: "min-content", value: "min" },
        { label: "max-content", value: "max" },
        { label: "1fr", value: "fr" },
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
    {
      key: "overflow",
      icon: <CgScrollV className="text-primary" />,
      title: "Overflow",
      inpType: "select",
      inpSelect: true,
      selectValue: simpleGridSettings.overflow,
      options: [
        { label: "visible", value: "visible" },
        { label: "hidden", value: "hidden" },
        { label: "scroll", value: "scroll" },
        { label: "clip", value: "clip" },
        { label: "auto", value: "auto" },
        { label: "x-auto", value: "x-auto" },
        { label: "y-auto", value: "y-auto" },
      ],
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
  };

  // Helper to generate original CSS output from state
  const generateCSS = () => {
    let css = `display: ${displayType};\n`;
    if (displayType === "grid") {
      if (gridTemplateColumnsValue)
        css += `grid-template-columns: ${gridTemplateColumnsValue};\n`;
      if (gridTemplateRowsValue)
        css += `grid-template-rows: ${gridTemplateRowsValue};\n`;
      if (gapValue) css += `gap: ${gapValue};\n`;

      // Convert simple grid settings (camelCase to kebab-case)
      Object.entries(simpleGridSettings).forEach(([key, value]) => {
        const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        css += `${kebabKey}: ${value};\n`;
      });
    }
    return css;
  };

  // Helper to generate Tailwind CSS classes based on state.
  // Note: This mapping is basic and assumes the values follow a certain format.
  const generateTailwindClasses = () => {
    let classes = "";
    if (displayType === "grid") {
      classes += "grid ";

      // Map grid-template columns if formatted as "col-X"
      if (gridTemplateColumnsValue) {
        const match = gridTemplateColumnsValue.match(/col-(\d+)/);
        if (match) {
          classes += `grid-cols-${match[1]} `;
        }
      }

      // Map grid-template rows if formatted as "row-X"
      if (gridTemplateRowsValue) {
        const match = gridTemplateRowsValue.match(/row-(\d+)/);
        if (match) {
          classes += `grid-rows-${match[1]} `;
        }
      }

      // Map gap value; using Tailwind’s arbitrary value syntax if needed.
      if (gapValue) {
        classes += `gap-[${gapValue}] `;
      }

      // Map simple grid settings:
      if (simpleGridSettings.justifyItems)
        classes += `justify-items-${simpleGridSettings.justifyItems} `;
      if (simpleGridSettings.alignItems)
        classes += `items-${simpleGridSettings.alignItems} `;
      if (simpleGridSettings.justifyContent)
        classes += `justify-${simpleGridSettings.justifyContent} `;
      if (simpleGridSettings.alignContent)
        classes += `content-${simpleGridSettings.alignContent} `;

      if (simpleGridSettings.gridAutoColumns)
        classes += `auto-cols-${simpleGridSettings.gridAutoColumns} `;
      if (simpleGridSettings.gridAutoRows)
        classes += `auto-rows-${simpleGridSettings.gridAutoRows} `;


      if (simpleGridSettings.gridAutoFlow) {
        const flow = simpleGridSettings.gridAutoFlow;
        if (flow === "row") {
          classes += "grid-flow-row ";
        } else if (flow === "column") {
          classes += "grid-flow-col ";
        } else if (flow === "row dense") {
          classes += "grid-flow-row-dense ";
        } else if (flow === "column dense") {
          classes += "grid-flow-col-dense ";
        }
      }

      if (simpleGridSettings.overflow)
        classes += `${(simpleGridSettings.overflow === "x-auto" ? "overflow-x" : simpleGridSettings.overflow === "y-auto" ? "overflow-y" : "overflow")}: ${(simpleGridSettings.overflow === "x-auto" || simpleGridSettings.overflow === "y-auto") ? "auto" : simpleGridSettings.overflow};\n`;
    } else if (displayType === "block") {
      classes += "block ";
    }
    return classes.trim();
  };

  return (
    <>
      {/* Display Type Selector */}
      <div className="mb-2 transition-all ease-out duration-500">
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
        <div className="flex flex-col gap-4">
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
            onSelectChange={(val) => setGridTemplateColumnsValue(val)}
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
            onSelectChange={(val) => setGridTemplateRowsValue(val)}
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
            onSelectChange={(val) => setGapValue(val)}
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

      {/* Output the generated original CSS */}
      <div className="mt-6 p-4 bg-secondary text-primary custom-rounded-lg">
        <h2 className="text-lg font-bold">Generated CSS</h2>
        <pre className="overflow-auto whitespace-pre-wrap">{generateCSS()}</pre>
      </div>

      {/* Output the generated Tailwind CSS classes */}
      <div className="mt-6 p-4 bg-secondary text-primary custom-rounded-lg">
        <h2 className="text-lg font-bold">Generated Tailwind Classes</h2>
        <pre className="overflow-auto whitespace-pre-wrap">{generateTailwindClasses()}</pre>
      </div>
    </>
  );
};

export default GridPropertiesManager;
