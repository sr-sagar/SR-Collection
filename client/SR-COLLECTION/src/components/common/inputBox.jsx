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
    return(
        <div className="flex items-center justify-center w-full h-auto p-1">
            <input
                 
                type={show && inputType === "password"? "text" : inputType || "text"} 
                className={` bg-white md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] rounded-md shadow-md p-1`}
                placeholder={inputPlaceHolder? `${inputPlaceHolder}` : "enter"}
                style={{width: inputWidth? `${inputWidth}%` : "80%"}}
                value={value}
                onChange={handleChange}
            />
            {showToggle && inputType === "password" && (
                <span 
                    onClick={toggleVisible}
                    className="absolute right-9 md:right-42 lg:right-64 xl:right-104 top-1/2.5 transform transition scale-95 cursor-pointer text-sm text-gray-600"
                >
                    {show? "Hide" : "Show"}
                </span>
            )}

        </div>
    )
}

export default InputBox;