const express = require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
const app=express();
const userRoute= require('./routes/users');
const adminRoute= require('./routes/admin');
const clientRoute= require('./routes/client'); 
const hotelRoute = require('./routes/hotels')
const roomRoute = require('./routes/rooms')
const connection = require('./config/db')
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//middlewares
app.use(express.json());

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.urlencoded({extended:true})) 

app.use('/api/v1/users',userRoute);
app.use('/api/v1/admin',adminRoute);
app.use('/api/v1/client',clientRoute);
app.use('/api/v1/hotels',hotelRoute);
app.use('/api/v1/rooms',roomRoute);

app.get('/api/v1/getKey',(req,res)=>res.status(200).json({key:process.env.RAZORPAY_API_KEY}))


io.on("connection",(socket)=>{
    socket.on("join_room",(data)=>{
        socket.join(data.room);
        
        if (data.username === 'admin') {
            socket.join('admin');
        } else {
            socket.to('admin').emit('user_joined', data);
        }
    });
    
    socket.on("send_message",(data)=>{
        console.log(data);
        
        socket.to(data.room).emit("recieve_message",data);
        socket.to('admin').emit('new_message', data);
    });
    
    socket.on("disconnect",()=>{
        const rooms = Object.keys(socket.rooms);
        if (rooms.includes('admin')) {
            socket.leave('admin');
        }
    });
});

const port = process.env.PORT

server.listen(port,async()=>{
    await connection();
    console.log(`server started at http://localhost:${port}`);
})