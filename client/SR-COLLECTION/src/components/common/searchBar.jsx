import React, { useState } from "react";
const SearchBar = ({input,setInput,width}) => {

    // const [searchInput,setSearchInput] = useState();
    return(
        // <div>
            <input type="text" 
                placeholder="search" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="pt-0.5 pb-0.5 md:pb-1 md:pt-1 text-center bg-white rounded-md border-[1px] border-[#D1D5DB]"
                style={{width: `${width}%`}}

            />
    )
}

export default SearchBar;
