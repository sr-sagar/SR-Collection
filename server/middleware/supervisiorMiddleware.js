const jwt = require('jsonwebtoken')
const joi = require('joi');
const Joi = require('joi');

const supervisiorLoginAuthentication = (req,res,next) => {
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required(),
        })
        const { error } = schema.validate(req.body, {abortEarly: false});
        if(error)
        {
            console.log(error);
            return res.status(400).json({message: "something went wrong."})
        }
        next()
}
const userFetchAuthentication = (req,res,next) => {
    try{
    
    const token = req.headers.authorization?.split(" ")[1]
        if(!token)
        {
            return res.status(404).json({message: "token not found."})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode)
        {
            return res.status(403).json({message: "unauthorized action."})

        }
        req.user = decode;
        next()
    }catch(err){
        return res.status(400).json({message: "something went wrong."})
    }
}

const userNewRoleSetAuthentication = (req,res,next) => {
    try{
    
    const token = req.headers.authorization?.split(" ")[1]
        if(!token)
        {
            return res.status(404).json({message: "token not found."})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode)
        {
            return res.status(403).json({message: "unauthorized action."})

        }

        const schema = joi.object({
            email: joi.string().email().required(),
            userId: joi.string().length(24).hex().required(),
            newUserRole: joi.string().required(),
        })
        const { error } = schema.validate(req.body, {abortEarly: false});
        if(error)
        {
            console.log(error);
            return res.status(400).json({message: "something went wrong."})
        }

        req.user = decode;
        next()
    }catch(err){
        return res.status(400).json({message: "something went wrong."})
    }
}

const userNewOrderStatusAuthentication = (req,res,next) => {
    try{
    
    const token = req.headers.authorization?.split(" ")[1]
        if(!token)
        {
            return res.status(404).json({message: "token not found."})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode)
        {
            return res.status(403).json({message: "unauthorized action."})

        }

        const schema = joi.object({
            email: joi.string().email().required(),
            orderId: joi.string().length(24).hex().required(),
            newOrderStatus: joi.string().required(),
        })
        const { error } = schema.validate(req.body, {abortEarly: false});
        if(error)
        {
            console.log(error);
            return res.status(400).json({message: "something went wrong."})
        }

        req.user = decode;
        next()
    }catch(err){
        return res.status(400).json({message: "something went wrong."})
    }
}

const userNewOrderDeliveryDateAuthentication = (req,res,next) => {
    try{
    
    const token = req.headers.authorization?.split(" ")[1]
        if(!token)
        {
            return res.status(404).json({message: "token not found."})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode)
        {
            return res.status(403).json({message: "unauthorized action."})

        }

        const schema = joi.object({
            email: joi.string().email().required(),
            orderId: joi.string().length(24).hex().required(),
            newDeliveryDate: joi.string().required(),
        })
        const { error } = schema.validate(req.body, {abortEarly: false});
        if(error)
        {
            console.log(error);
            return res.status(400).json({message: "something went wrong."})
        }

        req.user = decode;
        next()
    }catch(err){
        return res.status(400).json({message: "something went wrong."})
    }
}
const userNewOrderNumberAuthentication = (req,res,next) => {
    try{
    
    const token = req.headers.authorization?.split(" ")[1]
        if(!token)
        {
            return res.status(404).json({message: "token not found."})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode)
        {
            return res.status(403).json({message: "unauthorized action."})

        }

        const schema = joi.object({
            email: joi.string().email().required(),
            orderId: joi.string().length(24).hex().required(),
            newOrderNumber: joi.string().required(),
        })
        const { error } = schema.validate(req.body, {abortEarly: false});
        if(error)
        {
            console.log(error);
            return res.status(400).json({message: "something went wrong."})
        }

        req.user = decode;
        next()
    }catch(err){
        return res.status(400).json({message: "something went wrong."})
    }
}

const deleteProductsAuthentication = (req,res,next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1]
        if(!token)
        {
            return res.status(404).json({message: "token not found."})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode)
        {
            return res.status(403).json({message: "unauthorized action."})

        }

        const schema = joi.object({
            email: joi.string().email().required(),
            productId: joi.string().length(24).hex().required(),

        })
        const { error } = schema.validate(req.body, {abortEarly: false});
        if(error)
        {
            console.log(error);
            return res.status(400).json({message: "something went wrong."})
        }

        req.user = decode;
        next()
    }catch(err)
    {
        console.log(err);
        return res.status(400).json({message: "something went wrong."})
    }
}



module.exports = {
    supervisiorLoginAuthentication,
    userFetchAuthentication,
    userNewRoleSetAuthentication,
    userNewOrderStatusAuthentication,
    userNewOrderDeliveryDateAuthentication,
    userNewOrderNumberAuthentication,
    deleteProductsAuthentication,
}