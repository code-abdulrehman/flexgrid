// itemTabComponent.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import EditTabListItem from "../editTabListItem";
import FlexPropertiesManager from "../flexPropertiesManager";
import GridPropertiesManager from "../gridPropertiesManager";
import { MdViewColumn, MdViewStream } from "react-icons/md";
import { useSelector } from "react-redux";

const ItemTabComponent = () => {
  const location = useLocation();
  const initialTotalItems = useSelector(state => state.settingsOptions.initialTotalItems);
  const selectedItem = useSelector(state => state.settingsOptions.selectedItem);
  // If the pathname is "/grid" use grid, otherwise default to flex.
  const containerType = location.pathname === "/grid" ? "grid" : "flex";
  const [gridTemplateColumnsValue, setGridTemplateColumnsValue] = useState("1/1");
  const [gridTemplateRowsValue, setGridTemplateRowsValue] = useState("1/1");

  // Local states for selected item and its properties.
  const [itemProperties, setItemProperties] = useState({});

  // Toggle state: if true, show (and allow editing of) the container (parent) properties.
  const [showItemsName, setShowItemsName] = useState(false);
  // Local container type state that you can change with buttons.
  const [localContainerType, setLocalContainerType] = useState(location.pathname === "/grid" ? "grid" : "flex");

  // --- Children (item) properties definitions ---

  const orderOptions = [];
  for (let i = 0; i < initialTotalItems; i++) {
    orderOptions.push({
      label: i+1,
      value: i+1,
    });
  } 
  // Flex container item properties.
  const flexItemProperties = [
    {
      key: "itemOrder",
      title: "Order",
      inpType: "select",
      inpSelect: true,
      selectValue: "auto",
      options: [
        { label: "auto", value: "auto" },
        ...orderOptions,
      ],
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
      // No inpNum or inpSelect flag so a text input will be used (fallback)
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

  // Grid container item properties.
  // --- Options for Advanced Dropdowns ---
  const gridTemplateColumnsOptions = [
    {
      value: "col-1",
      label: "Grid Column Start",
      numInput: 1,
    },
    {
      value: "col-2",
      label: "Grid Column End",
      numInput: 1,
    },
    // Add additional columns as needed.
  ];
  const gridTemplateRowsOptions = [
    {
      value: "row-1",
      label: "Grid Row Start",
      numInput: 1,
    },
    {
      value: "row-2",
      label: "Grid Row End",
      numInput: 1,
    },
    // Add additional columns as needed.
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

  // Choose which set of properties to render for the child items.
  const propertiesOptions =
    localContainerType === "grid" ? gridItemProperties : flexItemProperties;

  // Handler to update a property for the selected item.
  const handlePropertyChange = (key, value) => {
    if (selectedItem === null) return;
    setItemProperties((prev) => ({
      ...prev,
      [selectedItem]: {
        ...prev[selectedItem],
        [key]: value,
      },
    }));
  };

  // Example items (for demonstration).
  const items = [0, 1, 2];

  return (
    <div className="item-tab-component p-4">
      {/* --- Top header: title and toggle --- */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">
          {localContainerType === "grid" ? "Grid" : "Flex"} Sub Container
        </h2>
        {/* Custom Toggle */}
        <span className="flex items-center justify-end w-1/2">
          <label htmlFor="showItemsName" className="relative inline-block w-16 h-8 cursor-pointer">
            <input
              type="checkbox"
              id="showItemsName"
              className="sr-only peer"
              checked={showItemsName}
              onChange={() => setShowItemsName(!showItemsName)}
            />
            {/* Toggle Track */}
            <div
              className="w-full h-full rounded-full bg-gray-300
                         peer-focus:ring-0 transition-colors duration-300
                         bg-[var(--text-secondary)]
                         peer-checked:bg-[var(--color-primary)]"
            ></div>
            {/* Toggle Knob */}
            <span
              className="absolute left-0.5 top-0.5 h-7 w-7 inset-t-box-shadow bg-white rounded-full 
                         transition-transform duration-300 
                         peer-checked:translate-x-8"
            ></span>
          </label>
        </span>
      </div>

      {/* --- If toggle is on: render container (parent) properties editor --- */}
      {showItemsName && (
        <div className="parent-properties mb-6 border p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Container Properties</h3>
          {/* Container display mode options */}
          <div className="flex gap-2 mb-4">
            <div className="flex flex-row gap-4 w-full p-2 gap-2 rounded-2xl bg-container text-secondary transition-all ease-out duration-500">
              <div className={`w-1/2 py-3 text-center font-bold flex justify-center items-center cursor-pointer transition-all ease-out duration-500 rounded-2xl p-3 ${localContainerType === "flex" ? "bg-icon text-white" : "bg-transparent"}`} onClick={() => setLocalContainerType("flex")}> Flex</div>
              <div className={`w-1/2 py-3 text-center font-bold flex justify-center items-center cursor-pointer transition-all ease-out duration-500 rounded-2xl p-3 ${localContainerType === "grid" ? "bg-icon text-white" : "bg-transparent"}`} onClick={() => setLocalContainerType("grid")}> Grid</div>
            </div>

          </div>
          {/* Render the full container properties editor */}
          <div className="container-properties-manager">
            {localContainerType === "grid" ? (
              <GridPropertiesManager />
            ) : (
              <FlexPropertiesManager extra={localContainerType === "flex3"} />
            )}
          </div>
        </div>
      )}

      {/* --- Always render the container with its child items --- */}
      <div className={`container_outer flex flex-col border p-4 mb-6`}>
        {/* Render the child items */}
        <div className="grid-container">
              {items.map((item) => (
                <div
                  key={item}
                  className={`item border p-2 m-2 cursor-pointer ${selectedItem === item ? "bg-blue-200" : "bg-gray-100"
                    }`}
                  onClick={() => setSelectedItem(item)}
                  style={itemProperties[item] || {}}
                >
                  Item {item + 1}
                </div>
              ))}
            </div>

            {/* --- Properties editor for the selected child (item) --- */}
            <div className="item-properties">
              {selectedItem !== null ? (
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Properties for Item {selectedItem + 1}
                  </h3>
                          {/* Render the grid template columns and rows dropdowns if the container is a grid */}
        {localContainerType === "grid" && (
          <div className="flex flex-col gap-4 mb-4">
            {/* Advanced dropdown for Grid Template Columns */}
            <EditTabListItem
              key="gridTemplateColumns"
              title="Grid Template Columns"
              icon={<MdViewColumn className="text-primary w-8 h-8" />}
              inpSelect={true}
              inpType="select"
              selectValue={gridTemplateColumnsValue}
              options={gridTemplateColumnsOptions}
              allowCross={false}
              allowAdd={false}
              subOptionsAllow={false}
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
              allowCross={false}
              allowAdd={false}
              subOptionsAllow={false}
              gridProperties={true}
              onSelectChange={(val) => {
                setGridTemplateRowsValue(val);
              }}
            />
          </div>
        )}

                  <div className="space-y-4">
                    {propertiesOptions.map((prop) => (
                      <EditTabListItem
                        key={prop.key}
                        title={prop.title}
                        inpType={prop.inpType}
                        inpSelect={prop.inpSelect}
                        optionsWrap={prop.optionsWrap}
                        inpNum={selectedItem === 'auto' ? false : prop.inpNum}
                        inpOrder={prop.inpOrder}
                        selectOrder={prop.selectOrder}
                        // The fallback value is either the stored value or the default defined in the property.
                        inpValue={
                          (itemProperties[selectedItem] &&
                            itemProperties[selectedItem][prop.key]) ||
                          prop.inpValue ||
                          ""
                        }
                        selectValue={prop.selectValue}
                        options={prop.options}
                        onSelectChange={(value) => handlePropertyChange(prop.key, value)}
                        onInpChange={(value) => handlePropertyChange(prop.key, value)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
                  <p>Please click on an item above to edit its properties.</p>
                </div>
              )}
            </div>

            {/* --- Debug / JSON output --- */}
            <div className="mt-6 p-4 bg-gray-200 text-gray-800 rounded">
              <h3 className="font-semibold">Current Item Properties</h3>
              <pre className="overflow-auto">{JSON.stringify(itemProperties, null, 2)}</pre>
            </div>
          </div>
        </div>
  );
};

export default ItemTabComponent;