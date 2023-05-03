const express = require('express');
const { countByCity, countByType, getProperty, getAllHotels, getDestinations, getHotelRooms, getBookingDetails, rateHotel } = require('../controllers/hotelController');
const router = express.Router();

router.get('/getbyCity',countByCity);

router.get('/getbyType',countByType);

router.get('/getProperty/:id',getProperty);

router.get('/getAll',getAllHotels);

router.get('/places',getDestinations);

router.get('/rooms/:id/:start/:end',getHotelRooms);

router.get('/booking/:id',getBookingDetails);

router.post('/rate',rateHotel)


module.exports=router;