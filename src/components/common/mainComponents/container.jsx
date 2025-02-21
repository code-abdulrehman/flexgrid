import React, { useState, useEffect } from "react";
import Item from "./item";
import { useDispatch, useSelector } from "react-redux";  
import { setSelectedItem } from "../../../lib/store/reducers/settingsOptionsReducer/settingsOptionsReducer";

const Container = ({ display = "flex", gap = "10", className, styles }) => {
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.outputCode.totalItems) || 4;
  const multipleSelection = useSelector(state => state.settingsOptions.multipleSelection);

  // Always use an array to store selected item(s). 
  // By default, select the first item (index 0).
  const [selectedItemState, setSelectedItemState] = useState([0]);

  const handleItemClick = (index) => {
    console.log("Item clicked:", index);
    if (multipleSelection) {
      // Toggle the selection of the clicked item
      if (selectedItemState.includes(index)) {
        const newSelected = selectedItemState.filter(i => i !== index);
        setSelectedItemState(newSelected);
        dispatch(setSelectedItem([...newSelected]));
      } else {
        const newSelected = [...selectedItemState, index];
        setSelectedItemState(newSelected);
        dispatch(setSelectedItem([...newSelected]));
      }
    } else {
      // In single-selection mode, we always store the selected item in an array
        setSelectedItemState([index]);
        dispatch(setSelectedItem([index]));
    }
  };

  const [items, setItems] = useState(
    Array.from({ length: totalItems }, (_, index) => ({
      id: index,
      name: index + 1,
      icon: "🔍",
    }))
  );
  
  useEffect(() => {
    setItems(
      Array.from({ length: totalItems }, (_, index) => ({
        id: index,
        name: index + 1,
        icon: "🔍",
      }))
    );
  }, [totalItems]);
  

  const containerStyle = {
    // display: display,   // "flex", "grid", or "block"
    // gap: `${gap}px`,
  };

  return (
    <div className={className} style={styles}>
      {items.map((item, index) => (
        <Item 
          key={item.id}
          name={item.name} 
          index={index} 
          selected={selectedItemState.includes(index)} 
          onClick={() => handleItemClick(index)}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Container;
