const express = require('express');
const { login, getAllUsers } = require('../controllers/adminController');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({message:'admin'})
})

router.post('/login',login);

router.get('/getUsers',getAllUsers);

module.exports=router;