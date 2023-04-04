const Client = require('../models/clientModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signupvalidate } = require('../utils/signupvalidate');
require('dotenv').config();

const register=async(req,res)=>{
    try {
        console.log('hi');
        let {username,email,password,mobile} =req.body;
        if(!signupvalidate(email)) return res.status(203).json({message:'invalid email format'});
        let userExist = await Client.findOne({email})
        if(userExist) return res.status(202).json({message:`user already registered`})
        const salt = bcrypt.genSaltSync(10);
        password=bcrypt.hashSync(password,salt);
        const newClient = new Client({
            username,
            email,
            password,
            mobile
        })
        await newClient.save();
        res.status(201).json({message:`user registered`})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Error -> ${error}`})
    }
}

const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await Client.findOne({email});
        if(!user) return res.status(500).json({message:`user does not exist`});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(500).json({message:'invalid email or password'});
        const token =jwt.sign({id:user._id,name:user.username},process.env.SECRET);
        console.log(token);
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

module.exports ={
    register,
    login
}