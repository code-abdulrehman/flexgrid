import React from "react";
import Item from "./item";
const Container = ({display="flex", gap="10", className}) => {
   const displayClass = display === "flex" ? "flex" : display === "grid" ? "grid" : display === "block" ? "block" : "";

   const items = [
      {
         name: "Item 1",
         icon: "🔍",
         children: <div>Item 1</div>,
         selected: true
      },
      {
         name: "Item 2",
         icon: "🔍",
         children: <div>Item 2</div>
      }
   ]
   return (
   <div className={`${displayClass} gap-${gap} ${className}`}>
      {items.map((item, index) => (
         <Item name={item.name} icon={item.icon} index={index} selected={item.selected} />
      ))}
   </div>
   )
};

export default Container;