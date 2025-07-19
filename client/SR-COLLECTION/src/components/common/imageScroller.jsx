import React, {useState, useEffect} from "react";

const ImageScroller = ({scroll}) => {

    const [current,setCurrent] = useState(0);
    const images = [
        "/coverImageSmallScreen2.png",
        "/coverImage1.jpeg",
        "/coverImage2jpeg.jpeg",
        "/coverImage3.jpeg",
        "/coverImage4.jpeg"
    ]
    const coverImage = [
        "/coverImageBigScreen.png"
    ]

    useEffect(() => {
        if(scroll){

            const interval = setInterval(() => {
                setCurrent((prev) => (prev + 1) % images.length);
            }, 5000);
            
            return () => clearInterval(interval)
        }
    },[])

    return(
        <div className="object-[50%_top] md:relative w-full h-full  ">
            
            {scroll?
            <img src={images[0]} alt="n/a" className="absolute transition-all  transform w-full h-[100%]   object-fill object-[center_0%] opacity-[0.9] "/>
            :
            <img src={coverImage[0]} alt="n/a" className="absolute w-full h-[100%]  md:object-cover  lg:object-fill  opacity-[0.9]  z-[0]"/>

            }
        </div>
    )
}

export default ImageScroller;
