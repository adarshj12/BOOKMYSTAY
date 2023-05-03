const express = require('express');
const { login, getAllUsers, getAllClients, blockClient, verifyClient, blockUsers, getAllProperties, payments, payclient, dashboard } = require('../controllers/adminController');
require('dotenv').config()
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyAdmin } = require('../utils/verifyToken');
const { deleteProperty, getAllBookings, getAllBookingsWRTDuration } = require('../controllers/hotelController');
const { getUserDetail, deleteuser, updateUser } = require('../controllers/userController');
const { deleteclient } = require('../controllers/clientController');


router.post('/login', login);

router.get('/getUsers',verifyAdmin, getAllUsers);

router.get('/getClients',verifyAdmin,getAllClients);

router.get('/blockClient/:id',verifyAdmin,blockClient);

router.get('/verifyClient/:id',verifyAdmin,verifyClient);

router.get('/blockUser/:id',verifyAdmin,blockUsers);

router.get('/getProperties',verifyAdmin,getAllProperties);

router.delete('/deleteproperty/:id',verifyAdmin,deleteProperty);

router.get('/getUser/:id',verifyAdmin,getUserDetail);

router.delete('/deleteuser/:id',verifyAdmin,deleteuser);

router.put('/updateuser/:id',verifyAdmin,updateUser)

router.delete('/deleteclient/:id',verifyAdmin,deleteclient);

router.get('/getAllBookings/:page/:size',verifyAdmin,getAllBookings);

router.get('/getBookings',verifyAdmin,getAllBookingsWRTDuration)

router.get('/payments/:page/:size',verifyAdmin,payments)

router.put('/payclient',verifyAdmin,payclient)

router.get('/dashboard',verifyAdmin,dashboard)

module.exports = router;