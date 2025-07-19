import React from "react";
import Orders from "./orders";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
const UserOrders = () => {
    const {orders,handleGetOrders} = useAppContext();
    useEffect(() => {
        handleGetOrders()
    },[])
    return(
        <div className="relative w-full h-full ">
            <h3 className="h-[15%] w-full">Your Order</h3>
            <div className="relative w-full h-[85%] overflow-y-auto border-1 border-[#D1D5DB] rounded-md" style={{scrollbarWidth: "none"}}>

                <div className="w-full h-auto pt-2 pb-2 space-y-2">
                    {orders.length > 0 ?orders?.map((item) => (
                        <Orders id={item._id} key={item._id} orderId={item._id} orderDate={item.orderDate} orderStatus={item.orderStatus}/>
                    ))
                    :
                    <div className="w-full p-2  bg-[#F4F5F7]   flex justify-center items-center">
                        <p >No Orders yet.</p>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserOrders;