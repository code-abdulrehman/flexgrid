import React from "react";
import { FaBoxesStacked } from "react-icons/fa6";

const Footer = () => {
   const currentYear = new Date().getFullYear();
   return (
      <div className="w-full md:min-h-24 md:max-h-24 min-h-16 max-h-16 hidden md:flex justify-center items-center bg-secondary rounded-2xl md:custom-rounded-lg shadow-lg gap-4 text-lg md:text-xl lg:text-2xl">
         &copy; {currentYear} copyright <a href="https://code-abdulrehman.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary animate-bounce text-accent"> <FaBoxesStacked className="text-3xl text-accent animate-bounce" /></a> | All rights reserved
      </div>
   );
};

export default Footer;