import React from "react";

const Logo = ({color}) => {
    return(
        <h2 className={`relative text-2xl text font-bold text-center  md:text-[#1C1C1E] lg:text-3xl`}  style={{fontFamily: "", color: `${color? color : "black"}`}}>SR Collection</h2>
    )
}

export default Logo;