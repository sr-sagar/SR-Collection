import React, { useState} from "react";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import InputBox from "../../components/common/inputBox";
import Button from "../../components/common/button";
import { Link } from "react-router-dom";
import PostRequests from "../../services/postRequests";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
const LogIn = ({scroll}) => {

    const navigate = useNavigate();
    const { setCurrentUser } = useAppContext()
    
    const arr = [
        {type: "text" ,text: "email", id: 1, placeholder: "enter your email"},
        {type: "password" ,text: "password", id: 2, placeholder: "password"},
    ]

    const [userEmailAndPass,setUserEmailAndPass] = useState({
        'email': '',
        'password': '',
    });

    const [btnClicked,setBtnClicked] = useState(false)
    const [msg,setMSG] = useState('')



    const handleBtnClick = async() => {
        if(userEmailAndPass.email && userEmailAndPass.password)
        {
            setBtnClicked(true)
            const res = await PostRequests(userDetails, "userLogIn")

            if(res.status == 200) {
                setCurrentUser(localStorage.getItem('email'))
                navigate('/profile')
            }else{
                setMSG(res.error)
            }
        }
        else{
            setBtnClicked(false)
        }
    }
    

    const handleInputChange = (key,val) => {
        setUserEmailAndPass(preVal => ({...preVal, [key] : val}));
    }
    
    // this is a fake user for testing purpose. remove this before production
    const userDetails = {
        email: userEmailAndPass.email,
        password: userEmailAndPass.password
    }


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
                    <h2 className="w-full text-2xl text-center text-shadow-md ">LogIn</h2>
                    {arr.map((item) => (
                        <div  key={item.id} className="flex flex-col items-center justify-center w-full">
                                <p className="w-[80%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] text-left pl-1">{item.text}</p>
                            <InputBox  inputType={item.type} inputPlaceHolder={item.placeholder}  value={userEmailAndPass[item.text]} name={item.text} setValue={handleInputChange} showToggle={item.type === "password"}/>
                        </div>

                    ))
                    
                    }
                    {msg&& <p className="w-full text-center">{msg}</p>}
                    <div className="flex items-center justify-center w-full mt-2">
                        <Button btnText={"LogIn"} btnwidth={90} isLink={false} onClick={handleBtnClick}/>
                    </div>
                    <p>Don't have an account? <Link to={"/user/signup"}><span className="text-blue-400 transition transform cursor-pointer active:scale-95">SignUp</span></Link></p>


                </div>
            </main>
        </div>
    )
}

export default LogIn;