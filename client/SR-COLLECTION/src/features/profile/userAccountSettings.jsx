import React from "react";
import { Link } from "react-router-dom";
import "../../style/userAccountSettings.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
const UserAccountSettings = () => {
    const {handleLogOut} = useAppContext();
    
    const navigate = useNavigate();
    return(
        <div className="grid items-center justify-center w-full h-full grid-cols-1 ">
            <h3 className="w-full mb-2">Account Settings</h3>
            <Link to={'/userAccount/manageAccount'}>
                <div className="settingItems" >
                    <p>Change Password</p>
                </div>
            </Link>
            <Link to={'/userAccount/editDetails'}>
                <div className="settingItems">
                    <p>Manage Address</p>
                </div>
            </Link>
            {/* <Link>
                <div className="settingItems">
                    <p>Payment Methods</p>
                </div>
            </Link> */}
            <Link>
                <div className="settingItems">
                    <p onClick={() => {handleLogOut()}}>Logout</p>
                </div>
            </Link>

        </div>
    )
}

export default UserAccountSettings;