import React from "react";
import NavBar from "./navbar";
const Profile = () => {

    return(
        <div className="absolute top-0 left-0 w-full h-full ">
            <header className="w-full max-h-[15%] pb-5 bg-yellow justify-center items-center object-center shadow-md ">
                <div className="w-full">
                    <h2 className="relative text-2xl italic font-bold text-center text-black font-bebas top-2 lg:text-3xl xl:text-4xl">SR Collection</h2>
                </div>
                <div className="flex flex-row mt-5 bg-0 [#282828]  lg:top-3 xl:top-5 ">
                    <NavBar />
                </div>
            </header>
            <main className="w-full h-[85%] bg-green-100">
                
            </main>
        </div>
    )
}

export default Profile;
