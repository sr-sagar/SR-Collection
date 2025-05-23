import React from "react";
import "../style/homeItems.css"
import { Link } from "react-router-dom"
const HomeItems = ({title,id,price}) => {
    return(
        <Link to={`/items/${id}`}>
            <div className=" mt-2  ml-2 mr-2  mb-2 aspect-[1.5/2]  lg:aspect-[1.1/1.5]  p-1 shadow-md ">
                <div className="relative w-full h-[90%]">
                    <div className="homeItemsImage"></div>
                </div>
                <p className="font-medium text-left text-black truncate border-t-1">{`${title}`}</p>
                <p className="font-medium text-left text-black">{`$${price}`}</p>
            </div>
        </Link>
    )
}

export default HomeItems;
