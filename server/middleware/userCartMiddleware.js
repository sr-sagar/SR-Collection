const Joi = require('joi');
const jwt = require('jsonwebtoken');
const cartItemsValidation = (req,res,next) => {
    const header = req.headers.authorization
    if(!header || !header.startsWith("Bearer "))
    {
        return res.status(404).json({message: "token not found."})
    }
    const token = header.split(" ")[1];
    let decode;
    try{

        decode = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err)
    {
        return res.status(403).json({message: "unauthorized action."})

    }
    req.user = decode; 

    const schema = Joi.object({
        email: Joi.string().email().required(),
        productId: Joi.string().hex().required(),
        productPrice: Joi.number().required(),
        productQuantity: Joi.number().required(),
               
    })


    const { error } = schema.validate(req.body, {abortEarly: false})
    if(error)
    {
        console.log(error);
        return res.status(400).json({message: "unable to validate cart details.", error})
    }
    next()
}


const cartRetrivalValidation = (req,res,next) => {
    
    const header = req.headers.authorization; 
    if(!header || !header.startsWith("Bearer "))
    {
        return res.status(404).json({message: "token not found."})
    }
    const token = header.split(" ")[1]
    let decode;
    try{
        decode = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err)
    {
        return res.status(403).json({message: "unauthorized action."})
    }
    
    req.user = decode;
    next()

}


module.exports = {
    cartItemsValidation,
    cartRetrivalValidation,

}