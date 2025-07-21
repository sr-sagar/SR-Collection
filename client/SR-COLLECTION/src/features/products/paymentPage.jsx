import React from "react"
import {QRCodeCanvas} from 'qrcode.react';
import Button from "../../components/common/button";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
const PaymentPage = ({scroll}) => {
    const {productId,productPrice,productQuantity,handleOrder} = useAppContext()
    const navigate = useNavigate()
    const upiLink = `upi://pay?pa=${import.meta.env.VITE_UPI_ID}&pn=${encodeURIComponent("Sagar Ramani")}&am=${productPrice}&cu=INR`;
    
    const handleOrderClick = () => {
        handleOrder(productId,productPrice,productQuantity);
        toast.success("Your order will be placed shortly.")
        toast.info("Please read the note within the products page for more information.")
        navigate('/')
    }
    return(
        <div className="absolute top-0 left-0 w-full h-full ">
            <header className="w-full max-h-[15%] pb-5 bg-[#F4F5F7] justify-center items-center object-center  ">
                {scroll?
                    <SmallerScreensNavbar />
                :
                    <LargerScreensNavbar />
                }
            </header>
            <main className="w-full  h-[85%]  relative p-2 ">
                <div className=" flex flex-col justify-center items-center space-y-2 w-full h-full bg-[#F4F5F7]">
                    <QRCodeCanvas value={upiLink} size={200}/>
                    <p className="text-sm text-center ">Scan this QR to pay.</p>
                    <Button btnText={"I've Paid"} onClick={handleOrderClick}/>
                </div>
            </main>

        </div>

    )
}

export default PaymentPage;