import React,{useState} from "react";

const InputBox = ({inputType,inputWidth,inputPlaceHolder, value, setValue, name, showToggle = false}) => {

    const [show,setShow] = useState(false);

    const toggleVisible = () => setShow(!show);
    const handleChange = (e) => {
        if(name && typeof setValue === 'function')
        {
            setValue(name, e.target.value);
        }else{
            setValue(e.target.value)
        }
    }
    // const currentScreenSize = window.current.width
    return(
        <div className="flex justify-center w-full h-auto p-1">
            <div className="relative flex items-center justify-center w-full">

            <input
                 
                 type={show && inputType === "password"? "text" : inputType || "text"} 
                 className={` bg-white md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] rounded-md shadow-md p-1`}
                 placeholder={inputPlaceHolder? `${inputPlaceHolder}` : "enter"}
                 style={{width: inputWidth? `${inputWidth}%` : "80%"}}
                 value={value}
                 onChange={handleChange}
            />
            {showToggle && inputType === "password" && value !== '' && (
                <span 
                    onClick={toggleVisible}
                    className="absolute p-1 text-sm text-gray-600 transition transform scale-95 -translate-y-1/2 cursor-pointer right-8 md:left-[65%] lg:left-[62%] xl:left-[60%] top-1/2"
                    >
                    {show? "Hide" : "Show"}
                </span>
            )}
            </div>

        </div>
    )
}

export default InputBox;