import React, { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { TbSunMoon, TbSunset2, TbSun } from "react-icons/tb";

const ThemeBox = () => {
  // Initialize state with the value from localStorage or default to "light"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const themeOptions = [
    {
      label: "Light",
      value: "light",
      icon: <TbSun />
    },
    {
      label: "Dark",
      value: "dark",
      icon: <FaMoon />
    },
    {
      label: "System",
      value: "system",
      icon: <TbSunMoon />
    }
  ];

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (theme === "system") {
      // Check the system preference for dark mode
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      const systemTheme = darkThemeMq.matches ? "dark" : "light";
      htmlElement.setAttribute("data-theme", systemTheme);

      // Listen for changes in the system theme
      const handleChange = (e) => {
        htmlElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      };

      // Add event listener for changes
      darkThemeMq.addEventListener("change", handleChange);

      // Cleanup the event listener when the effect is re-run or the component unmounts
      return () => {
        darkThemeMq.removeEventListener("change", handleChange);
      };
    } else {
      // For "light" or "dark", set the theme directly
      htmlElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div className="flex flex-col items-start justify-center gap-4 custom-rounded-lg bg-content p-6 py-8">
      <div className="flex items-center w-full gap-4 h-12">
        <TbSunset2 className="text-secondary text-4xl" />
        <p className="text-secondary font-bold text-2xl text-center uppercase">
          Appearance
        </p>
      </div>
      <div className="flex items-center justify-evenly gap-4 w-full">
        {themeOptions.map((option) => (
          <div key={option.value} className="flex flex-col gap-4">
            <div
              onClick={() => handleThemeChange(option.value)}
              className={`min-w-28 min-h-28 bg-content-hover border border-icon rounded-full overflow-hidden flex items-center justify-center inset-t-box-shadow cursor-pointer text-4xl ${theme === option.value ? "text-primary" : "text-secondary"}`}
            >
              {option.icon}
            </div>
            <p className={`font-bold text-xl text-center uppercase ${theme === option.value ? "text-primary" : "text-secondary"}`}>
              {option.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeBox;
