import React,{useState,useEffect} from "react";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import InputBox from "../../components/common/inputBox";
import Button from "../../components/common/button";
import PostRequests from "../../services/postRequests";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
const SupervisiorLogIn = ({scroll}) => {
    
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const {setCurrentSupervisior,devLog} = useAppContext();
    const navigate = useNavigate()
    const logInArr = [
        {type: "text" ,text: "email", id: 1, placeholder: "enter your email"},
        {type: "password" ,text: "password", id: 2, placeholder: "password"},
    ]

    const [supervisiorEmailAndPass,setSupervisiorEmailAndPass] = useState({
        'email': '',
        'password': '',
    });

    const [btnClicked,setBtnClicked] = useState(false)


    const handleBtnClick = async() => {
        if(supervisiorEmailAndPass.email && supervisiorEmailAndPass.password)
        {
            setBtnClicked(true)
            const req = await fetch(`${backendURL}/supervisior/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            })

            const res = await req.json()
            if(req.status == 200) {
                setCurrentSupervisior(res.email)
                localStorage.setItem('sToken', res.jwtToken);
                navigate('/supervisior/adminAccess');
            }else{
                toast.error("unable to login.");
                devLog(res.message)
            }
        }
        else{
            setBtnClicked(false)
        }
    }
    

    const handleInputChange = (key,val) => {
        setSupervisiorEmailAndPass(preVal => ({...preVal, [key] : val}));
    }
    
    const details = {
        email: supervisiorEmailAndPass.email,
        password: supervisiorEmailAndPass.password
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
                    {logInArr.map((item) => (
                        <div  key={item.id} className="flex flex-col items-center justify-center w-full">
                                <p className="w-[80%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] text-left pl-1">{item.text}</p>
                            <InputBox  inputType={item.type} inputPlaceHolder={item.placeholder}  value={supervisiorEmailAndPass[item.text]} name={item.text} setValue={handleInputChange} showToggle={item.type === "password"}/>
                        </div>

                    ))
                    
                    }
                    <div className="flex items-center justify-center w-full mt-2">
                        <Button btnText={"LogIn"} btnwidth={90} isLink={false} onClick={handleBtnClick}/>
                    </div>


                </div>
            </main>
        </div>
    )
}

export default SupervisiorLogIn;