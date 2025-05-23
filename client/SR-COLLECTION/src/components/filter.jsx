import React from "react";
import { useState} from "react"
const Filter = ({category,setCategory,input,setInput,handleSearchFilter}) => {
    // const [category,setCategory] = useState("")
    // const [input,setInput] = useState("")
    const [clicked,setClicked] = useState(false)
    return(
        <div className="flex w-full h-full mt-1">
            <select className="w-[25%] h-[70%] mt-1 mb-1 ml-5 md:ml-10 lg:ml-15 xl:ml-20 outline-none border-[0.5px] rounded-md shadow-md" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select an option</option>
                <option value="Low-to-High">Low-to-High</option>
                <option value="Dress">Dress</option>
                <option value="Kurti">Kurti</option>
                <option value="Saare">Saare</option>
                <option value="Dupatta">Dupatta</option>
            </select>

            <input type="text" 
                placeholder="search" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="w-[30%] h-[70%] mt-1 mb-1 ml-5 md:10 lg:ml-15 xl:ml-20 border-1 text-center rounded-md"
            />

            <button className={`w-[25%] h-[70%] mt-1 mb-1 ml-5 mr-5 md:ml-10 md:mr-10 lg:ml-15 lg:mr-15 xl:ml-20 xl:mr-20 rounded-md text-center ${clicked? "shadow-sm" : "shadow-md"}`} onMouseDown={() => setClicked(true)} onMouseUp={() => setClicked(false)} onClick={() => handleSearchFilter()}>
                Search
            </button>
        </div>

    )
}

export default Filter;
