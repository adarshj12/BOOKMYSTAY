const express = require('express');
const { 
    register, 
    login, 
    getOTP, 
    updateUser, 
    getUserDetail,
    checkout, 
    verification, 
    stripe_payment, 
    stripe_webhook, 
    bookingDetails, 
    getMyBookings, 
    googleAuth, 
    mobileUpdate, 
    getMyBookng 
} = require('../controllers/userController');
const { verifyUser } = require('../utils/verifyToken');
const { deleteBooking } = require('../controllers/hotelController');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({message:'user'})
})

router.post('/register',register);
router.post('/login',login);
router.get('/otp/:id',getOTP);
router.get('/getuser/:id',verifyUser,getUserDetail);
router.put('/updateuser/:id',verifyUser,updateUser);

// router.post('/booking',booking)

// router.post('/booking',getbookingDetails);

router.post('/booking',bookingDetails);

router.post('/checkout',checkout);

router.post('/verification',verification)

router.post('/create-checkout-session',stripe_payment)

router.post('/webhook', express.raw({type: 'application/json'}),stripe_webhook)

router.get('/bookings/:id',verifyUser,getMyBookings)

router.get('/booking/:id',verifyUser,getMyBookng)

router.post('/googleAuth',googleAuth)

router.put('/mobileupdate/:id',verifyUser,mobileUpdate);

router.get('/cancel/:id',verifyUser,deleteBooking)


module.exports=router;