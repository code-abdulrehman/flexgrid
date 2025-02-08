import React from "react";
import ResizableMain from "../common/resizeablemain";

const Main = () => {
   return (
      <>
         <div className=" grow w-auto h-full custom-rounded-lg transition-[width] ease-in duration-100 overflow-hidden ">

            <ResizableMain className=" grow bg-secondary w-auto h-full custom-rounded-lg transition-[width] ease-in-out duration-100 bg-pattern overflow-hidden  shadow-lg">
               <div className="w-full h-full bg-primary">
                  hello
               </div>
      </ResizableMain >
         </div>
      </>
   )
};

export default Main;