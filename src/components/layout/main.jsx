import React, { useEffect } from "react";
import ResizableMain from "../common/resizeablemain";
import Container from "../common/mainComponents/container";
import MainDash from "../common/mainComponents/mainDash";
import { outputCode } from "../../lib/store/reducers/outputCodeReducer/outputCodeReducer";
import { useSelector } from "react-redux";
const Main = () => {
   const outputCodeData = useSelector(outputCode);
   
   const tailwindClasses = outputCodeData?.outputCode?.container?.tailwind;
   const css = outputCodeData?.outputCode?.container?.css;
   console.log(css, "css");
   const displayType = outputCodeData?.outputCode?.container?.type;
   useEffect(() => {
      console.log(tailwindClasses, "tailwindClasses");
   }, [tailwindClasses]);
   return (
      <>
         <div className=" grow w-auto h-full custom-rounded-lg transition-[width] ease-in duration-100 overflow-hidden transition-all ease-out duration-500">

            <ResizableMain className=" grow w-auto h-full custom-rounded-lg transition-[width] ease-in-out duration-100 overflow-hidden transition-all ease-out duration-500">
               <MainDash />
               <Container styles={{css}} className={tailwindClasses} display={displayType}/>
            </ResizableMain >
         </div>
      </>
   )
};

export default Main;