import React from "react";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import ProfileLoggedIn from "./profileLoggedIn";
import ProfileLoggedOut from "./profileLoggedOut";

const Profile = ({scroll,btn,setBtn,btnValue,setBtnValue}) => {

    return(
        <div className="absolute top-0 left-0 w-full h-full ">
            <header className="w-full max-h-[15%] pb-5 bg-[#F4F5F7] justify-center items-center object-center  ">
                {scroll?
                    <SmallerScreensNavbar btn={btn} setBtn={setBtn} btnValue={btnValue} setBtnValue={setBtnValue}/>
                :
                    <LargerScreensNavbar />
                }
            </header>
            <main className="w-full h-[80%] relative ">
                {localStorage.getItem('token')?
                <ProfileLoggedIn />
                :
                <ProfileLoggedOut />
                }
                
            </main>
        </div>
    )
}

export default Profile;
