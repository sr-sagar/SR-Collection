import React, { useState, useEffect } from "react";
import NavBar from "./navbar";
import HomeItems from "./homeItems";
import SearchBar from "./searchBar";
import SearchFilter from "./searchFilter";
import Logo from "./logo";
import "../style/search.css"
const Search = ({category,setCategory,input,setInput,handleSearchFilter,filteredItems,setFilteredItems,scroll}) => {

    useEffect(() => {
        handleSearchFilter()
    },[input])

    const width = "80";
    const searchFilterWidth = "30" 
    const color = "#2B2A28"
    return(
        <div className="absolute top-0 left-0 w-full h-full ">
            <header className="w-full max-h-[30%] bg-yellow justify-center items-center object-center shadow-md pb-0.5">
                {scroll?
                <>
                    <div className="w-full">
                        <Logo color={color}/>
                    </div>
                    <div className="flex flex-row mt-2 lg:top-3 xl:top-5">
                        <NavBar />
                    </div>
                    {/* This is the category wise filter */}
                    <div className="relative w-full border-t-0 border-b-0 mt-7 md:mt-5 xl:mt-3 searchFilter">
                        <SearchFilter filteredItems={filteredItems} searchFilterWidth={searchFilterWidth}/>
                    </div>  
                    <div className="flex flex-row items-center justify-center w-full mt-4 mb-4 md:mt-2 searchBar ">
                        <SearchBar width={width} input={input} setInput={setInput} handleSearchFilter={handleSearchFilter}/>
                    </div>
                </>
                :
                    <>
                        <div className="w-full h-20 bg-[#F4F5F7] flex  z-[1] justify-between items-center  pl-5 pr-5 shadow-md">

                            <div className="relative flex flex-row items-center">
                                <Logo />
                            </div>
                            <div className="relative flex flex-row items-center">
                                <NavBar />
                            </div>

                        </div>

                        <>
                            <div className="relative w-full border-t-0 border-b-0 mt-7 md:mt-5 xl:mt-3 searchFilter">
                                <SearchFilter filteredItems={filteredItems} searchFilterWidth={searchFilterWidth}/>
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
                    
                    {filteredItems.map((i) => (
                        
                        <HomeItems key={i.id} title={i.name} id={i.id} price={i.price}/>
                    ))}
                </div>
            </main>
        </div>
    )
}
export default Search;
