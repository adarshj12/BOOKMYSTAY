const express = require('express');
const { register, login } = require('../controllers/clientController');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({message:'client'})
})

router.post('/register',register);
router.post('/login',login)

module.exports=router;