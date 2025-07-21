const User = require('../models/user')
const Order = require('../models/userOrders');
const Product = require('../models/productUpload');

const UserOrderController = async(req,res) => {

    
    try{
        const {email,products} = req.body;
        if(!Array.isArray(products) || products.length === 0)
        {
            return res.status(400).json({message: "No products provided"});
        }

        // const {productId, productQuantity} = products[0];
        // console.log(productId)
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({message: "username does not exists...."});
        }

        let totalAmount = 0;
        const formattedProducts = [];
        for(const items of products){
            const {
                productId,
                productPrice,
                productQuantity,
            } = items;
            
            const product = await Product.findById(productId);
            if(!product){
                return res.status(404).json({message: "product does not exists...."});
            }
            const singleTotal = productPrice * productQuantity;
            totalAmount += singleTotal;

            formattedProducts.push({
                productId: product._id,
                productTitle: product.title,
                productPrice: product.price,
                productDescription: product.description,
                productAvailability: product.availbility,
                productImageURL: product.fileURL,
                productQuantity: productQuantity,
            })
        }
        
        const newOrder  =  new Order({
            userId: user._id,
            userName: user.userName,
            userAddressCity: user.adress.city || "N/A",
            userHomeAddress: user.adress.location || "N/A", 
            userPhoneNumber: user.phoneNumber,
            products: formattedProducts,
            orderDate: Date.now(),
            orderStatus: "pending" ,
            totalAmount: totalAmount.toFixed(2),
        });
        await newOrder.save();
        return res.status(201).json({
            message: "order placed successfully.",
            orderStatus: newOrder.orderStatus,
            orderDate: newOrder.orderDate,
            totalAmount: newOrder.totalAmount,
        });
        

    }
    catch(err){
        console.error("unable to place order.", err);
        if(!res.headersSent){

            return res.status(400).json({message: "unable to place order.", err});
        }
    }
} 

const UserOrderRetrivalController = async(req,res) => {
    try{
        const {email} = req.user;
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({message: "username does not exists...."});
        }
        
        const order = await Order.find({userId: user._id});
        if(!order){
            return res.status(404).json({message: "no order yet."});
        }
        
        
        return res.status(201).json({
            message: "orders retrived sucessfully.",
            userOrder: order,
            
        });
        

    }
    catch(err){
        console.error("unable to retrive orders.", err);
        if(!res.headersSent){

            return res.status(400).json({message: "unable to retrive orders.", err});
        }
    }
}


const userOrderCancleController = async(req,res) => {
    try{
        
        const {email,orderId} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "unable to verify user."})
        }
        
        const order = await Order.findOne({_id: orderId, userId:user._id})
        if(!order || order.length === 0)
        {
            return res.status(404).json({message: "No Order Found."});
            
        }

        const now = new Date();
        const orderCreatedAt  = new Date(order.createdAt);
        const timeDiffrenceInHours = (now - orderCreatedAt) / (1000 * 60 * 60);
        if(timeDiffrenceInHours > 24)
        {
            return res.status(403).json({message: "Orders can only be canceled within 24 hours of being placed."})
        }
        const deleteOrder = await Order.findOneAndDelete({_id: orderId, userId: user._id});
        if(!deleteOrder)
        {
            return res.status(401).json({message: "unable to cancel order."});
        }

        
        return res.status(200).json({message: "order canceled successfully.",deleteOrder});

    }catch(err)
    {
        console.log("something went wrong.", err)
        return res.status(400).json({message: "something went wrong."})
    }
}


module.exports = {
    UserOrderController,
    UserOrderRetrivalController,
    userOrderCancleController,

}