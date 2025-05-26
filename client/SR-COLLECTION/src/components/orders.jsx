import React from "react";
import { Link } from "react-router-dom";
const Orders = ({id}) => {
    return(
        <Link to={`/order/${id}`} >
            <div className="w-full h-[20%]  flex justify-around items-center pb-1 text-center pt-1 border-b-1 border-[#D1D5DB] transition transform cursor-pointer active:scale-95">
                <p>OrderID</p>
                <p>Date</p>
                <p>Status</p>
            </div>
        </Link> 
    )
}

export default Orders;