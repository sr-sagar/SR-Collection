import React from "react";
const Filter = ({category,setCategory,input,setInput,handleSearchFilter}) => {
    return(
        <div className="flex items-center justify-center w-full h-full mt-1 gap-x-5 md:gap-x-8 lg:gap-x-12 bg-[#F4F5F7]">
            <select className="w-[25%] h-[50%]  outline-none border-[0.5px] border-[#D1D5DB] text-[#2B2A28] bg-[#FFFFFF] rounded-md shadow-md" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select an option</option>
                <option value="Low-to-High">Low-to-High</option>
                <option value="Dress">Dress</option>
                <option value="Kurti">Kurti</option>
                <option value="Saare">Saare</option>
                <option value="Dupatta">Dupatta</option>
            </select>

            <input type="text" 
                placeholder="search" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="w-[30%] h-[50%]  border-1 border-[#D1D5DB] text-center text-[#2B2A28] rounded-md bg-[#FFFFFF]"
            />
            <button className={`w-[25%] h-[50%]  rounded-md text-[#FDFDFD] trasition active:scale-95  transform bg-[#3EABA9] font-inter font-500 uppercase`}  onClick={() => handleSearchFilter()}>
                Search
            </button>
        </div>

    )
}

export default Filter;
