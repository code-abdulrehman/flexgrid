// ItemPropertiesManager.jsx
import React from "react";
import EditTabListItem from "../editTabListItem";
import { MdViewColumn, MdViewStream } from "react-icons/md";

const ItemPropertiesManager = ({
  selectedItem,
  itemProperties,
  handlePropertyChange,
  localContainerType,
  gridTemplateColumnsValue,
  setGridTemplateColumnsValue,
  gridTemplateRowsValue,
  setGridTemplateRowsValue,
  propertiesOptions,
  gridTemplateColumnsOptions,
  gridTemplateRowsOptions,
}) => {
  return (
    <div className="item-properties">
      {selectedItem !== null ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Properties for Item [{selectedItem ? selectedItem.join(",") : "none"}]
          </h3>

          {/* Render grid-specific dropdowns if needed */}
          {localContainerType === "grid" && (
            <div className="flex flex-col gap-4 mb-4">
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
                onSelectChange={(val) => setGridTemplateColumnsValue(val)}
              />

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
                onSelectChange={(val) => setGridTemplateRowsValue(val)}
              />
            </div>
          )}

          {/* Render the item properties */}
          <div className="space-y-4">
            {propertiesOptions.map((prop) => {
              // Compute the effective dropdown value:
              const effectiveSelectValue =
                (itemProperties[selectedItem] &&
                  itemProperties[selectedItem][prop.key + "_select"]) ||
                prop.selectValue;
              return (
                <EditTabListItem
                  key={prop.key}
                  title={prop.title}
                  inpType={prop.inpType}
                  inpSelect={prop.inpSelect}
                  optionsWrap={prop.optionsWrap}
                  // If the effective dropdown value is "auto", do not render the numeric input
                  inpNum={effectiveSelectValue === "auto" ? false : prop.inpNum}
                  inpOrder={prop.inpOrder}
                  selectOrder={prop.selectOrder}
                  // For the number input value, look for the stored value (or fall back to the default)
                  inpValue={
                    (itemProperties[selectedItem] &&
                      itemProperties[selectedItem][prop.key + "_inp"]) ||
                    prop.inpValue ||
                    ""
                  }
                  // For the dropdown value, use the effective value computed above
                  selectValue={effectiveSelectValue}
                  options={prop.options}
                  onSelectChange={(value) =>
                    handlePropertyChange(prop.key, value, "select")
                  }
                  onInpChange={(value) =>
                    handlePropertyChange(prop.key, value, "inp")
                  }
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
          <p>Please click on an item above to edit its properties.</p>
        </div>
      )}
    </div>
  );
};

export default ItemPropertiesManager;
