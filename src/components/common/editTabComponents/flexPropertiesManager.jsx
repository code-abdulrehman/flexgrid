import React, { useState } from "react";
import EditTabListItem from "./editTabListItem";
import {
  MdOutlineFormatAlignCenter,
  MdOutlineSubdirectoryArrowRight,
} from "react-icons/md";
import { TbTextWrap } from "react-icons/tb";
import {
  LuAlignHorizontalJustifyStart,
  LuAlignVerticalJustifyEnd,
  LuAlignVerticalJustifyCenter,
} from "react-icons/lu";
import { CgArrowAlignH } from "react-icons/cg";
import { FaExclamationTriangle } from "react-icons/fa";

const FlexPropertiesManager = () => {
  const [displayType, setDisplayType] = useState("flex");
  const [flexSettings, setFlexSettings] = useState({
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "stretch",
    gapValue: 10,
    gapUnit: "px",
  });

  const flexProperties = [
    {
      key: "flexDirection",
      icon: <MdOutlineSubdirectoryArrowRight className="text-primary w-8 h-8" />,
      title: "Flex Direction",
      inpType: "select",
      inpSelect: true,
      selectValue: flexSettings.flexDirection,
      options: [
        { label: "row", value: "row" },
        { label: "row-reverse", value: "row-reverse" },
        { label: "column", value: "column" },
        { label: "column-reverse", value: "column-reverse" },
      ],
    },
    {
      key: "flexWrap",
      icon: <TbTextWrap className="text-primary w-8 h-8" />,
      title: "Flex Wrap",
      inpType: "select",
      inpSelect: true,
      selectValue: flexSettings.flexWrap,
      options: [
        { label: "nowrap", value: "nowrap" },
        { label: "wrap", value: "wrap" },
        { label: "wrap-reverse", value: "wrap-reverse" },
      ],
    },
    {
      key: "justifyContent",
      icon: <LuAlignHorizontalJustifyStart className="text-primary w-8 h-8" />,
      title: "Justify Content",
      inpType: "select",
      inpSelect: true,
      selectValue: flexSettings.justifyContent,
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
      key: "alignItems",
      icon: <LuAlignVerticalJustifyEnd className="text-primary w-8 h-8" />,
      title: "Align Items",
      inpType: "select",
      inpSelect: true,
      selectValue: flexSettings.alignItems,
      options: [
        { label: "stretch", value: "stretch" },
        { label: "flex-start", value: "flex-start" },
        { label: "flex-end", value: "flex-end" },
        { label: "center", value: "center" },
        { label: "baseline", value: "baseline" },
      ],
    },
    {
      key: "alignContent",
      icon: <LuAlignVerticalJustifyCenter className="text-primary w-8 h-8" />,
      title: "Align Content",
      inpType: "select",
      inpSelect: true,
      selectValue: flexSettings.alignContent,
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
      key: "gap",
      icon: <CgArrowAlignH className="text-primary w-8 h-8" />,
      title: "Gap",
      inpType: "number",
      inpSelect: true,
      inpValue: flexSettings.gapValue,
      selectValue: flexSettings.gapUnit,
      inpNum: true,
      inpOrder: 1,
      selectOrder: 2,
      options: [
        { label: "px", value: "px" },
        { label: "rem", value: "rem" },
        { label: "%", value: "%" },
      ],
      min: 0,
      max: 100,
      step: 1,
    },
  ];

  const handleDisplayChange = (newValue) => {
    setDisplayType(newValue);
  };

  return (
    <>
      <div className="mb-4 transition-all ease-out duration-500">
        <EditTabListItem
          key="display"
          icon={<MdOutlineFormatAlignCenter className="text-primary w-8 h-8" />}
          title="Display Type"
          inpSelect={true}
          inpType="select"
          selectValue={displayType}
          onSelectChange={handleDisplayChange}
          options={[
            { label: "Flex", value: "flex" },
            { label: "Block", value: "block" },
          ]}
        />
      </div>
      {displayType === "flex" ? (
        <div className="flex flex-col gap-6">
          {flexProperties.map((property) => (
            <EditTabListItem
              key={property.key}
              title={property.title}
              icon={property.icon}
              inpSelect={property.inpSelect}
              inpType={property.inpType}
              options={property.options}
              selectValue={property.selectValue}
              inpValue={property.inpValue}
              inpNum={property.inpNum}
              inpOrder={property.inpOrder}
              selectOrder={property.selectOrder}
              onSelectChange={(newValue) => {
                if (property.key === "gap") {
                  setFlexSettings((prev) => ({ ...prev, gapUnit: newValue }));
                } else {
                  setFlexSettings((prev) => ({ ...prev, [property.key]: newValue }));
                }
              }}
              onInpChange={
                property.key === "gap"
                  ? (newValue) =>
                      setFlexSettings((prev) => ({ ...prev, gapValue: newValue }))
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="p-4 bg-content custom-rounded-lg text-secondary flex items-center">
          <FaExclamationTriangle className="text-secondary w-16 h-16 mr-4" />
          Flex properties are hidden because display is set to block.
        </div>
      )}
      {/* JSON Output */}
      <div className="mt-6 p-4 bg-secondary text-primary custom-rounded-lg">
        <h2 className="text-lg font-bold">Current Flex Settings</h2>
        <pre className="overflow-auto">
          {JSON.stringify({ displayType, flexSettings }, null, 2)}
          </pre>
      </div>
    </>
  );
};

export default FlexPropertiesManager;
