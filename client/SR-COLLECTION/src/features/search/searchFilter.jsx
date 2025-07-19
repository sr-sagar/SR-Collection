import React,{ useState } from "react";
import "../../style/searchFilter.css"
import {useAppContext} from '../../context/AppContext' 
import { useEffect } from "react";
const SearchFilter = ({category,searchFilterWidth}) => {

    const {searchPageFilter,setSearchPageFilter,handleSearchFilter} = useAppContext()

    useEffect(() => {
        if(searchPageFilter){

            handleSearchFilter()
        }

    },[searchPageFilter])
    const handleFilter = (itemName) => {

            setSearchPageFilter(itemName)
    }
    return(
        <div className={`filterCategories w-full overflow-x-auto whitespace-nowrap  `}  
            style={{
                scrollbarWidth: 'none',
                height: `${searchFilterWidth || undefined}%`,
                
                }}>

                <div className="flex items-center justify-center w-full px-2 pb-2 md:justify-center gap-x-3">
                {category.map((item) => (
                    
                    <p 
                        key={item._id}   
                        onClick={() => {
                            handleFilter(item.name)
                        }} 
                        className="border-[#D1D5DB] border-[1px]  text-black first-of-type:ml-2 last-of-type:mr-2  px-3  py-1 transition active:scale-95 shrink-0 shadow-md font-Space">{item.name }</p>
                    ))
                    
                }
                </div>
            
            
        </div>
    )
}

export default SearchFilter;
