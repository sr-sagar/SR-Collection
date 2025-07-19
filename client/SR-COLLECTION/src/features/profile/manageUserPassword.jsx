import React from "react";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import InputBox from "../../components/common/inputBox";
import Button from "../../components/common/button";
import { useState } from "react";
import PostRequestWithAuth from "../../services/postRequestWithAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ManageUserPassword = ({scroll}) => {
    const navigate = useNavigate()
    const [newPassword,setNewPassword] = useState({
        'newPassword': '',
        'confirmPassword': '',
    })
    const [currentPassword,setCurrentPassword] = useState('');
    const [hideForm,setHideForm] = useState(false)

    
    const handleCurrentPassword = async() => {
        
        if(!hideForm && !currentPassword){return toast.error("please enter your current password.")}
        if(hideForm){
            const {newPassword: np, confirmPassword: cp} = newPassword;
            if(!np || !cp)
            {
                return toast.error("Please enter new password in all fields.")
            }
            if(np !== cp)
            {
                return toast.error("Password do not match.")
            }
        }
        const payload = hideForm? 
        {
            
                email: localStorage.getItem('email'),
                newPassword: newPassword['newPassword'],
                confirmPassword: newPassword['confirmPassword'],
        
            
        }
        :
        {
            
                email: localStorage.getItem('email'),
                currentPassword,
            

        }

        const endpoint = hideForm
        ? 'userAccount/changePassword'
        : 'userAccount/currentPassword'
        const res = await PostRequestWithAuth(payload,endpoint)
        if(res.status == 200 || res.status == 201)
        {
            if(!hideForm){
                setHideForm(true)
                return;
            }
            navigate('/profile')

        }
        else{
            toast.error("incorrect password.")
            setHideForm(false)
            return;
        }
    }
    
    const handleInputValueSetter = (key,val) => {
        setNewPassword(prev => ({...prev,[key]: val}))
    }
    return(
        <div className="absolute top-0 left-0 w-full h-full">
            <header className="w-full max-h-[12%] pb-5 bg-[#F4F5F7] justify-center items-center object-center ">
                {scroll? 
                <>
                    <SmallerScreensNavbar />
                </>
                :
                    <LargerScreensNavbar />
                }
            </header>
            <main className="w-full h-[85%] p-2">
                <div className="flex flex-col items-center justify-center w-full h-full space-y-2 bg-[#F4F5F7]">
                    {!hideForm&&
                        <div className="flex flex-col items-center justify-center w-full">
                            <p>Enter Current Password</p>
                            <InputBox 
                                inputType={"password"} 
                                inputPlaceHolder={"enter current password"} 
                                value={currentPassword} 
                                setValue={setCurrentPassword}
                            />
                                
                        </div>
                    }
                    {hideForm&&
                        <>
                        <p>Enter New Password</p>
                        <InputBox 
                            inputType={"password"} 
                            inputPlaceHolder={"enter new password"} 
                            value={newPassword.newPassword} 
                            setValue={handleInputValueSetter}
                            name={'newPassword'}/>
                        <p>Enter Confirm Password</p>
                        <InputBox 
                            inputType={"password"} 
                            inputPlaceHolder={"enter confirm password"} 
                            value={newPassword.confirmPassword} 
                            setValue={handleInputValueSetter}
                            name={'confirmPassword'}
                        />
                        </>
                    }

                    <Button btnText={"Next"} onClick={() => {handleCurrentPassword()}} isLink={false} btnwidth={80}/>
                    
                </div>
            </main>
        </div>
        
    )
}

export default ManageUserPassword;