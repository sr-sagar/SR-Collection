import React from "react";

const Select = ({selArr,selMaxWidth, setVal}) => {
    return(
        <div className="relative flex items-center justify-center w-full h-auto p-2 rounded-md">
            <select className="w-full h-[90%] shadow-md rounded-md" style={{maxWidth: selMaxWidth + "px" || "100%"}} onChange={(e) => setVal(e.target.value === 'true')}>
                {selArr.map((items) => (

                    <option key={items.id} value={items.selValue} >{items.selText}</option>
                    
                ))
                }
            </select>
        </div>
    )
}

export default Select;