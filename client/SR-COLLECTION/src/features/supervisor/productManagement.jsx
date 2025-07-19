import React from "react";
import { useState } from "react";
const ProductManagement = ({setProductId,productId,createdAt,title,handleDeleteProduct}) => {
    
    // const newCreatedAt = createdAt.split("T")[0]

    
    const lastDigits = productId.slice(-4)
    return(
        <div className="w-full h-full bg-[#F4F5F7] shadow-md max-h-[90px] flex flex-col justify-center items-center space-y-2">
            <div className="flex items-center justify-around w-full ">

                <p className="truncate">{title.slice(0,10)}</p>
                <p>{String(createdAt).split("T")[0]}</p>
                <p className="truncate">{lastDigits}</p>
                <p className="absolute right-6 top-1/2.5 text-sm transform transition active:scale-95 text-gray-600" onClick={() => {handleDeleteProduct(productId)}}>delete</p>
                
            </div>
        </div>
    )
}

export default ProductManagement;