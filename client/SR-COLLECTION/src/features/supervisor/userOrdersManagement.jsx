import React from "react";
import { useState } from "react";
import InputBox from "../../components/common/inputBox";
import {toast} from "react-toastify";
import { useEffect } from "react";
const UserOrdersManagement = ({statusSelectValue,setStatusSelectValue, setOrderId, orderId,userName,userPhoneNumber,deliveryDate,setDeliveryDate,orderNumber,setOrderNumber,orderAddressCity,orderHomeAddress}) => {
    const [showDeliveryDate,setShowDeliveryDate] = useState(false)
    const [showOrderNumber,setshowOrderNumber] = useState(false)
    const [showOrderAddress,setshowOrderAddress] = useState(false)
    
    const lastDigits = orderId.slice(-4)
    useEffect(() => {
        if(showOrderAddress)
        {
            toast.info(`${orderAddressCity} ${orderHomeAddress}`)
        }
    },[])
    return(
        <div className="w-full h-full bg-[#F4F5F7] shadow-md max-h-[90px] flex flex-col justify-center items-center space-y-2">
            <div className="flex items-center justify-around w-full ">

                <p>{userName}</p>
                <p>{userPhoneNumber}</p>
                <p className="truncate">{lastDigits}</p>
                <select className="w-[10%] h-[90%] shadow-md rounded-md" value={statusSelectValue} onChange={(e) => {setStatusSelectValue(e.target.value),setOrderId(orderId)}}>
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="shipped">Shipped</option>
                </select>
            </div>
            <div className="flex items-center justify-around w-full space-x-2">

                <button className="w-[25%] h-[90%] bg-[#3EABA9] rounded-md shadow-md flex justify-center items-center max-w-[132px]" onClick={() => {if(showOrderNumber === false && showOrderAddress === false) setShowDeliveryDate(prev => !prev) , setshowOrderNumber(false),setshowOrderAddress(false),setOrderId(orderId)}}>Delivery Date.</button>
                <button className="w-[25%] h-[90%] bg-[#3EABA9] rounded-md shadow-md flex justify-center items-center max-w-[132px]" onClick={() => {if(showOrderNumber === false && showDeliveryDate === false) setshowOrderAddress(prev => !prev) , setshowOrderNumber(false),setShowDeliveryDate(false),setOrderId(orderId)}}>Address.</button>
                <button className="w-[25%] h-[90%] bg-[#3EABA9] rounded-md shadow-md flex justify-center items-center max-w-[132px]" onClick={() => {if(showDeliveryDate === false && showOrderAddress === false) setshowOrderNumber(prev => !prev), setShowDeliveryDate(false),setshowOrderAddress(false),setOrderId(orderId)}}>Order Number.</button>
                <div className={`flex items-center justify-center ${showDeliveryDate || showOrderNumber? "" : "hidden"} `}>

                {showDeliveryDate&& (
                    
                    <InputBox inputPlaceHolder={"Enter Delivery Date."} inputWidth={100} inputType={"text"} value={deliveryDate} setValue={setDeliveryDate}/>
                )}

                {showOrderNumber&& (
                    
                    <InputBox inputPlaceHolder={"Enter Order Number."} inputWidth={100} inputType={"text"} value={orderNumber} setValue={setOrderNumber}/>
                )}
                </div>
            </div>
        </div>
    )
}

export default UserOrdersManagement;