const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userOrderValidation = (req,res,next) => {
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")){
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

    const schema = Joi.object({
        email: Joi.string().email().required(),
        products: Joi.array().items(
            Joi.object({

                productId: Joi.string().hex().required(),
                productPrice: Joi.number().required(),
                productQuantity: Joi.number().required(),
            })
        ).required(),
    })

    const { error } = schema.validate(req.body, {abortEarly: false})
    if(error)
    {
        console.log(error);
        return res.status(400).json({message: "unable to validate order details.", error})
    }

    req.user = decode
    next()
}


const userOrderCancleValidation = (req,res,next) => {
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer "))
    {
        return res.status(404).json({message: "token not found."});
    }
    const token = header.split(" ")[1]
    let decode;
    try{
        decode = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(403).json({message: "unauthorized access."});
    }
    
    const schema = Joi.object({
        email: Joi.string().email().required(),
        orderId: Joi.string().hex().length(24).required(),
    })
    
    const {error} = schema.validate(req.body, {abortEarly: false});
    if(error)
    {
        return res.status(400).json({message: "something went wrong."});
    }
    next()
    
}


module.exports = {
    userOrderValidation,
    userOrderCancleValidation,

}