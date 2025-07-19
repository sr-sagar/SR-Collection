import React from "react";

const DeliveryLoadingBar = ({progress}) => {
    return(
        <div className="w-full h-4 overflow-hidden bg-green-300 rounded-full">
            <div 
                className="w-full h-full bg-green-500 transition-all duration-500" 
                style={{width: `${progress}%`}}>
            </div>
        </div>
    )
}

export default DeliveryLoadingBar;