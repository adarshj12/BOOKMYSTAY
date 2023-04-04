const express = require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
const app=express();
const userRoute= require('./routes/users');
const adminRoute= require('./routes/admin');
const clientRoute= require('./routes/client'); 
const connection = require('./config/db')
require('dotenv').config();

//middlewares
app.use(express.json());
app.use(cors());
app.use('/api/v1/users',userRoute);
app.use('/api/v1/admin',adminRoute);
app.use('/api/v1/client',clientRoute);

const port = process.env.PORT

app.listen(port,async()=>{
    await connection();
    console.log(`server started at http://localhost:${port}`);
})