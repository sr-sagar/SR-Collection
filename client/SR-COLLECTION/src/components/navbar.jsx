import React from "react";
import "../style/navbar.css"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const NavBar = () => {

    const loctaion = useLocation(); 

    return(
        <div className="navbarOuter flex justify-center items-center w-full relative text-[13px] ">
            <div className="w-[90%] absolute rounded-2xl bg-gray-0 h-full shadow-md bg-black backdrop-blur-md "></div>
            <ul className="flex space-x-8 font-medium text-center text-white cursor-pointer lg:space-x-15 lg:text-1xl xl:space-x-20 xl:text-2xl">
                <Link to={'/'}><li className={`NavbarItems ${loctaion.pathname == '/' ? "navbarItemsPressed" : "text-white"}`}>Home</li></Link>
                <Link to={'/search'}><li className={`NavbarItems ${loctaion.pathname == '/search' ? "navbarItemsPressed" : "text-white"}`}>Search</li></Link>
                <Link to={'/cart'}><li className={`NavbarItems ${loctaion.pathname == '/cart' ? "navbarItemsPressed" : "text-white"}`}>Cart</li></Link>
                <Link to={'/profile'}><li className={`NavbarItems ${loctaion.pathname == '/profile' ? "navbarItemsPressed" : "text-white"}`}>Profile</li></Link>
            </ul>
        </div>
    )
}
export default NavBar
