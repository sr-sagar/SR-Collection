const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserLogIn = async(req,res) => {

    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({error: "incorrect email...."});
            
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({error: "incorrect password...."});
        }
        const jwtToken = jwt.sign(
            {email: user.email,userId: user.userId},
            process.env.JWT_SECRET,
            {expiresIn: '12h'}
            )


        return res.status(200).json(
            {
                message: "ok....", 
                jwtToken, 
                email, 
                userName: user.userName,
                userRole: user.userRole,
                userName: user.userName,
            }
            );

    }catch(err){
        console.error("unable to get users", err);
        return res.status(400).json({error: "unable to login user", err});

    }
}

const UserSignUp = async(req,res) => {

    const validateEmailWithAbstractAPI = async(email) => {
        const API_KEY = process.env.abstractAPI_EMAIL_KEY;
        const res = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`)
        if(res.status === 429)
        {
            throw new Error("Too many requests - please slow down.")
        }
        if(res.status === 200)
        {
            return await res.json();

        }
        throw new Error(`Email validation failed with status: ${res.status}`);
        
        
    }
    const validatePhoneWithAbstractAPI = async(phoneNumber) => {
        const API_KEY = process.env.abstractAPI_PHONENUMBER_KEY;
        const res = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=${API_KEY}&phone=${phoneNumber}&country=IN`)
        if(res.status === 429)
        {
            throw new Error("Too many requests - please slow down.")
        }
        if(res.status === 200)
        {
            return await res.json();

        }
        throw new Error(`Phone validation failed with status: ${res.status}`);
    }

    try{
        const {userName, email, password, phoneNumber, adress} = req.body;
        const user = await User.findOne({email});
        if(user)
        {
            return res.status(409).json({message: "email already exists...."});
            
        }
        
        const result = await validateEmailWithAbstractAPI(email);
        if(!result || result.is_valid_format?.value === false || result.is_smtp_valid?.value === false) {
            return res.status(400).json({error: "email is not valid or reachable"});
        }
        
        const phoneResult = await validatePhoneWithAbstractAPI(phoneNumber);
        if(!phoneResult || phoneResult.valid !== true){
            return res.status(400).json({error: "phone number is not valid."});
            
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser  =  new User({userName,email,password:hash,phoneNumber,adress,userRole: "user"});
        await newUser.save();
        const jwtToken = jwt.sign(
            {userName: userName,email: email},
            process.env.JWT_SECRET,
            {expiresIn: '12h'}
        )
        return res.status(201).json({
            message: "ok....",
            jwtToken,
            email, 
            userRole: newUser.userRole,
            userName: newUser.userName,
        });
        

    }
    catch(err){
        console.error("SignUp Error:", err.message || err);
        if(!res.headersSent){

            return res.status(400).json({error: err.message || "unable to create user"});
        }
        return res.status(400).json({error: err.message || "unable to create user"});
        
    }
} 

 


const currentPasswordController = async(req,res) => {
    try{
        const {currentPassword,email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "unable to verify user."})
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if(!isMatch){
            return res.status(403).json({message: "unable to verify cerdentials."})
        }
        return res.status(201).json({message: "password verified."})

    }catch(err)
    {
        return res.status(400).json({message: "something went wrong."})
    }
} 

const changePasswordController = async(req,res) => {
    try{
        const {newPassword,email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "unable to verify user."})
        }
        const hash = await bcrypt.hash(newPassword, 10);
        user.password = hash;
        await user.save()
        return res.status(200).json({message: "password changed scussfully."})

    }catch(err)
    {
        console.log("password change error.")
        return res.status(400).json({message: "something went wrong."})
    }
} 

const UserRetrivalController = async(req,res) => {
    try{
        const {email} = req.user;
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({message: "username does not exists...."});
        }
        
        
        return res.status(201).json({
            message: "user details retrived sucessfully.",
            user: user,
        });
        

    }
    catch(err){
        console.error("unable to retrive orders.", err);
        if(!res.headersSent){

            return res.status(400).json({message: "unable to retrive orders.", err});
        }
    }
}

const EditUserDetailsController = async(req,res) => {
    try{
        
        const {email,changedFields} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "unable to verify user."})
        }
        const updates = {};
        if(changedFields.newEmail) updates.email = changedFields.newEmail;
        if(changedFields.newUserName) updates.userName = changedFields.newUserName;
        if(changedFields.newPhoneNumber) updates.phoneNumber = changedFields.newPhoneNumber;

        if(changedFields.newCity || changedFields.newLocation)
        {
            updates.adress = {
                ...(user.adress || {}),
                ...(changedFields.newCity&& {city: changedFields.newCity}),
                ...(changedFields.newLocation&& {location: changedFields.newLocation}),
            }
        }
        const isEmail = 'newEmail' in changedFields;

        Object.assign(user, updates);
        await user.save()
        return res.status(200).json({message: "details changed successfully.",isEmail})

    }catch(err)
    {
        console.log("error changing details.")
        return res.status(400).json({message: "something went wrong."})
    }
} 

 





module.exports = {
    UserLogIn,
    UserSignUp,
    currentPasswordController,
    changePasswordController,
    UserRetrivalController,
    EditUserDetailsController,

};
