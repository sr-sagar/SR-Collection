import React from "react";
import Button from "../../components/common/button";
import DeliveryLoadingBar from "../../components/common/deliveryLoadingBar";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PostRequestWithAuth from "../../services/postRequestWithAuth";
import { useState } from "react";
import { useEffect } from "react";
const OrderComponent = ({imageURL,orderId,id,orderDeliveryDate,orderNumber,orderDate}) => {
    const ID = id[0]
    const {progress} = useAppContext();
    const [firstImageURl,setFirstImageURL] = useState(null)
    const handleCancleOrderPopUp = async() => {
        const result = await Swal.fire({
            title: "Are You Sure?",
            text: "Do you want to cancle this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Cancle Order",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "No, go back!"
        })
        if(result.isConfirmed)
        {
            const cancleOrderData = {
                email: localStorage.getItem("email"),
                orderId: orderId,
            }
            const res = await PostRequestWithAuth(cancleOrderData,"cancleOrder");
            if(res.status === 201 || res.status === 200)
            {
                return Swal.fire("Cancelled!", "The order has been cancelled.", "success")
            }
            else{
                if(res.status === 403)
                {

                    return Swal.fire("Time Limit Passed!", res.message + " " + "if additional help is required, please contact the admin.", 'error');
                }
                return Swal.fire("Something went wrong!", "Some error has occured, please try again later!", 'error');
            }
        }
        else{
            Swal.fire("Safe!", "The order was not cancled.", "info")
        }
    }
    // console.log(imageURL)

    const handleImageDisplay = () => {
        if(imageURL[0].length > 1)
        {
            setFirstImageURL(imageURL[0][0])
        }
        else{
            setFirstImageURL(imageURL[0])
        }
    }
    useEffect(() => {
        const timeout = setTimeout(() => {

            handleImageDisplay()
        },3000)

        return () => clearTimeout(timeout)
    },[])
    return(
        <div className="w-full h-full p-2 bg-[#F4F5F7] shadow-md mt-2">
            <p>Order Status:</p>
            <p>IT'S ORDERED!</p>
            <div className="w-full mt-2 mb-2">
                <DeliveryLoadingBar progress={progress[orderId]}/>
            </div>
            <p className="text-green-600">Estimated delivery {orderDeliveryDate || "Pending."}</p>
            <div className="w-full max-w-md mt-1 ">

                <div className="w-full h-full ">
                    <img src={firstImageURl} 
                        alt="N/A" 
                        className="object-cover object-center w-full h-full bg-no-repeat "
                        />
                </div>
            </div>
            <div className="flex w-full h-[40%]  border-t-1 p-1 justify-center items-center mt-3">
                <div className="flex flex-col justify-left items-center w-[50%] h-[full] mt-2">
                    <p className="w-full md:w-auto">ORDER NO: {orderNumber}</p>
                    <p>ORDER DATE: {orderDate}</p>
                </div>
                <div className="flex flex-col justify-right items-center w-[50%] h-[full] space-y-2 mt-2">
                    <Link to={`/homeItems/products/${ID}`}><Button btnText={"View Product"} isLink={true} /></Link>
                    <Link><Button btnText={"Cancel Order"} isLink={true} onClick={handleCancleOrderPopUp}/></Link>
                </div>

            </div>
        </div>
    )
} 

export default OrderComponent;