import React, { useState, useEffect } from "react";
import NavBar from "./navbar";
import HomeItems from "./homeItems";
import SearchBar from "./searchBar";
import SearchFilter from "./searchFilter";
import "../style/search.css"
const Search = ({category,setCategory,input,setInput,handleSearchFilter,filteredItems,setFilteredItems}) => {

    useEffect(() => {
        handleSearchFilter()
    },[input])

    const width = "80";
    const searchFilterWidth = "30" 
    return(
        <div className="absolute top-0 left-0 w-full h-full ">
            <header className="w-full max-h-[30%] bg-yellow justify-center items-center object-center shadow-md pb-0.5">
                <div className="w-full">
                    <h2 className="relative text-2xl italic font-bold text-center text-black font-bebas top-2 lg:text-3xl xl:text-4xl">SR Collection</h2>
                </div>
                <div className="flex flex-row mt-2 bg-0 [#282828] lg:top-3 xl:top-5">
                    <NavBar />
                </div>
                {/* This is the category wise filter */}
                <div className="relative w-full border-t-0 border-b-0 mt-7 md:mt-5 xl:mt-3 searchFilter">
                    <SearchFilter filteredItems={filteredItems} searchFilterWidth={searchFilterWidth}/>
                </div>  
                <div className="flex flex-row items-center justify-center w-full mt-4 mb-4 md:mt-2 searchBar ">
                    <SearchBar width={width} input={input} setInput={setInput} handleSearchFilter={handleSearchFilter}/>
                </div>
            </header>
            <main className="relative w-full h-full ">
                <div className="relative grid w-full h-auto grid-cols-2 gap-y-3 md:grid-cols-3 xl:grid-cols-4">
                    
                    {filteredItems.map((i) => (
                        
                        <HomeItems key={i.id} title={i.name} id={i.id} price={i.price}/>
                    ))}
                </div>
            </main>
        </div>
    )
}
export default Search;
