import React, { useEffect } from "react";
import NavBar from "./navbar";
// import "../style/home.css"
import HomeItems from "./homeItems";
import Filter from "./filter";
import ImageScroller from "./imageScroller";
import { useState } from "react";
import Logo from "./logo";
const Home = ({category,setCategory,input,setInput,filteredItems,handleSearchFilter,scroll}) => {

   

    return(
        <div className="absolute top-0 left-0 w-full h-full ">
            <header className="w-full h-[60%] md:h-[80%] relative ">
                <div className="z-[-1] ">
                    <ImageScroller scroll={scroll}/>
                </div>
                {scroll?
                    <>
                        <div className="w-auto h-10">
                            <Logo />
                        </div>
                        <div className="relative flex flex-row ">
                            <NavBar />
                        </div>
                    </>
                
                :

                    <div className="w-full h-20 bg-[#F4F5F7] flex  z-[1] justify-between items-center it pl-5 pr-5 shadow-md shadow-black">
                        <div className="relative flex flex-row items-center">
                            <Logo />
                        </div>
                        <div className="relative flex flex-row items-center">
                            <NavBar />
                        </div>
                    </div>
                }
            </header>
            <main className="relative w-full h-full ">
                <div className="w-full h-[7%]  relative  shadow-md  mt-2  justify-center items-center ">
                    <Filter category={category} setCategory={setCategory} input={input} setInput={setInput} handleSearchFilter={handleSearchFilter}/>
                </div>
                <div className="relative grid w-full h-auto grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
                    
                    {filteredItems.map((i) => (
                        
                        <HomeItems key={i.id} title={i.name} id={i.id} price={i.price}/>
                    ))}
                </div>
            </main>
        </div>
    )
}
export default Home
