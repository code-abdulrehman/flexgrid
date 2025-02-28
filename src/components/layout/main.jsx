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
   function getGapValue(css) {
      const gapValue = tailwindClasses.includes("gap") ? css?.split("gap:")[1]?.split("overflow")[0]?.trim() : null;
      return gapValue;
   }
   const displayType = outputCodeData?.outputCode?.container?.type;
   useEffect(() => {
      console.log(tailwindClasses, "tailwindClasses");
      console.log(getGapValue(css), "tailwindClasses gap");
   }, [tailwindClasses]);
   return (
      <>
         <div className=" grow w-auto h-full custom-rounded-lg transition-[width] ease-in duration-100 overflow-hidden transition-all ease-out duration-500">

            <ResizableMain className=" grow w-auto h-full custom-rounded-lg transition-[width] ease-in-out duration-100 overflow-hidden transition-all ease-out duration-500">
               <MainDash />
               <Container
                  styles={css}
                  className={tailwindClasses + ` py-6 gap-[${getGapValue(css)}] gap-[10px]`}
                  style={{ gap: getGapValue(css) || "10px" }}
                  display={displayType} />
            </ResizableMain >
         </div>
      </>
   )
};

export default Main;