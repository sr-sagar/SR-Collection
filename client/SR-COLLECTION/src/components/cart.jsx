import React from "react";
import NavBar from "./navbar";
import CartItems from "./cartItems";
import Logo from "./logo";
const Cart = ({filteredItems,scroll}) => {
    return(
        <div className="absolute top-0 left-0 w-full h-full">
            <header className="w-full max-h-[12%] pb-5 bg-yellow justify-center items-center object-center ">
                {scroll? 
                <>
                    <div className="w-full">
                        {/* <h2 className="relative text-2xl italic font-bold text-center text-black font-bebas top-2 lg:text-3xl xl:text-4xl">SR Collection</h2> */}
                        <Logo />
                    </div>
                    <div className="flex flex-row mt-5 lg:top-3 xl:top-5 ">
                        <NavBar />
                    </div>
                </>
                :
                    <div className="w-full h-20 bg-[#F4F5F7] flex  z-[1] justify-between items-center  pl-5 pr-5 shadow-md ">

                        <div className="relative flex flex-row items-center">
                            <Logo />
                        </div>
                        <div className="relative flex flex-row items-center">
                            <NavBar />
                        </div>

                    </div>
                }
            </header>
            <main className="w-full h-[85%]">
                <div className="w-full h-auto pl-2 pr-2 mt-5 mb-5 space-y-3 md:space-y-6 last-of-type:pb-1 ">
                    {filteredItems.map((i) => (
                        
                        <CartItems name={i.name} price={i.price} id={i.id} key={i.id}/>
                    ))}
                </div>
            </main>
        </div>
    )

}
export default Cart;
