import React from "react";
import NavBar from "./navbar";
import Logo from "./logo";
import UserDetails from "./userDetails";
import UserOrders from "./userOrders";
import UserAccountSettings from "./userAccountSettings";
const Profile = ({scroll}) => {

    return(
        <div className="absolute top-0 left-0 w-full h-full ">
            <header className="w-full max-h-[15%] pb-5 bg-yellow justify-center items-center object-center  ">
                {scroll?
                    <>
                        <div className="w-full">
                            <Logo />
                            {/* <h2 className="relative text-2xl italic font-bold text-center text-black font-bebas top-2 lg:text-3xl xl:text-4xl">SR Collection</h2> */}
                        </div>
                        <div className="flex flex-row mt-5 bg-0 [#282828]  lg:top-3 xl:top-5 ">
                            <NavBar />
                        </div>
                    </>
                :
                    <div className="w-full h-20 bg-[#F4F5F7] flex  z-[1] justify-between items-center  pl-5 pr-5 shadow-md ">

                        <div className="relative flex flex-row items-center">
                            <Logo />
                        </div>
                        <div className="relative flex flex-row items-center">
                            <NavBar />
                        </div>

                    </div>
                }
            </header>
            <main className="w-full h-[80%] relative ">
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
                
            </main>
        </div>
    )
}

export default Profile;
