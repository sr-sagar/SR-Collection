import React from "react";
import Logo from "../common/logo";
import NavBar from "./navbar";
const LargerScreensNavbar = ({shadowColor}) => {
    return(
        <div className={`w-full h-20 bg-[#F4F5F7] flex  z-[1] justify-between items-center  pl-5 pr-5 shadow-md `} style={{shadowColor: shadowColor || "none"}}>

            <div className="relative flex flex-row items-center">
                <Logo />
            </div>
            <div className="relative flex flex-row items-center">
                <NavBar />
            </div>

        </div>
    )
}

export default LargerScreensNavbar;