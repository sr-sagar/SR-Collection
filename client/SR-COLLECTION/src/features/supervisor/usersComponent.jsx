import React from "react";
import { useState } from "react";
const UsersComponent = ({userName,userEmail,userRole,selectValue,setSelectValue, setUserId, userId}) => {
    return(
        <div className="w-full h-full bg-[#F4F5F7] shadow-md max-h-[60px] flex justify-around items-center ">
            <p>{userName}</p>
            <p>{userEmail}</p>
            <p>{userRole}</p>
            <select className="w-[10%] h-[90%] shadow-md rounded-md" value={selectValue} onChange={(e) => {setSelectValue(e.target.value),setUserId(userId)}}>
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </div>
    )
}

export default UsersComponent;