import React from "react";


const Footer = () => {
   const currentYear = new Date().getFullYear();
   return (
      <div className="w-full min-h-24 max-h-24 flex justify-center items-center bg-secondary custom-rounded-lg shadow-lg gap-4">
         &copy; {currentYear} copyright <a href="https://code-abdulrehman.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary animate-bounce">AR</a> | All rights reserved
      </div>
   );
};

export default Footer;