import React,{ useState } from "react";
import "../style/searchFilter.css"
const SearchFilter = ({filteredItems,searchFilterWidth}) => {

    
    return(
        <div className={`filterCategories w-full  pt-2 pb-2  justify-center items-center flex gap-x-9 overflow-x-auto whitespace-nowrap shrink-0 `}  
            style={{
                scrollbarWidth: 'none',
                height: `${searchFilterWidth}%`,
                
                }}>

                {filteredItems.map((res) => (
                
                    <p key={res.id} className="border-[#D1D5DB] border-[1px] text- [#8C8C94]   text-black first-of-type:ml-2 last-of-type:mr-2 aspect-[2/1] px-3 transition active:scale-95 shadow-md font-Space">All</p>   
                ))
            
            }
            
            
        </div>
    )
}

export default SearchFilter;
