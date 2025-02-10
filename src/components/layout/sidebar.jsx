import React, { useState } from "react";
import { HiCode, HiOutlinePencil } from "react-icons/hi";
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";

import { FaRegQuestionCircle } from "react-icons/fa";
import { RiLayout4Fill } from "react-icons/ri";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { IoLogoGithub } from "react-icons/io5";
import { MdSave } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarVisible } from "../../lib/store/reducers/settingsOptionsReducer/settingsOptionsReducer";



const Sidebar = ({ className }) => {
  const location = useLocation();
  const sidebarVisible = useSelector((state) => state.settingsOptions.sidebarVisible);
  const dispatch = useDispatch();
  
  // For demonstration: this variable is logged on manual route clicks.
  const a1 = "Route clicked!";

  // Define routes. The first element is reserved for toggling (collapse/expand).
  // The other routes use a leading "?" as part of their path.
  const [routes] = useState([
    {
      name: "collapse",
      path: "?#collapse", // Not used for navigation
      icon: <TbLayoutSidebarLeftCollapse />,
    },
    {
      name: "pen",
      path: "?#pen",
      icon: <HiOutlinePencil />,
    },
    {
      name: "save",
      path: "?#save",
      icon: <MdSave />,
    },
    {
      name: "layout",
      path: "?#layout",
      icon: <RiLayout4Fill />,
    },
    {
      name: "settings",
      path: "?#settings",
      icon: <PiSlidersHorizontalBold />,
    },
    {
      name: "code",
      path: "?#code",
      icon: <HiCode />,
    },
  ]);

  const [bottomRoute, setBottomRoute] = useState([
    {
      name: "guide",
      path: "?#guide",
      icon: <FaRegQuestionCircle />,
    },   
    {
      name: "github",
      path: "?#github",
      icon: <IoLogoGithub />,
    },
  ]);

  // When a route is clicked, log the variable and route details.
  const handleRouteClick = (route) => {
    console.log(a1, route);
    // You can add additional actions here if needed.
  };

  // Determine the current active route.
  // Since your routes use a query/hash style z(like "?#pen"), we use location.hash.
  // (Adjust this if you switch to using proper pathname routes.)
  const activeHash = location.hash; // For example, "#pen"

  return (
    <div className={className + " md:min-w-24 md:max-w-24 w-full bg-secondary md:min-h-full md:max-h-full min-h-24 max-h-24 custom-rounded-lg flex md:flex-col flex-row gap-4 shadow-lg transition-all ease-out duration-500"}>
      <div className="w-[75%] md:w-full flex md:flex-col md:justify-start justify-between items-center md:gap-4 p-4 md:pr-4 pr-0 md:h-[80%] h-full grow">
        {/* Collapse/Expand button */}
        <span
          className="text-4xl flex justify-center items-center rounded w-16 h-16 p-2 cursor-pointer text-primary md:rotate-0 -rotate-90"
          onClick={() => dispatch(setSidebarVisible(!sidebarVisible))}
        >
          {sidebarVisible ? routes[0].icon : <TbLayoutSidebarRightCollapse />}
        </span>

        <div className="min-h-[2px] max-h-[2px] w-16 bg-divider md:inline-block hidden"></div>

        {/* Render the intermediate routes */}
        {routes.slice(1, routes.length - 1).map((route, index) => (
          <Link
            key={index}
            to={route.path}
            onClick={() => handleRouteClick(route)}
          >
            <div className="flex flex-row items-center gap-4">
              <span
                className={`cursor-pointer text-4xl flex justify-center items-center w-16 h-16 p-2 ${
                  route.path.replace("?", "") === activeHash
                    ? "bg-icon rounded-xl text-white transition-all ease-linear transition-discrete duration-200"
                    : "bg-transparent text-icon"
                }`}
              >
                {route.icon}
              </span>
            </div>
          </Link>
        ))}

        <div className="min-h-[2px] max-h-[2px] w-16 bg-divider md:inline-block hidden"></div>

        {/* Render the last route */}
        <Link
          to={routes[routes.length - 1].path}
          onClick={() => handleRouteClick(routes[routes.length - 1])}
        >
          <span className={`cursor-pointer text-4xl flex justify-center items-center w-16 h-16 p-2 ${
                  routes[routes.length - 1].path.replace("?", "") === activeHash
                    ? "bg-icon rounded-xl text-white"
                    : "bg-transparent text-icon"
                }`}>
            {routes[routes.length - 1].icon}
          </span>
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="min-h-[2px] max-h-[2px] w-16 bg-divider md:inline-block hidden"></div>
      </div>

      <div className="w-[25%] md:w-full flex justify-between md:justify-center items-center gap-4 md:pl-4 pl-0 p-4 md:h-[15%] h-full md:flex-col">
        {bottomRoute.map((route, index) => (
          <Link
            key={index}
            to={route.path==="?#github" ? "https://github.com/code-abdulrehman/flexgrid" : route.path}
            target={route.path==="?#github" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={() => handleRouteClick(route)}
        >
          <span className="cursor-pointer text-4xl flex justify-center items-center w-16 h-16 p-2 bg-secondary text-icon hover:text-primary">
            {route.icon}
          </span>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
