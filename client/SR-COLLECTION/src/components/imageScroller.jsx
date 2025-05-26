import React, {useState, useEffect} from "react";

const ImageScroller = ({scroll}) => {

    const [current,setCurrent] = useState(0);
    const images = [
        "https://d2d5n4ft74bagm.cloudfront.net/media/banners/d8dfa8c8-ff9c-4132-8916-81db2da13e2d/1747295247.jpeg?w=90",
        "https://d2d5n4ft74bagm.cloudfront.net/media/banners/015cfd34-cac7-48d4-a80c-cc5cf8e9efcd/1746260322.jpeg?w=90",
        "https://d2d5n4ft74bagm.cloudfront.net/media/banners/059dccef-420f-4bf1-a9ed-4e3ffe389f66/1747295178.jpeg?w=90",
        "https://d2d5n4ft74bagm.cloudfront.net/media/banners/edaeb86c-5a3b-4bbd-8c4f-e8aad24fbd59/1747295164.jpeg?w=90",
    ]

    useEffect(() => {
        if(scroll){

            const interval = setInterval(() => {
                setCurrent((prev) => (prev + 1) % images.length);
            }, 3000);
            
            return () => clearInterval(interval)
        }
    },[])

    return(
        <div className="homeHeaderImg object-[50%_top] ">
            {scroll&&
                <div 
                style={{backgroundImage: `url(${images[current]})`}}
                className="w-full h-[80%] md:absolute md:bg-cover bg-[center_top] md:opacity-[0.2]"
                ></div>
            }
            {scroll?
            <img src={images[current]} alt="n/a" className="absolute w-full h-[100%] md:h-[80%] md:object-contain  object-cover object-[center_0%] opacity-[0.9] "/>
            :
            <img src={images[3]} alt="n/a" className="absolute w-full h-[60%] md:h-[100%] md:object-contain  object-cover object-[right_0%] opacity-[0.9] md:bg-gradient-to-r md:from-[#5B331C] md:to-[#5B331C] z-[-1]"/>
            }
            {/* md:bg-gradient-to-r md:from-black md:via-red-500 md:to-black */}
        </div>
    )
}

export default ImageScroller;
