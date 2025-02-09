import React, { useState, useRef, useEffect } from "react";

const ResizableMain = ({ children, className }) => {
  // Start with a fallback value. It will be updated on mount.

  const initialSidebarVisible = localStorage.getItem("sidebarVisible") === "true";
  const [dimensions, setDimensions] = useState({ width: "100%", height: "100%" });
  const containerRef = useRef(null);

  // Refs to track if the user is dragging (for horizontal and vertical directions)
  const isResizingHorizontal = useRef(false);
  const isResizingVertical = useRef(false);

  // Listeners for mousemove and mouseup events (for dragging)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Resize horizontally if active
      if (isResizingHorizontal.current) {
        let newWidth = e.clientX - rect.left;
        const minWidth = 150;
        const maxWidth = window.innerWidth - rect.left - 20; // leave a margin of 20px
        if (newWidth < minWidth) newWidth = minWidth;
        if (newWidth > maxWidth) newWidth = maxWidth;
        setDimensions((prev) => ({ ...prev, width: newWidth }));
      }

      // Resize vertically if active
      if (isResizingVertical.current) {
        let newHeight = e.clientY - rect.top;
        const minHeight = 100;
        const maxHeight = window.innerHeight - rect.top - 20;
        if (newHeight < minHeight) newHeight = minHeight;
        if (newHeight > maxHeight) newHeight = maxHeight;
        setDimensions((prev) => ({ ...prev, height: newHeight }));
      }
    };

    const handleMouseUp = () => {
      isResizingHorizontal.current = false;
      isResizingVertical.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup the event listeners on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // This effect will run once on mount.
  // It measures the real dimensions, then briefly sets them to -1 and back after 100ms.
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Use the measured width and height (in pixels)
      const realWidth = rect.width;
      const realHeight = rect.height;

      // Subtract 1 from each dimension
      setDimensions({ width: realWidth - 1, height: realHeight - 1 });

      // After 100ms, update back to the real dimensions.
      const timeoutId = setTimeout(() => {
        setDimensions({ width: realWidth, height: realHeight });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    setDimensions({ width: initialSidebarVisible ? "100%" : "100%", height: "100%" });
  }, [initialSidebarVisible]);
  // Functions to initiate dragging/resizing
  const startHorizontalResize = (e) => {
    isResizingHorizontal.current = true;
    e.preventDefault();
  };

  const startVerticalResize = (e) => {
    isResizingVertical.current = true;
    e.preventDefault();
  };

  const startCornerResize = (e) => {
    isResizingHorizontal.current = true;
    isResizingVertical.current = true;
    e.preventDefault();
  };

  return (
    <div className="w-full h-full relative bg-pattern shadow-lg custom-rounded-lg relative">
          <code className="text-md absolute top-2 right-2 transition-all duration-300 ease-in-out z-10">
            {dimensions.width==="100%"? "" :
            (Math.round(dimensions.width) + "x" + Math.round(dimensions.height))}
          </code>
         
      <div
        className={`${className} w-full h-full group hover:ring-[--icon-border] hover:ring-2 bg-main-container`}
        ref={containerRef}
        style={{
          // When dimensions is a number, React will treat it as pixels.
          // (The initial value is "100%" but after mount it will be pixels.)
          width: dimensions.width,
          height: dimensions.height,
          maxWidth: "100%",
          maxHeight: "100%",
          minWidth: "320px",
          minHeight: "250px",
          position: "absolute", // Fixes the container at the top–left of its parent
          top: 0,
          left: 0,
          overflow: "hidden",
        }}
      >
     <div style={{ padding: "10px" }}>
          {children}
        </div>

        {/* Vertical (right) resizer */}
        <div
          className="group-hover:visible invisible bg-divider"
          onMouseDown={startHorizontalResize}
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            height: "50px",
            width: "5px",
            cursor: "col-resize",
            zIndex: 10,
          }}
        />

        {/* Horizontal (bottom) resizer */}
        <div
          className="group-hover:visible invisible bg-divider"
          onMouseDown={startVerticalResize}
          style={{
            position: "absolute",
            bottom: 0,
            right: "50%",
            width: "50px",
            height: "3px",
            cursor: "row-resize",
            zIndex: 10,
          }}
        />

        {/* Optionally, a corner resizer could be added */}
        
        <div
          className="group-hover:visible invisible"
          onMouseDown={startCornerResize}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "20px",
            height: "20px",
            cursor: "nwse-resize",
            zIndex: 20,
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        />
       
      </div>
    </div>
  );
};

export default ResizableMain;
