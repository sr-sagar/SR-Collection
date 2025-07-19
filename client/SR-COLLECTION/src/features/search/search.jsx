import React, { useState, useEffect } from "react";
import HomeItems from "../../components/products/homeItems";
import SearchBar from "../../components/common/searchBar";
import SearchFilter from "./searchFilter";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import "../../style/search.css"
import { useAppContext } from "../../context/AppContext";
const Search = ({category,setCategory,input,setInput,handleSearchFilter,filteredItems,setFilteredItems,scroll}) => {

    const {products} = useAppContext()

    useEffect(() => {
        if(input === "")
        {
            setFilteredItems(products);
            return;
        }
        const timeout = setTimeout(() => {

            handleSearchFilter()
        },300)
        return () => clearTimeout(timeout)
    },[input])

    const width = "80";
    const searchFilterWidth = "30" 

    const searchFilterCategoryNames = [
        {name: "Low-to-High",_id: 1},
        {name: "High-to-Low",_id: 2},
        // {name: "Dress",_id: 3},
        // {name: "Saare",_id: 4},
        // {name: "Dupatta",_id: 5},
        // {name: "Bandani",_id: 6},
        // {name: "Purses",_id: 7},
    ]
    return(
        <div className="absolute top-0 left-0 w-full h-full ">
            <header className="w-full max-h-[30%] bg-[#F4F5F7] justify-center items-center object-center shadow-md pb-0.5">
                {scroll?
                <>  
                    <SmallerScreensNavbar mt={2} />
                    {/* This is the category wise filter */}
                    <div className="relative w-full mt-7 md:mt-5 xl:mt-3 searchFilter">
                        <SearchFilter category={searchFilterCategoryNames} searchFilterWidth={searchFilterWidth} handleSearchFilter={handleSearchFilter}/>
                    </div>  
                    <div className="flex flex-row items-center justify-center w-full mt-4 mb-4 md:mt-2 searchBar ">
                        <SearchBar width={width} input={input} setInput={setInput} handleSearchFilter={handleSearchFilter}/>
                    </div>
                </>
                :
                    <>
                        <LargerScreensNavbar />

                        <>
                            <div className="relative w-full border-t-0 border-b-0 mt-7 md:mt-5 xl:mt-3 searchFilter">
                                <SearchFilter category={searchFilterCategoryNames} searchFilterWidth={searchFilterWidth}/>
                            </div>  
                            <div className="flex flex-row items-center justify-center w-full mt-4 mb-4 md:mt-2 searchBar ">
                                <SearchBar width={width} input={input} setInput={setInput} handleSearchFilter={handleSearchFilter}/>
                            </div>
                        </>
                    </>
                }
                
                
            </header>
            <main className="relative w-full h-full ">
                <div className="relative grid w-full h-auto grid-cols-2 gap-y-3 md:grid-cols-3 xl:grid-cols-4">
                    
                    {filteredItems.length > 0? filteredItems?.map((item) => (
                        
                        <HomeItems key={item._id} title={item.title} id={item._id} price={item.price} imgUrl={item.fileURL}/>
                    ))
                    :
                    <div className="w-full p-2 col-span-full mt-6 bg-[#F4F5F7]  shadow-md flex justify-center items-center">
                        <p >No products added yet.</p>
                    </div>
                    }
                </div>
            </main>
        </div>
    )
}
export default Search;
