import React, { useEffect } from "react";
import HomeItems from "../components/products/homeItems";
import Filter from "../components/common/filter";
import ImageScroller from "../components/common/imageScroller";
import LargerScreensNavbar from "../components/layout/largerScreensNavbar";
import SmallerScreensNavbar from "../components/layout/smallerScreensNavbar";
import { useAppContext } from "../context/AppContext";
const Home = ({category,setCategory,input,setInput,filteredItems,handleSearchFilter,scroll}) => {
    const { products,handleGetProducts } = useAppContext()
    useEffect(() => {
        handleGetProducts()
    },[])
    return(
        <div className="absolute top-0 left-0 w-full h-full ">
            {/* <header className="w-full h-[60%] md:h-[calc(165vw*0.46875)] lg:h-[calc(100vw*0.46875)] relative overflow-hidden"> */}
            <header className="w-full h-[60%] md:h-[80%] relative overflow-hidden ">
                
                {scroll?
                    <>
                        <div className="z-[-1] ">
                            <ImageScroller scroll={scroll}/>
                        </div>
                        <SmallerScreensNavbar mt={2} />
                    </>
                
                :
                    <>
                        <LargerScreensNavbar shadowColor={"black"}/>
                        <div className=" w-full h-[85%]  relative md:bg-[#F6F1EB] md:shadow-md md:rounded-xl ">
                            <ImageScroller scroll={scroll}/>
                        </div>
                    </>
                }
                
            </header>
            <main className="relative w-full h-full ">
                <div className="w-full h-[7%]  relative  shadow-md  mt-1  justify-center items-center ">
                    <Filter category={category} setCategory={setCategory} input={input} setInput={setInput} handleSearchFilter={handleSearchFilter}/>
                </div>
                <div className="relative grid w-full h-auto grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
                    
                    {filteredItems.length > 0 ?filteredItems.map((item) => (
                        
                        <HomeItems key={item._id} title={item.title} id={item._id} price={item.price} imgUrl={item.fileURL}/>
                    ))
                    :
                    <div className="w-full col-span-full mt-6 p-2  bg-[#F4F5F7]  shadow-md flex justify-center items-center">
                        <p >No products added yet.</p>
                    </div>
                    }
                </div>
            </main>
        </div>
    )
}
export default Home
