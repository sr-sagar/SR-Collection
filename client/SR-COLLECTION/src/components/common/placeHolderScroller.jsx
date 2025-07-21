import React,{useState,useEffect} from "react";

export const usePlaceHolderScroller = (originalText, speed = 1000) => {
    const [placeHolderScrollText,setPlaceHolderScrollText] = useState(originalText)

    useEffect(() => {
        let placeHolderScroller = originalText
        const interval = setInterval(() => {
            placeHolderScroller = placeHolderScroller.slice(1)
            if(placeHolderScroller.length === 0)
            {
                placeHolderScroller = originalText
            }
            setPlaceHolderScrollText(placeHolderScroller)
            
        },speed)
        return () => clearInterval(interval);
    },[])
  return placeHolderScrollText  
} 