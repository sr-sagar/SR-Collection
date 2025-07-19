import React from "react";


const Button = ({btnText,btnwidth,isLink,onClick}) => {
    

    return(
        <button 
            className={` p-2 rounded-md shadow-md bg-[#3EABA9] active:scale-95 transition transform md:max-w-[${isLink? "100%" : "50%"}] lg:max-w-[${isLink? "100%" : "40%"}] xl:max-w-[${isLink? "100%" : "30%"}]`} 
            style={{width: btnwidth?   `${btnwidth}%` : "100%"}}  
            onClick={onClick? () => onClick() : undefined}
            >
            {btnText}
        </button>
    )
}

export default Button;