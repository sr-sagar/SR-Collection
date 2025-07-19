import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect,useState } from "react";
const Orders = ({id,orderId,orderDate,orderStatus}) => {

    
    return(
        <Link to={`/order/${id}`} >
            <div className="w-full h-[20%]  flex justify-around items-center pb-1 text-center pt-1 border-b-1 border-[#D1D5DB] transition transform cursor-pointer active:scale-95">
                <p className="truncate">{orderId}</p>
                <p className="truncate">{orderDate}</p>
                <p>{orderStatus}</p>
            </div>
        </Link> 
    )
}

export default Orders;