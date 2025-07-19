const User = require('../models/user')
const Cart = require('../models/userCart');
const Product = require('../models/productUpload');



const UserCartController = async(req,res) => {
    
    try{

        const {email,productId, productQuantity} = req.body;
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({message: "username does not exists...."});
        }
        
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message: "product does not exists...."});
        }
        
        const newCart  =  new Cart({userId: user._id,productId: productId, productTitle: product.title, productPrice: product.price, productImageURL: product.fileURL, productQuantity});
        await newCart.save();
        
        return res.status(201).json({
            message: "items added to cart.",
        });
        

    }
    catch(err){
        console.error("unable to add items to cart.", err);
        if(!res.headersSent){

            return res.status(400).json({message: "unable to add items to cart.", err});
        }
    }
} 
const UserCartRetrivalController = async(req,res) => {

    
    try{
        const {email} = req.user;
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({message: "user not found."})

        }
        const cart = await Cart.find({userId: user._id});
        if(!cart || cart.length === 0){
            return res.status(404).json({message: "no products available in cart yet."});
        }
        
        
        return res.status(201).json({
            message: "cart retrived sucessfully.",
            userCart: cart,
        });
        
    }
    catch(err){
        console.error("unable to retrive items from cart.", err);
        // return res.status(400).json({message: "unable to retrive items from cart.", err});
        if(!res.headersSent){

            return res.status(400).json({message: "unable to retrive items from cart.", err});
        }
    }
}


module.exports = {
    UserCartController,
    UserCartRetrivalController,
}