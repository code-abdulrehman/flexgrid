import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Sidebar from "./components/layout/sidebar";
import HideableSidebar from "./components/layout/hideableSidebar";
import Main from "./components/layout/main";

const App = () => {
  const [isFlex, setIsFlex] = useState(sessionStorage.getItem("isFlex") === "true");

  // Get the initial state from localStorage (or default to false)
  const initialSidebarVisible = localStorage.getItem("sidebarVisible") === "true";
  const [isSidebarVisible, setIsSidebarVisible] = useState(initialSidebarVisible);

  // Toggle function that updates both state and localStorage
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebarVisible", newState);
      return newState;
    });
  };

  return (
    <BrowserRouter>
      <div className="p-6 m-0 flex flex-col gap-4 h-screen w-screen overflow-hidden">
        <Header />
        <div className="flex flex-col md:flex-row gap-4 h-full w-full overflow-y-auto">
          {/* Pass down both the current state and the toggle callback */}
          <Sidebar sidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} className="md:order-1 order-3"/>
          {isSidebarVisible && <HideableSidebar sidebarVisible={isSidebarVisible} className="md:order-2 order-2 overflow-y-auto"/>}
          <div className="w-full h-full md:order-3 order-1">
          <Routes>
            {/* Redirect from / to /flex */}
            <Route path="/" element={<Navigate to={isFlex ? "/flex#pen" : "/grid#pen"} replace />} />
            <Route path="/flex" element={<Main />} />
            <Route path="/grid" element={<Main />} />
            {/* You can add more routes as needed */}
          </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
