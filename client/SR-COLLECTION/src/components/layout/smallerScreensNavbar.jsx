import React from "react";
import Logo from "../common/logo";
import NavBar from "./navbar";
import { Link, useLocation } from "react-router-dom";
const SmallerScreensNavbar = ({mt,btn,setBtn,setBtnValue,btnValue,color}) => {

    const location = useLocation(); 
    const supervisior = location.pathname === '/supervisior/login' || location.pathname === '/supervisior/adminAccess';
    
    return(
        <>
            {!supervisior&& (

                <div className="absolute right-0 mr-2  z-[1] rounded-full h-[30px] w-[30px] mt-[0.5px]">
                    {localStorage.getItem('token')&&<Link to={"/profile"}><img className="object-cover object-center w-full h-full rounded-full" src="/profilePic.jpg" alt="n/a" /></Link>}
                </div>
            )}
            <div className="w-full">
                <Logo color={color}/>
            </div>
            <div className={`flex flex-row lg:top-3 xl:top-5 `} style={{marginTop: mt || 5}}>
                <NavBar />
            </div>
        </>
    )
}

export default SmallerScreensNavbar;