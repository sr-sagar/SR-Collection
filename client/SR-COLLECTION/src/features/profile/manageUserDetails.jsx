import React from "react";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import InputBox from "../../components/common/inputBox";
import Button from "../../components/common/button";
import { useState } from "react";
import PostRequestWithAuth from "../../services/postRequestWithAuth";
import { useEffect } from "react";
import GetRequests from "../../services/getRequests";
import { useAppContext } from '../../context/AppContext'
import { toast } from "react-toastify";
const ManageUserDetails = ({scroll}) => {

    const {handleLogOut,devLog} = useAppContext()
    const userDetails = [
        {id: 1,text: 'email', type: "text", placeHolder: "enter new email.", newName: "newEmail", oldName: "email"},
        {id: 2,text: 'name', type: "text", placeHolder: "enter new name.", newName: "newUserName", oldName: "name"},
        {id: 3,text: 'phone number', type: "text", placeHolder: "enter new phone number.", newName: "newPhoneNumber", oldName: "phoneNumber"},
        {id: 4,text: 'city', type: "text", placeHolder: "enter new city.", newName: "newCity", oldName: "city"},
        {id: 5,text: 'location', type: "text", placeHolder: "enter new location.", newName: "newLocation", oldName: "location"},
    ]
    const [newValues,setNewValues] = useState({
        
        'newEmail': '',
        'newUserName': '',
        'newPhoneNumber': '',
        'newCity': '',
        'newLocation': '',
        
    })
    const [currentValues,setCurrentValues] = useState({
        
        'email': '',
        'userName': '',
        'phoneNumber': '',
        'city': '',
        'location': '',
    });

    useEffect(() => {
        const fetchUserData = async() => {
            const res = await GetRequests('userAccount/userDetails');

            // const res = await req.json()
            if(res.status == 201)
            {
                const {email,userName,phoneNumber} = res.res.user;
                const {city, location} = res.res.user.adress;
                setCurrentValues({email, userName,phoneNumber, city, location}) 
                setNewValues({
                    newEmail: email,
                    newUserName: userName,
                    newPhoneNumber: phoneNumber,
                    newCity: city,
                    newLocation: location,
                });
            }
            else{
                devLog(res.message)
                return toast.error("unable to get user.") 
            }

        }

        fetchUserData();
    },[])
    
    
    const handleInputValueSetter = (key,val) => {
        setNewValues(prev => ({...prev,[key]: val}))
    }

    const handleNewDataSubmit = async() => {
        const changedFields = {}
        userDetails.forEach(({newName, oldName}) => {
            if(newValues[newName] !== currentValues[oldName])
            {
                changedFields[newName] = newValues[newName];
            }
        });

        if(Object.keys(changedFields).length === 0)
        {
            return toast.info("No Changes Made.");
        }
        const req = await PostRequestWithAuth({email : localStorage.getItem('email'), changedFields}, 'userAccount/userDetails');
        // const res  = await req.json()
        if(req.status == 200)
        {
            toast.success(req.message);
            if(req.isEmail)
            {
                return handleLogOut()

            }
            return window.location.href = "/profile";

        }  
        else{
            devLog(req.message)
            return toast.error(req.message);
        }      
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
                    <div className="flex flex-col items-center justify-center w-full">
                        {userDetails.map((item) => (
                            <div className="flex flex-col items-center justify-center w-full" key={item.id}>
                                <p className="w-[80%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] text-left p-1">{item.text}</p>
                                <InputBox 

                                inputType={item.type} 
                                inputPlaceHolder={item.placeHolder} 
                                value={newValues[item.newName]} 
                                setValue={handleInputValueSetter}
                                name={item.newName}
                                />
                            </div>
                        ))}
                            
                    </div>
                
                    

                    <Button btnText={"Next"} onClick={() => {handleNewDataSubmit()}} isLink={false} btnwidth={80}/>
                    
                </div>
            </main>
        </div>
        
    )
}

export default ManageUserDetails;