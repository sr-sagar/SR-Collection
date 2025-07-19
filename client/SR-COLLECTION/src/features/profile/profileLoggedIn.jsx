import React from "react";
import UserDetails from "./userDetails";
import UserOrders from "../order/userOrders";
import UserAccountSettings from "./userAccountSettings";
const ProfileLoggedIn = () => {
    return(
        
    <div className="w-[80%]  h-full left-[10%] md:w-[60%] md:left-[20%] relative rounded-md mb-10 p-2 ">
        <div className="w-full h-[30%] bg-[#F4F5F7]">
            <UserDetails />
        </div>
        <div className="w-full h-[30%] mt-2 bg-[#F4F5F7]">
            <UserOrders />
        </div>
        <div className="w-full h-[30%] pt-2 pb-2  mt-2  rounded-md border-0 border-[#D1D5DB] bg-[#F4F5F7]">
            <UserAccountSettings />
        </div>
    </div>
    )
}

export default ProfileLoggedIn;