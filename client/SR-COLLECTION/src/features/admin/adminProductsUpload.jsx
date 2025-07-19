import React from "react";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import InputBox from "../../components/common/inputBox";
import Button from "../../components/common/button";
import Select from "../../components/common/select";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import {toast} from "react-toastify"
import { useAppContext } from "../../context/AppContext";

const AdminProductsUpload = ({scroll}) => {
    
    const {devLog} = useAppContext()
    // move this to another file/component 
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: { 'image/*': []},
        multiple: true,

    });

    const [val,setVal] = useState({
        'title': '',
        'description': '',
        'price': '',
        // 'availablity': '',
    });
    
    const arr = [
        {type: "text" , id: 1, placeholder: "enter product name",'text' : 'title'},
        {type: "text" , id: 2, placeholder: "enter product description",'text' : 'description'},
        {type: "number" , id: 3, placeholder: "price",'text' : 'price'},        
    ]

    const selArr = [
        {"selValue": "", "selText": "Select Availability", id:1},
        {"selValue": true, "selText": "Available", id:2},
        {"selValue": false, "selText": "Not Available", id:3},
    ]
    
    const [selectVal,setSelectVal] = useState(null)
    
    
    const handleValueAssignment = (key,val) => {
        setVal(prev => ({...prev,[key] : val}));
    }
    
    const formData = new FormData();
    acceptedFiles.map((item) => {

        formData.append('image', item)
    });
    formData.append("title", val.title);
    formData.append("description", val.description);
    formData.append("price", val.price);
    acceptedFiles.map((item) => {
        
        formData.append("imageName", item.name);
    })
    formData.append("availbility", selectVal)


    const sendProductData = async(productData) => {
        
        const req = await fetch('http://localhost:8080/productUpload', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: productData,
        })
        const res = await req.json();
        if(req.status == 200)
        {
            toast.success("product data was sent successfully.");
            
            localStorage.setItem('productDetails', res)
        }
        else{
            devLog(res)
            toast.error("product data was not sent. some error occured.")
        }

    }



    return(
        <div className="absolute top-0 left-0 w-full h-full  bg-[#F4F5F7] ">
            <header className="w-full max-h-[12%] relative pb-5 bg-[#F4F5F7] justify-center items-center object-center ">
                {scroll? 
                <>
                    <SmallerScreensNavbar />
                </>
                :
                    <LargerScreensNavbar />
                }
            </header>
            <main className="relative flex items-center justify-center w-full h-[85%] pt-3 pb-3 pl-2 pr-2 ">
                <div className="relative w-full h-full p-2 space-y-1 rounded-md shadow-md">
                {/* Change This with an add image button */}
                    <div {...getRootProps()} className="w-full h-[40%] rounded-md shadow-md  flex flex-col justify-center items-center transition transform active:scale-95 space-y-2 p-2">
                        <input className="relative w-full h-auto max-w-[216px] bg-red-700"  {...getInputProps()}  />
                        <p className="p-4 border">ADD PHOTO</p>
                        <ul className="flex flex-col">
                            {acceptedFiles.map(items => (<li key={items.name}>{items.name}</li>)
                        )}
                        </ul>
                    </div>
                    <div className="w-full h-[60%] rounded-md   flex flex-col justify-center items-center space-y-1  overflow-y-auto p-2" style={{scrollbarWidth: "none"}}>

                        {arr.map((items) => (
                            <div key={items.id} className="relative flex flex-col items-center justify-center w-full ">
                                <p className="w-[80%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] text-left pl-1  ">{items.text}</p>
                                <InputBox inputType={items.type} inputPlaceHolder={items.placeholder} value={val[items.text]} setValue={handleValueAssignment} name={items.text}/>
                            </div>
                            ))
                            
                        }
                        <div className="w-full h-auto ">
                            <Select selArr={selArr} selMaxWidth={216} setVal={setSelectVal} />
                        </div>
                        <div className="flex items-center justify-center w-full h-auto mt-1 ">
                            <Button btnText={"Add Product"} btnwidth={50} onClick={() => {sendProductData(formData)}}/>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default AdminProductsUpload;