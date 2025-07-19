import React from "react";
import CartItems from "../../components/products/cartItems";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
const Cart = ({filteredItems,scroll,handleGetCartItems}) => {

    const {currentUser} = useAppContext();
    useEffect(() => {

        handleGetCartItems()

    },[currentUser])
    return(
        <div className="absolute top-0 left-0 w-full h-full">
            <header className="w-full max-h-[12%] pb-5 bg-[#F4F5F7] justify-center items-center object-center ">
                {scroll? 
                <>
                    <SmallerScreensNavbar />
                </>
                :
                    <LargerScreensNavbar />
                }
            </header>
            <main className="w-full h-[85%]">
                <div className="w-full h-auto pl-2 pr-2 mt-5 mb-5 space-y-3 md:space-y-6 last-of-type:pb-1 ">
                    {filteredItems.length > 0 ?filteredItems?.map((item) => (
                        
                        <CartItems key={item._id} name={item.productTitle} id={item.productId} price={item.productPrice} imgUrl={item.productImageURL}/>
                    ))
                    :
                    <div className="w-full p-2  bg-[#F4F5F7]  shadow-md flex justify-center items-center">
                        <p >No Items in the Cart yet.</p>
                    </div>
                    }
                </div>
            </main>
        </div>
    )

}
export default Cart;
