import React, { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";
const SaveInput = () => {
    const [name, setName] = useState("");
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleSave = () => {
        console.log(name);
    }
    useEffect(() => {
        console.log(name);
    }, [name]);
   return (
      <div className="flex flex-col gap-2">
            <h3 className="text-secondary font-bold text-2xl text-center uppercase mb-4">Add Edit</h3>
         <div className="flex flex-row gap-2 items-center justify-between bg-content custom-rounded-lg border border-icon relative">
            <input type="text" value={name} onChange={handleNameChange} placeholder="Name" className="bg-container custom-rounded-lg text-secondary font-semibold p-6 focus:outline-none active:outline-none active:ring-0 ring-0 focus:ring-2 focus:ring-[--bg-icon] border-none w-full overflow-hidden" maxLength={25} />
            <button className={`${name === "" ? "bg-primary text-secondary cursor-not-allowed" : "bg-success text-contrast"} px-4 rounded-xl absolute right-4 flex flex-row items-center gap-2 text-3xl p-4`} disabled={name === ""}><FaSave /> Save</button>
         </div>
      </div>
   );
};

export default SaveInput;