const Hotel = require('../models/hotelModel');
const Room = require('../models/roomModel');
const Book = require('../models/bookingModel');
const User = require('../models/usersModel')
const multer = require('../utils/multer');
const Client = require('../models/clientModel');
const cloudinary = require('../utils/cloudinary');
const mongoose = require('mongoose')

const createHotel = async (req, res) => {
    try {
        console.log(req.files);
        console.log(req.body);
        const clientid = req.params.id;
        const arr = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            const data = {
                image_url: result.secure_url,
                image_id: result.public_id
            }
            arr.push(data)
        }
        const newHotel = new Hotel({
            ...req.body,
            client: clientid,
            photos: arr
        });
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const getClientProperties = async (req, res) => {
    try {
        const client = req.params.id;
        const list = await Hotel.find({ client });
        res.status(200).json(list)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const deleteProperty = async (req, res) => {
    try {
        console.log(req.params.id);
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("hotel deleted")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const getProperty = async (req, res) => {
    try {
        // console.log(' hotel fg called '); 
        const data = await Hotel.findById(req.params.id);
        if (!data) return res.status(204).json({ message: 'not found' })
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const updateProperty = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const images = req.files.map((file, index) => {
            return {
                filename: file,
                id: req.body.image_id[index]
            };
        });
        console.log(images);
        await Hotel.updateOne({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                type: req.body.type,
                city: req.body.city,
                address: req.body.address,
                title: req.body.title,
                distance: req.body.distance,
                desc: req.body.desc,
                cheapestPrice: req.body.cheapestPrice
            }
        })
        for (let image of images) {
            const photo = await Hotel.findOne({ photos: { $elemMatch: { _id: image.id } } })
            for (const key of photo.photos) {
                if (key._id == image.id) {
                    console.log(key.image_id);
                    await cloudinary.uploader.destroy(key.image_id);
                }
            }
            const result = await cloudinary.uploader.upload(image.filename.path);
            await Hotel.findOneAndUpdate(
                {
                    _id: req.params.id,
                    "photos._id": image.id
                },
                {
                    $set:
                    {
                        "photos.$.image_url": result.secure_url,
                        "photos.$.image_id": result.public_id
                    }
                })
        }

        res.status(200).json("hotel updated")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const countByCity = async (req, res) => {
    try {
        const cities = req.query.cities.split(",")
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const countByType = async (req, res) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
        const villaCount = await Hotel.countDocuments({ type: 'villa' });
        const resortCount = await Hotel.countDocuments({ type: 'resort' });
        const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
        const cabinCount = await Hotel.countDocuments({ type: 'cabin' });
        res.status(200).json([
            { type: 'hotel', count: hotelCount },
            { type: 'villa', count: villaCount },
            { type: 'resort', count: resortCount },
            { type: 'apartment', count: apartmentCount },
            { type: 'cabin', count: cabinCount }
        ]);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({ city: req.query.city })
        res.status(200).json(hotels);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const getDestinations = async (req, res) => {
    try {
        const places = await Hotel.find({}, { "city": 1, "_id": 0 })
        const map = new Map();
        const placesArr = []
        for (let i = 0; i < places.length; i++) {
            if (map.has(places[i].city)) continue;
            map.set(places[i].city, i);
            placesArr.push(places[i])
        }
        res.status(200).json(placesArr);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const getHotelRooms = async (req, res) => {
    try {
        // const hotel = await Hotel.findById(req.params.id);
        // const list = await Promise.all(
        //     hotel.rooms.map((room) => {
        //         return Room.findById(room);
        //     })
        // );

        // const startTimestamp = new Date(req.params.start).getTime();
        // const endTimestamp = new Date(req.params.end).getTime();
        // const availableRooms = [];

        // for (let i = 0; i < list.length; i++) {
        //     const room = list[i];
        //     const unavailableDates = room.unavailableDates.map((date) => new Date(date).getTime());
        //     const filteredDates = unavailableDates.filter((date) => {
        //         return date >= startTimestamp && date < endTimestamp;
        //     });
        //     if (filteredDates.length === 0) {
        //         availableRooms.push(room);
        //     }
        // }
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })
        );

        const startTimestamp = new Date(req.params.start).getTime();
        const endTimestamp = new Date(req.params.end).getTime();
        const availableRooms = [];

        for (let i = 0; i < list.length; i++) {
            const room = list[i];
            if (room && room.unavailableDates) {
                const unavailableDates = room.unavailableDates.map((date) => new Date(date).getTime());
                const filteredDates = unavailableDates.filter((date) => {
                    return date >= startTimestamp && date < endTimestamp;
                });
                if (filteredDates.length === 0) {
                    availableRooms.push(room);
                }
            }
        }

        // console.log(availableRooms);
        res.status(200).json(availableRooms);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` })
    }
}

const getBookingDetails = async (req, res) => {
    try {
        const booking = await Book.findById(req.params.id);
        if (!booking) res.status(404).json({ message: 'data not found' })
        res.status(200).json(booking)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` });
    }
}

const userBookingDetail = async (req, res) => {
    try {
        const detail = await Book.aggregate([
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(req.params.id)
                }
            }, {
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
                '$unwind': {
                    'path': '$rooms'
                }
            }, {
                '$lookup': {
                    'from': 'rooms',
                    'localField': 'rooms',
                    'foreignField': '_id',
                    'as': 'room'
                }
            }, {
                '$unwind': {
                    'path': '$room'
                }
            }
        ])
        // console.log(detail);
        if (!detail) res.status(404).json({ message: 'data not found' })
        res.status(200).json(detail)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` });
    }
}

const getAllBookings = async (req, res) => {
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
                '$lookup': {
                    'from': 'clients',
                    'localField': 'hotel.client',
                    'foreignField': '_id',
                    'as': 'client'
                }
            }, {
                '$unwind': {
                    'path': '$client'
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
            }
        ])
        const total = data.length;
        const list = data.slice(skip, skip + size);
        //console.log(list);
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

const rateHotel = async (req, res) => {
    const { userId, hotelId, rating, review } = req.body
    // try {
    //     const hotelData = await Hotel.findById(hotelId);
    //     const userData = await User.findById(userId);

    //     if (!hotelData) {
    //         return res.status(404).json('Hotel not found');
    //     }
    //     if (!userData) {
    //         return res.status(404).json('User not found');
    //     }
    //     const existingRating = hotelData.ratings.find((rating) => rating.user.toString() === userId);
    //     if (existingRating) {
    //         existingRating.rating = rating;
    //         existingRating.review = review;
    //     } else {
    //         const ratingObj = {
    //             user: userData._id,
    //             rating: rating,
    //             review
    //         };
    //         hotelData.ratings.push(ratingObj);
    //     }

    //     await hotelData.save();
    //     res.status(200).json('Rating added successfully');
    // } catch (err) {
    //     console.error('Error adding rating:', err);
    //     res.status(500).json({ message: `Error -> ${err}` });
    // }
    new Promise((resolve, reject) => {
        Hotel.findById(hotelId)
            .then((hotelData) => {
                User.findById(userId)
                    .then((userData) => {
                        if (!hotelData) {
                            reject('Hotel not found');
                        }
                        if (!userData) {
                            reject('User not found');
                        }

                        const existingRating = hotelData.ratings.find(
                            (rating) => rating.user.toString() === userId
                        );
                        if (existingRating) {
                            existingRating.rating = rating;
                            existingRating.review = review;
                        } else {
                            const ratingObj = {
                                user: userData._id,
                                rating: rating,
                                review,
                            };
                            hotelData.ratings.push(ratingObj);
                        }

                        hotelData
                            .save()
                            .then(() => {
                                resolve('Rating added successfully');
                            })
                            .catch((err) => {
                                reject(`Error saving hotel data -> ${err}`);
                            });
                    })
                    .catch((err) => {
                        reject(`Error finding user -> ${err}`);
                    });
            })
            .catch((err) => {
                reject(`Error finding hotel -> ${err}`);
            });
    })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error('Error adding rating:', err);
            res.status(500).json({ message: `Error -> ${err}` });
        });

}

const deleteBooking = async (req, res) => {
    try {
        const booking = await Book.findById(req.params.id)
        if (!booking) return res.status(404).json({ message: 'booking not found' })
        await Book.findByIdAndUpdate(req.params.id, {
            $set: {
                status: 'canceled'
            }
        })
        res.status(200).json({ message: `booking #${booking._id} canceled` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` });
    }
}

const getAllBookingsWRTDuration = async (req, res) => {
    try {
        const time = req.query.duration
        console.log(time);
        console.log(req.query.page, req.query.size, req.query.duration);
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = req.query.size ? parseInt(req.query.size) : 10;
        const skip = (page - 1) * size;
        switch (req.query.duration) {
            case 'all': {
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
                        '$lookup': {
                            'from': 'clients',
                            'localField': 'hotel.client',
                            'foreignField': '_id',
                            'as': 'client'
                        }
                    }, {
                        '$unwind': {
                            'path': '$client'
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
                    }
                ])
                const total = data.length;
                const list = data.slice(skip, skip + size);
                //console.log(list);
                return res.json({
                    records: list,
                    total,
                    page,
                    size
                })
            }
            case 'month': {
                const month = new Date().getMonth()
                const data = await Book.aggregate([
                    {
                        '$lookup': {
                            'from': 'hotels',
                            'localField': 'hotel',
                            'foreignField': '_id',
                            'as': 'hotel'
                        }
                    },
                    {
                        '$unwind': {
                            'path': '$hotel'
                        }
                    },
                    {
                        '$lookup': {
                            'from': 'clients',
                            'localField': 'hotel.client',
                            'foreignField': '_id',
                            'as': 'client'
                        }
                    },
                    {
                        '$unwind': {
                            'path': '$client'
                        }
                    },
                    {
                        '$lookup': {
                            'from': 'users',
                            'localField': 'user',
                            'foreignField': '_id',
                            'as': 'user'
                        }
                    },
                    {
                        '$unwind': {
                            'path': '$user'
                        }
                    },
                    {
                        '$match': {
                            '$expr': {
                                '$eq': [{ '$month': { '$toDate': '$booking_date' } }, month]
                            }
                        }
                    }
                ]);
                const total = data.length;
                const list = data.slice(skip, skip + size);
                //console.log(list);
                return res.json({
                    records: list,
                    total,
                    page,
                    size
                })
            }
            case 'week': {
                const getWeek = (date) => {
                    const onejan = new Date(date.getFullYear(), 0, 1);
                    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
                    const weekNumber = Math.ceil(((date - onejan) / millisecondsInWeek) + onejan.getDay() / 7);
                    return weekNumber;
                }
                const checkinDate = new Date();
                const weekNumber = getWeek(checkinDate);
                // console.log("Week number:", weekNumber);
                const data = await Book.aggregate([
                    {
                        '$lookup': {
                            'from': 'hotels',
                            'localField': 'hotel',
                            'foreignField': '_id',
                            'as': 'hotel'
                        }
                    },
                    {
                        '$unwind': {
                            'path': '$hotel'
                        }
                    },
                    {
                        '$lookup': {
                            'from': 'clients',
                            'localField': 'hotel.client',
                            'foreignField': '_id',
                            'as': 'client'
                        }
                    },
                    {
                        '$unwind': {
                            'path': '$client'
                        }
                    },
                    {
                        '$lookup': {
                            'from': 'users',
                            'localField': 'user',
                            'foreignField': '_id',
                            'as': 'user'
                        }
                    },
                    {
                        '$unwind': {
                            'path': '$user'
                        }
                    },
                    {
                        '$match': {
                            '$expr': {
                                '$eq': [{ $week: { $toDate: '$booking_date' } }, weekNumber - 1]
                            }
                        }
                    }
                ]);
                const total = data.length;
                const list = data.slice(skip, skip + size);
                //console.log(list);
                return res.json({
                    records: list,
                    total,
                    page,
                    size
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` });
    }
}




const updateRating = (req, res) => {
    try {
        const hotelId = 'hotel-id'; // Replace with the actual hotel ID

        Hotel.findById(hotelId)
            .then(hotel => {
                // Check if the hotel document exists
                if (!hotel) {
                    throw new Error('Hotel not found');
                }

                // Find the index of the rating belonging to the user
                const userRatingIndex = hotel.ratings.findIndex(rating => rating.user.equals(userId));

                // Check if the user rating exists
                if (userRatingIndex === -1) {
                    throw new Error('User rating not found');
                }

                // Update the rating value
                hotel.ratings[userRatingIndex].rating = rating;

                // Save the updated hotel document
                return hotel.save();
            })
            .then(updatedHotel => {
                console.log('Rating updated successfully:', updatedHotel);
            })
            .catch(err => {
                console.error('Error updating rating:', err);
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error -> ${error}` });
    }
}

module.exports = {
    createHotel,
    getClientProperties,
    deleteProperty,
    getProperty,
    countByCity,
    countByType,
    getAllHotels,
    updateProperty,
    getDestinations,
    getHotelRooms,
    getBookingDetails,
    userBookingDetail,
    getAllBookings,
    rateHotel,
    deleteBooking,
    getAllBookingsWRTDuration
}