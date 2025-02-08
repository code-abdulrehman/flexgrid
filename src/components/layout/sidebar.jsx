import React, { useState } from "react";
import { HiCode, HiPencil } from "react-icons/hi";
import {
  TbAdjustmentsHorizontal,
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiLayout4Fill } from "react-icons/ri";
import { IoLogoGithub } from "react-icons/io5";
import { MdSave } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarVisible, toggleSidebar }) => {
  const location = useLocation();
  
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
      icon: <HiPencil />,
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
      icon: <TbAdjustmentsHorizontal />,
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
    <div className="min-w-28 max-w-28 bg-secondary h-full custom-rounded-lg flex flex-col gap-4 shadow-lg">
      <div className="w-full flex flex-col items-center gap-4 p-4 h-[80%] grow">
        {/* Collapse/Expand button */}
        <span
          className="text-4xl flex justify-center items-center rounded w-16 h-16 p-2 cursor-pointer text-primary"
          onClick={toggleSidebar}
        >
          {sidebarVisible ? routes[0].icon : <TbLayoutSidebarRightCollapse />}
        </span>

        <div className="h-1 w-16 bg-divider inline-block"></div>

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
                    ? "bg-contrast rounded-xl text-contrast"
                    : "bg-secondary text-secondary"
                }`}
              >
                {route.icon}
              </span>
            </div>
          </Link>
        ))}

        <div className="h-1 w-16 bg-divider inline-block"></div>

        {/* Render the last route */}
        <Link
          to={routes[routes.length - 1].path}
          onClick={() => handleRouteClick(routes[routes.length - 1])}
        >
          <span className={`cursor-pointer text-4xl flex justify-center items-center w-16 h-16 p-2 ${
                  routes[routes.length - 1].path.replace("?", "") === activeHash
                    ? "bg-contrast rounded-xl text-contrast"
                    : "bg-secondary text-secondary"
                }`}>
            {routes[routes.length - 1].icon}
          </span>
        </Link>
      </div>

      <div className="flex justify-center h-[1%]">
        <div className="h-1 w-16 bg-divider inline-block"></div>
      </div>

      <div className="w-full flex justify-center items-center gap-4 p-4 h-[15%] flex-col">
        {bottomRoute.map((route, index) => (
          <Link
            key={index}
            to={route.path}
            onClick={() => handleRouteClick(route)}
        >
          <span className="cursor-pointer text-4xl flex justify-center items-center w-16 h-16 p-2 bg-secondary text-secondary hover:text-primary">
            {route.icon}
          </span>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
