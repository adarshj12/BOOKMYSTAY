const jwt = require('jsonwebtoken');
require('dotenv').config();
const admin_username  = process.env.ADMIN_USERNAME
const admin_password = process.env.ADMIN_PASSWORD
const User = require('../models/usersModel');

const login = async(req,res)=>{
    try {
        console.log('hi');
        const {email,password}=req.body;
        if((email!==admin_username)||(password!==admin_password)) return res.status(203).json({message:`email error`});
        const token =jwt.sign({name:"admin"},process.env.SECRET);
        res.cookie("access_token",token,{
            httpOnly:true,
        })
        .status(202)
        .json({message:'login successful',token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Error -> ${error}`})
    }
}

const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find();
        console.log(users);
        if(users.length>0) return res.status(201).json({message:'users found',users})
        res.status(404).json({message:'users not found'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Error -> ${error}`})
    }
}



module.exports={
    login,
    getAllUsers
}