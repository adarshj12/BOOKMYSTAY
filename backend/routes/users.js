const express = require('express');
const { register, login, getOTP } = require('../controllers/userController');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({message:'user'})
})

router.post('/register',register);
router.post('/login',login);
router.get('/otp/:id',getOTP);

module.exports=router;