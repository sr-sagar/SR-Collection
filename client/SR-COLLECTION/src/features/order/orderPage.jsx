import React from "react";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import { useAppContext } from "../../context/AppContext";
import OrderComponent from "./orderComponent";
const OrderPage = () => {
    const {scroll,orders} = useAppContext()
    return(
        <div className="absolute top-0 left-0 w-full h-full ">
            <header className="w-full max-h-[15%] pb-5 bg-[#F4F5F7] justify-center items-center object-center  ">
                {scroll?
                    <SmallerScreensNavbar />
                :
                    <LargerScreensNavbar />
                }
            </header>
            <main className="w-full  h-[85%]  relative  p-2 overflow-y-auto ">
                <div className="w-full h-[15%] bg-[#F4F5F7] shadow-md flex justify-left items-center pl-6">
                    <h3 className="text-2xl">My Orders</h3>
                </div>
                <div className="flex flex-col w-full gap-y-2 ">
                    {orders.length !== 0 && orders.filter((item) => item.orderStatus !== "cancelled").map((item) => (

                        <OrderComponent key={item._id} orderId={item._id} imageURL={item.products.map((item) => item.productImageURL)} id={item.products.map((item) => item.productId)} orderDate={item.orderDate.split("T")[0]} orderNumber={item.orderNumber} orderDeliveryDate={item.orderDeliveryDate}/>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default OrderPage;