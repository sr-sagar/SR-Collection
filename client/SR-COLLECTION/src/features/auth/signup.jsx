import React, { useState } from "react";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import InputBox from "../../components/common/inputBox";
import Button from "../../components/common/button";
import { Link } from "react-router-dom";
import PostRequests from "../../services/postRequests";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const SignUp = ({scroll}) => {

    const navigate = useNavigate();
    const { setCurrentUser,devLog } = useAppContext()

    const arr = [
        {key: "userName",type: "text" ,text: "name", id: 1, placeholder: "enter your name"},
        {key: "email",type: "text" ,text: "email", id: 2, placeholder: "enter your email"},
        {key: "password",type: "password" ,text: "password", id: 4, placeholder: "password"},
        {key: "confirmPassword",type: "password" ,text: "confirm password", id: 5, placeholder: "confirm password"},
    ]
    const arr2 = [
        {key: "phoneNumber",type: "number" ,text: "phone number", id: 3, placeholder: "enter your phone number"},
        {key: "city",type: "text" ,text: "city", id: 6, placeholder: "enter your city name"},
        {key: "location",type: "text" ,text: "home adress", id: 7, placeholder: "enter your home adress"},

    ]
    
    const [btnClicked,setBtnClicked] = useState(false)
    const [msg,setMSG] = useState('')
    const [otp,setOtp] = useState('')
    const [otpSent,setOptSent] = useState(false);
    const [confirmationResult,setConfirmationResult] = useState(null)

    const [userSignUpDetails,setUserSignUpDetails] = useState({
        'userName': '',
        'email': '',
        'phoneNumber': '',
        'password': '',
        'confirmPassword': '',
        'adress': {
            'city': '',
            'location': '',
        },
    });

    const handleInputChange = (key,val) => {
        setUserSignUpDetails(preVal => ({...preVal, [key] : val}));
    }

    const userDetails = {
        userName: userSignUpDetails.userName,
        email: userSignUpDetails.email,
        phoneNumber: userSignUpDetails.phoneNumber,
        password: userSignUpDetails.password,
        confirmPassword: userSignUpDetails.confirmPassword,
        adress: {
            city: userSignUpDetails.adress.city,
            location: userSignUpDetails.adress.location,

        },

        
    
    }
    const handleSubmit = async () => {
        try {
          const res = await PostRequests(userDetails, "userSignUp");
          if (res.status === 201) {
            setCurrentUser(localStorage.getItem("email"));
            navigate("/profile");
          } else {
            setMSG(res.error || res.message);
          }
        } catch (err) {
          setMSG("Something went wrong");
          devLog(err);
        }
      };

    

     
    const handleBtnClick = async() => {
        if(!btnClicked)
        {
            setBtnClicked(true)
        }
        else if(btnClicked && !userSignUpDetails.adress.location)
        {
            setBtnClicked(false)
        }else
        {
            handleSubmit()
        }
    };
    
    return(
        <div className="absolute top-0 left-0 w-full h-full bg- green-600 bg-[#F4F5F7]">
            <header className="w-full max-h-[12%] pb-5 bg-[#F4F5F7] justify-center items-center object-center ">
                {scroll? 
                <>
                    <SmallerScreensNavbar />
                </>
                :
                    <LargerScreensNavbar />
                }
            </header>
            <main className="w-full h-[85%]  flex justify-center pb-5">
                <div className="w-[80%]  mt-5  relative rounded-md shadow-md h-full flex flex-col justify-center items-center space-y-2 ">
                    <h2 className="w-full text-2xl text-center text-shadow-md ">SignUp</h2>
                    {(btnClicked? arr2 : arr).map((item) => (
                        <div key={item.id} className="flex flex-col items-center justify-center w-full">
                                <p className="w-[80%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] text-left pl-1 ">{item.text}</p>
                                <InputBox  
                                inputType={item.type} 
                                inputPlaceHolder={item.placeholder} 
                                name={item.key} 
                                value={
                                    item.key == 'city' || item.key == 'location'? 
                                        userSignUpDetails.adress[item.key] 
                                        : 
                                        userSignUpDetails[item.key]
                                    } 
                                setValue={(key,val) => {

                                    if(key == 'city' || key == 'location')
                                    {
                                        setUserSignUpDetails(preVal => ({...preVal, adress : {
                                            ...preVal.adress,
                                            [key] : val,}}))
                                    }    
                                    else{

                                        handleInputChange(key,val)
                                    }    
                                    
                                }}
                                showToggle={item.key === "password" || item.key === "confirmPassword"}
                                />
                                

                        </div>

                    )) 
                }

                    {msg&& <p className="w-full text-center">{msg}</p>}
                    <div className="flex items-center justify-center w-full mt-2 ">
                        <Button 
                            btnText={!btnClicked? "Next" : (userSignUpDetails.adress.location? "SignUp" : "Back")} 
                            btnwidth={90} 
                            isLink={false} 
                            onClick={handleBtnClick}
                        />
                    </div>
                    <p className="mb-5">Have an account? <Link to={"/user/login"}><span className="text-blue-400 transition transform cursor-pointer active:scale-95">LogIn</span></Link></p>
                    {btnClicked&&

                        <p className="mb-5 text-gray-500" onClick={() => setBtnClicked(false)}>{"<"}Back</p>
                    }

                </div>
            </main>
        </div>
    )
}

export default SignUp;