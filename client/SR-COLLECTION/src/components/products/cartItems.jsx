import React from "react";
import { Link } from "react-router-dom"
const CartItems = ({name,price,id,imgUrl}) => {
    
    return(
        <Link to={`/cartItems/products/${id}`}>
            <div className="flex w-full h-20 mt-2 mb-2 shadow-md md:h-30 bg-red-0 gap-x-2 bg-[#F4F5F7]">
                <div className="w-[40%] h-full relative aspect-[2/1]">
                    <img src={imgUrl[0]} alt="N/A" className="w-full h-full p-[2px] object-center object-cover bg-no-repeat absolute"/>
                </div>
                <div className="h-full overflow-x-hidden ">

                    <p className="w-full mt-1 truncate text- [#8C8C94] text-black whitespace-nowrap font-Space">{`${name}`}</p>
                    <p className="relative w-full mt-1 text- [#8C8C94] text-black align-bottom font-Space">{`$${price}`}</p>
                </div>
            </div>
        </Link>
    )
}

export default CartItems;