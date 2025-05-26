import React from "react";
import Orders from "./orders";
const UserOrders = () => {
    const orders = [
        {'name' : 'landi patta', id: 1},
        {'name' : 'dupatta', id: 2},
        {'name' : 'dress', id: 3},
        {'name' : 'dress', id: 4},
        {'name' : 'dress', id: 5},
        {'name' : 'dress', id: 5},
        {'name' : 'dress', id: 6},
        {'name' : 'dress', id: 7},
        {'name' : 'dress', id: 8},
        {'name' : 'dress', id: 9},
        {'name' : 'dress', id: 10},
        {'name' : 'dress', id: 11},
        {'name' : 'dress', id: 12},
    ]
    return(
        <div className="relative w-full h-full ">
            <h3 className="h-[15%] w-full">Your Order</h3>
            <div className="relative w-full h-[85%] overflow-y-auto border-1 border-[#D1D5DB] rounded-md" style={{scrollbarWidth: "none"}}>

                <div className="w-full h-auto pt-2 pb-2 space-y-2">
                    {orders.map((i) => (
                        <Orders id={i.id} key={i.id}/>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default UserOrders;