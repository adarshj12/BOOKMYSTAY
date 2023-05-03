const Room = require('../models/roomModel');
const Hotel = require('../models/hotelModel');
const Client = require('../models/clientModel');
const cloudinary = require('../utils/cloudinary');

const createRoom =async(req,res)=>{
    try {
        const hotelId =req.params.hotelid;
        const arr = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            const data = {
                image_url: result.secure_url,
                image_id: result.public_id
            }
            arr.push(data)
        }
        const newRoom =new Room({
            ...req.body,
            hotel:req.params.hotelid,
            photos: arr
        });
        const savedRoom =await newRoom.save();
        await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}});
        res.status(200).json(savedRoom)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Error -> ${error}`})
    }
}

const updateRoom = async(req,res)=>{
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        )
        res.status(200).json(updatedRoom)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Error -> ${error}`})
    }
}

const deleteRoom = async(req,res)=>{
    try {
        // console.log(req.params.hotelid);
        const hotelId = req.params.hotelid.toString().trim();
        // console.log(roomId)
        await Hotel.findByIdAndUpdate(req.params.hotelid,{
            $pull:{rooms:req.params.id}
        })
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json('room deleted')
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Error -> ${error}`})
    }
}

const getRoom = async(req,res)=>{
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Error -> ${error}`})
    }
}

const getRooms = async(req,res)=>{
    try {
        const rooms = await Room.find(req.params.id)
        res.status(200).json(rooms)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Error -> ${error}`})
    }
}

//app.post ('/bookRoom/:roomId')
const bookRoom =async (req, res) => {
    const roomId = req.params.roomId;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
  
    // Check if the room is available for the given dates
    const room = await Room.findById(roomId);
    const isAvailable = room.reservedDates.every((date) => {
      return startDate < date || endDate > date;
    });
  
    // If the room is available, update the reservedDates array
    if (isAvailable) {
      room.reservedDates.push(startDate, endDate);
      await room.save();
      res.send('Room booked successfully!');
    } else {
      res.send('Room is already booked for the given dates.');
    }
  }
  
//app.get('/getAvailableRooms')

const getAvailableRooms =async (req, res) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
  
    // Find all rooms that are available for the given dates
    const rooms = await Room.find({ reservedDates: { $not: { $elemMatch: { $lt: endDate, $gt: startDate } } } });
    res.send(rooms);
  }

module.exports={
    createRoom,
    updateRoom,
    getRoom,
    getRooms,
    deleteRoom
}