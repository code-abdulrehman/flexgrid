import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EditTabListItem from "../common/editTabComponents/editTabListItem";
import FlexPropertiesManager from "../common/editTabComponents/flexPropertiesManager";
import GridPropertiesManager from "../common/editTabComponents/gridPropertiesManager";
import SaveInput from "../common/saveTabComponents/saveInput";
import SavedItem from "../common/saveTabComponents/savedItem";
import LayoutItem from "../common/layoutsTabComponents/layoutItem";
import { FaColumns } from "react-icons/fa";
import ThemeBox from "../common/settingsTabComponents/themeBox";
import SettingsBox from "../common/settingsTabComponents/settingsBox";
import CustomDropdown from "../common/customDropdown";
const HideableSidebar = ({ sidebarVisible, className }) => {

  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location.hash);
  const [currentTab, setCurrentTab] = useState("container");

  useEffect(() => {
    setCurrentLocation(location.hash);
    console.log(currentLocation, "currentLocation");
  }, [location.hash]);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  }
  return (
    <div className={`${className} md:min-w-[38.5rem] md:max-w-[42.5rem] w-full bg-secondary h-full custom-rounded-lg transition-[width] ease-in-out duration-500 shadow-lg p-6 overflow-y-auto ${sidebarVisible ? "block" : "hidden"}`}>

      <div className="p-4">
        {currentLocation === "#pen" && (
          <div className="flex flex-col gap-4 py-2 transition-all duration-300 ease-in-out">
            <div className="flex flex-row gap-4 w-full p-2 gap-2 custom-rounded-lg bg-container text-secondary">
              <div className={`w-1/2 py-4 text-center font-bold flex justify-center items-center cursor-pointer rounded-3xl p-4 ${currentTab === "container" ? "bg-icon text-white" : "bg-transparent"}`} onClick={() => handleTabClick("container")}> Container</div>
              <div className={`w-1/2 py-4 text-center font-bold flex justify-center items-center cursor-pointer rounded-3xl p-4 ${currentTab === "items" ? "bg-icon text-white" : "bg-transparent"}`} onClick={() => handleTabClick("items")}> Item</div>
            </div>


            {(currentTab === "container" && location.pathname === "/flex") && (
              <div className="flex flex-col gap-2 mt-6">
                <FlexPropertiesManager />
              </div>
            )}

            {(currentTab === "container" && location.pathname === "/grid") && (
              <div className="flex flex-col gap-2 mt-6">
                <GridPropertiesManager />
              </div>
            )}

            {currentTab === "items" && (
              <div className="flex flex-col gap-2 mt-6">
                <EditTabListItem selectOrder="2" inpOrder="1" inpSelect={true} inpNum={false} />
              </div>
            )}

          </div>
        )}

        {currentLocation === "#save" && (
          <div className="flex flex-col gap-2 mt-4">
            <SaveInput />
            <div className="flex flex-col gap-2 mt-6">

              <h3 className="text-secondary font-bold text-2xl text-center uppercase mb-4">Saved Edits</h3>
              <SavedItem name="Name" value="Value" date={new Date()} />
            </div>
            <button className="bg-danger text-contrast px-4 py-2 rounded-lg w-52 font-semibold text-center mt-4">Clear All</button>
          </div>
        )}

        {currentLocation === "#layout" && (
          <div>
            <div className="flex flex-col gap-2 mt-4">

              <h3 className="text-secondary font-bold text-2xl text-center uppercase mb-4">Layouts</h3>
              <LayoutItem data={[{ name: "Layout 1", icon: <FaColumns /> }, { name: "Layout 2", icon: <FaColumns /> }, { name: "Layout 3", icon: <FaColumns /> }, { name: "Layout 4", icon: <FaColumns /> }, { name: "Layout 5", icon: <FaColumns /> }, { name: "Layout 6", icon: <FaColumns /> }, { name: "Layout 7", icon: <FaColumns /> }, { name: "Layout 8", icon: <FaColumns /> }, { name: "Layout 9", icon: <FaColumns /> }, { name: "Layout 10", icon: <FaColumns /> }]} />
            </div>
          </div>
        )}

        {currentLocation === "#settings" && (
          <div>
            <div className="flex flex-col gap-2 mt-4">
              <h3 className="text-secondary font-bold text-2xl text-center uppercase mb-4">Settings</h3>
              <div className="flex flex-col gap-6">
                <ThemeBox />
                <SettingsBox />
              </div>

              <button className="bg-danger text-contrast px-4 py-2 rounded-lg w-52 font-semibold text-center mt-4">Reset All</button>
            </div>
          </div>
        )}

        {currentLocation === "#code" && (
          <div>code</div>
        )}

      </div>
    </div>
  );
};

export default HideableSidebar;
