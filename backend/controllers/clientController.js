const Client = require('../models/clientModel');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const multer = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const Hotel = require('../models/hotelModel');
const Book = require('../models/bookingModel')
const jwt = require('jsonwebtoken');
const { emailvalidate } = require('../utils/signupvalidate');
require('dotenv').config();

const register = async (req, res) => {
  try {
    //console.log('hi');
    let { username, email, password, mobile } = req.body;
    if (!emailvalidate(email)) return res.status(203).json({ message: 'invalid email format' });
    let userExist = await Client.findOne({ email })
    if (userExist) return res.status(202).json({ message: `user already registered` })
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    const newClient = new Client({
      username,
      email,
      password,
      mobile,
      earnings: 0
    })
    await newClient.save();
    res.status(201).json({ message: `user registered` })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error -> ${error}` })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Client.findOne({ email });
    if (!user) return res.status(404).json({ message: `user does not exist` });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ message: 'invalid email or password' });
    if (user.isBlocked) return res.status(203).json({ blocked: true });
    const token = jwt.sign({ id: user._id, name: user.username, client: true }, process.env.SECRET);
    console.log(token);
    res.status(202)
      .json({ message: 'login successful', token })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error -> ${error}` })
  }
}

const checkVerification = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
    if (!client.verified) return res.status(202).json({ messsage: false })
    res.status(202).json({ message: true })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error -> ${error}` })
  }
}

const deleteclient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json("client deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error -> ${error}` });
  }
}

const getClientBookings = async (req, res) => {
  try {
    const list = await Hotel.aggregate([
      {
        '$match': {
          'client': new mongoose.Types.ObjectId(req.params.id)
        }
      }, {
        '$lookup': {
          'from': 'bookings',
          'localField': '_id',
          'foreignField': 'hotel',
          'as': 'result'
        }
      }, {
        '$unwind': {
          'path': '$result'
        }
      }, {
        '$lookup': {
          'from': 'users',
          'localField': 'result.user',
          'foreignField': '_id',
          'as': 'output'
        }
      }, {
        '$unwind': {
          'path': '$output'
        }
      }, {
        '$project': {
          '_id': 1,
          'name': 1,
          'type': 1,
          'city': 1,
          'result._id': 1,
          'result.checkin': 1,
          'result.checkout': 1,
          'result.payment_mode': 1,
          'result.payment_id': 1,
          'output.username': 1,
          'output.email': 1,
          'output.mobile': 1
        }
      }
    ])
    res.status(200).json(list)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error -> ${error}` });
  }
}

const getBookingsPagination = async (req, res) => {
  try {
    const page = req.params.page ? parseInt(req.params.page) : 1;
    const size = req.params.size ? parseInt(req.params.size) : 10;
    const skip = (page - 1) * size;

    const data = await Book.aggregate([
      {
        '$lookup': {
          'from': 'hotels',
          'localField': 'hotel',
          'foreignField': '_id',
          'as': 'hotel'
        }
      }, {
        '$unwind': {
          'path': '$hotel'
        }
      }, {
        '$match': {
          'hotel.client': new mongoose.Types.ObjectId(req.params.id)
        }
      }, {
        '$lookup': {
          'from': 'users',
          'localField': 'user',
          'foreignField': '_id',
          'as': 'user'
        }
      }, {
        '$unwind': {
          'path': '$user'
        }
      }, {
        '$lookup': {
          'from': 'payments',
          'localField': '_id',
          'foreignField': 'booking',
          'as': 'result'
        }
      }, {
        '$unwind': {
          'path': '$result'
        }
      }
    ])
    const total = data.length;
    const list = data.slice(skip, skip + size);
    // console.log(list);
    res.json({
      records: list,
      total,
      page,
      size
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error -> ${error}` });
  }
}

const getData = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
    if (!client) return res.status(404).json('client not found');
    res.status(200).json(client.earnings)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error -> ${error}` });
  }
}

const changeBookingStatus =async(req,res)=>{
  try {
    await Book.findByIdAndUpdate(req.params.id,{
      $set:{
        status:'confirmed'
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error -> ${error}` });
  }
}

module.exports = {
  register,
  login,
  checkVerification,
  deleteclient,
  getClientBookings,
  getBookingsPagination,
  getData,
  changeBookingStatus
}