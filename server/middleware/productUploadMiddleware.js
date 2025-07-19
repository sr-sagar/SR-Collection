const jwt = require('jsonwebtoken');
const joi = require('joi');

const handleProductMiddleware = async(req,res,next) => {
    try{

        const token = req.headers.authorization?.split(" ")[1];
        const schema = joi.object({
            title: joi.string().required(),
            description: joi.string().required(),
            price: joi.number().required(),
            imageName: joi.alternatives().try(
                joi.string(),
                joi.array().items(joi.string())
            ).required(),
            availbility: joi.boolean().required(),
        })
        const { error, value } = schema.validate(req.body, {abortEarly: false})
        if(error)
        {
            console.error("invalid or incorrect form data",error);
            return res.status(400).json({message: "invalide or incorrect form data.", error});
        }
        
        if(!token)
        {
            return res.status(404).json({message: "token not found."});
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode)
        {
            return res.status(401).json({message: "unauthorized action."});
            
        }
        req.user = decode;
        
        next()
    }catch(err)
    {
        if(err.name == "TokenExpiredError")
        {
            console.error("token expired.", err)
            return res.status(403).json({message: "token has expired, please login again.",err});
            
        }
        else{
            console.error("something went wrong")
            return res.status(400).json({message: "something unexpected happend, please try again.",err});
        } 
    }

}   

// const handleProductRetrivalMiddleware = async(req,res,next) => {
//     try{

//         const token = req.headers.authorization?.split(" ")[1];
//         if(!token)
//         {
//             res.status(404).json({message: "token not found., user is loged out."});
//             next();
//         }
//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         if(!decode)
//         {
//             return res.status(403).json({message: "unauthorized action."});
            
//         }
//         req.user = decode;
//     }catch(err)
//     {
//         if(err.name == "TokenExpiredError")
//         {
//             console.error("token expired.", err)
//             return res.status(403).json({message: "token has expired, please login again.",err});
            
//         }
//         else{
//             console.error("something went wrong")
//             return res.status(400).json({message: "something unexpected happend, please try again.",err});
//         }
//     }

//     next();

// }
module.exports = {handleProductMiddleware};
