// itemTabComponent.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FlexPropertiesManager from "../flexPropertiesManager";
import GridPropertiesManager from "../gridPropertiesManager";
import { useSelector, useDispatch } from "react-redux";
import ItemPropertiesManager from "./ItemPropertiesManager";
import { setSubItemsAllowed } from "../../../../../lib/store/reducers/settingsOptionsReducer/settingsOptionsReducer";

const ItemTabComponent = () => {
  const location = useLocation();
  const initialTotalItems = useSelector(
    (state) => state.settingsOptions.initialTotalItems
  );

  // **Update here:** read from subItemsAllowed instead of subItems
  const subItemsAllowed = useSelector(
    (state) => state.settingsOptions.subItemsAllowed
  );
  const dispatch = useDispatch();


  const selectedItem = useSelector((state) => state.settingsOptions.selectedItem);

  // Grid template states
  const [gridTemplateColumnsValue, setGridTemplateColumnsValue] =
    useState("1/1");
  const [gridTemplateRowsValue, setGridTemplateRowsValue] = useState("1/1");

  // Object to hold properties for each item
  const [itemProperties, setItemProperties] = useState({});

  // Toggle for showing container (parent) properties
  const [showItemsName, setShowItemsName] = useState(false);
  // Container type based on URL path ("grid" or "flex")
  const [localContainerType, setLocalContainerType] = useState(
    location.pathname === "/grid" ? "grid" : "flex"
  );

  // Order options for some properties (for example purposes)
  const orderOptions = [];
  for (let i = 0; i < initialTotalItems; i++) {
    orderOptions.push({
      label: i + 1,
      value: i + 1,
    });
  }

  // ------------------
  // Define property configurations for Flex and Grid
  // ------------------

  const flexItemProperties = [
    {
      key: "itemOrder",
      title: "Order",
      inpType: "select",
      inpSelect: true,
      // Both dropdown and input default to "auto"
      selectValue: "auto",
      inpValue: "auto",
      options: [{ label: "auto", value: "auto" }, ...orderOptions],
      optionsWrap: true,
      inpNum: false,
    },
    {
      key: "flexGrow",
      title: "Flex Grow",
      inpType: "number",
      inpNum: true,
      inpValue: 0,
    },
    {
      key: "flexShrink",
      title: "Flex Shrink",
      inpType: "number",
      inpNum: true,
      inpValue: 1,
    },
    {
      key: "flexBasis",
      title: "Flex Basis",
      inpType: "text",
      inpValue: "auto",
      inpNum: true,
      inpSelect: true,
      inpOrder: 1,
      selectOrder: 2,
      selectValue: "auto",
      options: [
        { label: "auto", value: "auto" },
        { label: "px", value: "px" },
        { label: "%", value: "%" },
      ],
      min: 0,
      max: 100,
      step: 1,
    },
    {
      key: "alignSelf",
      title: "Align Self",
      inpType: "select",
      inpSelect: true,
      selectValue: "auto",
      options: [
        { label: "auto", value: "auto" },
        { label: "flex-start", value: "flex-start" },
        { label: "flex-end", value: "flex-end" },
        { label: "center", value: "center" },
        { label: "baseline", value: "baseline" },
        { label: "stretch", value: "stretch" },
      ],
    },
    {
      key: "itemWidth",
      title: "Width",
      inpType: "number",
      inpSelect: true,
      inpValue: 0,
      selectValue: "auto",
      inpNum: true,
      inpOrder: 1,
      selectOrder: 2,
      options: [
        { label: "auto", value: "auto" },
        { label: "px", value: "px" },
        { label: "%", value: "%" },
      ],
      min: 0,
      max: 100,
      step: 1,
    },
    {
      key: "itemHeight",
      title: "Height",
      inpType: "number",
      inpSelect: true,
      inpValue: 0,
      selectValue: "auto",
      inpNum: true,
      inpOrder: 1,
      selectOrder: 2,
      options: [
        { label: "auto", value: "auto" },
        { label: "px", value: "px" },
        { label: "%", value: "%" },
      ],
      min: 0,
      max: 100,
      step: 1,
    },
  ];

  const gridTemplateColumnsOptions = [
    { value: "col-1", label: "Grid Column Start", numInput: 1 },
    { value: "col-2", label: "Grid Column End", numInput: 1 },
  ];
  const gridTemplateRowsOptions = [
    { value: "row-1", label: "Grid Row Start", numInput: 1 },
    { value: "row-2", label: "Grid Row End", numInput: 1 },
  ];
  const gridItemProperties = [
    {
      key: "justifySelf",
      title: "Justify Self",
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
      key: "alignSelf",
      title: "Align Self",
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
      key: "itemWidth",
      title: "Width",
      inpType: "number",
      inpSelect: true,
      inpValue: 0,
      selectValue: "auto",
      inpNum: true,
      inpOrder: 1,
      selectOrder: 2,
      options: [
        { label: "auto", value: "auto" },
        { label: "px", value: "px" },
        { label: "%", value: "%" },
      ],
      min: 0,
      step: 1,
    },
    {
      key: "itemHeight",
      title: "Height",
      inpType: "number",
      inpSelect: true,
      selectValue: "auto",
      inpNum: true,
      inpValue: 0,
      inpOrder: 1,
      selectOrder: 2,
      options: [
        { label: "auto", value: "auto" },
        { label: "px", value: "px" },
        { label: "%", value: "%" },
      ],
      min: 0,
      step: 1,
    },
  ];

  // Choose the proper set of properties based on container type
  const propertiesOptions =
    localContainerType === "grid" ? gridItemProperties : flexItemProperties;

  // ---------------------------------------------------------
  // Update handler – note we add a third parameter to indicate
  // whether the change came from the dropdown ("select") or input ("inp")
  // ---------------------------------------------------------
  const handlePropertyChange = (key, value, type) => {
    setItemProperties((prev) => ({
      ...prev,
      [selectedItem]: {
        ...prev[selectedItem],
        [key + (type === "select" ? "_select" : "_inp")]: value,
      },
    }));
  };

  // ---------------------------------------------------------
  // Pre-populate default values for the currently selected item
  // so the JSON output shows the initial values.
  // ---------------------------------------------------------
  useEffect(() => {
    if (selectedItem !== null && !itemProperties[selectedItem]) {
      const defaults = {};
      propertiesOptions.forEach((prop) => {
        defaults[prop.key + "_inp"] = prop.inpValue;
        defaults[prop.key + "_select"] = prop.selectValue;
      });
      setItemProperties((prev) => ({
        ...prev,
        [selectedItem]: defaults,
      }));
    }
  }, [selectedItem, propertiesOptions, itemProperties]);

  // ---------------------------------------------------------
  // Generate plain CSS for the currently selected item's properties.
  // The mappings here are basic and assume that:
  // - For flex items, keys ending with "_inp" and "_select" combine to form values.
  // - For grid items, a similar approach is used.
  // ---------------------------------------------------------
  const generateItemCSS = () => {
    const props = itemProperties[selectedItem];
    if (!props) return "";
    let css = "";
    if (localContainerType === "flex") {
      css += `order: ${props.itemOrder_select || "auto"};\n`;
      css += `flex-grow: ${props.flexGrow_inp};\n`;
      css += `flex-shrink: ${props.flexShrink_inp};\n`;
      const flexBasis =
        props.flexBasis_select === "auto"
          ? "auto"
          : `${props.flexBasis_inp}${props.flexBasis_select}`;
      css += `flex-basis: ${flexBasis};\n`;
      css += `align-self: ${props.alignSelf_select};\n`;
      const width =
        props.itemWidth_select === "auto"
          ? "auto"
          : `${props.itemWidth_inp}${props.itemWidth_select}`;
      css += `width: ${width};\n`;
      const height =
        props.itemHeight_select === "auto"
          ? "auto"
          : `${props.itemHeight_inp}${props.itemHeight_select}`;
      css += `height: ${height};\n`;
    } else {
      css += `justify-self: ${props.justifySelf_select};\n`;
      css += `align-self: ${props.alignSelf_select};\n`;
      const width =
        props.itemWidth_select === "auto"
          ? "auto"
          : `${props.itemWidth_inp}${props.itemWidth_select}`;
      css += `width: ${width};\n`;
      const height =
        props.itemHeight_select === "auto"
          ? "auto"
          : `${props.itemHeight_inp}${props.itemHeight_select}`;
      css += `height: ${height};\n`;
    }
    return css;
  };

  // ---------------------------------------------------------
  // Generate Tailwind CSS classes for the currently selected item.
  // Adjust the mappings as needed.
  // ---------------------------------------------------------
  const generateItemTailwindClasses = () => {
    const props = itemProperties[selectedItem];
    if (!props) return "";
    let classes = "";
    if (localContainerType === "flex") {
      // Order
      if (props.itemOrder_select && props.itemOrder_select !== "auto") {
        classes += `order-${props.itemOrder_select} `;
      }
      // Flex Grow – Tailwind’s default "grow" applies when flex-grow is 1.
      if (props.flexGrow_inp > 0) {
        classes += props.flexGrow_inp === 1
          ? "grow "
          : `grow-[${props.flexGrow_inp}] `;
      }
      // Flex Shrink (using an arbitrary value)
      classes += `shrink-[${props.flexShrink_inp}] `;
      // Flex Basis
      const basis =
        props.flexBasis_select === "auto"
          ? "auto"
          : `${props.flexBasis_inp}${props.flexBasis_select}`;
      classes += basis === "auto"
        ? "basis-auto "
        : `basis-[${basis}] `;
      // Align Self mapping
      const alignSelfMap = {
        auto: "self-auto",
        "flex-start": "self-start",
        "flex-end": "self-end",
        center: "self-center",
        baseline: "self-baseline",
        stretch: "self-stretch",
      };
      if (alignSelfMap[props.alignSelf_select]) {
        classes += `${alignSelfMap[props.alignSelf_select]} `;
      }
      // Width and Height
      const width =
        props.itemWidth_select === "auto"
          ? "auto"
          : `${props.itemWidth_inp}${props.itemWidth_select}`;
      if (width !== "auto") {
        classes += `w-[${width}] `;
      }else{
        classes += `w-auto `;
      }
      const height =
        props.itemHeight_select === "auto"
          ? "auto"
          : `${props.itemHeight_inp}${props.itemHeight_select}`;
      if (height !== "auto") {
        classes += `h-[${height}] `;
      }else{
        classes += `h-auto `;
      }
    } else {
      // For grid items
      const justifySelfMap = {
        start: "justify-self-start",
        end: "justify-self-end",
        center: "justify-self-center",
        stretch: "justify-self-stretch",
      };
      if (justifySelfMap[props.justifySelf_select]) {
        classes += `${justifySelfMap[props.justifySelf_select]} `;
      }
      const alignSelfMap = {
        start: "self-start",
        end: "self-end",
        center: "self-center",
        stretch: "self-stretch",
      };
      if (alignSelfMap[props.alignSelf_select]) {
        classes += `${alignSelfMap[props.alignSelf_select]} `;
      }
      const width =
        props.itemWidth_select === "auto"
          ? "auto"
          : `${props.itemWidth_inp}${props.itemWidth_select}`;
      if (width !== "auto") {
        classes += `w-[${width}] `;
      }else{
        classes += `w-auto `;
      }
      const height =
        props.itemHeight_select === "auto"
          ? "auto"
          : `${props.itemHeight_inp}${props.itemHeight_select}`;
      if (height !== "auto") {
        classes += `h-[${height}] `;
      }else{
        classes += `h-auto `;
      }
    }
    return classes.trim();
  };

  return (
    <div className="item-tab-component">
      {/* Top header with title and a toggle for container (parent) properties */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">
          {localContainerType === "grid" ? "Grid" : "Flex"} Sub Container
        </h2>
        <span className="flex items-center justify-end w-1/2">
          <label
            htmlFor="subItemsAllowed"
            className="relative inline-block w-16 h-8 cursor-pointer"
          >
            <input
              type="checkbox"
              id="subItemsAllowed"
              className="sr-only peer"
              checked={subItemsAllowed }
              onChange={() => dispatch(setSubItemsAllowed(!subItemsAllowed))}
            />
            <div className="w-full h-full rounded-full bg-gray-300 peer-focus:ring-0 transition-colors duration-300 bg-[var(--text-secondary)] peer-checked:bg-[var(--color-primary)]"></div>
            <span className="absolute left-0.5 top-0.5 h-7 w-7 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-8"></span>
          </label>
        </span>
      </div>

      {/* Optionally render parent/container properties */}
      {subItemsAllowed && (
        <div className="parent-properties mb-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">
            Container Properties
          </h3>
          <div className="flex gap-2 mb-4">
            <div className="flex flex-row gap-4 w-full p-2 rounded-2xl bg-container text-secondary transition-all ease-out duration-500">
              <div
                className={`w-1/2 py-3 text-center font-bold flex justify-center items-center cursor-pointer transition-all ease-out duration-500 rounded-2xl p-3 ${
                  localContainerType === "flex"
                    ? "bg-icon text-white"
                    : "bg-transparent"
                }`}
                onClick={() => setLocalContainerType("flex")}
              >
                Flex
              </div>
              <div
                className={`w-1/2 py-3 text-center font-bold flex justify-center items-center cursor-pointer transition-all ease-out duration-500 rounded-2xl p-3 ${
                  localContainerType === "grid"
                    ? "bg-icon text-white"
                    : "bg-transparent"
                }`}
                onClick={() => setLocalContainerType("grid")}
              >
                Grid
              </div>
            </div>
          </div>
          <div className="container-properties-manager">
            {localContainerType === "grid" ? (
              <GridPropertiesManager />
            ) : (
              <FlexPropertiesManager
                extra={localContainerType === "flex3"}
              />
            )}
          </div>
        </div>
      )}

      <div className="container_outer flex flex-col mb-6">
       

        <ItemPropertiesManager
          selectedItem={selectedItem}
          itemProperties={itemProperties}
          handlePropertyChange={handlePropertyChange}
          localContainerType={localContainerType}
          gridTemplateColumnsValue={gridTemplateColumnsValue}
          setGridTemplateColumnsValue={setGridTemplateColumnsValue}
          gridTemplateRowsValue={gridTemplateRowsValue}
          setGridTemplateRowsValue={setGridTemplateRowsValue}
          propertiesOptions={propertiesOptions}
          gridTemplateColumnsOptions={gridTemplateColumnsOptions}
          gridTemplateRowsOptions={gridTemplateRowsOptions}
        />
      
      </div>

      {/* Generated CSS for the currently selected item */}
      <div className="mt-6 p-4 bg-secondary text-primary custom-rounded-lg">
        <h2 className="text-lg font-bold">Generated Item CSS</h2>
        <pre className="overflow-auto whitespace-pre-wrap">
          {generateItemCSS()}
        </pre>
      </div>

      {/* Generated Tailwind CSS classes for the currently selected item */}
      <div className="mt-6 p-4 bg-secondary text-primary custom-rounded-lg">
        <h2 className="text-lg font-bold">
          Generated Item Tailwind Classes
        </h2>
        <pre className="overflow-auto whitespace-pre-wrap">
          {generateItemTailwindClasses()}
        </pre>
      </div>
    </div>
  );
};

export default ItemTabComponent;
