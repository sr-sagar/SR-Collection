import React from "react";
import { useEffect , useRef, useState} from "react";

const Description = ({text}) => {

    const [textClicked, setTextClicked] = useState(false);
    const myRef = useRef(null);
    const [isOverFlow,setIsOverFlow] = useState(false);

    useEffect(() => {
        const el = myRef.current;
        if(el){
            const lineHeight = parseInt(window.getComputedStyle(el).lineHeight, 10);
            const maxLine = 3;
            const maxHeight = lineHeight * maxLine;
            setIsOverFlow(el.scrollHeight > maxHeight)
        }

    },[text])
    return(
        <div className="w-full mix-h-[20%]   shadow-md p-1 ">
            <h3 className="bold text-black text-[20px]">Description</h3>
            <p ref={myRef} className={` w-full mt-2 transition-all duration-300 ${textClicked? "line-clamp-none" : "line-clamp-3"} text-wrap whitespace-pre-line break-words `} >{text}</p>
            {isOverFlow&&  
            <p  className="w-full h-auto text-[16px] text-red-600 cursor-pointer z-[1] " onClick={() => setTextClicked(!textClicked)}>{textClicked? "Show Less" : "Show More"}</p>
            }
        </div>
    )
}

export default Description;