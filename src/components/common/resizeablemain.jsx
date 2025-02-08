import React, { useState, useRef, useEffect } from "react";

const ResizableMain = ({children, className}) => {
  // Store width and height in state.
  const [dimensions, setDimensions] = useState({ width: "100%", height: "100%" });
  // A ref for the container (used for measuring its position)
  const containerRef = useRef(null);

  // Refs to track if the user is dragging (for horizontal and vertical directions)
  const isResizingHorizontal = useRef(false);
  const isResizingVertical = useRef(false);

  // These listeners update the dimensions while dragging.
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Resize horizontally if active
      if (isResizingHorizontal.current) {
        let newWidth = e.clientX - rect.left;
        // Define a minimum and maximum width
        const minWidth = 150;
        const maxWidth = window.innerWidth - rect.left - 20; // leave a margin of 20px
        if (newWidth < minWidth) newWidth = minWidth;
        if (newWidth > maxWidth) newWidth = maxWidth;
        setDimensions((prev) => ({ ...prev, width: newWidth }));
      }

      // Resize vertically if active
      if (isResizingVertical.current) {
        let newHeight = e.clientY - rect.top;
        // Define a minimum and maximum height
        const minHeight = 100;
        const maxHeight = window.innerHeight - rect.top - 20;
        if (newHeight < minHeight) newHeight = minHeight;
        if (newHeight > maxHeight) newHeight = maxHeight;
        setDimensions((prev) => ({ ...prev, height: newHeight }));
      }
    };

    const handleMouseUp = () => {
      // Stop any resizing when the mouse is released
      isResizingHorizontal.current = false;
      isResizingVertical.current = false;
    };

    // Attach the listeners to the document
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup when the component unmounts
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // These functions start the dragging
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
<div className="w-full h-full relative">
<div
className={className + " w-full h-full group"}
      ref={containerRef}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        maxWidth: "100%",
        maxHeight: "100%",
        position: "absolute", // fixes the container at the top–left of its parent
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      {/* Main content */}
      <div style={{ padding: "10px" }}>
        
      {children}
      </div>

      {/* Vertical (right) resizer */}
      <div
      className="group-hover:visible invisible bg-divider"
        onMouseDown={startHorizontalResize}
        style={{
          position: "absolute",
          top: '50%',
          right: 0,
          width: "10px",
          height: "100%",
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
          right: '50%',
          width: "100%",
          height: "5px",
          width: "50px",
          cursor: "row-resize",
          zIndex: 10,
        }}
      />

       {/* Corner resizer (bottom-right) */}
     {/* <div
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
      /> */}
    </div>
</div>
  );
};

export default ResizableMain;
