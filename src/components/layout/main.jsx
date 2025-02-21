import React from "react";
import ResizableMain from "../common/resizeablemain";
import Container from "../common/mainComponents/container";
import MainDash from "../common/mainComponents/mainDash";
const Main = () => {
   return (
      <>
         <div className=" grow w-auto h-full custom-rounded-lg transition-[width] ease-in duration-100 overflow-hidden transition-all ease-out duration-500">

            <ResizableMain className=" grow w-auto h-full custom-rounded-lg transition-[width] ease-in-out duration-100 overflow-hidden transition-all ease-out duration-500">
               <MainDash />
               <Container />

            </ResizableMain >
         </div>
      </>
   )
};

export default Main;