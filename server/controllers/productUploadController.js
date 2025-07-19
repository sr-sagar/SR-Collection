const productUploadModel = require('../models/productUpload');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const productUploadController = async(req,res) => {
    try{
        const {title, description, price, availbility,imageName} = req.body;
        const savedFileName = req.files;

        // console.log(savedFileName)
        if(!savedFileName || savedFileName.length === 0){
            return res.status(404).json({message: "file not found."})
        }


        const uploadPromises = savedFileName.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "productImages",
            });
            fs.unlinkSync(file.path)
            return result.secure_url;
        })

        const fileURL = await Promise.all(uploadPromises);
        
        const Product = await new productUploadModel({
            title,
            description,
            price,
            availbility,
            fileURL,
            uploadTime : Date.now(),
        })
        
        await Product.save();
        return res.status(200).json({
            message: "product added successfully.",
            title: title,
            // fileName: fileName,
            fileURL: Product.fileURL,
            product: Product,
        });

    }catch(err){
        console.error("an error has occured", err);
        return res.status(400).json({message: "an error has occured", err});
    }
}

const productRetrivalController = async(req,res) => {
    try{
        const products = await productUploadModel.find();
        if(!products)
        {
            return res.status(404).json({message: "products not found."})
        }
        return res.status(201).json({message: "products retrived sucessfully.", products})

    }catch(err)
    {
        console.error("something went wrong.", err);
        return res.status(400).json({message: "something went wrong.",err})
    }
}

module.exports = {productUploadController, productRetrivalController};
