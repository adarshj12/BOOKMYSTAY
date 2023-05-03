const jwt = require('jsonwebtoken');
require('dotenv').config();
const admin_username = process.env.ADMIN_USERNAME
const admin_password = process.env.ADMIN_PASSWORD
const User = require('../models/usersModel');
const Client = require('../models/clientModel');
const Hotel = require('../models/hotelModel');
const Payment = require('../models/paymentModel');
const Book = require('../models/bookingModel')

const login = async (req, res) => {
    try {
        // console.log('hi');
        const { email, password } = req.body;
        if ((email !== admin_username) || (password !== admin_password)) return res.status(203).json({ message: `email error` });
        const token = jwt.sign({ name: "admin", admin: true }, process.env.SECRET);
        res.status(202).json({ message: 'login successful', token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        // console.log(users);
        if (users.length > 0) {
            return res.status(201).json({ message: 'users found', users });
        } else {
            return res.status(404).json({ message: 'users not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Error -> ${error}` });
    }
}


const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        // console.log(clients);
        if (clients.length > 0) return res.status(201).json({ message: 'clients found', clients })
        res.status(404).json({ message: 'clients not found' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const blockClient = async (req, res) => {
    try {
        await Client.findOneAndUpdate({ _id: req.params.id }, [{ $set: { isBlocked: { $eq: [false, "$isBlocked"] } } }]);
        res.status(200).json("status updated")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const verifyClient = async (req, res) => {
    try {
        await Client.findOneAndUpdate({ _id: req.params.id }, [{ $set: { verified: { $eq: [false, "$verified"] } } }]);
        res.status(200).json("status updated")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const blockUsers = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.params.id }, [{ $set: { isBlocked: { $eq: [false, "$isBlocked"] } } }]);
        res.status(200).json("status updated")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const getAllProperties = async (req, res) => {
    try {
        const hotels = await Hotel.aggregate([
            {
                '$lookup': {
                    'from': 'clients',
                    'localField': 'client',
                    'foreignField': '_id',
                    'as': 'result'
                }
            }, {
                '$unwind': {
                    'path': '$result'
                }
            }, {
                '$project': {
                    '_id': 1,
                    'name': 1,
                    'type': 1,
                    'city': 1,
                    'photos': 1,
                    'result.username': 1
                }
            }
        ])
        res.status(200).json(hotels)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const payments = async (req, res) => {
    try {
        // console.log('hi',req.params.page,req.params.size);
        const page = req.params.page ? parseInt(req.params.page) : 1;
        const size = req.params.size ? parseInt(req.params.size) : 10;
        const skip = (page - 1) * size;
        const data = await Payment.aggregate([
            {
                '$lookup': {
                    'from': 'clients',
                    'localField': 'client',
                    'foreignField': '_id',
                    'as': 'client'
                }
            }, {
                '$unwind': {
                    'path': '$client'
                }
            }, {
                '$lookup': {
                    'from': 'bookings',
                    'localField': 'booking',
                    'foreignField': '_id',
                    'as': 'booking'
                }
            }, {
                '$unwind': {
                    'path': '$booking'
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
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const payclient = async (req, res) => {
    try {
        // console.log(req.body)
        const share = req.body.share
        const client = await Client.findById(req.body.id)
        await Client.findByIdAndUpdate(req.body.id, {
            $set: {
                earnings: client.earnings + share
            }
        })
        await Payment.findByIdAndUpdate(req.body.payid, {
            $set: {
                status: 'paid'
            }
        })
        res.status(200).json('payment successful')
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const dashboard = async (req, res) => {
    try {
        const users = await User.countDocuments()
        const properties = await Hotel.countDocuments()
        const total = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalRate: { $sum: "$rate" }
                }
            }
        ])
        const payment = await Book.aggregate([
            {
                '$group': {
                    '_id': '$payment_mode',
                    'count': {
                        '$sum': 1
                    }
                }
            }
        ])
        const revenue = await Book.aggregate([
            {
                $group: {
                    _id: {
                        $month: '$booking_date' // Group by month of booking_date
                    },
                    revenue: {
                        $sum: '$rate' // Sum the rate for each group
                    }
                }
            },
            {
                $project: {
                    month: '$_id',
                    revenue: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    month: 1 // Sort by month in ascending order
                }
            }
        ])
        res.json({ payment, revenue,users,properties,total })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` });
    }
}

module.exports = {
    login,
    getAllUsers,
    getAllClients,
    blockClient,
    verifyClient,
    blockUsers,
    getAllProperties,
    payments,
    payclient,
    dashboard
}