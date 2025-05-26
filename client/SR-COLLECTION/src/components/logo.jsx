import React from "react";

const Logo = ({color}) => {
    return(
        <h2 className={`relative text-2xl font-Un  font-bold text-center  text-[${color? color : "white"}] md:text-[#1C1C1E]   lg:text-3xl`}>SR Collection</h2>
    )
}

export default Logo;