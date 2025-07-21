import React from "react";
import { Link } from "react-router-dom"
const HomeItems = ({title,id,price,imgUrl}) => {
    const firstImage = imgUrl[0]

    return(
        <Link to={`/homeItems/products/${id}`}>
            <div className=" mt-2  ml-2 mr-2  mb-2 aspect-[1.5/2]  lg:aspect-[1.1/1.5]  p-1 shadow-md bg-[#F4F5F7]">
                <div className="relative w-full h-[90%]">
                    <img src={firstImage} alt="N/A" className="w-full h-full p-[2px] object-center object-cover bg-no-repeat absolute"/>

                </div>
                <p className="font-medium  text-left text- [#8C8C94] text-black font-Space truncate border-t-1">{`${title}`}</p>
                <p className="font-medium text-left text- [#8C8C94] text-black font-Space">{`${"\u20B9"}${price}`}</p>
            </div>
        </Link>
    )
}

export default HomeItems;
