import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import Description from "../../components/common/description";
import Button from "../../components/common/button";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
const ProductsPage = ({scroll, filteredItems}) => {

    const [product, setProduct] = useState(null);
    
    const { id }  = useParams();
    const navigate = useNavigate();


    

    const {setProductId,setProductPrice,setProductQuantity,devLog} = useAppContext()
    useEffect(() => {
        if(filteredItems?.length > 0)
        {
            const found = filteredItems.find(item => String(item._id) == String(id));
            setProduct(found || null);
        }
    },[id,filteredItems])
    
    
    const handleAddToCart = async() => {
        if(localStorage.getItem("token"))
        {

            const productId = product._id
            try{

                const cart = {
                email: localStorage.getItem('email'),
                productId: productId,
                productPrice: product.price,
                productQuantity: 1,
            }
            const req = await fetch("http://localhost:8080/userCart/addProducts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(cart)
            })
            const res = await req.json();
            if(req.status == 404 || req.status == 403 || req.status == 400)
            {
                toast.error("unable to add product to cart. please try again later.")
                devLog(res);
            }
            }catch(err)
            {
                toast.error("something went wrong, please try again later.");
                devLog("something went wrong", err);
            }
        }else{
            toast.error("Please SignUp/Login first to order.");

        }
    }

    // this function sets the order details of a product
    const handleSetProductsDetails = () => {
        if(localStorage.getItem("token"))
        {

            setProductId(product._id)
            setProductPrice(product.price)
            setProductQuantity(1)
            navigate('/productsPage/PaymentPage')
        }
        else{
            toast.error("Please SignUp/Login first to order.");
        }
    }

    if(product == undefined || product == null)
    {
        return(

            <div className="absolute top-0 left-0 w-full h-full ">
                <header className="w-full max-h-[15%] pb-5 bg-[#F4F5F7] justify-center items-center object-center  ">
                    {scroll?
                        <SmallerScreensNavbar />
                    :
                        <LargerScreensNavbar />
                    }
                </header>
                <main className="w-full  h-[85%]  relative  pt-2 pr-2 pl-2 overflow-y-auto pb-2">
                    <div className="flex items-center justify-center w-full h-full">
                        <p>{product == null?"Product Not Found" : "Products Loding"}</p>
                    </div>
                </main>
            </div>
        )
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
            <main className="w-full  h-[85%]  relative  pt-2 pr-2 pl-2 overflow-y-auto pb-2">
                <div className="w-full h-[40%] bg-[#F4F5F7] relative shadow-md overflow-x-auto whitespace-nowrap">
                    {Array.isArray(product.fileURL) && product.fileURL.length > 0? (
                        product.fileURL.map((url,_id) => (
                            <img key={_id} src={url} alt="N/A" className=" w-auto inline-block object-contain object-[center_top]  h-full bg-no-repeat " />
                        ))
                     ) :
                         (
                            <p>No Image Found</p>
                         )   
                    }
                </div>
                <div className="relative w-full mt-2 bg-[#F4F5F7] shadow-md p-1 ">
                    <h3>title: {product.title}</h3>
                </div>
                <div className="relative w-full mt-2 bg-[#F4F5F7]">
                    <Description text={product.description}/>
                </div>
                <div className="relative w-full mt-3 bg-[#F4F5F7] shadow-md p-1">
                    <p >Price: {"\u20B9"}{product.price}</p>
                    <p className="mt-1">Available: {product.availbility == true? "available." : "not available."}</p>
                    <p className="mt-1">Note: This product once bought cannot be returned or refunded.</p>
                </div>
                <div className="w-full h-[20%]  mt-3 flex flex-col justify-center items-center p-2 space-y-3">
                    <div className="flex items-center justify-center w-full">
                        <Button btnText={"Buy"} btnwidth={50} onClick={handleSetProductsDetails}/>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <Button btnText={"Add to Cart"} btnwidth={50} onClick={handleAddToCart}/>
                    </div>
                </div>
            </main>
        
        </div>
    )
}

export default ProductsPage;