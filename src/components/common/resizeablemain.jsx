import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const ResizableMain = ({ children, className }) => {
  // Get resizeable options from Redux state
  const resizeableOptions = useSelector((state) => state.settingsOptions.resizeableOptions);
  const sizeShow = useSelector((state) => state.settingsOptions.sizeShow);

  const sidebarVisible = useSelector((state) => state.settingsOptions.sidebarVisible);
  const [dimensions, setDimensions] = useState({ width: "100%", height: "100%" });
  const containerRef = useRef(null);

  const isResizingHorizontal = useRef(false);
  const isResizingVertical = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (isResizingHorizontal.current) {
        let newWidth = e.clientX - rect.left;
        const minWidth = 150;
        const maxWidth = window.innerWidth - rect.left - 20;
        if (newWidth < minWidth) newWidth = minWidth;
        if (newWidth > maxWidth) newWidth = maxWidth;
        setDimensions((prev) => ({ ...prev, width: newWidth }));
      }

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

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width - 1, height: rect.height - 1 });

      const timeoutId = setTimeout(() => {
        setDimensions({ width: rect.width, height: rect.height });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    setDimensions({ width: sidebarVisible ? "100%" : "100%", height: "100%" });
  }, [sidebarVisible]);

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
    <div className="w-full h-full relative bg-pattern custom-rounded-lg relative z-100 transition-all ease-out duration-500">
      {sizeShow && (
        <code className="text-md absolute top-2 right-2 transition-all ease-out duration-500 z-10">
          {dimensions.width === "100%" ? "" : Math.round(dimensions.width) + "x" + Math.round(dimensions.height)}
        </code>
      )}

      <div
        className={`${className} z-1 w-full h-full group bg-main-container shadow-lg`}
        ref={containerRef}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          maxWidth: "100%",
          maxHeight: "100%",
          minWidth: "380px",
          minHeight: "250px",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "10px" }}>{children}</div>

        {resizeableOptions.horizontal && (
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
        )}

        {resizeableOptions.vertical && (
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
        )}

        {resizeableOptions.both && (
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
        )}
      </div>
    </div>
  );
};

export default ResizableMain;
