const jwt = require('jsonwebtoken');
const createError = require('./error');
require('dotenv').config();

const verifyToken=(req,res,next)=>{
    const token =req.cookies.access_token;
    console.log(token);
    if(!token) return next(createError(401,"Unauthorized access"));
    jwt.verify(token,process.env.SECRET,(err,user)=>{
        if(err)  return next(createError(403,"Invalid Token"));
        req.user=user;
        next();
    })
}

const verifyUser =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id||req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"Unauthorized access"));
        }
    })
}

const verifyAdmin =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"Unauthorized access"));
        }
    })
}

module.exports={
    verifyToken,
    verifyUser,
    verifyAdmin
}