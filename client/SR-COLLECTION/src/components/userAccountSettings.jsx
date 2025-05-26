import React from "react";
import { Link } from "react-router-dom";
import "../style/userAccountSettings.css";
const UserAccountSettings = () => {
    return(
        <div className="grid items-center justify-center w-full h-full grid-cols-1 ">
            <h3 className="w-full mb-2">Account Settings</h3>
            <Link>
                <div className="settingItems" >
                    <p>Change Password</p>
                </div>
            </Link>
            <Link>
                <div className="settingItems">
                    <p>Manage Address</p>
                </div>
            </Link>
            <Link>
                <div className="settingItems">
                    <p>Payment Methods</p>
                </div>
            </Link>
            <Link>
                <div className="settingItems">
                    <p>Logout</p>
                </div>
            </Link>

        </div>
    )
}

export default UserAccountSettings;