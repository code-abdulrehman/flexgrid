import React from "react";

const HideableSidebar = ({ sidebarVisible }) => {
  return (
    <div className={`w-[450px] bg-secondary h-full custom-rounded-lg transition-[width] ease-in-out duration-500 shadow-lg ${sidebarVisible ? "block" : "hidden"}`}>
      <div>w</div>
    </div>
  );
};

export default HideableSidebar;
