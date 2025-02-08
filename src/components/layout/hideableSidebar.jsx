import React from "react";

const HideableSidebar = ({ sidebarVisible, className }) => {
  return (
    <div className={`${className} md:w-[38.5rem] w-full bg-secondary h-full custom-rounded-lg transition-[width] ease-in-out duration-500 shadow-lg ${sidebarVisible ? "block" : "hidden"}`}>
      <div>w</div>
    </div>
  );
};

export default HideableSidebar;
