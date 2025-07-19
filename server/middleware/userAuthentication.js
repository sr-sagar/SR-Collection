const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { isValidPhoneNumber } = require('libphonenumber-js')
const SignUpValidation = (req,res,next) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).required(),
        email: Joi.string().email().lowercase().strip().required(),
        phoneNumber: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .custom((value,helpers) => {
            if(!isValidPhoneNumber(value, 'IN')) {
                return helpers.error("any.invalid");
            }
            return value;
        }, 'Phone number validation')
        .messages({
            'string.pattern.base': 'Phone number must be a valid 10-digit Indian number.',
            'any.invalid': 'Phone number is not valid'
        }),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.valid(Joi.ref("password")).required().messages({'any.only': 'Password does not match.'}),
        adress: Joi.object({
            city: Joi.string().required(),
            location: Joi.string().required(),
        }).required(),
                
    })



    const { error } = schema.validate(req.body, {abortEarly: false});
    if(error){
        console.log(error);
        return res.status(400).json({message: "unable to signup.", error: error.details.map((items) => items.message)});
    }
    req.user = req.body;
    next()
}
const LogInValidation = (req,res,next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        
    })
    
    const { error } = schema.validate(req.body, {abortEarly: false});
    
    if(error){
        console.log(error);
        return res.status(400).json({message: "unable to login.", error: error.details.map((items) => items.message)});
    }
    req.user = req.body;
    next()
}





const currentPasswordValidation = (req,res,next) => {
    const header = req.headers.authorization;
    if(!header)
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
        currentPassword: Joi.string().min(6).required(),
    })
    
    const {error} = schema.validate(req.body, {abortEarly: false});
    if(error)
    {
        return res.status(400).json({message: "something went wrong."});
        
    }
    next()
}
const changePasswordValidation = (req,res,next) => {
    const header = req.headers.authorization;
    if(!header)
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
        newPassword: Joi.string().min(6).required(),
        confirmPassword: Joi.valid(Joi.ref('newPassword')),
    })
    
    const {error} = schema.validate(req.body, {abortEarly: false});
    if(error)
    {
        return res.status(400).json({message: "something went wrong."});
        
    }
    next()
}
const EditUserDetailsValidation = (req,res,next) => {
    const header = req.headers.authorization;
    if(!header)
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
        changedFields: Joi.object({
            newEmail: Joi.string().email().optional(),
            newUserName: Joi.string().optional(),
            newPhoneNumber: Joi.string().optional(),
            newCity: Joi.string().optional(),
            newLocation: Joi.string().optional(),
        })
    }).min(1).required()
    
    const {error} = schema.validate(req.body, {abortEarly: false});
    if(error)
    {
        return res.status(400).json({message: "something went wrong."});
        
    }
    next()
}



    
module.exports = {
    SignUpValidation,
    LogInValidation,
    currentPasswordValidation,
    changePasswordValidation,
    EditUserDetailsValidation,
};