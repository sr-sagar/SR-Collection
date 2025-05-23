import React from "react";
import NavBar from "./navbar";
// import "../style/home.css"
import HomeItems from "./homeItems";
import Filter from "./filter";
import ImageScroller from "./imageScroller";
import { useState } from "react";
const Home = ({category,setCategory,input,setInput,filteredItems,handleSearchFilter}) => {

    return(
        <div className="absolute top-0 left-0 w-full h-full">
            <header className="w-full h-[60%] md:h-[80%]">
                <ImageScroller />
                <div className="w-full h-10 ">
                    <h2 className="relative text-2xl italic font-bold text-center text-white font-bebas top-2 lg:text-3xl xl:text-4xl">SR Collection</h2>
                </div>
                <div className="relative flex flex-row lg:top-3 xl:top-5">
                    <NavBar />
                </div>
            </header>
            <main className="relative w-full h-full ">
                <div className="w-full h-[5%]  relative shadow-md mt-1 justify-center items-center ]">
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
