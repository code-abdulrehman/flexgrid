import React from "react";

const LayoutItem = ({data}) => {
   return (
      <div className="w-full flex justify-center gap-10 flex-wrap">
        {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-between custom-rounded-lg p-2 w-56 h-52 bg-content item-shadow">
            <span className="text-secondary text-[6rem] w-28 h-full flex items-center justify-center scale-125">
                {item.icon}
            </span>
            <h3 className="text-secondary font-semibold text-xl text-center uppercase mb-1">{item.name}</h3>
        </div>
      ))}
      </div>
   )
}

export default LayoutItem;