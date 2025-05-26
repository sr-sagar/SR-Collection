import React from "react";
import "../style/navbar.css"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const NavBar = () => {

    const loctaion = useLocation(); 

    return(
        <div className="navbarOuter flex justify-center items-center w-full relative text-[13px] ">
            <div className="w-[90%] absolute rounded-2xl bg-gray-0 h-full shadow-md bg-[#F6F1EB] backdrop-blur-md md:hidden"></div>
            <ul className="flex space-x-8 font-medium text-center text-white  cursor-pointer lg:space-x-15 lg:text-1xl xl:space-x-20 xl:text-[20px]">
                <Link to={'/'}><li className={`NavbarItems ${loctaion.pathname == '/' ? "navbarItemsPressed" : "navbarItemsStill"}`}>Home</li></Link>
                <Link to={'/search'}><li className={`NavbarItems ${loctaion.pathname == '/search' ? "navbarItemsPressed" : "navbarItemsStill"}`}>Search</li></Link>
                <Link to={'/cart'}><li className={`NavbarItems ${loctaion.pathname == '/cart' ? "navbarItemsPressed" : "navbarItemsStill"}`}>Cart</li></Link>
                <Link to={'/profile'}><li className={`NavbarItems ${loctaion.pathname == '/profile' ? "navbarItemsPressed" : "navbarItemsStill"}`}>Profile</li></Link>
            </ul>
        </div>
    )
}
export default NavBar
