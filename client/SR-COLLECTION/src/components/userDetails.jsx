import React from "react";
import "../style/userDetails.css"
const UserDetails = () => {
    return(
        <div className="w-full h-full relative pt-2 pb-2 pl-2 pr-2 flex gap-x-3 justify-center items-center border-[0.05px] border-[#D1D5DB] rounded-2xl">
            <div className="relative flex items-center justify-center mb-2 ml-2 mr-2 bg-yellow-300 rounded-full w-24 h-24 z-[1]">
                <div className="rounded-full userProfilePicture"></div>
            </div>
            <div className="w-auto h-auto space-y-0.5 ">
                <h3 className="text-[15px] text-[#6e6b67]">John Doe</h3>
                <p className="text-[10px] text-[#6e6b67]">JohnDoe@gamil.com</p>
                <div className="grid items-center justify-center grid-cols-1 mt-3">
                    <button className="text-white bg-[#3EABA9] rounded-full text-[12px] active:scale-95 transform transition cursor-pointer">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;