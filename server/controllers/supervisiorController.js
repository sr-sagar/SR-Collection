const User = require('../models/user');
const Order = require('../models/userOrders');
const Product = require('../models/productUpload');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const supervisiorLogInController = async(req,res) => {

    try{
        const {email, password} = req.body;
        const supervisorEmail = process.env.supervisorEmail
        const supervisorPassword = process.env.supervisorPassword

        const isMatch = await bcrypt.compare(password,supervisorPassword);
        if(email !== supervisorEmail || !isMatch){
            return res.status(401).json({message: "incorrect credentials...."});
        }
        const jwtToken = jwt.sign(
            {email},
            process.env.JWT_SECRET,
            {expiresIn: '12h'}
        )

        return res.status(200).json(
            {
                message: "ok....", 
                jwtToken,
                email,                
            }
        );
        

    }catch(err){
        console.error("unable to login", err);
        return res.status(400).json({message: "unable to login"});

    }
}

const userFetchController = async(req,res) => {
    try{
        const user = await User.find();
        if(!user || user.length === 0)
        {
            return res.status(404).json({message: "no users available yet...."});
        }
        
        
        return res.status(201).json({
            message: "user details retrived successfully.",
            user: user,
        });
        

    }
    catch(err){
        console.error("unable to retrive users.", err);
        if(!res.headersSent){

            return res.status(400).json({message: "unable to retrive users.", err});
        }
    }
}

const userNewRoleSetController = async(req,res) => {

    try{
        const {email,userId,newUserRole} = req.body;
        const supervisorEmail = process.env.supervisorEmail


        if(email !== supervisorEmail){
            return res.status(401).json({message: "incorrect credentials...."});
        }
        if(newUserRole === '' ||!newUserRole)
        {
            return res.status(404).json({message: "no new role selected."});
        }
        const user = await  User.findOne({_id: userId});
        if(!user)
        {
            return res.status(404).json({message: "user not found."});

        }
        user.userRole = newUserRole;
        await user.save()

        return res.status(200).json(
            {
                message: "ok....", 
                newUserRole,                
            }
        );
        

    }catch(err){
        console.error("unable to change user role", err);
        return res.status(400).json({message: "unable to change user role"});

    }
}

const userNewOrderStatusController = async(req,res) => {

    try{
        const {email,orderId,newOrderStatus} = req.body;
        const supervisorEmail = process.env.supervisorEmail


        if(email !== supervisorEmail){
            return res.status(401).json({message: "incorrect credentials...."});
        }
        if(newOrderStatus === '' ||!newOrderStatus)
        {
            return res.status(404).json({message: "no new status selected."});
        }
        const order = await  Order.findOne({_id: orderId});
        if(!order)
        {
            return res.status(404).json({message: "order not found."});

        }
        order.orderStatus = newOrderStatus;
        await order.save()

        return res.status(200).json(
            {
                message: "ok....", 
                newOrderStatus,                
            }
        );
        

    }catch(err){
        console.error("unable to change order status", err);
        return res.status(400).json({message: "unable to change order status"});

    }
}


const orderFetchController = async(req,res) => {
    try{
        const order = await Order.find();
        if(!order || order.length === 0)
        {
            return res.status(404).json({message: "no orders available yet...."});
        }
        
        
        return res.status(201).json({
            message: "order details retrived successfully.",
            order: order,
        });
        

    }
    catch(err){
        console.error("unable to retrive orders.", err);
        if(!res.headersSent){

            return res.status(400).json({message: "unable to retrive orders."});
        }
    }
}


const userNewOrderDeliveryDateController = async(req,res) => {

    try{
        const {email,orderId,newDeliveryDate} = req.body;
        const supervisorEmail = process.env.supervisorEmail


        if(email !== supervisorEmail){
            return res.status(401).json({message: "incorrect credentials...."});
        }
        if(newDeliveryDate === '' ||!newDeliveryDate)
        {
            return res.status(404).json({message: "no delivery date added."});
        }
        const order = await  Order.findOne({_id: orderId});
        if(!order)
        {
            return res.status(404).json({message: "order not found."});

        }
        order.orderDeliveryDate = newDeliveryDate;
        await order.save()

        return res.status(200).json(
            {
                message: "ok....", 
                newDeliveryDate,                
            }
        );
        

    }catch(err){
        console.error("unable to change order delivery date", err);
        return res.status(400).json({message: "unable to change order delivery date"});

    }
}
const userNewOrderNumberController = async(req,res) => {

    try{
        const {email,orderId,newOrderNumber} = req.body;
        const supervisorEmail = process.env.supervisorEmail


        if(email !== supervisorEmail){
            return res.status(401).json({message: "incorrect credentials...."});
        }
        if(newOrderNumber === '' ||!newOrderNumber)
        {
            return res.status(404).json({message: "no order number added."});
        }
        const order = await  Order.findOne({_id: orderId});
        if(!order)
        {
            return res.status(404).json({message: "order not found."});

        }
        order.orderNumber = newOrderNumber;
        await order.save()

        return res.status(200).json(
            {
                message: "ok....", 
                newOrderNumber,                
            }
        );
        

    }catch(err){
        console.error("unable to change order number", err);
        return res.status(400).json({message: "unable to change order number"});

    }
}

const deleteProductsController = async(req,res) => {
    try{
        const {email,productId} = req.body;

        if(email === '' || !email)
        {
            return res.status(400).json({message: "please enter a valid email...."});

        }

        if(email !== process.env.supervisorEmail)
        {
            return res.status(403).json({message: "unauthorized user."});
        }
        
        const product = await Product.findOneAndDelete({_id: productId});
        if(!product || product.length === 0)
        {
            return res.status(404).json({message: "product not found...."});
        }
        
        
        return res.status(201).json({
            message: "porduct deleted successfully.",
            product: product,
        });
        

    }
    catch(err){
        console.error("unable to delete product.", err);
        if(!res.headersSent){

            return res.status(400).json({message: "unable to delete product."});
        }
    }
}

module.exports = {
    supervisiorLogInController,
    userFetchController,
    userNewRoleSetController,
    userNewOrderStatusController,
    orderFetchController,
    userNewOrderDeliveryDateController,
    userNewOrderNumberController,
    deleteProductsController,
}