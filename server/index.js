import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
// Router

const app = express();

// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

// Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors())
dotenv.config()

mongoose.connect(process.env.MONGO_DB,
{useNewUrlParser: true, useUnifiedTopology: true}
)
.then(()=> app.listen (process.env.PORT, ()=> console.log("Listening")))
.catch((error)=>{
    console.log(error);
});

// usage of route
app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)