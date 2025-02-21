import React, { useState, useEffect } from "react";
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
import { CgArrowAlignH, CgScrollV } from "react-icons/cg";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setOutputCode, setTotalItems, setTotalSubItems, setTotalSubContainers, setTotalContainers, setSelectedItem, setSelectedSubItem, setSelectedSubContainer, setSelectedContainer } from "../../../../lib/store/reducers/outputCodeReducer/outputCodeReducer";

const FlexPropertiesManager = () => {
  const dispatch = useDispatch();
  const [displayType, setDisplayType] = useState("flex");

  const [flexSettings, setFlexSettings] = useState({
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "stretch",
    gapValue: 10,
    gapUnit: "px",
    overflow: "auto",
  }); 

  const flexProperties = [
    {
      key: "flexDirection",
      icon: <MdOutlineSubdirectoryArrowRight className="text-primary" />,
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
      icon: <TbTextWrap className="text-primary" />,
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
      icon: <LuAlignHorizontalJustifyStart className="text-primary" />,
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
      icon: <LuAlignVerticalJustifyEnd className="text-primary" />,
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
      icon: <LuAlignVerticalJustifyCenter className="text-primary" />,
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
      icon: <CgArrowAlignH className="text-primary" />,
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
    {
      key: "overflow",
      icon: <CgScrollV className="text-primary" />,
      title: "Overflow",
      inpType: "select",
      inpSelect: true,
      selectValue: flexSettings.overflow,
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

  // Generate plain CSS based on current flex settings
  const generateCSS = () => {
    let css = `display: ${displayType};\n`;
    if (displayType === "flex") {
      css += `flex-direction: ${flexSettings.flexDirection};\n`;
      css += `flex-wrap: ${flexSettings.flexWrap};\n`;
      css += `justify-content: ${flexSettings.justifyContent};\n`;
      css += `align-items: ${flexSettings.alignItems};\n`;
      css += `align-content: ${flexSettings.alignContent};\n`;
      css += `gap: ${flexSettings.gapValue}${flexSettings.gapUnit};\n`;
      css += `${(flexSettings.overflow === "x-auto" ? "overflow-x" : flexSettings.overflow === "y-auto" ? "overflow-y" : "overflow")}: ${(flexSettings.overflow === "x-auto" || flexSettings.overflow === "y-auto") ? "auto" : flexSettings.overflow};\n`;
    }
    return css;
  };

  // Generate Tailwind CSS classes from flex settings.
  const generateTailwindClasses = () => {
    let classes = "";
    if (displayType === "flex") {
      classes += "flex ";

      // flex-direction
      switch (flexSettings.flexDirection) {
        case "row":
          classes += "flex-row ";
          break;
        case "row-reverse":
          classes += "flex-row-reverse ";
          break;
        case "column":
          classes += "flex-col ";
          break;
        case "column-reverse":
          classes += "flex-col-reverse ";
          break;
        default:
          break;
      }

      // flex-wrap
      switch (flexSettings.flexWrap) {
        case "nowrap":
          classes += "flex-nowrap ";
          break;
        case "wrap":
          classes += "flex-wrap ";
          break;
        case "wrap-reverse":
          classes += "flex-wrap-reverse ";
          break;
        default:
          break;
      }

      // justify-content
      switch (flexSettings.justifyContent) {
        case "flex-start":
          classes += "justify-start ";
          break;
        case "flex-end":
          classes += "justify-end ";
          break;
        case "center":
          classes += "justify-center ";
          break;
        case "space-between":
          classes += "justify-between ";
          break;
        case "space-around":
          classes += "justify-around ";
          break;
        case "space-evenly":
          classes += "justify-evenly ";
          break;
        default:
          break;
      }

      // align-items
      switch (flexSettings.alignItems) {
        case "stretch":
          classes += "items-stretch ";
          break;
        case "flex-start":
          classes += "items-start ";
          break;
        case "flex-end":
          classes += "items-end ";
          break;
        case "center":
          classes += "items-center ";
          break;
        case "baseline":
          classes += "items-baseline ";
          break;
        default:
          break;
      }

      // align-content
      switch (flexSettings.alignContent) {
        case "stretch":
          classes += "content-stretch ";
          break;
        case "flex-start":
          classes += "content-start ";
          break;
        case "flex-end":
          classes += "content-end ";
          break;
        case "center":
          classes += "content-center ";
          break;
        case "space-between":
          classes += "content-between ";
          break;
        case "space-around":
          classes += "content-around ";
          break;
        default:
          break;
      }

      // gap using Tailwind's arbitrary value syntax
      classes += `gap-[${flexSettings.gapValue}${flexSettings.gapUnit}] `;

      // overflow
      classes += `overflow-${flexSettings.overflow} `;
    } else if (displayType === "block") {
      classes += "block ";
    }
    return classes.trim();
  };

  const handleOutputCode = () => {
    dispatch(setOutputCode({
      container: {
        name: "container",
        type: "container",
        css: generateCSS(),
        tailwind: generateTailwindClasses(),
      },
    }));
  };

  useEffect(() => {
    handleOutputCode();
  }, [displayType, flexSettings, flexSettings.gapValue, flexSettings.gapUnit, flexSettings.overflow, flexSettings.flexDirection, flexSettings.flexWrap, flexSettings.justifyContent, flexSettings.alignItems, flexSettings.alignContent]);

  return (
    <>
      {/* Display Type Selector */}
      <div className="mb-2 transition-all ease-out duration-500">
        <EditTabListItem
          key="display"
          icon={<MdOutlineFormatAlignCenter className="text-primary" />}
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
        <div className="flex flex-col gap-4">
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
                  setFlexSettings((prev) => ({
                    ...prev,
                    gapUnit: newValue,
                  }));
                } else {
                  setFlexSettings((prev) => ({
                    ...prev,
                    [property.key]: newValue,
                  }));
                }
              }}
              onInpChange={
                property.key === "gap"
                  ? (newValue) =>
                      setFlexSettings((prev) => ({
                        ...prev,
                        gapValue: newValue,
                      }))
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

      {/* Output the generated CSS */}
      <div className="mt-6 p-4 bg-secondary text-primary custom-rounded-lg">
        <h2 className="text-lg font-bold">Generated CSS</h2>
        <pre className="overflow-auto whitespace-pre-wrap">
          {generateCSS()}
        </pre>
      </div>

      {/* Output the generated Tailwind CSS classes */}
      <div className="mt-6 p-4 bg-secondary text-primary custom-rounded-lg">
        <h2 className="text-lg font-bold">Generated Tailwind Classes</h2>
        <pre className="overflow-auto whitespace-pre-wrap">
          {generateTailwindClasses()}
        </pre>
      </div>
    </>
  );
};

export default FlexPropertiesManager;
