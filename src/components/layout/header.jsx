import React, { useState, useEffect } from "react";
import { HiViewGrid, HiExternalLink } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
    const location = useLocation();
    const [isFlex, setIsFlex] = useState(true);

    const [theme, setTheme] = useState(
        document.documentElement.getAttribute("data-theme") || "dark"
    );

    useEffect(() => {
        // Update isFlex based on current path
        setIsFlex(location.pathname.includes('grid'));
    }, [location]);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <>
            <div className="flex flex-row h-20 w-full py-4 rounded-lg justify-between items-center">
                <div className="logo flex flex-row items-center gap-6 w-[50%]md:w-[20%] w-full ">
                    <Link to="/">
                        <span className="flex flex-row items-center gap-2 w-full">
                            <span className="flex flex-row items-center w-[60px] justify-center">
                                <HiViewGrid className="text-6xl" />
                            </span>
                            <h1 className="text-4xl font-bold w-40 text-nowrap text-primary">Flex Grid</h1>
                        </span>
                    </Link>
                    <div className="h-10 w-1 bg-divider inline-block"></div>
                    <div className="flex flex-row items-center gap-2 w-full ml-4">
                        <Link to={isFlex ? "/flex" : "/grid"} className="w-full font-bold">
                            <span className="bg-secondary hover:text-primary px-4 py-2 bordr-2 borer-primary rounded-full w-36 h-12 capitalize flex flex-row items-center justify-center gap-2">
                                <HiExternalLink className="text-3xl" />
                                {isFlex ? "flex" : "grid"}
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-row items-center w-[15%] h-full justify-end">
                    <button className="btn bg-secondary hover:bg-contrast rounded-full p-2 flex items-center justify-center h-12 w-12" onClick={toggleTheme}>
                        {theme === "dark" ? (
                            <FaSun className="text-3xl" />
                        ) : (
                            <FaMoon className="text-3xl" />
                        )}
                    </button>
                </div>
            </div>
        </>
    )
};

export default Header;