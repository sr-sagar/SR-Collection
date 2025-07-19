import React from "react";
import Button from "../../components/common/button";
import { Link } from "react-router-dom";
const ProfileLoggedOut = () => {
    return(
        
    <div className="w-[80%] mt-5 h-full left-[10%] md:w-[60%] md:left-[20%] relative bg-[#F4F5F7] shadow-md flex flex-col  justify-center items-center rounded-md mb-5 p-2 ">
        <div className="w-full h-[20%]  relative">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--profile-account-sign-music-app-features-pack-design-development-illustrations-3757211.png?f=webp" alt="N/A" className="absolute object-contain object-center w-full h-full bg-no-repeat "/>
        </div>
        <h3 className="mt-2 mb-2 text-center">Please LogIn/SignUp to view this page...</h3>
        <div className="flex justify-center w-full h-auto ml-2 mr-2 rounded-md">
            <Link to={"/user/signup"}><Button btnwidth={100} btnText={"SignUp/LogIn"} isLink={true} /></Link>
        </div>
    </div>
    )
}

export default ProfileLoggedOut;