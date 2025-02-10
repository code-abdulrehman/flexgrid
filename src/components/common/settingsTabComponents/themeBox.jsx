// ThemeBox.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon } from "react-icons/fa";
import { TbSunMoon, TbSunset2, TbSun } from "react-icons/tb";
import { setTheme } from "../../../lib/store/reducers/settingsOptionsReducer/settingsOptionsReducer";

const ThemeBox = () => {
  const dispatch = useDispatch();
  // Get theme from Redux state (from your resizeableOptions reducer)
  const theme = useSelector((state) => state.settingsOptions.theme);

  const themeOptions = [
    { label: "Light", value: "light", icon: <TbSun /> },
    { label: "Dark", value: "dark", icon: <FaMoon /> },
    { label: "System", value: "system", icon: <TbSunMoon /> }
  ];

  const handleThemeChange = (selectedTheme) => {
    dispatch(setTheme(selectedTheme));
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "system") {
      // Apply system preference
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      const systemTheme = darkThemeMq.matches ? "dark" : "light";
      htmlElement.setAttribute("data-theme", systemTheme);

      // Listen for changes to the system theme
      const handleChange = (e) => {
        htmlElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      };
      darkThemeMq.addEventListener("change", handleChange);

      return () => darkThemeMq.removeEventListener("change", handleChange);
    } else {
      // Directly apply the selected theme
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
              className={`min-w-28 min-h-28 bg-content-hover border border-icon rounded-full overflow-hidden flex items-center justify-center inset-t-box-shadow cursor-pointer text-4xl ${
                theme === option.value ? "text-primary" : "text-secondary"
              }`}
            >
              {option.icon}
            </div>
            <p
              className={`font-bold text-xl text-center uppercase ${
                theme === option.value ? "text-primary" : "text-secondary"
              }`}
            >
              {option.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeBox;
