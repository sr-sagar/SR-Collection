import React from "react";
import "../../style/navbar.css"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
const NavBar = () => {

    const location = useLocation(); 
    const userRole = localStorage.getItem('userRole')
    const supervisor = location.pathname === '/supervisior/login' || location.pathname === '/supervisior/adminAccess';
    const {handleSupervisorLogOut} = useAppContext();
    return(
        <div className="navbarOuter flex justify-center items-center w-full relative text-[13px] ">
            <div className={`w-[90%] absolute rounded-2xl  h-full shadow-md bg-[#F6F1EB] backdrop-blur-md md:hidden ${supervisor? 'hidden' : ''}`}></div>
            {supervisor?
            <div className="flex w-full pr-2 justify-end-safe">
                <p onClick={() => {handleSupervisorLogOut(location)}} className="pl-1 pr-1 transition transform rounded-full shadow-md cursor-pointer active:scale-95 hover:text-blue-700 z-[1]">Logout</p>

            </div>
            :
            <ul className={`flex  ${userRole == 'admin'? "space-x-4" : "space-x-8"} font-medium text-center text-white  cursor-pointer lg:space-x-15 lg:text-1xl xl:space-x-20 xl:text-[20px]`}>
                <Link to={'/'}><li className={`NavbarItems ${location.pathname == '/' ? "navbarItemsPressed" : "navbarItemsStill"}`}>Home</li></Link>
                <Link to={'/search'}><li className={`NavbarItems ${location.pathname == '/search' ? "navbarItemsPressed" : "navbarItemsStill"}`}>Search</li></Link>
                <Link to={'/cart'}><li className={`NavbarItems ${location.pathname == '/cart' ? "navbarItemsPressed" : "navbarItemsStill"}`}>Cart</li></Link>
                {userRole == 'admin'&&
                    <Link to={'/admin/addProducts'}><li className={`NavbarItems ${location.pathname == '/admin/addProducts' ? "navbarItemsPressed" : "navbarItemsStill"}`}>Products</li></Link>
                }
                <Link to={'/profile'}><li className={`NavbarItems ${location.pathname == '/profile' ? "navbarItemsPressed" : "navbarItemsStill"}`}>Profile</li></Link>
            </ul>
            }
        </div>
    )
}
export default NavBar
