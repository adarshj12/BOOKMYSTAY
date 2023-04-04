const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { emailvalidate } = require('../utils/signupvalidate');
require('dotenv').config();

const register=async(req,res)=>{
    try {
        let {username,email,password,mobile} =req.body;
        if(!emailvalidate(email)) return res.status(203).json({message:'invalid email format'});
        let userExist = await User.findOne({email})
        if(userExist) return res.status(202).json({message:`user already registered`})
        const salt = bcrypt.genSaltSync(10);
        password=bcrypt.hashSync(password,salt);
        const newUser = new User({
            username,
            email,
            password,
            mobile
        })
        await newUser.save();
        res.status(201).json({message:`user registered`})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Error -> ${error}`})
    }
}

const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(500).json({message:`user does not exist`});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(500).json({message:'invalid email or password'});
        const token =jwt.sign({id:user._id,name:user.username},process.env.SECRET);
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

const getOTP=async(req,res)=>{
    try {
        console.log("11111", req.params.id);
        let user = await User.findOne({mobile:req.params.id});
        if(user){
            const token =jwt.sign({id:user._id,name:user.username},process.env.SECRET);
            return res.status(202).json({message:'user exist',token})
        }
        res.status(203).json({message:"mobile no. mismatch"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Error -> ${error}`})
    }
}

module.exports ={
    register,
    login,
    getOTP
}